// lib/answerStorage.js

const STORAGE_KEY = 'questionnaire_answers';
const CONTACT_KEY = 'questionnaire_contact';
const SCORING_KEY = 'questionnaire_scoring';
const SUBMISSION_KEY = 'questionnaire_submission_id';

/**
 * Save answers to localStorage
 */
export function saveAnswers(answers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    return true;
  } catch (error) {
    console.error('Error saving answers:', error);
    return false;
  }
}

/**
 * Load answers from localStorage
 */
export function loadAnswers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading answers:', error);
    return {};
  }
}

/**
 * Save contact information
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
 * Save scoring data
 */
export function saveScoringData(scoring) {
  try {
    localStorage.setItem(SCORING_KEY, JSON.stringify(scoring));
    return true;
  } catch (error) {
    console.error('Error saving scoring data:', error);
    return false;
  }
}

/**
 * Load scoring data
 */
export function loadScoringData() {
  try {
    const stored = localStorage.getItem(SCORING_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading scoring data:', error);
    return null;
  }
}

/**
 * Save submission ID
 */
export function saveSubmissionId(id) {
  try {
    localStorage.setItem(SUBMISSION_KEY, id);
    return true;
  } catch (error) {
    console.error('Error saving submission ID:', error);
    return false;
  }
}

/**
 * Load submission ID
 */
export function loadSubmissionId() {
  try {
    return localStorage.getItem(SUBMISSION_KEY);
  } catch (error) {
    console.error('Error loading submission ID:', error);
    return null;
  }
}

/**
 * Clear all questionnaire data
 */
export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONTACT_KEY);
    localStorage.removeItem(SCORING_KEY);
    localStorage.removeItem(SUBMISSION_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Get a summary of the current session
 */
export function getSessionSummary() {
  const answers = loadAnswers();
  const contactInfo = loadContactInfo();
  const scoring = loadScoringData();
  const submissionId = loadSubmissionId();

  const totalQuestions = 21;
  const answeredQuestions = Object.keys(answers).length;
  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

  return {
    answers,
    contactInfo,
    scoring,
    submissionId,
    totalQuestions,
    answeredQuestions,
    completionPercentage,
    hasContact: !!contactInfo,
    hasSubmission: !!submissionId
  };
}

/**
 * Export all data as JSON for debugging
 */
export function exportData() {
  return {
    answers: loadAnswers(),
    contactInfo: loadContactInfo(),
    scoring: loadScoringData(),
    submissionId: loadSubmissionId(),
    timestamp: new Date().toISOString()
  };
}