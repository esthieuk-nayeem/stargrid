// lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { questionnaireData } from '@/data/enhancedQuestionnaireData';

const supabaseUrl = "https://ufilhctamtoycvjknpqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaWxoY3RhbXRveWN2amtucHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODEzOTQsImV4cCI6MjA3ODQ1NzM5NH0.AGmVOkWRKdKfTGpDXFWSQrCBkB74rsUlAG1iYAX4s5w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────
// ANSWER FORMATTING HELPERS
// ─────────────────────────────────────────────

/**
 * Given a raw answer and its question definition, return a clean
 * human-readable display value so the Supabase row is easy to read.
 */
function formatDisplayAnswer(rawAnswer, question) {
  if (rawAnswer === null || rawAnswer === undefined) return null;

  switch (question?.type) {
    case 'dual-single': {
      // Handles both old keys (downlink/uplink) and new keys (avg_downlink etc.)
      const result = {};
      if (question.subQuestions) {
        question.subQuestions.forEach(sq => {
          // Try the explicit key first, then fall back to "downlink"/"uplink"
          const val = rawAnswer[sq.key]
            || rawAnswer[sq.key?.replace(/^(avg|peak)_/, '')]
            || null;
          if (val) result[sq.label] = val.label || val.value || String(val);
        });
      } else {
        // Legacy structure that stored {downlink:{}, uplink:{}}
        if (rawAnswer.downlink) result['Downlink'] = rawAnswer.downlink.label || rawAnswer.downlink.value;
        if (rawAnswer.uplink)   result['Uplink']   = rawAnswer.uplink.label   || rawAnswer.uplink.value;
      }
      return result;
    }

    case 'scale': {
      const result = {};
      if (question.options) {
        question.options.forEach(opt => {
          if (rawAnswer[opt.value] !== undefined) {
            result[opt.label] = rawAnswer[opt.value];
          }
        });
      }
      return result;
    }

    case 'single-with-checkbox': {
      const optionLabel = rawAnswer.option?.label || rawAnswer.label || null;
      return rawAnswer.highTheftRisk
        ? `${optionLabel} (High-theft-risk area)`
        : optionLabel;
    }

    case 'multiple': {
      if (Array.isArray(rawAnswer)) {
        return rawAnswer.map(a => a.label || a.value || String(a)).filter(Boolean);
      }
      return rawAnswer;
    }

    case 'boolean':
      return typeof rawAnswer === 'string' ? rawAnswer : (rawAnswer?.label || String(rawAnswer));

    default: {
      if (Array.isArray(rawAnswer)) {
        return rawAnswer.map(a => a.label || a.value || String(a)).join(', ');
      }
      if (typeof rawAnswer === 'object' && rawAnswer !== null) {
        return rawAnswer.label || rawAnswer.value || JSON.stringify(rawAnswer);
      }
      return String(rawAnswer);
    }
  }
}

/**
 * Converts a single site's raw answers object into a fully annotated
 * Q&A map, keyed by "Q1", "Q2", etc. — ready for the Supabase JSONB column.
 *
 * Input  (as stored in localStorage):
 *   { "1": { label:"Smart Farm/Irrigation", value:"farm", score:{…} }, … }
 *
 * Output (stored in Supabase answers.sites[n].answers):
 *   {
 *     "Q1": {
 *       question_id: 1,
 *       question_text: "What is the primary use case…",
 *       section: "Project & Site Basics",
 *       type: "single",
 *       raw_answer: { label:"Smart Farm/Irrigation", value:"farm", score:{…} },
 *       display_answer: "Smart Farm/Irrigation",
 *       answered: true
 *     },
 *     …
 *   }
 */
function buildSiteAnswersPayload(rawAnswers = {}) {
  const payload = {};

  questionnaireData.forEach(question => {
    const raw = rawAnswers[question.id] ?? null;
    payload[`Q${question.id}`] = {
      question_id:     question.id,
      question_text:   question.question,
      section:         question.section,
      type:            question.type,
      raw_answer:      raw,
      display_answer:  formatDisplayAnswer(raw, question),
      answered:        raw !== null && raw !== undefined,
    };
  });

  // Also capture the site-type answer stored under key 22 (from map picker)
  if (rawAnswers[22] !== undefined) {
    const raw = rawAnswers[22];
    payload['Q22_site_type'] = {
      question_id:    22,
      question_text:  'Site type (from map picker)',
      section:        'Location',
      type:           'single',
      raw_answer:     raw,
      display_answer: raw?.label || raw?.value || String(raw),
      answered:       true,
    };
  }

  return payload;
}

// ─────────────────────────────────────────────
// MAIN SAVE FUNCTION  (called from ContactFormPage)
// ─────────────────────────────────────────────

/**
 * Takes the full sites array from multiSiteStorage plus the contact form data
 * and writes one record to questionnaire_responses.
 *
 * The `answers` JSONB column will contain:
 * {
 *   total_sites: 2,
 *   sites: [
 *     {
 *       site_number: 1,
 *       site_id: "site_17…",
 *       site_name: "Site 1",
 *       site_type: "Fixed Site",
 *       location: { address, city, state, country, postalCode, coordinates },
 *       completion_percentage: 33,
 *       created_at: "…",
 *       answers: { Q1: {…}, Q2: {…}, … }   ← every question
 *     },
 *     …
 *   ],
 *   submission_meta: { submitted_at, total_questions, per_site_completion }
 * }
 */
export async function saveQuestionnaireResponse(sitesData, contactInfo, scoringData) {
  // sitesData is the array straight from getAllSites()
  const sites = Array.isArray(sitesData) ? sitesData : [];

  const answersPayload = {
    total_sites: sites.length,
    sites: sites.map((site, index) => ({
      site_number:           index + 1,
      site_id:               site.id,
      site_name:             site.name,
      site_type:             site.answers?.[22]?.label || site.answers?.[22]?.value || null,
      location: {
        address:    site.location?.address    || null,
        city:       site.location?.city       || null,
        state:      site.location?.state      || null,
        country:    site.location?.country    || null,
        postalCode: site.location?.postalCode || null,
        coordinates: {
          lat: site.location?.lat ?? null,
          lng: site.location?.lng ?? null,
        },
      },
      completion_percentage: site.completionPercentage ?? 0,
      created_at:            site.createdAt || null,
      answers:               buildSiteAnswersPayload(site.answers || {}),
    })),
    submission_meta: {
      submitted_at:     new Date().toISOString(),
      total_questions:  questionnaireData.length,
      per_site_completion: sites.map(s => ({
        site_id:               s.id,
        site_name:             s.name,
        answered_count:        Object.keys(s.answers || {}).length,
        completion_percentage: s.completionPercentage ?? 0,
      })),
    },
  };

  const contactPayload = {
    company_name:      contactInfo.companyName      || null,
    full_name:         contactInfo.fullName          || null,
    email:             contactInfo.email             || null,
    phone:             contactInfo.phone             || null,
    job_title:         contactInfo.jobTitle          || null,
    additional_notes:  contactInfo.additionalNotes   || null,
  };

  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([{
      answers:      answersPayload,
      contact_info: contactPayload,
      scoring_data: scoringData || {},
      status:       'pending',
      submitted_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Supabase saveQuestionnaireResponse error:', error);
    throw error;
  }

  console.log('✅ Saved response ID:', data.id);
  return data;
}

// ─────────────────────────────────────────────
// OTHER HELPERS  (unchanged / extended)
// ─────────────────────────────────────────────

export async function fetchAllProducts() {
  const { data, error } = await supabase
    .from('stargrid_product_table')
    .select('*')
    .order('Product_Name');

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  return data;
}

export async function matchProducts(answers, scoring) {
  const { data, error } = await supabase.functions.invoke('match-products', {
    body: { answers, scoring },
  });
  if (error) throw error;
  return data;
}

/**
 * Submit a standalone tool comment (from CommentButton)
 */
export async function saveToolComment(comment, email = null) {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([{
      answers:      { type: 'tool_comment' },
      contact_info: { email },
      comment,
      status:       'pending',
      submitted_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch all responses for the admin page
 */
export async function fetchAllResponses({ page = 1, limit = 20, status = null } = {}) {
  let query = supabase
    .from('questionnaire_responses')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (status) query = query.eq('status', status);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}

/**
 * Update status + optional internal notes
 */
export async function updateResponseStatus(id, status, notes = null) {
  const updates = { status };
  if (notes !== null) updates.internal_notes = notes;

  const { data, error } = await supabase
    .from('questionnaire_responses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}