"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSites, validateSite } from "@/lib/multiSiteStorage";
import { questionnaireData } from "@/data/enhancedQuestionnaireData";

export default function ValidationSummary() {
  const router = useRouter();
  const [sites, setSites] = useState([]);
  const [expandedSite, setExpandedSite] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadSitesData();
  }, []);

  const loadSitesData = () => {
    const allSites = getAllSites();
    setSites(allSites);
    
    // Validate all sites
    const validationErrors = {};
    allSites.forEach(site => {
      const validation = validateSite(site.id);
      if (!validation.valid) {
        validationErrors[site.id] = validation.errors;
      }
    });
    setErrors(validationErrors);
  };

  const getQuestionText = (questionId) => {
    const q = questionnaireData.find(q => q.id === parseInt(questionId));
    return q ? q.question : `Question ${questionId}`;
  };

  const getAnswerDisplay = (questionId, answer) => {
    const question = questionnaireData.find(q => q.id === parseInt(questionId));
    if (!question) return JSON.stringify(answer);
    
    if (typeof answer === 'object' && answer.label) {
      return answer.label;
    }
    if (typeof answer === 'string') {
      return answer;
    }
    if (question.type === 'dual-single' && answer.downlink && answer.uplink) {
      return `Down: ${answer.downlink.label || answer.downlink.value}, Up: ${answer.uplink.label || answer.uplink.value}`;
    }
    if (Array.isArray(answer)) {
      return answer.map(a => typeof a === 'object' ? a.label : a).join(', ');
    }
    return JSON.stringify(answer);
  };

  const handleEditSite = (siteId) => {
    router.push(`/questionnaire?site=${siteId}`);
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) {
      alert('Please complete all required questions for all sites before submitting.');
      return;
    }
    router.push('/questionnaire/contact');
  };

  const allValid = Object.keys(errors).length === 0;

  return (
    <div className="validation-summary">
      <div className="validation-summary__header">
        <h1>📋 Review Your Sites</h1>
        <p>Please review all site information before proceeding to contact details</p>
      </div>

      {sites.length === 0 && (
        <div className="validation-summary__empty">
          <p>No sites added yet. Please complete the questionnaire first.</p>
          <button 
            onClick={() => router.push('/questionnaire')}
            className="validation-summary__btn validation-summary__btn--primary"
          >
            Start Questionnaire
          </button>
        </div>
      )}

      <div className="validation-summary__sites">
        {sites.map(site => {
          const isExpanded = expandedSite === site.id;
          const hasErrors = errors[site.id];
          
          return (
            <div key={site.id} className={`validation-summary__site-card ${hasErrors ? 'has-errors' : ''}`}>
              <div 
                className="validation-summary__site-header"
                onClick={() => setExpandedSite(isExpanded ? null : site.id)}
              >
                <div className="validation-summary__site-info">
                  <h3>{site.name}</h3>
                  <p>📍 {site.location.address || `${site.location.city || ''}, ${site.location.country}`}</p>
                </div>
                <div className="validation-summary__site-status">
                  {hasErrors ? (
                    <span className="validation-summary__status-badge validation-summary__status-badge--error">
                      ⚠️ Incomplete ({site.completionPercentage}%)
                    </span>
                  ) : (
                    <span className="validation-summary__status-badge validation-summary__status-badge--success">
                      ✓ Complete (100%)
                    </span>
                  )}
                  <span className="validation-summary__expand-icon">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="validation-summary__site-details">
                  <div className="validation-summary__location">
                    <h4>📍 Location Details</h4>
                    <div className="validation-summary__location-grid">
                      <div>
                        <span className="label">Address:</span>
                        <span className="value">{site.location.address || 'N/A'}</span>
                      </div>
                      {site.location.city && (
                        <div>
                          <span className="label">City:</span>
                          <span className="value">{site.location.city}</span>
                        </div>
                      )}
                      {site.location.state && (
                        <div>
                          <span className="label">State/Province:</span>
                          <span className="value">{site.location.state}</span>
                        </div>
                      )}
                      {site.location.country && (
                        <div>
                          <span className="label">Country:</span>
                          <span className="value">{site.location.country}</span>
                        </div>
                      )}
                      <div>
                        <span className="label">Coordinates:</span>
                        <span className="value">{site.location.lat.toFixed(6)}, {site.location.lng.toFixed(6)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="validation-summary__answers">
                    <h4>📝 Answers ({Object.keys(site.answers).length} questions answered)</h4>
                    <div className="validation-summary__answer-list">
                      {Object.entries(site.answers).map(([qId, answer]) => (
                        <div key={qId} className="validation-summary__answer-row">
                          <span className="validation-summary__question-num">Q{qId}</span>
                          <div className="validation-summary__answer-content">
                            <span className="validation-summary__question">
                              {getQuestionText(qId)}
                            </span>
                            <span className="validation-summary__answer">
                              {getAnswerDisplay(qId, answer)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {hasErrors && (
                    <div className="validation-summary__errors">
                      <h4>⚠️ Missing Information</h4>
                      <ul>
                        {errors[site.id].map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="validation-summary__actions">
                    <button 
                      onClick={() => handleEditSite(site.id)}
                      className="validation-summary__btn validation-summary__btn--edit"
                    >
                      ✏️ Edit This Site
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sites.length > 0 && (
        <div className="validation-summary__footer">
          <button
            onClick={() => router.push('/questionnaire')}
            className="validation-summary__btn validation-summary__btn--back"
          >
            ← Back to Questions
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allValid}
            className="validation-summary__btn validation-summary__btn--submit"
          >
            {allValid ? '✓ Continue to Contact Info →' : '⚠️ Complete All Sites First'}
          </button>
        </div>
      )}

      <style jsx>{`
        .validation-summary {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          min-height: 100vh;
        }

        .validation-summary__header {
          text-align: center;
          margin-bottom: 50px;
        }

        .validation-summary__header h1 {
          font-size: 42px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 16px;
          background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .validation-summary__header p {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.7);
        }

        .validation-summary__empty {
          text-align: center;
          padding: 80px 20px;
        }

        .validation-summary__empty p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
        }

        .validation-summary__sites {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 50px;
        }

        .validation-summary__site-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .validation-summary__site-card.has-errors {
          border-color: rgba(250, 86, 116, 0.3);
        }

        .validation-summary__site-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .validation-summary__site-header:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .validation-summary__site-info h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 8px;
        }

        .validation-summary__site-info p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .validation-summary__site-status {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .validation-summary__status-badge {
          padding: 10px 20px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }

        .validation-summary__status-badge--success {
          background: rgba(92, 176, 233, 0.2);
          color: #5CB0E9;
          border: 1px solid rgba(92, 176, 233, 0.3);
        }

        .validation-summary__status-badge--error {
          background: rgba(250, 86, 116, 0.2);
          color: #FA5674;
          border: 1px solid rgba(250, 86, 116, 0.3);
        }

        .validation-summary__expand-icon {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .validation-summary__site-details {
          padding: 0 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .validation-summary__location h4,
        .validation-summary__answers h4,
        .validation-summary__errors h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--techguru-white);
          margin-bottom: 16px;
        }

        .validation-summary__location-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .validation-summary__location-grid > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }

        .validation-summary__location-grid .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          text-transform: uppercase;
        }

        .validation-summary__location-grid .value {
          font-size: 14px;
          color: var(--techguru-white);
          font-weight: 500;
        }

        .validation-summary__answer-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 500px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .validation-summary__answer-row {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.2s;
        }

        .validation-summary__answer-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .validation-summary__question-num {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          color: white;
        }

        .validation-summary__answer-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .validation-summary__question {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .validation-summary__answer {
          font-size: 15px;
          color: var(--techguru-white);
          font-weight: 500;
        }

        .validation-summary__errors {
          padding: 20px;
          background: rgba(250, 86, 116, 0.1);
          border: 1px solid rgba(250, 86, 116, 0.3);
          border-radius: 14px;
        }

        .validation-summary__errors ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .validation-summary__errors li {
          font-size: 14px;
          color: #FA5674;
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .validation-summary__errors li::before {
          content: '⚠️';
          position: absolute;
          left: 0;
        }

        .validation-summary__actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .validation-summary__btn {
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .validation-summary__btn--edit {
          background: rgba(61, 114, 252, 0.15);
          border: 1px solid rgba(61, 114, 252, 0.4);
          color: #5CB0E9;
        }

        .validation-summary__btn--edit:hover {
          background: rgba(61, 114, 252, 0.25);
          transform: translateY(-2px);
        }

        .validation-summary__btn--primary {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .validation-summary__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.3);
        }

        .validation-summary__footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding-top: 32px;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .validation-summary__btn--back {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--techguru-white);
        }

        .validation-summary__btn--back:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .validation-summary__btn--submit {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .validation-summary__btn--submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(61, 114, 252, 0.4);
        }

        .validation-summary__btn--submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .validation-summary {
            padding: 40px 16px;
          }

          .validation-summary__header h1 {
            font-size: 32px;
          }

          .validation-summary__site-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
          }

          .validation-summary__site-status {
            width: 100%;
            justify-content: space-between;
          }

          .validation-summary__site-details {
            padding: 0 20px 20px;
          }

          .validation-summary__location-grid {
            grid-template-columns: 1fr;
          }

          .validation-summary__footer {
            flex-direction: column;
          }

          .validation-summary__btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
