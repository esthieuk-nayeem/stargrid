// lib/supabase.js
// Supabase client + helpers for StarGrid Questionnaire
// Updated: fixes 400 error + correct question key mapping

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ═══════════════════════════════════════════════
// Save questionnaire response + trigger recommendation
//
// Accepts EITHER:
//   saveQuestionnaireResponse(sites, contactInfo, scoringData)  ← contact page
//   saveQuestionnaireResponse({ answers, contact_info, ... })   ← single object
// ═══════════════════════════════════════════════
export async function saveQuestionnaireResponse(sitesOrPayload, contactInfo, scoringData) {
  let row;

  if (contactInfo !== undefined) {
    // Called with 3 args: (sites, contactInfo, scoringData) from contact page
    const sites = Array.isArray(sitesOrPayload) ? sitesOrPayload : [sitesOrPayload];

    // Format answers with full question text for readability in admin
    const formattedAnswers = {
      sites: sites.map(site => ({
        site_id:   site.id,
        site_name: site.name,
        location:  site.location || null,
        answers:   site.answers || {},
        scoring:   site.scoring || {},
      })),
    };

    row = {
      answers:      formattedAnswers,
      contact_info: {
        company_name:     contactInfo.companyName    || '',
        full_name:        contactInfo.fullName       || '',
        email:            contactInfo.email          || '',
        phone:            contactInfo.phone          || '',
        job_title:        contactInfo.jobTitle       || '',
        additional_notes: contactInfo.additionalNotes || '',
      },
      scoring_data: scoringData || {},
    };
  } else {
    // Called with single object payload
    row = Array.isArray(sitesOrPayload) ? sitesOrPayload[0] : sitesOrPayload;
  }

  // 1. Insert the response
  const { data, error } = await supabase
    .from("questionnaire_responses")
    .insert([row])
    .select()
    .single();

  if (error) throw error;

  // 2. Trigger recommendation in background (non-blocking)
  try {
    const sites = row.answers?.sites || [];
    if (sites.length > 0) {
      const edgeSites = sites.map((site, idx) => ({
        site_id:   site.site_id || site.id || `site-${idx + 1}`,
        site_name: site.site_name || site.name || `Site ${idx + 1}`,
        answers:   flattenSiteAnswers(site.answers || {}),
      }));

      supabase.functions.invoke("recommend-package", {
        body: { sites: edgeSites, response_id: data.id },
      }).catch(err => console.warn("Background recommendation failed:", err));
    }
  } catch (e) {
    console.warn("Failed to trigger recommendation:", e);
  }

  return data;
}

/**
 * Convert stored site answers to flat Q→answer format for the Edge Function.
 * Sends ALL UI question keys — the Edge Function maps them to matrix keys.
 */
function flattenSiteAnswers(answers) {
  const flat = {};

  for (const [key, val] of Object.entries(answers)) {
    if (!val) continue;

    const qKey = String(key).startsWith("Q") ? String(key) : `Q${key}`;

    let label = null;
    if (typeof val === "string") {
      label = val;
    } else if (val.label) {
      label = val.label;
    } else if (val.display_answer) {
      label = typeof val.display_answer === "string"
        ? val.display_answer
        : Array.isArray(val.display_answer)
          ? val.display_answer[0]
          : String(val.display_answer);
    } else if (val.value !== undefined) {
      label = String(val.value);
    }

    if (label) flat[qKey] = label;
  }

  return flat;
}

// ═══════════════════════════════════════════════
// Fetch all responses (admin)
// ═══════════════════════════════════════════════
export async function fetchAllResponses({ page = 1, limit = 20, status = null } = {}) {
  let query = supabase
    .from("questionnaire_responses")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}

// ═══════════════════════════════════════════════
// Update response status
// ═══════════════════════════════════════════════
export async function updateResponseStatus(id, newStatus) {
  const { error } = await supabase
    .from("questionnaire_responses")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) throw error;
}

// ═══════════════════════════════════════════════
// Save a tool comment
// ═══════════════════════════════════════════════
export async function saveToolComment(comment, contactInfo = {}) {
  const payload = {
    answers: { type: "tool_comment" },
    contact_info: contactInfo || {},
    comment: comment,
  };

  const { data, error } = await supabase
    .from("questionnaire_responses")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}