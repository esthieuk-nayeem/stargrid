"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  getAllSites, 
  clearAllQuestionnaireData,
  getCurrentSiteId, 
  setCurrentSiteId, 
  createSite,
  getSite,
  saveSiteAnswer,
  getSiteAnswer,
  updateSiteScoring
} from "@/lib/multiSiteStorage";
import { questionnaireData, extractScoringData } from "@/data/enhancedQuestionnaireData";
import MapLocationPicker from "@/components/questionnaire/MapLocationPicker";
import SiteSelector from "@/components/questionnaire/SiteSelector";
import QuestionCard from "@/components/questionnaire/QuestionCard";

export default function MultiSiteQuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentStep, setCurrentStep] = useState(1); // Start at Question 1 (Location)
  const [sites, setSites] = useState([]);
  const [currentSiteId, setCurrentSite] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [answerForAllSites, setAnswerForAllSites] = useState(false);

  useEffect(() => {
    clearAllQuestionnaireData();
    loadInitialData();
  }, []);

  useEffect(() => {
    // Check if site parameter in URL
    const siteParam = searchParams.get('site');
    if (siteParam) {
      setCurrentSiteId(siteParam);
      setCurrentSite(siteParam);
    }
  }, [searchParams]);

  const loadInitialData = () => {
    const allSites = getAllSites();
    setSites(allSites);
    
    if (allSites.length === 0) {
      // No sites yet - show location picker for first site
      setShowLocationPicker(true);
      setCurrentStep(1);
    } else {
      const activeSiteId = getCurrentSiteId() || allSites[0].id;
      setCurrentSite(activeSiteId);
      setCurrentSiteId(activeSiteId);
      setShowLocationPicker(false);
    }
  };

  const handleLocationSelected = (location) => {
    // Create new site with location
    const newSite = createSite(location);
    setSites(getAllSites());
    setCurrentSite(newSite.id);
    setCurrentSiteId(newSite.id);
    setShowLocationPicker(false);
    setCurrentStep(2); // Move to Question 2
  };

  const handleAddAnotherSite = () => {
    setShowLocationPicker(true);
    setCurrentStep(1);
  };

  const handleSiteChange = (siteId) => {
    setCurrentSite(siteId);
    setCurrentSiteId(siteId);
  };

  const handleAnswer = (questionId, answer) => {
    if (answerForAllSites) {
      // Save answer for all sites
      sites.forEach(site => {
        saveSiteAnswer(site.id, questionId, answer);
        
        // Update scoring for each site
        const siteData = getSite(site.id);
        if (siteData) {
          const scoring = extractScoringData(siteData.answers);
          updateSiteScoring(site.id, scoring);
        }
      });
    } else {
      // Save answer for current site only
      saveSiteAnswer(currentSiteId, questionId, answer);
      
      // Update scoring
      const siteData = getSite(currentSiteId);
      if (siteData) {
        const scoring = extractScoringData(siteData.answers);
        updateSiteScoring(currentSiteId, scoring);
      }
    }
    
    // Reload sites to update completion percentages
    setSites(getAllSites());
  };

  const getCurrentAnswer = (questionId) => {
    return getSiteAnswer(currentSiteId, questionId);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    
    // Check if there's a next question
    if (nextStep <= questionnaireData.length) {
      const nextQuestion = questionnaireData.find(q => q.id === nextStep);
      
      // Handle conditional questions
      if (nextQuestion && nextQuestion.conditional && nextQuestion.showWhen) {
        const currentSite = getSite(currentSiteId);
        if (!nextQuestion.showWhen(currentSite.answers)) {
          // Skip this question
          setCurrentStep(nextStep);
          setTimeout(() => handleNext(), 100);
          return;
        }
      }
      
      setCurrentStep(nextStep);
    } else {
      // All questions answered - go to validation
      router.push('/questionnaire/validation');
    }
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      setCurrentStep(prevStep);
    }
  };

  const currentQuestion = questionnaireData.find(q => q.id === currentStep);
  const isFirstQuestion = currentStep === 1;
  const isLastQuestion = currentStep === questionnaireData.length;
  const currentAnswer = currentQuestion ? getCurrentAnswer(currentQuestion.id) : null;
  const hasAnswer = currentAnswer !== null && currentAnswer !== undefined;

  // Show location picker for Question 1
  if (showLocationPicker || (currentStep === 1 && sites.length === 0)) {
    return (
      <div className="questionnaire-page">
        <div className="questionnaire-page__container">
          <div className="questionnaire-page__header">
            <h1>🗺️ Site Location</h1>
            <p>Let's start by pinpointing your site location</p>
          </div>

          <div className="questionnaire-page__content">
            <MapLocationPicker 
              onLocationSelect={handleLocationSelected}
              initialLocation={null}
            />
          </div>
        </div>

        <style jsx>{`
          .questionnaire-page {
            min-height: 100vh;
            padding: 60px 20px;
            background: var(--techguru-black);
          }

          .questionnaire-page__container {
            max-width: 1000px;
            margin: 0 auto;
          }

          .questionnaire-page__header {
            text-align: center;
            margin-bottom: 50px;
          }

          .questionnaire-page__header h1 {
            font-size: 42px;
            font-weight: 700;
            color: var(--techguru-white);
            margin-bottom: 12px;
            background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .questionnaire-page__header p {
            font-size: 17px;
            color: rgba(255, 255, 255, 0.7);
          }

          .questionnaire-page__content {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
          }

          @media (max-width: 768px) {
            .questionnaire-page {
              padding: 40px 16px;
            }

            .questionnaire-page__header h1 {
              font-size: 32px;
            }

            .questionnaire-page__content {
              padding: 24px 16px;
            }
          }
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
          .questionnaire-page--loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--techguru-black);
          }

          .questionnaire-page__spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #3D72FC;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .questionnaire-page--loading p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 16px;
          }
        `}</style>
      </div>
    );
  }

  const currentSiteData = getSite(currentSiteId);
  const progress = Math.round((currentStep / questionnaireData.length) * 100);

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-page__container">
        {/* Site Selector */}
        {sites.length > 0 && (
          <SiteSelector onSiteChange={handleSiteChange} />
        )}

        {/* Progress Bar */}
        <div className="questionnaire-page__progress">
          <div className="questionnaire-page__progress-info">
            <span>Question {currentStep} of {questionnaireData.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="questionnaire-page__progress-bar">
            <div 
              className="questionnaire-page__progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="questionnaire-page__question">
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Multi-Site Toggle */}
        {currentQuestion.perSiteAnswer !== false && sites.length > 1 && (
          <div className="questionnaire-page__multi-site-toggle">
            <label>
              <input
                type="checkbox"
                checked={answerForAllSites}
                onChange={(e) => setAnswerForAllSites(e.target.checked)}
              />
              <span>Use this answer for all sites</span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="questionnaire-page__navigation">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="questionnaire-page__btn questionnaire-page__btn--prev"
          >
            ← Previous
          </button>

          <div className="questionnaire-page__nav-actions">
            <button
              onClick={handleAddAnotherSite}
              className="questionnaire-page__btn questionnaire-page__btn--add-site"
            >
              + Add Another Site
            </button>

            <button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="questionnaire-page__btn questionnaire-page__btn--next"
            >
              {isLastQuestion ? 'Review Answers →' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="questionnaire-page__quick-actions">
          <button
            onClick={() => router.push('/questionnaire/validation')}
            className="questionnaire-page__link"
          >
            📋 Review All Sites
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to save progress and exit?')) {
                router.push('/');
              }
            }}
            className="questionnaire-page__link"
          >
            💾 Save & Exit
          </button>
        </div>
      </div>

      <style jsx>{`
        .questionnaire-page {
          min-height: 100vh;
          padding: 60px 20px;
          background: var(--techguru-black);
          position: relative;
        }

        .questionnaire-page::before {
          content: '';
          position: absolute;
          width: 927px;
          height: 927px;
          right: -270px;
          top: -40px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(22, 14, 255, 0.1539) 0%, rgba(22, 14, 255, 0) 87.1%);
          pointer-events: none;
        }

        .questionnaire-page__container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .questionnaire-page__progress {
          margin-bottom: 40px;
        }

        .questionnaire-page__progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .questionnaire-page__progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .questionnaire-page__progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          transition: width 0.4s ease;
        }

        .questionnaire-page__question {
          margin-bottom: 30px;
        }

        .questionnaire-page__multi-site-toggle {
          margin-bottom: 30px;
          padding: 16px 24px;
          background: rgba(92, 176, 233, 0.1);
          border: 1px solid rgba(92, 176, 233, 0.3);
          border-radius: 12px;
        }

        .questionnaire-page__multi-site-toggle label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .questionnaire-page__multi-site-toggle input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .questionnaire-page__multi-site-toggle span {
          font-size: 15px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .questionnaire-page__navigation {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .questionnaire-page__nav-actions {
          display: flex;
          gap: 12px;
        }

        .questionnaire-page__btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          white-space: nowrap;
        }

        .questionnaire-page__btn--prev {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--techguru-white);
        }

        .questionnaire-page__btn--prev:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
        }

        .questionnaire-page__btn--prev:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .questionnaire-page__btn--add-site {
          background: rgba(92, 176, 233, 0.15);
          border: 1px solid rgba(92, 176, 233, 0.4);
          color: #5CB0E9;
        }

        .questionnaire-page__btn--add-site:hover {
          background: rgba(92, 176, 233, 0.25);
          transform: translateY(-2px);
        }

        .questionnaire-page__btn--next {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .questionnaire-page__btn--next:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        .questionnaire-page__btn--next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .questionnaire-page__quick-actions {
          display: flex;
          justify-content: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .questionnaire-page__link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .questionnaire-page__link:hover {
          color: #5CB0E9;
        }

        @media (max-width: 768px) {
          .questionnaire-page {
            padding: 40px 16px;
          }

          .questionnaire-page__navigation {
            flex-direction: column;
          }

          .questionnaire-page__nav-actions {
            flex-direction: column;
          }

          .questionnaire-page__btn {
            width: 100%;
            text-align: center;
          }

          .questionnaire-page__quick-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}