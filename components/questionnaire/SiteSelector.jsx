"use client";

import { useState, useEffect } from "react";
import { getAllSites, getCurrentSiteId, setCurrentSiteId, deleteSite, duplicateSite } from "@/lib/multiSiteStorage";

export default function SiteSelector({ onSiteChange }) {
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = () => {
    const allSites = getAllSites();
    const current = getCurrentSiteId();
    setSites(allSites);
    setCurrentSite(current);
  };

  const handleSiteChange = (siteId) => {
    setCurrentSiteId(siteId);
    setCurrentSite(siteId);
    setShowDropdown(false);
    if (onSiteChange) {
      onSiteChange(siteId);
    }
  };

  const handleDeleteSite = (siteId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this site? All answers for this site will be lost.')) {
      deleteSite(siteId);
      loadSites();
      if (onSiteChange) {
        const remaining = getAllSites();
        if (remaining.length > 0) {
          onSiteChange(remaining[0].id);
        }
      }
    }
  };

  const handleDuplicateSite = (siteId, e) => {
    e.stopPropagation();
    const newSite = duplicateSite(siteId);
    if (newSite) {
      loadSites();
      handleSiteChange(newSite.id);
    }
  };

  const currentSiteData = sites.find(s => s.id === currentSite);

  if (sites.length === 0) {
    return null;
  }

  return (
    <div className="site-selector">
      <div className="site-selector__current" onClick={() => setShowDropdown(!showDropdown)}>
        <div className="site-selector__current-info">
          <span className="site-selector__label">Current Site:</span>
          <span className="site-selector__name">{currentSiteData?.name || 'Select Site'}</span>
          {currentSiteData && (
            <span className="site-selector__location">
              📍 {currentSiteData.location.city || currentSiteData.location.country}
            </span>
          )}
        </div>
        <div className="site-selector__current-status">
          {currentSiteData && (
            <div className="site-selector__progress">
              <div className="site-selector__progress-bar">
                <div 
                  className="site-selector__progress-fill"
                  style={{ width: `${currentSiteData.completionPercentage}%` }}
                ></div>
              </div>
              <span className="site-selector__progress-text">
                {currentSiteData.completionPercentage}% Complete
              </span>
            </div>
          )}
          <span className="site-selector__arrow">
            {showDropdown ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {showDropdown && (
        <div className="site-selector__dropdown">
          <div className="site-selector__dropdown-header">
            <span>All Sites ({sites.length})</span>
          </div>
          <div className="site-selector__dropdown-list">
            {sites.map(site => (
              <div
                key={site.id}
                className={`site-selector__dropdown-item ${site.id === currentSite ? 'active' : ''}`}
                onClick={() => handleSiteChange(site.id)}
              >
                <div className="site-selector__dropdown-item-main">
                  <div className="site-selector__dropdown-item-info">
                    <span className="site-selector__dropdown-item-name">{site.name}</span>
                    <span className="site-selector__dropdown-item-location">
                      {site.location.city ? `${site.location.city}, ` : ''}
                      {site.location.country}
                    </span>
                  </div>
                  <div className="site-selector__dropdown-item-status">
                    <span className="site-selector__dropdown-item-completion">
                      {site.completionPercentage}%
                    </span>
                  </div>
                </div>
                <div className="site-selector__dropdown-item-actions">
                  <button
                    onClick={(e) => handleDuplicateSite(site.id, e)}
                    className="site-selector__action-btn"
                    title="Duplicate site"
                  >
                    📋
                  </button>
                  {sites.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteSite(site.id, e)}
                      className="site-selector__action-btn site-selector__action-btn--delete"
                      title="Delete site"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .site-selector {
          position: relative;
          margin-bottom: 30px;
        }

        .site-selector__current {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: rgba(61, 114, 252, 0.1);
          border: 1px solid rgba(61, 114, 252, 0.3);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .site-selector__current:hover {
          background: rgba(61, 114, 252, 0.15);
          border-color: rgba(61, 114, 252, 0.4);
        }

        .site-selector__current-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .site-selector__label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          text-transform: uppercase;
        }

        .site-selector__name {
          font-size: 18px;
          font-weight: 700;
          color: var(--techguru-white);
        }

        .site-selector__location {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .site-selector__current-status {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .site-selector__progress {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .site-selector__progress-bar {
          width: 120px;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .site-selector__progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          transition: width 0.3s ease;
        }

        .site-selector__progress-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .site-selector__arrow {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .site-selector__dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          z-index: 100;
          animation: slideDown 0.2s ease-out;
          backdrop-filter: blur(10px);
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

        .site-selector__dropdown-header {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
        }

        .site-selector__dropdown-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .site-selector__dropdown-item {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .site-selector__dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .site-selector__dropdown-item.active {
          background: rgba(61, 114, 252, 0.15);
          border-left: 3px solid #3D72FC;
        }

        .site-selector__dropdown-item-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .site-selector__dropdown-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .site-selector__dropdown-item-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .site-selector__dropdown-item-location {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        .site-selector__dropdown-item-completion {
          font-size: 14px;
          font-weight: 700;
          color: #5CB0E9;
        }

        .site-selector__dropdown-item-actions {
          display: flex;
          gap: 8px;
        }

        .site-selector__action-btn {
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .site-selector__action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }

        .site-selector__action-btn--delete:hover {
          background: rgba(250, 86, 116, 0.2);
          border-color: #FA5674;
        }

        @media (max-width: 768px) {
          .site-selector__current {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .site-selector__current-status {
            width: 100%;
            justify-content: space-between;
          }

          .site-selector__progress-bar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
