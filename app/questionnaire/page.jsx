"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  getAllSites, 
  getCurrentSiteId, 
  setCurrentSiteId, 
  createSite,
  getSite,
  saveSiteAnswer,
  getSiteAnswer,
  updateSite,
  updateSiteScoring,
  clearAllQuestionnaireData
} from "@/lib/multiSiteStorage";
import { questionnaireData, extractScoringData } from "@/data/enhancedQuestionnaireData";
import MapLocationPicker from "@/components/questionnaire/MapLocationPicker";
import SiteSelector from "@/components/questionnaire/SiteSelector";
import QuestionCard from "@/components/questionnaire/QuestionCard";

export default function MultiSiteQuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [sites, setSites] = useState([]);
  const [currentSiteId, setCurrentSite] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [answerForAllSites, setAnswerForAllSites] = useState(false);
  // NEW: Track if we're editing an existing site's location
  const [editingLocationForSite, setEditingLocationForSite] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  // ── FIXED: Handle URL params for editLocation and newSite ──
  useEffect(() => {
    const siteParam = searchParams.get('site');
    const editLocation = searchParams.get('editLocation');
    const newSite = searchParams.get('newSite');

    if (newSite === 'true') {
      // From validation page "Add Another Site" button
      setShowLocationPicker(true);
      setEditingLocationForSite(null);
      return;
    }

    if (siteParam && editLocation === 'true') {
      // From validation page "Edit Location on Map" button
      // Show the map picker for the EXISTING site so user can update its location
      setEditingLocationForSite(siteParam);
      setCurrentSiteId(siteParam);
      setCurrentSite(siteParam);
      setShowLocationPicker(true);
      return;
    }

    if (siteParam) {
      // Normal site switch (e.g. from site selector)
      setCurrentSiteId(siteParam);
      setCurrentSite(siteParam);
    }
  }, [searchParams]);

  // Multi-site toggle defaults
  useEffect(() => {
    if (currentQuestion) {
      const isGlobalQuestion = currentQuestion.perSiteAnswer === false;
      if (isGlobalQuestion) {
        setAnswerForAllSites(true);
      } else if (sites.length > 1) {
        setAnswerForAllSites(true);
      } else {
        setAnswerForAllSites(false);
      }
    }
  }, [currentStep, sites.length]);

  const loadInitialData = () => {
    const allSites = getAllSites();
    setSites(allSites);
    
    if (allSites.length === 0) {
      setShowLocationPicker(true);
      setCurrentStep(1);
    } else {
      const activeSiteId = getCurrentSiteId() || allSites[0].id;
      setCurrentSite(activeSiteId);
      setCurrentSiteId(activeSiteId);
      // Don't override showLocationPicker if set by URL params
      if (!searchParams.get('editLocation') && !searchParams.get('newSite')) {
        setShowLocationPicker(false);
      }
    }
  };

  // ── FIXED: Handle location selection — supports both NEW site and EDIT existing ──
  const handleLocationSelected = (location) => {
    if (editingLocationForSite) {
      // EDITING existing site's location
      const existingSite = getSite(editingLocationForSite);
      if (existingSite) {
        updateSite(editingLocationForSite, {
          name: location.siteName || location.name || existingSite.name,
          location: {
            lat: location.lat,
            lng: location.lng,
            address: location.address || '',
            city: location.city || '',
            state: location.state || '',
            country: location.country || '',
            postalCode: location.postalCode || '',
          },
        });
        if (location.siteType) {
          saveSiteAnswer(editingLocationForSite, 22, location.siteType);
        }
      }
      setSites(getAllSites());
      setShowLocationPicker(false);
      setEditingLocationForSite(null);
      // Go back to validation page after editing location
      router.push('/questionnaire/validation');
      return;
    }

    // CREATING a new site
    const newSite = createSite(location);
    if (location.siteType) {
      saveSiteAnswer(newSite.id, 22, location.siteType);
    }
    setSites(getAllSites());
    setCurrentSite(newSite.id);
    setCurrentSiteId(newSite.id);
    setShowLocationPicker(false);
    setCurrentStep(1);
  };

  const handleAddAnotherSite = () => {
    setEditingLocationForSite(null);
    setShowLocationPicker(true);
  };

  const handleSiteChange = (siteId) => {
    setCurrentSite(siteId);
    setCurrentSiteId(siteId);
  };

  const handleAnswer = (questionId, answer) => {
    const applyToAllSites = answerForAllSites || (currentQuestion && currentQuestion.perSiteAnswer === false);
    
    if (applyToAllSites) {
      sites.forEach(site => {
        saveSiteAnswer(site.id, questionId, answer);
        const siteData = getSite(site.id);
        if (siteData) {
          const scoring = extractScoringData(siteData.answers);
          updateSiteScoring(site.id, scoring);
        }
      });
    } else {
      saveSiteAnswer(currentSiteId, questionId, answer);
      const siteData = getSite(currentSiteId);
      if (siteData) {
        const scoring = extractScoringData(siteData.answers);
        updateSiteScoring(currentSiteId, scoring);
      }
    }
    
    setSites(getAllSites());
  };

  const getCurrentAnswer = (questionId) => {
    return getSiteAnswer(currentSiteId, questionId);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= questionnaireData.length) {
      const nextQuestion = questionnaireData.find(q => q.id === nextStep);
      if (nextQuestion && nextQuestion.conditional && nextQuestion.showWhen) {
        const currentSiteData = getSite(currentSiteId);
        if (!nextQuestion.showWhen(currentSiteData.answers)) {
          setCurrentStep(nextStep);
          setTimeout(() => handleNext(), 10);
          return;
        }
      }
      setCurrentStep(nextStep);
    } else {
      router.push('/questionnaire/validation');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const currentQuestion = questionnaireData.find(q => q.id === currentStep);
  const isFirstQuestion = currentStep === 1;
  const isLastQuestion = currentStep === questionnaireData.length;
  const currentAnswer = currentQuestion ? getCurrentAnswer(currentQuestion.id) : null;
  const hasAnswer = currentAnswer !== null && currentAnswer !== undefined;

  // ── Map Picker View ──
  if (showLocationPicker) {
    const existingLocation = editingLocationForSite ? getSite(editingLocationForSite)?.location : null;
    return (
      <div className="questionnaire-page">
        <div className="questionnaire-page__container">
          <div className="questionnaire-page__header">
            <h1>🗺️ {editingLocationForSite ? 'Edit Site Location' : 'Site Location & Type'}</h1>
            <p>{editingLocationForSite ? 'Update the location for your site' : "Let's start by pinpointing your site location and type"}</p>
          </div>
          <div className="questionnaire-page__content">
            <MapLocationPicker 
              onLocationSelect={handleLocationSelected}
              initialLocation={existingLocation}
            />
            {editingLocationForSite && (
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button
                  onClick={() => { setShowLocationPicker(false); setEditingLocationForSite(null); router.push('/questionnaire/validation'); }}
                  style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, color: '#fff', fontSize: 15, cursor: 'pointer' }}
                >
                  ← Cancel and go back to review
                </button>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .questionnaire-page { min-height:100vh; padding:60px 20px; background:var(--techguru-black); }
          .questionnaire-page__container { max-width:1000px; margin:0 auto; }
          .questionnaire-page__header { text-align:center; margin-bottom:50px; }
          .questionnaire-page__header h1 { font-size:42px; font-weight:700; color:var(--techguru-white); margin-bottom:12px; background:linear-gradient(270deg,#5CB0E9 0%,#3D72FC 100%); -webkit-text-fill-color:transparent; background-clip:text; }
          .questionnaire-page__header p { font-size:17px; color:rgba(255,255,255,0.7); }
          .questionnaire-page__content { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px; }
          @media(max-width:768px) { .questionnaire-page { padding:40px 16px; } .questionnaire-page__header h1 { font-size:32px; } .questionnaire-page__content { padding:24px 16px; } }
        `}</style>
      </div>
    );
  }

  if (!currentQuestion || !currentSiteId) {
    return (
      <div className="questionnaire-page questionnaire-page--loading">
        <div className="questionnaire-page__spinner"></div>
        <p>Loading questionnaire...</p>
        <style jsx>{`
          .questionnaire-page--loading { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--techguru-black); }
          .questionnaire-page__spinner { width:60px; height:60px; border:4px solid rgba(255,255,255,0.1); border-top-color:#3D72FC; border-radius:50%; animation:spin 1s linear infinite; margin-bottom:20px; }
          @keyframes spin { to { transform:rotate(360deg); } }
          .questionnaire-page--loading p { color:rgba(255,255,255,0.7); font-size:16px; }
        `}</style>
      </div>
    );
  }

  const progress = Math.round((currentStep / questionnaireData.length) * 100);

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-page__container">
        {sites.length > 0 && <SiteSelector onSiteChange={handleSiteChange} />}

        <div className="questionnaire-page__progress">
          <div className="questionnaire-page__progress-info">
            <span>Question {currentStep} of {questionnaireData.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="questionnaire-page__progress-bar">
            <div className="questionnaire-page__progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="questionnaire-page__question">
          <QuestionCard question={currentQuestion} answer={currentAnswer} onAnswer={handleAnswer} />
        </div>

        {currentQuestion.perSiteAnswer !== false && sites.length > 1 && (
          <div className="questionnaire-page__multi-site-toggle">
            <label>
              <input type="checkbox" checked={answerForAllSites} onChange={(e) => setAnswerForAllSites(e.target.checked)} />
              <span>✨ Use this answer for all {sites.length} sites</span>
            </label>
            <p className="multi-site-toggle-hint">By default, your answer will be applied to all sites. Uncheck to provide different answers per site.</p>
          </div>
        )}

        <div className="questionnaire-page__navigation">
          <button onClick={handlePrevious} disabled={isFirstQuestion} className="questionnaire-page__btn questionnaire-page__btn--prev">← Previous</button>
          <div className="questionnaire-page__nav-actions">
            {/* <button onClick={handleAddAnotherSite} className="questionnaire-page__btn questionnaire-page__btn--add-site">+ Add Another Site</button> */}
            <button onClick={handleNext} disabled={!hasAnswer} className="questionnaire-page__btn questionnaire-page__btn--next">{isLastQuestion ? 'Review Answers →' : 'Next →'}</button>
          </div>
        </div>

        <div className="questionnaire-page__quick-actions">
          <button onClick={() => router.push('/questionnaire/validation')} className="questionnaire-page__link">📋 Review All Sites</button>
          <button onClick={() => router.push('/questionnaire/results/old')} className="questionnaire-page__link">📊 Show Results</button>
          <button onClick={() => { if (confirm('Save progress and exit?')) router.push('/'); }} className="questionnaire-page__link">💾 Save & Exit</button>
        </div>
      </div>

      <style jsx>{`
        .questionnaire-page { min-height:100vh; padding:60px 20px; background:var(--techguru-black); position:relative; }
        .questionnaire-page::before { content:''; position:absolute; width:927px; height:927px; right:-270px; top:-40px; background:radial-gradient(50% 50% at 50% 50%,rgba(22,14,255,0.1539) 0%,rgba(22,14,255,0) 87.1%); pointer-events:none; }
        .questionnaire-page__container { max-width:1000px; margin:0 auto; position:relative; z-index:1; }
        .questionnaire-page__progress { margin-bottom:40px; }
        .questionnaire-page__progress-info { display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; font-weight:600; color:rgba(255,255,255,0.7); }
        .questionnaire-page__progress-bar { height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden; }
        .questionnaire-page__progress-fill { height:100%; background:linear-gradient(135deg,#3D72FC 0%,#5CB0E9 100%); transition:width 0.4s ease; }
        .questionnaire-page__question { margin-bottom:30px; }
        .questionnaire-page__multi-site-toggle { margin-bottom:30px; padding:16px 24px; background:rgba(92,176,233,0.1); border:1px solid rgba(92,176,233,0.3); border-radius:12px; }
        .questionnaire-page__multi-site-toggle label { display:flex; align-items:center; gap:12px; cursor:pointer; }
        .questionnaire-page__multi-site-toggle input[type="checkbox"] { width:20px; height:20px; cursor:pointer; }
        .questionnaire-page__multi-site-toggle span { font-size:15px; font-weight:600; color:var(--techguru-white); }
        .multi-site-toggle-hint { margin-top:8px; margin-left:32px; font-size:13px; color:rgba(255,255,255,0.6); font-style:italic; }
        .questionnaire-page__navigation { display:flex; justify-content:space-between; gap:20px; margin-bottom:30px; }
        .questionnaire-page__nav-actions { display:flex; gap:12px; }
        .questionnaire-page__btn { padding:16px 32px; border-radius:12px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s ease; border:none; white-space:nowrap; }
        .questionnaire-page__btn--prev { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.2); color:var(--techguru-white); }
        .questionnaire-page__btn--prev:hover:not(:disabled) { background:rgba(255,255,255,0.1); }
        .questionnaire-page__btn--prev:disabled { opacity:0.3; cursor:not-allowed; }
        .questionnaire-page__btn--add-site { background:rgba(92,176,233,0.15); border:1px solid rgba(92,176,233,0.4); color:#5CB0E9; }
        .questionnaire-page__btn--add-site:hover { background:rgba(92,176,233,0.25); transform:translateY(-2px); }
        .questionnaire-page__btn--next { background:linear-gradient(135deg,#3D72FC 0%,#5CB0E9 100%); color:white; }
        .questionnaire-page__btn--next:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 20px rgba(61,114,252,0.4); }
        .questionnaire-page__btn--next:disabled { opacity:0.5; cursor:not-allowed; }
        .questionnaire-page__quick-actions { display:flex; justify-content:center; gap:24px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1); }
        .questionnaire-page__link { background:none; border:none; color:rgba(255,255,255,0.6); font-size:14px; font-weight:500; cursor:pointer; transition:color 0.2s; }
        .questionnaire-page__link:hover { color:#5CB0E9; }
        @media(max-width:768px) { .questionnaire-page { padding:40px 16px; } .questionnaire-page__navigation { flex-direction:column; } .questionnaire-page__nav-actions { flex-direction:column; } .questionnaire-page__btn { width:100%; text-align:center; } .questionnaire-page__quick-actions { flex-direction:column; align-items:center; } }
      `}</style>
    </div>
  );
}