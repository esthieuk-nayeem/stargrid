"use client";

import { useState, useEffect } from "react";

export default function LocationInput({ question, answer, onAnswer }) {
  const [formData, setFormData] = useState({
    country: '',
    zip: '',
    city: ''
  });

  const [sites, setSites] = useState([]);
  const [showAddSite, setShowAddSite] = useState(false);

  useEffect(() => {
    if (answer && answer.sites) {
      setSites(answer.sites);
    }
  }, [answer]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSite = () => {
    if (formData.country && formData.zip && formData.city) {
      const newSites = [...sites, { ...formData, id: Date.now() }];
      setSites(newSites);
      onAnswer(question.id, { sites: newSites });
      
      // Reset form
      setFormData({ country: '', zip: '', city: '' });
      setShowAddSite(false);
    }
  };

  const handleRemoveSite = (siteId) => {
    const newSites = sites.filter(site => site.id !== siteId);
    setSites(newSites);
    onAnswer(question.id, { sites: newSites });
  };

  const handleFinish = () => {
    if (formData.country && formData.zip && formData.city) {
      handleAddSite();
    }
  };

  return (
    <div className="location-input">
      {sites.length > 0 && (
        <div className="location-input__sites">
          <h4>Added Sites ({sites.length})</h4>
          <div className="location-input__sites-list">
            {sites.map((site) => (
              <div key={site.id} className="location-input__site-card">
                <div className="location-input__site-info">
                  <span className="location-input__site-city">{site.city}</span>
                  <span className="location-input__site-details">
                    {site.country} • {site.zip}
                  </span>
                </div>
                <button
                  type="button"
                  className="location-input__site-remove"
                  onClick={() => handleRemoveSite(site.id)}
                >
                  <span className="icon-close"></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="location-input__form">
        <div className="location-input__fields">
          {question.fields.map((field, index) => (
            <div key={index} className="location-input__field">
              <label>{field.label}</label>
              <input
                type={field.type}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="location-input__actions">
          <button
            type="button"
            className="location-input__btn location-input__btn--add"
            onClick={handleAddSite}
            disabled={!formData.country || !formData.zip || !formData.city}
          >
            <span className="icon-plus"></span>
            Add Another Site
          </button>
          
          {question.multiSite && sites.length > 0 && (
            <button
              type="button"
              className="location-input__btn location-input__btn--finish"
              onClick={handleFinish}
            >
              Finish Adding Sites
              <span className="icon-arrow-right"></span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .location-input {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .location-input__sites h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--techguru-white);
          margin-bottom: 16px;
        }

        .location-input__sites-list {
          display: grid;
          gap: 12px;
        }

        .location-input__site-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(61, 114, 252, 0.08);
          border: 1px solid rgba(61, 114, 252, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .location-input__site-card:hover {
          background: rgba(61, 114, 252, 0.12);
          border-color: rgba(61, 114, 252, 0.3);
        }

        .location-input__site-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .location-input__site-city {
          font-size: 16px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .location-input__site-details {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        .location-input__site-remove {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .location-input__site-remove:hover {
          background: rgba(250, 86, 116, 0.2);
          border-color: #FA5674;
          color: #FA5674;
        }

        .location-input__fields {
          display: grid;
          gap: 20px;
        }

        .location-input__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .location-input__field label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .location-input__field input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: var(--techguru-white);
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .location-input__field input:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .location-input__field input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .location-input__actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .location-input__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .location-input__btn--add {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--techguru-white);
        }

        .location-input__btn--add:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .location-input__btn--add:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .location-input__btn--finish {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: var(--techguru-white);
          border: none;
        }

        .location-input__btn--finish:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.3);
        }

        @media (max-width: 768px) {
          .location-input__actions {
            flex-direction: column;
          }

          .location-input__btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
