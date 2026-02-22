// lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { questionnaireData } from '@/data/enhancedQuestionnaireData';

const supabaseUrl = "https://ufilhctamtoycvjknpqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaWxoY3RhbXRveWN2amtucHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4ODEzOTQsImV4cCI6MjA3ODQ1NzM5NH0.AGmVOkWRKdKfTGpDXFWSQrCBkB74rsUlAG1iYAX4s5w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────
// ANSWER FORMATTING HELPERS
// ─────────────────────────────────────────────

function formatDisplayAnswer(rawAnswer, question) {
  if (rawAnswer === null || rawAnswer === undefined) return null;

  switch (question?.type) {
    case 'dual-single': {
      const result = {};
      if (question.subQuestions) {
        question.subQuestions.forEach(sq => {
          const val = rawAnswer[sq.key] || rawAnswer[sq.key?.replace(/^(avg|peak)_/, '')] || null;
          if (val) result[sq.label] = val.label || val.value || String(val);
        });
      } else {
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
// FLATTEN ANSWERS FOR EDGE FUNCTION - FIXED
// ─────────────────────────────────────────────
function flattenSiteAnswersForEdge(rawAnswers = {}) {
  const flat = {};
  
  // CRITICAL: Extract Q11 and Q12 correctly
  // Q11 = Primary connectivity type
  // Q12 = Secondary connectivity
  
  Object.entries(rawAnswers).forEach(([qId, answer]) => {
    if (!answer) return;
    
    const qKey = `Q${qId}`;
    let extractedValue = null;

    // Handle different answer structures
    if (typeof answer === 'string') {
      extractedValue = answer;
    } else if (answer.label) {
      extractedValue = answer.label;
    } else if (answer.value) {
      extractedValue = answer.value;
    } else if (answer.option) {
      // Q2: single-with-checkbox
      extractedValue = answer.option.label || answer.option.value;
    } else if (Array.isArray(answer)) {
      // Q14: multiple select (protocols)
      extractedValue = answer.map(a => a.label || a.value || a).join(', ');
    } else if (typeof answer === 'object') {
      // Q5/Q6: dual-single (downlink/uplink)
      if (answer.downlink && answer.uplink) {
        const down = answer.downlink.label || answer.downlink.value || '';
        const up = answer.uplink.label || answer.uplink.value || '';
        extractedValue = `${down} / ${up}`;
      } else if (answer.tco !== undefined) {
        // Q20: scale ratings - skip, not needed for product matching
        return;
      }
    }

    if (extractedValue) {
      flat[qKey] = extractedValue;
    }
  });

  console.log('🔍 Flattened answers for Edge Function:', flat);
  return flat;
}

// ─────────────────────────────────────────────
// MAIN SAVE FUNCTION
// ─────────────────────────────────────────────

export async function saveQuestionnaireResponse(sitesData, contactInfo, scoringData) {
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
    .select('id')
    .single();

  if (error) {
    console.error('Supabase saveQuestionnaireResponse error:', error);
    throw error;
  }

  console.log('✅ Saved response ID:', data.id);

  // ─────────────────────────────────────────────
  // CALL EDGE FUNCTION FOR RECOMMENDATIONS
  // ─────────────────────────────────────────────
  try {
    const edgeSites = sites.map((site, idx) => ({
      site_id: site.id,
      site_name: site.name,
      site_number: idx + 1,
      answers: flattenSiteAnswersForEdge(site.answers || {}),
    }));

    console.log('🚀 Calling recommend-package Edge Function with sites:', edgeSites);
    
    const { data: recData, error: recError } = await supabase.functions.invoke('recommend-package', {
      body: {
        sites: edgeSites,
        response_id: data.id,
      },
    });

    if (recError) {
      console.warn('⚠️ Recommendation failed (non-critical):', recError);
    } else {
      console.log('✅ Recommendations generated:', recData);
      
      if (typeof window !== 'undefined' && recData) {
        localStorage.setItem('recommendations', JSON.stringify(recData));
      }
    }
  } catch (recErr) {
    console.warn('⚠️ Recommendation error (non-critical):', recErr);
  }

  return data;
}

// ─────────────────────────────────────────────
// OTHER HELPERS
// ─────────────────────────────────────────────

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

export async function updateResponseStatus(id, status, notes = null) {
  const updates = { status };
  if (notes !== null) updates.internal_notes = notes;

  const { data, error } = await supabase
    .from('questionnaire_responses')
    .update(updates)
    .eq('id', id)
    .select('id')
    .single();

  if (error) throw error;
  return data;
}

export async function saveToolComment(comment, email = null) {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([{
      answers:      { type: 'tool_comment', comment },
      contact_info: { email },
      comment,
      status:       'pending',
      submitted_at: new Date().toISOString(),
    }])
    .select('id')
    .single();

  if (error) throw error;
  return data;
}