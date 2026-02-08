// lib/multiSiteStorage.js
// FIXED VERSION - Enhanced storage system for multi-site questionnaire with cleanup

const SITES_KEY = 'stargrid_sites';
const CURRENT_SITE_KEY = 'stargrid_current_site_id';

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
 *   completionPercentage: number,
 *   createdAt: string
 * }
 */

/**
 * Get all sites
 */
export function getAllSites() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(SITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading sites:', error);
    return [];
  }
}

/**
 * Save all sites
 */
function saveAllSites(sites) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SITES_KEY, JSON.stringify(sites));
  } catch (error) {
    console.error('Error saving sites:', error);
  }
}

/**
 * Get current site ID
 */
export function getCurrentSiteId() {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(CURRENT_SITE_KEY);
  } catch (error) {
    console.error('Error getting current site ID:', error);
    return null;
  }
}

/**
 * Set current site ID
 */
export function setCurrentSiteId(siteId) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CURRENT_SITE_KEY, siteId);
  } catch (error) {
    console.error('Error setting current site ID:', error);
  }
}

/**
 * Create a new site
 */
export function createSite(locationData) {
  const sites = getAllSites();
  
  const newSite = {
    id: `site_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: locationData.siteName || locationData.name || `Site ${sites.length + 1}`,
    location: {
      lat: locationData.lat,
      lng: locationData.lng,
      address: locationData.address || '',
      city: locationData.city || '',
      state: locationData.state || '',
      country: locationData.country || '',
      postalCode: locationData.postalCode || ''
    },
    answers: {},
    scoring: {
      requirements: {},
      preferences: {},
      constraints: {}
    },
    completionPercentage: 0,
    createdAt: new Date().toISOString()
  };
  
  // Save Q22 if provided (site type)
  if (locationData.siteType) {
    newSite.answers[22] = locationData.siteType;
  }
  
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
  return sites.find(site => site.id === siteId) || null;
}

/**
 * Update a site
 */
export function updateSite(siteId, updates) {
  const sites = getAllSites();
  const siteIndex = sites.findIndex(site => site.id === siteId);
  
  if (siteIndex === -1) {
    console.error('Site not found:', siteId);
    return null;
  }
  
  sites[siteIndex] = {
    ...sites[siteIndex],
    ...updates,
    id: siteId // Preserve ID
  };
  
  saveAllSites(sites);
  return sites[siteIndex];
}

/**
 * Delete a site
 */
export function deleteSite(siteId) {
  const sites = getAllSites();
  
  // Don't allow deleting the last site
  if (sites.length <= 1) {
    console.warn('Cannot delete the last site');
    return false;
  }
  
  const updatedSites = sites.filter(site => site.id !== siteId);
  saveAllSites(updatedSites);
  
  // If we deleted the current site, switch to first available
  if (getCurrentSiteId() === siteId && updatedSites.length > 0) {
    setCurrentSiteId(updatedSites[0].id);
  }
  
  return true;
}

/**
 * Duplicate a site (copy all answers and settings)
 */
export function duplicateSite(siteId) {
  const sourceSite = getSite(siteId);
  if (!sourceSite) {
    console.error('Source site not found:', siteId);
    return null;
  }
  
  const sites = getAllSites();
  
  const newSite = {
    ...sourceSite,
    id: `site_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: `${sourceSite.name} (Copy)`,
    createdAt: new Date().toISOString()
  };
  
  sites.push(newSite);
  saveAllSites(sites);
  
  return newSite;
}

/**
 * Save an answer for a specific site
 */
export function saveSiteAnswer(siteId, questionId, answer) {
  const site = getSite(siteId);
  if (!site) {
    console.error('Site not found:', siteId);
    return false;
  }
  
  site.answers[questionId] = answer;
  
  // Update completion percentage
  const totalQuestions = 21; // Total questions (excluding Q22 which is in location)
  const answeredQuestions = Object.keys(site.answers).length;
  site.completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  updateSite(siteId, site);
  return true;
}

/**
 * Get an answer for a specific site and question
 */
export function getSiteAnswer(siteId, questionId) {
  const site = getSite(siteId);
  if (!site) {
    return null;
  }
  
  return site.answers[questionId] || null;
}

/**
 * Update scoring data for a site
 */
export function updateSiteScoring(siteId, scoring) {
  const site = getSite(siteId);
  if (!site) {
    console.error('Site not found:', siteId);
    return false;
  }
  
  site.scoring = scoring;
  updateSite(siteId, site);
  return true;
}

/**
 * Validate a site (check if all required questions are answered)
 */
export function validateSite(siteId) {
  const site = getSite(siteId);
  if (!site) {
    return {
      valid: false,
      errors: ['Site not found']
    };
  }
  
  const errors = [];
  
  // Required questions (adjust based on your questionnaire)
  const requiredQuestions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18];
  
  requiredQuestions.forEach(qId => {
    if (!site.answers[qId]) {
      errors.push(`Question ${qId} is required but not answered`);
    }
  });
  
  // Validate location
  if (!site.location || !site.location.lat || !site.location.lng) {
    errors.push('Site location is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get all sites with validation status
 */
export function getSitesWithValidation() {
  const sites = getAllSites();
  return sites.map(site => ({
    ...site,
    validation: validateSite(site.id)
  }));
}

// ============================================
// CLEANUP FUNCTIONS - FIXED
// ============================================

/**
 * Clear all questionnaire data
 * IMPORTANT: Call this after successful submission
 */
export function clearAllQuestionnaireData() {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(SITES_KEY);
    localStorage.removeItem(CURRENT_SITE_KEY);
    console.log('✓ Cleared all questionnaire data');
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Reset questionnaire to fresh state
 * This clears everything and prepares for a new session
 */
export function resetQuestionnaire() {
  if (typeof window === 'undefined') return false;
  
  try {
    clearAllQuestionnaireData();
    console.log('✓ Reset questionnaire to fresh state');
    return true;
  } catch (error) {
    console.error('Error resetting questionnaire:', error);
    return false;
  }
}

/**
 * Export all site data (for submission)
 */
export function exportSitesData() {
  const sites = getAllSites();
  
  return {
    sites: sites,
    totalSites: sites.length,
    timestamp: new Date().toISOString(),
    allValid: sites.every(site => validateSite(site.id).valid)
  };
}

/**
 * Import sites data (for restoration)
 */
export function importSitesData(data) {
  if (!data || !data.sites || !Array.isArray(data.sites)) {
    console.error('Invalid import data');
    return false;
  }
  
  try {
    saveAllSites(data.sites);
    if (data.sites.length > 0) {
      setCurrentSiteId(data.sites[0].id);
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

/**
 * Get summary statistics
 */
export function getSummaryStats() {
  const sites = getAllSites();
  
  const stats = {
    totalSites: sites.length,
    completedSites: sites.filter(s => s.completionPercentage === 100).length,
    averageCompletion: sites.length > 0 
      ? Math.round(sites.reduce((sum, s) => sum + s.completionPercentage, 0) / sites.length)
      : 0,
    allValid: sites.every(site => validateSite(site.id).valid)
  };
  
  return stats;
}

/**
 * Check if questionnaire has any data
 */
export function hasQuestionnaireData() {
  const sites = getAllSites();
  return sites.length > 0;
}

/**
 * Get incomplete sites
 */
export function getIncompleteSites() {
  const sites = getAllSites();
  return sites.filter(site => {
    const validation = validateSite(site.id);
    return !validation.valid;
  });
}

/**
 * Get complete sites
 */
export function getCompleteSites() {
  const sites = getAllSites();
  return sites.filter(site => {
    const validation = validateSite(site.id);
    return validation.valid;
  });
}

// Export all functions
export default {
  getAllSites,
  getCurrentSiteId,
  setCurrentSiteId,
  createSite,
  getSite,
  updateSite,
  deleteSite,
  duplicateSite,
  saveSiteAnswer,
  getSiteAnswer,
  updateSiteScoring,
  validateSite,
  getSitesWithValidation,
  clearAllQuestionnaireData,
  resetQuestionnaire,
  exportSitesData,
  importSitesData,
  getSummaryStats,
  hasQuestionnaireData,
  getIncompleteSites,
  getCompleteSites
};