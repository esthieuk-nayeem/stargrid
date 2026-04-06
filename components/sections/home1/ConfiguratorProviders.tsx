"use client";

import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

const integrated = [
  { src: "/assets/images/logos/Telefonica Logo.png",        alt: "Telefónica",  w: 160, h: 60 },
  { src: "/assets/images/logos/Starlink_Logo.svg",          alt: "Starlink",    w: 160, h: 48 },
  { src: "/assets/images/logos/Iridium.svg",                alt: "Iridium",     w: 160, h: 60 },
  { src: "/assets/images/logos/Skylo Logo_Fullcolor-RGB.jpg", alt: "Skylo",     w: 140, h: 52 },
];

const connected = [
  { src: "/assets/images/logos/ViaSAT_BIG.png",             alt: "Viasat",     w: 160, h: 52 },
  { src: "/assets/images/logos/oneweb-vector-logo.svg",     alt: "OneWeb",     w: 150, h: 52 },
  { src: "/assets/images/logos/SES_S.A._Logo_2025.svg",     alt: "SES S.A.",   w: 120, h: 52 },
];

const comingSoon = [
  { label: "Amazon Kuiper" },
  { label: "Other Satellite & Cellular Operators" },
];

export default function ConfiguratorProviders() {
  return (
    <>
      <section className="cfg-prov">
        <div className="cfg-prov__blob-1" />
        <div className="cfg-prov__blob-2" />

        <div className="container">
          <div className="section-title text-center sec-title-animation animation-style1" style={{ marginBottom: 72 }}>
            <div className="section-title__tagline-box">
              <div className="section-title__tagline-shape-1" />
              <span className="section-title__tagline">Network Partners</span>
              <div className="section-title__tagline-shape-2" />
            </div>
            <AnimatedTitle>
              <h2 className="section-title__title title-animation">
                Global Operators, <span>One Platform</span>
              </h2>
            </AnimatedTitle>
            <p className="cfg-prov__subtitle">
              The Connectivity Planner consolidates leading cellular and satellite operators
              into a single, seamless managed service.
            </p>
          </div>

          {/* Integrated */}
          <div className="cfg-prov__group">
            <div className="cfg-prov__group-label cfg-prov__group-label--active">
              <span className="cfg-prov__dot cfg-prov__dot--active" />
              Integrated Providers
            </div>
            <div className="cfg-prov__logos">
              {integrated.map((p, i) => (
                <div key={i} className="cfg-prov__logo-card cfg-prov__logo-card--active">
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} priority
                    style={{ objectFit: "contain", maxHeight: 56 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Connected — not integrated yet */}
          <div className="cfg-prov__group">
            <div className="cfg-prov__group-label cfg-prov__group-label--connected">
              <span className="cfg-prov__dot cfg-prov__dot--connected" />
              Connected — Integration In Progress
            </div>
            <div className="cfg-prov__logos">
              {connected.map((p, i) => (
                <div key={i} className="cfg-prov__logo-card cfg-prov__logo-card--connected">
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} priority
                    style={{ objectFit: "contain", maxHeight: 56, filter: "opacity(0.8)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon */}
          <div className="cfg-prov__group">
            <div className="cfg-prov__group-label cfg-prov__group-label--soon">
              <span className="cfg-prov__dot cfg-prov__dot--soon" />
              Coming Soon
            </div>
            <div className="cfg-prov__logos">
              {comingSoon.map((p, i) => (
                <div key={i} className="cfg-prov__logo-card cfg-prov__logo-card--soon">
                  <span className="cfg-prov__soon-label">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .cfg-prov {
          position: relative;
          padding: 120px 0;
          background: var(--techguru-black, #070c14);
          overflow: hidden;
        }
        .cfg-prov__blob-1 {
          position: absolute;
          width: 700px; height: 700px; border-radius: 50%;
          left: -180px; top: -100px;
          background: radial-gradient(circle, rgba(22,14,255,0.09) 0%, transparent 68%);
          pointer-events: none;
        }
        .cfg-prov__blob-2 {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          right: -100px; bottom: -80px;
          background: radial-gradient(circle, rgba(102,105,216,0.11) 0%, transparent 65%);
          pointer-events: none;
        }

        .cfg-prov__subtitle {
          font-size: 16px; color: rgba(255,255,255,0.55);
          line-height: 1.7; max-width: 580px;
          margin: 20px auto 0;
        }

        /* Group */
        .cfg-prov__group { margin-bottom: 52px; }
        .cfg-prov__group:last-child { margin-bottom: 0; }

        .cfg-prov__group-label {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.6px;
          text-transform: uppercase; margin-bottom: 24px;
          padding: 6px 18px; border-radius: 30px;
        }
        .cfg-prov__group-label--active  { background: rgba(34,197,94,0.10);  color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }
        .cfg-prov__group-label--connected{ background: rgba(251,191,36,0.10); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }
        .cfg-prov__group-label--soon     { background: rgba(148,163,184,0.08); color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.12); }

        .cfg-prov__dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .cfg-prov__dot--active    { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.6); }
        .cfg-prov__dot--connected { background: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.5); }
        .cfg-prov__dot--soon      { background: rgba(255,255,255,0.3); }

        /* Logo row */
        .cfg-prov__logos {
          display: flex; flex-wrap: wrap; gap: 16px;
        }

        .cfg-prov__logo-card {
          display: flex; align-items: center; justify-content: center;
          min-width: 190px; height: 100px;
          padding: 20px 32px;
          border-radius: 18px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          backdrop-filter: blur(6px);
        }
        .cfg-prov__logo-card:hover { transform: translateY(-4px); }

        .cfg-prov__logo-card--active {
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 60%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(34,197,94,0.3);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .cfg-prov__logo-card--active:hover {
          border-color: rgba(34,197,94,0.55);
          box-shadow: 0 8px 32px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .cfg-prov__logo-card--connected {
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(251,191,36,0.22);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .cfg-prov__logo-card--connected:hover {
          border-color: rgba(251,191,36,0.45);
          box-shadow: 0 8px 32px rgba(251,191,36,0.10), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .cfg-prov__logo-card--soon {
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px dashed rgba(255,255,255,0.15);
          min-width: 210px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .cfg-prov__soon-label {
          font-size: 14px; font-weight: 600;
          color: rgba(255,255,255,0.35);
          text-align: center;
        }

        @media (max-width: 768px) {
          .cfg-prov { padding: 70px 0; }
          .cfg-prov__logos { gap: 12px; }
          .cfg-prov__logo-card { min-width: calc(50% - 6px); }
        }
        @media (max-width: 480px) {
          .cfg-prov__logo-card { min-width: 100%; }
        }
      `}</style>
    </>
  );
}
