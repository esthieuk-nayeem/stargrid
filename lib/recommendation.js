// lib/recommendation.js
// Client library for the StarGrid recommendation Edge Function
// Converts localStorage site data → Edge Function format → formatted results

import { supabase } from "./supabase";

/**
 * Convert a site's answers from localStorage format { 2: { label: "Mining Operation", ... }, ... }
 * to the flat format the Edge Function expects { "Q2": "Mining Operation", "Q12": "Satellite", ... }
 */
function flattenAnswers(siteAnswers) {
  if (!siteAnswers) return {};
  const flat = {};
  // The question keys we care about for recommendation
  const relevantQs = [2, 4, 5, 6, 7, 12, 13, 14, 15, 22];

  for (const qNum of relevantQs) {
    const ans = siteAnswers[qNum];
    if (!ans) continue;

    // Handle different answer formats
    let label = null;
    if (typeof ans === "string") {
      label = ans;
    } else if (ans.label) {
      label = ans.label;
    } else if (ans.display_answer) {
      label = typeof ans.display_answer === "string"
        ? ans.display_answer
        : Array.isArray(ans.display_answer)
          ? ans.display_answer[0]
          : String(ans.display_answer);
    } else if (ans.value !== undefined) {
      label = String(ans.value);
    }

    if (label) {
      flat[`Q${qNum}`] = label;
    }
  }
  return flat;
}

/**
 * Call the recommend-package Edge Function for multiple sites.
 *
 * @param {Array} sites - Array of site objects from getAllSites()
 * @param {number|null} responseId - Optional: Supabase response ID to store the recommendation
 * @returns {Object} { sitePackages, pocTotals, allTotals, totalSites }
 */
export async function getRecommendations(sites, responseId = null) {
  const payload = {
    sites: sites.map((site, idx) => ({
      site_id: site.id || `site-${idx + 1}`,
      site_name: site.name || `Site ${idx + 1}`,
      answers: flattenAnswers(site.answers),
    })),
    response_id: responseId,
  };

  const { data, error } = await supabase.functions.invoke("recommend-package", {
    body: payload,
  });

  if (error) {
    console.error("Recommendation API error:", error);
    throw new Error(`Recommendation failed: ${error.message}`);
  }

  return data;
}

/**
 * Format a number as EUR currency.
 */
export function formatEuro(val) {
  const num = typeof val === "number" ? val : parseFloat(val) || 0;
  if (num === 0) return "—";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}