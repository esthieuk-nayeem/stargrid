"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSites } from "@/lib/multiSiteStorage";
import { matchProducts } from "@/lib/supabase";
import { buildSitePackages } from "@/lib/packageMatcher";

export default function PackageResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sitePackages, setSitePackages] = useState({});
  const [selectedPackages, setSelectedPackages] = useState({});
  const [expandedSite, setExpandedSite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const sites = getAllSites();
      
      if (sites.length === 0) {
        setError('No sites found. Please complete the questionnaire first.');
        setLoading(false);
        return;
      }

      const allSitePackages = {};

      // Process each site
      for (const site of sites) {
        try {
          // Get matched products for this site
          const response = await matchProducts(site.answers, site.scoring);
          const matchedProducts = response.products || [];

          // Build packages for this site
          const packages = buildSitePackages(site, matchedProducts);
          
          allSitePackages[site.id] = {
            siteName: site.name,
            location: site.location,
            packages: packages,
            allProducts: matchedProducts
          };

          // Auto-select first package for each site
          if (packages.length > 0) {
            setSelectedPackages(prev => ({
              ...prev,
              [site.id]: packages[0].id
            }));
          }
        } catch (siteError) {
          console.error(`Error processing site ${site.name}:`, siteError);
          allSitePackages[site.id] = {
            siteName: site.name,
            location: site.location,
            packages: [],
            error: siteError.message
          };
        }
      }

      setSitePackages(allSitePackages);
      
      // Auto-expand first site
      if (sites.length > 0) {
        setExpandedSite(sites[0].id);
      }
    } catch (error) {
      console.error('Error loading results:', error);
      setError('Failed to load package recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePackageSelect = (siteId, packageId) => {
    setSelectedPackages(prev => ({
      ...prev,
      [siteId]: packageId
    }));
  };

  const toggleSiteExpand = (siteId) => {
    setExpandedSite(expandedSite === siteId ? null : siteId);
  };

  const handleBookMeeting = () => {
    // Prepare data for booking
    const bookingData = Object.entries(selectedPackages).map(([siteId, packageId]) => {
      const siteData = sitePackages[siteId];
      const selectedPackage = siteData.packages.find(p => p.id === packageId);
      return {
        siteId,
        siteName: siteData.siteName,
        package: selectedPackage
      };
    });

    // Store in sessionStorage and navigate
    sessionStorage.setItem('selectedPackages', JSON.stringify(bookingData));
    router.push('/book-meeting');
  };

  if (loading) {
    return (
      <div className="results-page results-page--loading">
        <div className="results-page__loading">
          <div className="results-page__spinner"></div>
          <h2>🔍 Analyzing Your Requirements...</h2>
          <p>Building customized packages for each site</p>
        </div>

        <style jsx>{`
          .results-page--loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--techguru-black);
          }

          .results-page__loading {
            text-align: center;
          }

          .results-page__spinner {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #3D72FC;
            border-radius: 50%;
            margin: 0 auto 30px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .results-page__loading h2 {
            font-size: 32px;
            font-weight: 700;
            color: var(--techguru-white);
            margin-bottom: 12px;
          }

          .results-page__loading p {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-page results-page--error">
        <div className="results-page__error">
          <h2>⚠️ {error}</h2>
          <button 
            onClick={() => router.push('/questionnaire')}
            className="results-page__btn results-page__btn--primary"
          >
            Return to Questionnaire
          </button>
        </div>

        <style jsx>{`
          .results-page--error {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--techguru-black);
            padding: 20px;
          }

          .results-page__error {
            text-align: center;
            max-width: 600px;
          }

          .results-page__error h2 {
            font-size: 24px;
            color: #FA5674;
            margin-bottom: 24px;
          }

          .results-page__btn {
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
            color: white;
            transition: all 0.3s ease;
          }

          .results-page__btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
          }
        `}</style>
      </div>
    );
  }

  const siteIds = Object.keys(sitePackages);

  return (
    <div className="results-page">
      <div className="results-page__bg-shape"></div>
      <div className="results-page__bg-shape-2"></div>

      <div className="container">
        <div className="results-page__inner">
          {/* Header */}
          <div className="results-page__header">
            <div className="results-page__success-icon">
              <span>✓</span>
            </div>
            <h1>🎁 Your Customized Packages</h1>
            <p>We've created tailored connectivity packages for each of your {siteIds.length} site{siteIds.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Site Packages */}
          <div className="results-page__sites">
            {siteIds.map((siteId, siteIndex) => {
              const siteData = sitePackages[siteId];
              const isExpanded = expandedSite === siteId;
              const selectedPackageId = selectedPackages[siteId];
              
              return (
                <div key={siteId} className="results-page__site-card">
                  <div 
                    className="results-page__site-header"
                    onClick={() => toggleSiteExpand(siteId)}
                  >
                    <div className="results-page__site-info">
                      <h2>
                        <span className="results-page__site-number">Site {siteIndex + 1}</span>
                        {siteData.siteName}
                      </h2>
                      <p>📍 {siteData.location.city ? `${siteData.location.city}, ` : ''}{siteData.location.country}</p>
                    </div>
                    <div className="results-page__site-meta">
                      <span className="results-page__package-count">
                        {siteData.packages.length} Package{siteData.packages.length !== 1 ? 's' : ''} Available
                      </span>
                      <span className="results-page__expand-icon">
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="results-page__site-content">
                      {siteData.error ? (
                        <div className="results-page__site-error">
                          <p>⚠️ Error loading packages for this site: {siteData.error}</p>
                        </div>
                      ) : siteData.packages.length === 0 ? (
                        <div className="results-page__no-packages">
                          <p>No suitable packages found for this site's requirements.</p>
                        </div>
                      ) : (
                        <div className="results-page__packages">
                          {siteData.packages.map((pkg) => (
                            <PackageCard
                              key={pkg.id}
                              package={pkg}
                              isSelected={selectedPackageId === pkg.id}
                              onSelect={() => handlePackageSelect(siteId, pkg.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions Footer */}
          <div className="results-page__actions">
            <button
              onClick={() => router.push('/questionnaire/validation')}
              className="results-page__btn results-page__btn--secondary"
            >
              ← Review Answers
            </button>
            <button
              onClick={handleBookMeeting}
              className="results-page__btn results-page__btn--primary"
            >
              📅 Book Consultation
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .results-page {
          position: relative;
          min-height: 100vh;
          background-color: var(--techguru-black);
          padding: 80px 0;
          overflow: hidden;
        }

        .results-page__bg-shape {
          position: absolute;
          width: 927px;
          height: 927px;
          right: -270px;
          top: -40px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(22, 14, 255, 0.1539) 0%, rgba(22, 14, 255, 0) 87.1%);
          z-index: 0;
        }

        .results-page__bg-shape-2 {
          position: absolute;
          left: 24.95%;
          right: 24.95%;
          top: 30%;
          bottom: -11.72%;
          opacity: .30;
          filter: blur(120px);
          background: radial-gradient(50% 50% at 50% 50%, #6669D8 0%, rgba(7, 12, 20, 0) 100%);
          z-index: 0;
        }

        .results-page__inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .results-page__header {
          text-align: center;
          margin-bottom: 60px;
        }

        .results-page__success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          margin-bottom: 30px;
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 50px;
          color: white;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .results-page__header h1 {
          font-size: 42px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 16px;
          background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .results-page__header p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
        }

        .results-page__sites {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 60px;
        }

        .results-page__site-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .results-page__site-card:hover {
          border-color: rgba(61, 114, 252, 0.3);
        }

        .results-page__site-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .results-page__site-header:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .results-page__site-info h2 {
          font-size: 26px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .results-page__site-number {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
        }

        .results-page__site-info p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .results-page__site-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .results-page__package-count {
          font-size: 14px;
          font-weight: 600;
          color: #5CB0E9;
        }

        .results-page__expand-icon {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .results-page__site-content {
          padding: 0 32px 32px;
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

        .results-page__packages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 24px;
        }

        .results-page__site-error,
        .results-page__no-packages {
          padding: 32px;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
        }

        .results-page__actions {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding-top: 40px;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .results-page__btn {
          padding: 16px 40px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .results-page__btn--secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--techguru-white);
        }

        .results-page__btn--secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .results-page__btn--primary {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .results-page__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(61, 114, 252, 0.5);
        }

        @media (max-width: 1024px) {
          .results-page__packages {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .results-page {
            padding: 40px 0;
          }

          .results-page__header h1 {
            font-size: 32px;
          }

          .results-page__site-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px;
          }

          .results-page__site-info h2 {
            font-size: 22px;
            flex-direction: column;
            align-items: flex-start;
          }

          .results-page__site-content {
            padding: 0 16px 24px;
          }

          .results-page__actions {
            flex-direction: column;
          }

          .results-page__btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

function PackageCard({ package: pkg, isSelected, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`package-card ${isSelected ? 'package-card--selected' : ''}`}>
      <div className="package-card__header">
        <div className="package-card__title">
          <input
            type="radio"
            name={`package-${pkg.id}`}
            checked={isSelected}
            onChange={onSelect}
            className="package-card__radio"
          />
          <div>
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
          </div>
        </div>
        <div className="package-card__score">
          <span className="package-card__score-value">{pkg.totalScore}%</span>
          <span className="package-card__score-label">Match</span>
        </div>
      </div>

      <div className="package-card__components">
        {/* Router */}
        <div className="package-card__component">
          <div className="package-card__component-icon">🔀</div>
          <div className="package-card__component-info">
            <span className="package-card__component-label">Router</span>
            <span className="package-card__component-name">{pkg.router.name}</span>
            <span className="package-card__component-desc">{pkg.router.description}</span>
          </div>
        </div>

        {/* Primary Connection */}
        {pkg.primary && (
          <div className="package-card__component">
            <div className="package-card__component-icon">📡</div>
            <div className="package-card__component-info">
              <span className="package-card__component-label">Primary Connection</span>
              <span className="package-card__component-name">{pkg.primary.Product_Name}</span>
              {pkg.primary.Provider && (
                <span className="package-card__component-provider">
                  by {pkg.primary.Provider}
                </span>
              )}
            </div>
            <div className="package-card__component-score">
              {pkg.primary.matchScore}%
            </div>
          </div>
        )}

        {/* Secondary Connection */}
        {pkg.secondary && (
          <div className="package-card__component">
            <div className="package-card__component-icon">🔄</div>
            <div className="package-card__component-info">
              <span className="package-card__component-label">Secondary/Backup</span>
              <span className="package-card__component-name">{pkg.secondary.Product_Name}</span>
              {pkg.secondary.Provider && (
                <span className="package-card__component-provider">
                  by {pkg.secondary.Provider}
                </span>
              )}
            </div>
            <div className="package-card__component-score">
              {pkg.secondary.matchScore}%
            </div>
          </div>
        )}
      </div>

      {(pkg.primary || pkg.secondary) && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="package-card__details-toggle"
        >
          {showDetails ? '▲ Hide Details' : '▼ Show Technical Details'}
        </button>
      )}

      {showDetails && (
        <div className="package-card__details">
          {pkg.primary && (
            <ProductDetails product={pkg.primary} title="Primary Connection Specs" />
          )}
          {pkg.secondary && (
            <ProductDetails product={pkg.secondary} title="Secondary Connection Specs" />
          )}
        </div>
      )}

      <style jsx>{`
        .package-card {
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 28px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .package-card:hover {
          border-color: rgba(61, 114, 252, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .package-card--selected {
          border-color: #3D72FC;
          background: rgba(61, 114, 252, 0.08);
          box-shadow: 0 8px 24px rgba(61, 114, 252, 0.2);
        }

        .package-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .package-card__title {
          display: flex;
          gap: 16px;
          flex: 1;
        }

        .package-card__radio {
          width: 24px;
          height: 24px;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .package-card__title h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 6px;
        }

        .package-card__title p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          line-height: 1.4;
        }

        .package-card__score {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 20px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 16px;
        }

        .package-card__score-value {
          font-size: 24px;
          font-weight: 700;
          color: white;
        }

        .package-card__score-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
        }

        .package-card__components {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .package-card__component {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          transition: all 0.2s;
        }

        .package-card__component:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .package-card__component-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .package-card__component-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .package-card__component-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .package-card__component-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--techguru-white);
        }

        .package-card__component-desc,
        .package-card__component-provider {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        .package-card__component-score {
          align-self: center;
          padding: 6px 12px;
          background: rgba(92, 176, 233, 0.2);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #5CB0E9;
        }

        .package-card__details-toggle {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .package-card__details-toggle:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #5CB0E9;
        }

        .package-card__details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }

        @media (max-width: 768px) {
          .package-card__header {
            flex-direction: column;
            gap: 16px;
          }

          .package-card__score {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

function ProductDetails({ product, title }) {
  return (
    <div className="product-details">
      <h4>{title}</h4>
      <div className="product-details__grid">
        {product.Monthly_Data_GB && (
          <div className="product-details__item">
            <span className="label">Monthly Data:</span>
            <span className="value">{product.Monthly_Data_GB} GB</span>
          </div>
        )}
        {product.Download_Mbit_s && (
          <div className="product-details__item">
            <span className="label">Download:</span>
            <span className="value">{product.Download_Mbit_s} Mbps</span>
          </div>
        )}
        {product.Upload_Mbit_s && (
          <div className="product-details__item">
            <span className="label">Upload:</span>
            <span className="value">{product.Upload_Mbit_s} Mbps</span>
          </div>
        )}
        {product.Latency_Class_ms && (
          <div className="product-details__item">
            <span className="label">Latency:</span>
            <span className="value">{product.Latency_Class_ms} ms</span>
          </div>
        )}
        {product.Availability_SLA_Percent && (
          <div className="product-details__item">
            <span className="label">SLA:</span>
            <span className="value">{product.Availability_SLA_Percent}%</span>
          </div>
        )}
        {product.Connectivity_Technology && (
          <div className="product-details__item">
            <span className="label">Technology:</span>
            <span className="value">{product.Connectivity_Technology}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .product-details {
          margin-bottom: 20px;
        }

        .product-details h4 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 12px;
        }

        .product-details__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .product-details__item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .product-details__item .label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          text-transform: uppercase;
        }

        .product-details__item .value {
          font-size: 14px;
          color: var(--techguru-white);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}