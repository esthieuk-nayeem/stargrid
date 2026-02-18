"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StaticResultsPage() {
  const router = useRouter();
  const [expandedSite, setExpandedSite] = useState(1); // Auto-expand Site 1

  const toggleSite = (siteId) => {
    setExpandedSite(expandedSite === siteId ? null : siteId);
  };

  return (
    <div className="results-page">
      <div className="results-page__bg-blob"></div>
      <div className="results-page__bg-blob-2"></div>

      <div className="results-page__header">
        <h1>Your Connectivity Packages</h1>

      </div>

      <div className="results-page__content">
        {/* Site 1 */}
        <div className="site-card">
          <div className="site-card__header" onClick={() => toggleSite(1)}>
            <div className="site-card__title">
              <div className="site-badge">Site 1</div>
              <h2>Site Name</h2>
              <div className="site-card__subtitle">
                <span>Site Type • Incl. Cellular & Satellite Access Services</span>
              </div>
            </div>

            <div className="site-card__totals">
              <div className="total-item">
                <span className="label">Network Setup Fee</span>
                <span className="value">799 €</span>
                <span className="sublabel">1.198 €</span>
              </div>
              <div className="total-item">
                <span className="label">Network Monthly Fee</span>
                <span className="value">12 €</span>
                <span className="sublabel">198 €</span>
              </div>
              <div className="total-item">
                <span className="label">Managed Service Monthly Fee</span>
                <span className="value">128 €</span>
                <span className="sublabel">128 €</span>
              </div>
            </div>

            <button className="expand-button" onClick={(e) => e.stopPropagation()}>
              {expandedSite === 1 ? '▼' : '▶'}
            </button>
          </div>

          {expandedSite === 1 && (
            <div className="site-card__content">
              <table className="components-table">
                <thead>
                  <tr>
                    <th>Component name</th>
                    <th>Hardware name</th>
                    <th>Airtime Plan</th>
                    <th>Network Setup Fee</th>
                    <th>Network Monthly Fee</th>
                    <th>Managed Service Monthly Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#3D72FC'}}>
                        Stargrid Box
                      </span>
                    </td>
                    <td>Fixed</td>
                    <td>1.0 Gbps</td>
                    <td>799 €</td>
                    <td>12 €</td>
                    <td>128 €</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#5CB0E9'}}>
                        Cellular
                      </span>
                    </td>
                    <td>Telefonica Industrial SIM</td>
                    <td>50 GB/month</td>
                    <td>8.90 €</td>
                    <td>65.60 €</td>
                    <td>0.00 €</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#6669D8'}}>
                        Satellite
                      </span>
                    </td>
                    <td>Starlink Enterprise</td>
                    <td>200 GB/month</td>
                    <td>390 €</td>
                    <td>120 €</td>
                    <td>0.00 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Site 2 */}
        <div className="site-card">
          <div className="site-card__header" onClick={() => toggleSite(2)}>
            <div className="site-card__title">
              <div className="site-badge">Site 2</div>
              <h2>Site Name</h2>
              <div className="site-card__subtitle">
                <span>Site Type • Incl. Cellular & Satellite Access Services</span>
              </div>
            </div>

            <div className="site-card__totals">
              <div className="total-item">
                <span className="label">Network Setup Fee</span>
                <span className="value">799 €</span>
                <span className="sublabel">1.198 €</span>
              </div>
              <div className="total-item">
                <span className="label">Network Monthly Fee</span>
                <span className="value">12 €</span>
                <span className="sublabel">198 €</span>
              </div>
              <div className="total-item">
                <span className="label">Managed Service Monthly Fee</span>
                <span className="value">128 €</span>
                <span className="sublabel">128 €</span>
              </div>
            </div>

            <button className="expand-button" onClick={(e) => e.stopPropagation()}>
              {expandedSite === 2 ? '▼' : '▶'}
            </button>
          </div>

          {expandedSite === 2 && (
            <div className="site-card__content">
              <table className="components-table">
                <thead>
                  <tr>
                    <th>Component name</th>
                    <th>Hardware name</th>
                    <th>Airtime Plan</th>
                    <th>Network Setup Fee</th>
                    <th>Network Monthly Fee</th>
                    <th>Managed Service Monthly Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#3D72FC'}}>
                        Stargrid Box
                      </span>
                    </td>
                    <td>Fixed</td>
                    <td>1.0 Gbps</td>
                    <td>799 €</td>
                    <td>12 €</td>
                    <td>128 €</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#5CB0E9'}}>
                        Cellular
                      </span>
                    </td>
                    <td>Telefonica Industrial SIM</td>
                    <td>50 GB/month</td>
                    <td>8.90 €</td>
                    <td>65.60 €</td>
                    <td>0.00 €</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="component-badge" style={{background: '#6669D8'}}>
                        Satellite
                      </span>
                    </td>
                    <td>Starlink Enterprise</td>
                    <td>200 GB/month</td>
                    <td>390 €</td>
                    <td>120 €</td>
                    <td>0.00 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Deployment Summary */}
        <div className="deployment-summary">
          <h2 className="deployment-summary__title">Deployment Summary</h2>
          
          <div className="summary-cards-grid">
            {/* PoC Sites (2) */}
            <div className="summary-card">
              <div className="summary-card__header">
                <h3>PoC Sites (2)</h3>
                <p>Incl. Cellular & Satellite Access Services</p>
              </div>
              <div className="summary-card__body">
                <div className="summary-row">
                  <span className="label">Network Setup Fee</span>
                  <span className="value">10.000 €</span>
                  <span className="sublabel">798 €</span>
                </div>
                <div className="summary-row">
                  <span className="label">Network Monthly Fee</span>
                  <span className="value">0,00 €</span>
                  <span className="sublabel">611 €</span>
                </div>
                <div className="summary-row">
                  <span className="label">Managed Service Monthly Fee</span>
                  <span className="value">0,00 €</span>
                  <span className="sublabel">0,00 €</span>
                </div>
              </div>
              <div className="summary-card__actions">
                <button className="btn-export" onClick={() => alert('BOM export coming soon')}>
                  BOM
                </button>
              </div>
            </div>

            {/* All Sites (12) */}
            <div className="summary-card summary-card--highlight">
              <div className="summary-card__header">
                <h3>All Sites (12)</h3>
                <p>Incl. Cellular & Satellite Access Services</p>
              </div>
              <div className="summary-card__body">
                <div className="summary-row">
                  <span className="label">Network Setup Fee</span>
                  <span className="value">9.588 €</span>
                  <span className="sublabel">14.376 €</span>
                </div>
                <div className="summary-row">
                  <span className="label">Network Monthly Fee</span>
                  <span className="value">240 €</span>
                  <span className="sublabel">2.376 €</span>
                </div>
                <div className="summary-row">
                  <span className="label">Managed Service Monthly Fee</span>
                  <span className="value">1.536 €</span>
                  <span className="sublabel">1.536 €</span>
                </div>
                <div className="summary-row highlight">
                  <span className="label">Contract Value 3y</span>
                  <span className="value">73.524 €</span>
                  <span className="sublabel">155.208 €</span>
                </div>
              </div>
              <div className="summary-card__actions">
                <button className="btn-export" onClick={() => alert('BOM export coming soon')}>
                  BOM
                </button>
              </div>
            </div>

            {/* PDF Button */}
            <div className="pdf-button-container">
              <button className="btn-pdf" onClick={() => alert('PDF export coming soon')}>
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="results-page__actions">
          <button onClick={() => router.push('/')} className="btn-secondary">
            ← Back to Home
          </button>
          <button onClick={() => router.push('/questionnaire')} className="btn-primary">
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
          max-width: 1200px;
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
          max-width: 1200px;
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

        .total-item .sublabel {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 2px;
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

        .summary-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 20px;
          align-items: start;
        }

        .summary-card {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 28px;
          border-radius: 22px;
        }

        .summary-card--highlight {
          background: rgba(61, 114, 252, 0.08);
          border: 1px solid rgba(61, 114, 252, 0.35);
        }

        .summary-card__header h3 {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px 0;
        }

        .summary-card__header p {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 24px 0;
        }

        .summary-card__body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .summary-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 16px;
          align-items: center;
          padding: 8px 0;
        }

        .summary-row.highlight {
          padding-top: 16px;
          margin-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .summary-row .label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .summary-row .value {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          text-align: right;
        }

        .summary-row .sublabel {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          text-align: right;
        }

        .summary-row.highlight .value {
          font-size: 22px;
          color: #5CB0E9;
        }

        .summary-card__actions {
          display: flex;
          gap: 12px;
        }

        .btn-export {
          flex: 1;
          padding: 12px 24px;
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

        .pdf-button-container {
          display: flex;
          align-items: center;
        }

        .btn-pdf {
          padding: 20px 40px;
          background: linear-gradient(135deg, #FF9800, #F57C00);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 120px;
        }

        .btn-pdf:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
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

          .summary-cards-grid {
            grid-template-columns: 1fr;
          }

          .pdf-button-container {
            justify-content: center;
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