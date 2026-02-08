"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllSites, clearAllQuestionnaireData } from "@/lib/multiSiteStorage";

export default function ResultsPage() {
  const router = useRouter();
  const [sites, setSites] = useState([]);
  const [expandedSite, setExpandedSite] = useState(null);

  useEffect(() => {
    const allSites = getAllSites();
    setSites(allSites);
    
    // Auto-expand first site
    if (allSites.length > 0) {
      setExpandedSite(allSites[0].id);
    }
  }, []);

  // Data generator - returns clean, readable component names
  const getTemplateDataForSite = (site, index) => {
    // Determine site type from answers
    const siteType = site.answers[22]?.value || site.answers[22] || "fixed";
    const primaryTech = site.answers[12]?.value || site.answers[12] || "satellite";
    const hasBackup = site.answers[13] && Array.isArray(site.answers[13]) 
      ? !site.answers[13].some(t => (t.value || t) === 'none')
      : false;

    return {
      siteNumber: index + 1,
      siteName: site.name || `Site ${index + 1}`,
      siteType: siteType === "fixed" ? "Fixed Site" : siteType === "moving_vehicle" ? "Mobile Site" : "Semi-Mobile",
      city: site.location?.city || "Location",
      components: [
        {
          name: "Router",
          hardware: siteType === "fixed" ? "Fixed" : "Mobile",
          plan: "1.0 Gbps",
          setupFee: siteType === "fixed" ? 799 : 1299,
          monthlyFee: 12,
          managedFee: 128
        },
        {
          name: "Cellular",
          hardware: "Telefonica Industrial SIM",
          plan: "50 GB/month",
          setupFee: 8.90,
          monthlyFee: 65.60,
          managedFee: 0
        },
        ...(primaryTech === "satellite" || hasBackup ? [{
          name: "Satellite",
          hardware: "Starlink Enterprise",
          plan: "200 GB/month",
          setupFee: 390,
          monthlyFee: 120,
          managedFee: 0
        }] : [])
      ]
    };
  };

  const calculateSiteTotal = (components) => {
    return components.reduce((sum, c) => ({
      setup: sum.setup + c.setupFee,
      monthly: sum.monthly + c.monthlyFee,
      managed: sum.managed + c.managedFee
    }), { setup: 0, monthly: 0, managed: 0 });
  };

  const calculateDeploymentSummary = () => {
    const allSitesCount = sites.length;

    // Calculate actual totals from template data
    let totalSetup = 0;
    let totalMonthly = 0;
    let totalManaged = 0;

    sites.forEach((site, index) => {
      const siteData = getTemplateDataForSite(site, index);
      const totals = calculateSiteTotal(siteData.components);
      totalSetup += totals.setup;
      totalMonthly += totals.monthly;
      totalManaged += totals.managed;
    });

    return {
      sites: allSitesCount,
      setup: Math.round(totalSetup),
      monthly: Math.round(totalMonthly),
      managed: Math.round(totalManaged),
      contract3y: Math.round((totalMonthly * 36) + totalSetup)
    };
  };

  const summary = calculateDeploymentSummary();

  const toggleSite = (siteId) => {
    setExpandedSite(expandedSite === siteId ? null : siteId);
  };

  const handleStartNew = () => {
    // Clear all questionnaire data using the storage utility
    clearAllQuestionnaireData();
    
    // Also clear any old legacy storage keys if they exist
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sg_sites');
      localStorage.removeItem('sg_project_answers');
      localStorage.removeItem('sg_hidden_sites');
      localStorage.removeItem('sg_current_question');
      localStorage.removeItem('sg_active_site');
    }
    
    // Navigate to home or questionnaire start
    router.push('/questionnaire');
  };

  if (sites.length === 0) {
    return (
      <div className="results-page">
        <div className="results-page__empty">
          <h2>No sites found</h2>
          <p>Please complete the questionnaire first.</p>
          <button onClick={() => router.push('/questionnaire')} className="btn-primary">
            Start Questionnaire
          </button>
        </div>
        <style jsx>{`
          .results-page__empty {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px;
            background: #070c14;
            color: #fff;
          }
          .btn-primary {
            margin-top: 20px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-page__bg-blob"></div>
      <div className="results-page__bg-blob-2"></div>

      <div className="results-page__header">
        <h1>Your Connectivity Packages</h1>
        <p>Tailored recommendations for {sites.length} site{sites.length > 1 ? 's' : ''}</p>
      </div>

      <div className="results-page__content">
        {/* Per-Site Breakdown */}
        {sites.map((site, index) => {
          const siteData = getTemplateDataForSite(site, index);
          const siteTotal = calculateSiteTotal(siteData.components);
          const isExpanded = expandedSite === site.id;

          return (
            <div key={site.id} className="site-card">
              <div className="site-card__header" onClick={() => toggleSite(site.id)}>
                <div className="site-card__title">
                  <div className="site-badge">Site {siteData.siteNumber}</div>
                  <h2>{siteData.siteName}</h2>
                  <div className="site-card__subtitle">
                    <span>{siteData.siteType} • Incl. Cellular & Satellite Access Services</span>
                  </div>
                </div>

                <div className="site-card__totals">
                  <div className="total-item">
                    <span className="label">Network Setup Fee</span>
                    <span className="value">{siteTotal.setup.toFixed(2)} €</span>
                  </div>
                  <div className="total-item">
                    <span className="label">Network Monthly Fee</span>
                    <span className="value">{siteTotal.monthly.toFixed(0)} €</span>
                  </div>
                  <div className="total-item">
                    <span className="label">Managed Service Monthly Fee</span>
                    <span className="value">{siteTotal.managed.toFixed(0)} €</span>
                  </div>
                </div>

                <button className="expand-button">
                  {isExpanded ? '▼' : '▶'}
                </button>
              </div>

              {isExpanded && (
                <div className="site-card__content">
                  <table className="components-table">
                    <thead>
                      <tr>
                        <th>Component</th>
                        <th>Hardware</th>
                        <th>Plan</th>
                        <th>Setup Fee</th>
                        <th>Monthly Fee</th>
                        <th>Managed Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteData.components.map((component, idx) => (
                        <tr key={idx}>
                          <td>
                            <span className="component-badge" style={{background: idx === 0 ? '#3D72FC' : idx === 1 ? '#5CB0E9' : '#6669D8'}}>
                              {component.name}
                            </span>
                          </td>
                          <td>{component.hardware}</td>
                          <td>{component.plan}</td>
                          <td>{component.setupFee.toFixed(2)} €</td>
                          <td>{component.monthlyFee.toFixed(2)} €</td>
                          <td>{component.managedFee.toFixed(2)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        {/* Deployment Summary - Single Card for All Sites */}
        <div className="deployment-summary">
          <h2 className="deployment-summary__title">Deployment Summary</h2>
          
          <div className="summary-card">
            <div className="summary-card__header">
              <h3>All Sites ({summary.sites})</h3>
              <p>Complete deployment costs including all connectivity services</p>
            </div>
            <div className="summary-card__body">
              <div className="summary-row">
                <span className="label">Total Network Setup Fee</span>
                <span className="value">{summary.setup.toLocaleString()} €</span>
              </div>
              <div className="summary-row">
                <span className="label">Total Network Monthly Fee</span>
                <span className="value">{summary.monthly.toLocaleString()} €</span>
              </div>
              <div className="summary-row">
                <span className="label">Total Managed Service Monthly Fee</span>
                <span className="value">{summary.managed.toLocaleString()} €</span>
              </div>
              <div className="summary-row highlight">
                <span className="label">3-Year Contract Value</span>
                <span className="value">{summary.contract3y.toLocaleString()} €</span>
              </div>
            </div>
            <div className="summary-card__actions">
              <button className="btn-export" onClick={() => alert('BOM export coming soon')}>
                Export BOM
              </button>
              <button className="btn-export btn-export--primary" onClick={() => alert('PDF export coming soon')}>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="results-page__actions">
          <button onClick={() => router.push('/questionnaire/validation')} className="btn-secondary">
            ← Review Sites
          </button>
          <button onClick={handleStartNew} className="btn-primary">
            Start New Configuration →
          </button>
        </div>
      </div>

      <style jsx>{`
        .results-page {
          position: relative;
          min-height: 100vh;
          background: #070c14;
          padding: 52px 18px;
          overflow: hidden;
        }

        .results-page__bg-blob {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          right: -250px;
          top: -120px;
          background: radial-gradient(circle, rgba(22, 14, 255, 0.11) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .results-page__bg-blob-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          left: -150px;
          bottom: -140px;
          background: radial-gradient(circle, rgba(102, 105, 216, 0.14) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .results-page__header {
          position: relative;
          z-index: 1;
          max-width: 1060px;
          margin: 0 auto 44px;
          text-align: center;
        }

        .results-page__header h1 {
          font-size: 34px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px 0;
        }

        .results-page__header p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .results-page__content {
          position: relative;
          z-index: 1;
          max-width: 1060px;
          margin: 0 auto;
        }

        /* Site Cards */
        .site-card {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 22px;
          margin-bottom: 20px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .site-card:hover {
          border-color: rgba(61, 114, 252, 0.4);
        }

        .site-card__header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 28px 32px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .site-card__header:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .site-card__title {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .site-badge {
          display: inline-flex;
          padding: 4px 14px;
          background: linear-gradient(135deg, #3D72FC, #5CB0E9);
          border-radius: 16px;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          align-self: flex-start;
        }

        .site-card__title h2 {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .site-card__subtitle span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .site-card__totals {
          display: flex;
          gap: 32px;
        }

        .total-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .total-item .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 4px;
        }

        .total-item .value {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .expand-button {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .expand-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .site-card__content {
          padding: 0;
          animation: slideDown 0.3s ease;
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

        /* Components Table */
        .components-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.02);
        }

        .components-table thead {
          background: rgba(255, 255, 255, 0.04);
        }

        .components-table th {
          padding: 14px 20px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .components-table td {
          padding: 18px 20px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .components-table tbody tr:last-child td {
          border-bottom: none;
        }

        .component-badge {
          display: inline-flex;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #fff;
        }

        /* Deployment Summary */
        .deployment-summary {
          margin-top: 48px;
        }

        .deployment-summary__title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 24px 0;
        }

        .summary-card {
          background: rgba(61, 114, 252, 0.08);
          border: 1px solid rgba(61, 114, 252, 0.35);
          padding: 32px;
          border-radius: 22px;
        }

        .summary-card__header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px 0;
        }

        .summary-card__header p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 28px 0;
        }

        .summary-card__body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .summary-row.highlight {
          padding-top: 20px;
          margin-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .summary-row .label {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
        }

        .summary-row .value {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }

        .summary-row.highlight .value {
          font-size: 26px;
          color: #5CB0E9;
        }

        .summary-card__actions {
          display: flex;
          gap: 12px;
        }

        .btn-export {
          flex: 1;
          padding: 14px 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-export:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-2px);
        }

        .btn-export--primary {
          background: linear-gradient(135deg, #3D72FC, #5CB0E9);
          border: none;
          color: #fff;
        }

        .btn-export--primary:hover {
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        /* Actions */
        .results-page__actions {
          margin-top: 48px;
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }

        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.8);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .site-card__header {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .site-card__totals {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .total-item {
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .results-page {
            padding: 30px 12px;
          }

          .results-page__header h1 {
            font-size: 26px;
          }

          .site-card__header {
            padding: 20px;
          }

          .components-table {
            font-size: 13px;
          }

          .components-table th,
          .components-table td {
            padding: 12px 12px;
          }

          .summary-card {
            padding: 24px 20px;
          }

          .summary-card__actions {
            flex-direction: column;
          }

          .results-page__actions {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}