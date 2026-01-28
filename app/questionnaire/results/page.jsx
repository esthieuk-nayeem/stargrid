"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Simulate loading results
    setTimeout(() => {
      // TODO: Fetch actual results from API based on questionnaire answers
      setResults({
        matchedProducts: [
          {
            id: 1,
            name: "Cellular 5G Solution",
            matchScore: 95,
            features: [
              "High-speed 5G connectivity",
              "Low latency (<50ms)",
              "99.9% uptime guarantee",
              "Automatic failover"
            ],
            pricing: {
              setup: "$2,500",
              monthly: "$299/mo"
            }
          },
          {
            id: 2,
            name: "Satellite Backup System",
            matchScore: 88,
            features: [
              "Global coverage",
              "Weather-resistant equipment",
              "24/7 monitoring",
              "Emergency connectivity"
            ],
            pricing: {
              setup: "$5,000",
              monthly: "$499/mo"
            }
          },
          {
            id: 3,
            name: "Hybrid Connectivity Package",
            matchScore: 92,
            features: [
              "Cellular + Satellite",
              "Intelligent load balancing",
              "Maximum reliability",
              "Priority support"
            ],
            pricing: {
              setup: "$6,500",
              monthly: "$699/mo"
            }
          }
        ]
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="results-page results-page--loading">
        <div className="container">
          <div className="results-page__loading">
            <div className="results-page__spinner"></div>
            <h2>Analyzing Your Requirements...</h2>
            <p>We're finding the perfect connectivity solutions for your needs</p>
          </div>
        </div>

        <style jsx>{`
          .results-page--loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--techguru-black);
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

  return (
    <div className="results-page">
      <div className="results-page__bg-shape"></div>
      <div className="results-page__bg-shape-2"></div>

      <div className="container">
        <div className="results-page__inner">
          {/* Header */}
          <div className="results-page__header">
            <div className="results-page__success-icon">
              <span className="icon-check-circle"></span>
            </div>
            <h1>Your Personalized Recommendations</h1>
            <p>Based on your requirements, we've identified {results.matchedProducts.length} solutions that match your needs</p>
          </div>

          {/* Products */}
          <div className="results-page__products">
            {results.matchedProducts.map((product, index) => (
              <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="product-card__header">
                  <div className="product-card__badge">
                    <span className="product-card__match-score">{product.matchScore}% Match</span>
                  </div>
                  {index === 0 && (
                    <div className="product-card__recommended">
                      <span>Recommended</span>
                    </div>
                  )}
                </div>

                <div className="product-card__content">
                  <h3 className="product-card__name">{product.name}</h3>

                  <div className="product-card__features">
                    <h4>Key Features</h4>
                    <ul>
                      {product.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="icon-check"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-card__pricing">
                    <div className="product-card__price-item">
                      <span className="label">Setup Fee</span>
                      <span className="value">{product.pricing.setup}</span>
                    </div>
                    <div className="product-card__price-item">
                      <span className="label">Monthly</span>
                      <span className="value">{product.pricing.monthly}</span>
                    </div>
                  </div>

                  <button className="product-card__btn">
                    Request Quote
                    <span className="icon-arrow-right"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="results-page__actions">
            <button className="results-page__btn results-page__btn--secondary" onClick={() => router.push('/questionnaire')}>
              <span className="icon-arrow-left"></span>
              Retake Survey
            </button>
            <button className="results-page__btn results-page__btn--primary">
              Download Full Report
              <span className="icon-download"></span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          max-width: 1200px;
          margin: 0 auto;
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

        .results-page__success-icon span {
          font-size: 50px;
          color: var(--techguru-white);
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
          max-width: 600px;
          margin: 0 auto;
        }

        .results-page__products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 35px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          animation: slideUp 0.6s ease-out backwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(61, 114, 252, 0.4);
          box-shadow: 0 20px 40px rgba(61, 114, 252, 0.2);
        }

        .product-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .product-card__badge {
          display: inline-block;
        }

        .product-card__match-score {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          color: var(--techguru-white);
        }

        .product-card__recommended {
          padding: 6px 16px;
          background: rgba(250, 86, 116, 0.2);
          border: 1px solid #FA5674;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          color: #FA5674;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-card__name {
          font-size: 24px;
          font-weight: 700;
          color: var(--techguru-white);
          margin-bottom: 24px;
        }

        .product-card__features h4 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .product-card__features ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }

        .product-card__features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
        }

        .product-card__features li span {
          color: #5CB0E9;
          font-size: 16px;
        }

        .product-card__pricing {
          display: flex;
          gap: 24px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .product-card__price-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-card__price-item .label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }

        .product-card__price-item .value {
          font-size: 20px;
          font-weight: 700;
          color: var(--techguru-white);
        }

        .product-card__btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 12px;
          color: var(--techguru-white);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .product-card__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        .results-page__actions {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .results-page__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 12px;
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
          color: var(--techguru-white);
        }

        .results-page__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(61, 114, 252, 0.4);
        }

        @media (max-width: 768px) {
          .results-page {
            padding: 40px 0;
          }

          .results-page__header h1 {
            font-size: 32px;
          }

          .results-page__products {
            grid-template-columns: 1fr;
          }

          .results-page__actions {
            flex-direction: column;
          }

          .results-page__btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}