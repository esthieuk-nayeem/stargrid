// lib/multiSiteStorage.js
// Enhanced storage system for multi-site questionnaire

const SITES_KEY = 'questionnaire_sites';
const CURRENT_SITE_KEY = 'questionnaire_current_site';
const CONTACT_KEY = 'questionnaire_contact';
const SUBMISSION_KEY = 'questionnaire_submission_id';

/**
 * Site data structure:
 * {
 *   id: string (unique identifier),
 *   name: string,
 *   location: {
 *     lat: number,
 *     lng: number,
 *     address: string,
 *     city: string,
 *     state: string,
 *     country: string,
 *     postalCode: string
 *   },
 *   answers: {
 *     [questionId]: answerData
 *   },
 *   scoring: {
 *     requirements: {},
 *     preferences: {},
 *     constraints: {}
 *   },
 *   completionPercentage: number
 * }
 */

/**
 * Get all sites
 */
export function getAllSites() {
  try {
    const stored = localStorage.getItem(SITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading sites:', error);
    return [];
  }
}

// NEW FUNCTION: Clear all questionnaire data
export function clearAllQuestionnaireData() {
  localStorage.removeItem('stargrid_sites');
  localStorage.removeItem('stargrid_current_site_id');
}

// NEW FUNCTION: Reset to fresh state
export function resetQuestionnaire() {
  clearAllQuestionnaireData();
  return createSite({
    lat: 0,
    lng: 0,
    siteName: 'New Site',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });
}

/**
 * Save all sites
 */
export function saveAllSites(sites) {
  try {
    localStorage.setItem(SITES_KEY, JSON.stringify(sites));
    return true;
  } catch (error) {
    console.error('Error saving sites:', error);
    return false;
  }
}

/**
 * Get current active site ID
 */
export function getCurrentSiteId() {
  try {
    return localStorage.getItem(CURRENT_SITE_KEY);
  } catch (error) {
    console.error('Error loading current site:', error);
    return null;
  }
}

/**
 * Set current active site
 */
export function setCurrentSiteId(siteId) {
  try {
    localStorage.setItem(CURRENT_SITE_KEY, siteId);
    return true;
  } catch (error) {
    console.error('Error saving current site:', error);
    return false;
  }
}

/**
 * Create a new site
 */
export function createSite(location) {
  const sites = getAllSites();
  const newSite = {
    id: `site_${Date.now()}`,
    name: location.siteName || `Site ${sites.length + 1}`,
    location: location,
    answers: {},
    scoring: {
      requirements: {},
      preferences: {},
      constraints: {}
    },
    completionPercentage: 0,
    createdAt: new Date().toISOString()
  };
  
  sites.push(newSite);
  saveAllSites(sites);
  setCurrentSiteId(newSite.id);
  
  return newSite;
}

/**
 * Get a specific site by ID
 */
export function getSite(siteId) {
  const sites = getAllSites();
  return sites.find(site => site.id === siteId);
}

/**
 * Update site information
 */
export function updateSite(siteId, updates) {
  const sites = getAllSites();
  const siteIndex = sites.findIndex(site => site.id === siteId);
  
  if (siteIndex === -1) return false;
  
  sites[siteIndex] = {
    ...sites[siteIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveAllSites(sites);
  return true;
}

/**
 * Delete a site
 */
export function deleteSite(siteId) {
  const sites = getAllSites();
  const filteredSites = sites.filter(site => site.id !== siteId);
  saveAllSites(filteredSites);
  
  // If deleting current site, switch to first available
  if (getCurrentSiteId() === siteId && filteredSites.length > 0) {
    setCurrentSiteId(filteredSites[0].id);
  }
  
  return true;
}

/**
 * Save answer for a specific site and question
 */
export function saveSiteAnswer(siteId, questionId, answer) {
  const site = getSite(siteId);
  if (!site) return false;
  
  site.answers[questionId] = answer;
  
  // Update completion percentage
  const totalQuestions = 20; // Questions 2-21 (Question 1 is location)
  const answeredQuestions = Object.keys(site.answers).length;
  site.completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  updateSite(siteId, site);
  return true;
}

/**
 * Get answer for a specific site and question
 */
export function getSiteAnswer(siteId, questionId) {
  const site = getSite(siteId);
  return site ? site.answers[questionId] : null;
}

/**
 * Get all answers for a specific site
 */
export function getSiteAnswers(siteId) {
  const site = getSite(siteId);
  return site ? site.answers : {};
}

/**
 * Update site scoring data
 */
export function updateSiteScoring(siteId, scoring) {
  const site = getSite(siteId);
  if (!site) return false;
  
  site.scoring = scoring;
  updateSite(siteId, site);
  return true;
}

/**
 * Get site scoring data
 */
export function getSiteScoring(siteId) {
  const site = getSite(siteId);
  return site ? site.scoring : null;
}

/**
 * Save contact information (global, not per-site)
 */
export function saveContactInfo(contactInfo) {
  try {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contactInfo));
    return true;
  } catch (error) {
    console.error('Error saving contact info:', error);
    return false;
  }
}

/**
 * Load contact information
 */
export function loadContactInfo() {
  try {
    const stored = localStorage.getItem(CONTACT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading contact info:', error);
    return null;
  }
}

/**
 * Get summary of all sites
 */
export function getAllSitesSummary() {
  const sites = getAllSites();
  return sites.map(site => ({
    id: site.id,
    name: site.name,
    location: site.location,
    completionPercentage: site.completionPercentage,
    answeredQuestions: Object.keys(site.answers).length,
    hasAllAnswers: site.completionPercentage === 100
  }));
}

/**
 * Check if all sites are complete
 */
export function areAllSitesComplete() {
  const sites = getAllSites();
  return sites.length > 0 && sites.every(site => site.completionPercentage === 100);
}

/**
 * Export all data for submission
 */
export function exportAllData() {
  return {
    sites: getAllSites(),
    contact: loadContactInfo(),
    timestamp: new Date().toISOString(),
    totalSites: getAllSites().length
  };
}

/**
 * Clear all data
 */
export function clearAllData() {
  try {
    localStorage.removeItem(SITES_KEY);
    localStorage.removeItem(CURRENT_SITE_KEY);
    localStorage.removeItem(CONTACT_KEY);
    localStorage.removeItem(SUBMISSION_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Duplicate a site (for similar configurations)
 */
export function duplicateSite(siteId) {
  const originalSite = getSite(siteId);
  if (!originalSite) return null;
  
  const sites = getAllSites();
  const newSite = {
    ...originalSite,
    id: `site_${Date.now()}`,
    name: `${originalSite.name} (Copy)`,
    createdAt: new Date().toISOString()
  };
  
  sites.push(newSite);
  saveAllSites(sites);
  
  return newSite;
}

/**
 * Validate site data
 */
export function validateSite(siteId) {
  const site = getSite(siteId);
  if (!site) return { valid: false, errors: ['Site not found'] };
  
  const errors = [];
  
  // Check location
  if (!site.location || !site.location.lat || !site.location.lng) {
    errors.push('Location is required');
  }
  
  // Check required questions (adjust based on your requirements)
  const requiredQuestions = [2, 3, 4, 5, 6, 12, 13];
  requiredQuestions.forEach(qId => {
    if (!site.answers[qId]) {
      errors.push(`Question ${qId} is required`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    completionPercentage: site.completionPercentage
  };
}
