"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const logos = [
  { src: "/assets/images/logos/Starlink_Logo.svg",             alt: "Starlink",   w: 150, h: 44 },
  { src: "/assets/images/logos/Skylo Logo_Fullcolor-RGB.jpg",  alt: "Skylo",      w: 120, h: 38 },
  { src: "/assets/images/logos/SES_S.A._Logo_2025.svg",        alt: "SES",        w: 110, h: 44 },
  { src: "/assets/images/logos/oneweb-vector-logo.svg",        alt: "OneWeb",     w: 140, h: 44 },
  { src: "/assets/images/logos/Iridium.svg",                   alt: "Iridium",    w: 130, h: 44 },
  { src: "/assets/images/logos/ViaSAT_BIG.png",                alt: "Viasat",     w: 140, h: 44 },
  { src: "/assets/images/logos/Telefonica Logo.png",           alt: "Telefónica", w: 148, h: 52 },
    { src: "/assets/images/logos/amazon_leo.png",           alt: "Amazon Leo", w: 148, h: 52 },
      { src: "/assets/images/logos/Open_cosmos.png",           alt: "Open Cosmos", w: 148, h: 52 },
];

// Duplicate for seamless infinite scroll loop
const logoLoop = [...logos, ...logos];

const steps = [
  { n: "01", text: "Complete your first Site" },
  { n: "02", text: "Add and copy more Sites" },
  { n: "03", text: "Get your Connectivity Plan and Proposal" },
];

export default function LandingHero() {
  const router = useRouter();

  const handleStart = () => {
    if (typeof window !== "undefined") {
      ["stargrid_sites", "stargrid_current_site_id", "sg_sites",
        "sg_project_answers", "sg_hidden_sites", "sg_current_question",
        "sg_active_site"].forEach(k => localStorage.removeItem(k));
    }
    router.push("/questionnaire");
  };

  return (
    <div className="lh">

      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="lh__left">
        {/* Ambient glow orbs */}
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        {/* Dot-grid texture */}
        <div className="grid-texture" />

        <div className="lh__content">

          {/* Eyebrow badge */}
          <div className="lh__badge">
            <span className="lh__badge-dot" />
            StarGrid 100% Connectivity
            <span className="lh__badge-sep">·</span>
            Cellular – Satellite - Fixed
          </div>

          {/* Title */}
          <h1 className="lh__title">
            Connectivity<br />
            <span className="lh__title-accent">Planner App</span>
          </h1>

          {/* Description */}
          <p className="lh__desc">
            Use the 20-questions tool, make a connectivity plan for your use case
            and receive instantly your personal multi-connectivity proposal within 30 minutes
          </p>

          {/* Steps */}
          <div className="lh__steps">
            {steps.map((s, i) => (
              <div key={i} className="lh__step">
                <div className="lh__step-badge">{s.n}</div>
                <span className="lh__step-text">{s.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="lh__cta" onClick={handleStart}>
            Get Started
            <svg className="lh__cta-arrow" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────── */}
      <div className="lh__right">
        <div className="lh__right-bg-glow" />

        {/* StarGrid brand — fixed at top centre */}
        <div className="lh__brand-anchor">
          <div className="lh__brand-ring">
            <Image src="/assets/images/icon/icon.png" alt="StarGrid"
              width={44} height={44} style={{ objectFit: "contain" }} priority />
          </div>
          <span className="lh__brand-name">StarGrid</span>
          <div className="lh__brand-tagline">Industrial Connectivity</div>
        </div>

        {/* "Powering" divider */}
        <div className="lh__divider">
          <span className="lh__divider-line" />
          <span className="lh__divider-label">Powering</span>
          <span className="lh__divider-line" />
        </div>

        {/* Infinite scroll marquee */}
        <div className="lh__marquee-wrap">
          <div className="lh__marquee-track">
            {logoLoop.map((logo, i) => (
              <div key={i} className="lh__logo-card">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{ objectFit: "contain", maxHeight: 38 }}
                  priority={i < logos.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`

        /* ═══════════ Root ═══════════ */
        .lh {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
        }

        /* ═══════════ LEFT PANEL ═══════════ */
        .lh__left {
          position: relative;
          flex: 0 0 62%;
          background: #06082c;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 72px;
          overflow: hidden;
        }

        /* ── Ambient orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(72px);
        }
        .orb-a {
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(61,114,252,0.28) 0%, transparent 65%);
          top: -180px; left: -100px;
          animation: drift-a 10s ease-in-out infinite;
        }
        .orb-b {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(92,176,233,0.2) 0%, transparent 65%);
          bottom: -120px; right: -80px;
          animation: drift-b 13s ease-in-out infinite;
        }
        .orb-c {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(102,105,216,0.22) 0%, transparent 65%);
          top: 45%; left: 55%;
          transform: translate(-50%, -50%);
          animation: drift-a 16s ease-in-out infinite reverse;
        }
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(24px, -24px) scale(1.08); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-18px, 18px) scale(1.06); }
        }

        /* ── Dot-grid texture ── */
        .grid-texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        /* ── Content ── */
        .lh__content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 560px;
          text-align: center;
        }

        /* Badge */
        .lh__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(61,114,252,0.1);
          border: 1px solid rgba(61,114,252,0.28);
          border-radius: 100px;
          font-size: 18.5px;
          font-weight: 900;
          color: rgba(255,255,255,0.7);
          margin-bottom: 26px;
          letter-spacing: 0.15px;
        }
        .lh__badge-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3D72FC;
          box-shadow: 0 0 10px rgba(61,114,252,0.9);
          flex-shrink: 0;
          animation: blink 2.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .lh__badge-sep { color: rgba(255,255,255,0.25); }

        /* Title */
        .lh__title {
          font-size: 66px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.08;
          margin: 0 0 22px;
          letter-spacing: -1.5px;
        }
        .lh__title-accent {
          background: linear-gradient(130deg, #7eb3ff 0%, #5CB0E9 40%, #3D72FC 75%, #6669D8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Description */
        .lh__desc {
          font-size: 15.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.78;
          margin: 0 auto 26px;
          max-width: 470px;
        }

        /* Steps */
        .lh__steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 0 0 30px;
          text-align: left;
        }
        .lh__step {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          backdrop-filter: blur(4px);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .lh__step:hover {
          background: rgba(61,114,252,0.1);
          border-color: rgba(61,114,252,0.3);
          transform: translateX(4px);
        }
        .lh__step-badge {
          flex-shrink: 0;
          width: 38px; height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          box-shadow: 0 4px 16px rgba(61,114,252,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11.5px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .lh__step-text {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.78);
          line-height: 1.4;
        }

        /* CTA */
        .lh__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 38px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.2px;
          box-shadow: 0 8px 28px rgba(61,114,252,0.45), 0 0 0 1px rgba(61,114,252,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lh__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(61,114,252,0.6), 0 0 0 1px rgba(92,176,233,0.4);
        }
        .lh__cta:active { transform: translateY(0); }
        .lh__cta-arrow {
          width: 17px; height: 17px;
          transition: transform 0.2s;
        }
        .lh__cta:hover .lh__cta-arrow { transform: translateX(3px); }

        /* ═══════════ RIGHT PANEL ═══════════ */
        .lh__right {
          position: relative;
          flex: 0 0 38%;
          background: #f8faff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 28px 24px;
          border-left: 1px solid #e0e6f8;
          overflow: hidden;
          gap: 0;
        }

        /* Ambient background glow */
        .lh__right-bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 35% at 50% 0%, rgba(61,114,252,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 60% 30% at 50% 100%, rgba(92,176,233,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── Brand (fixed top-center) ── */
        .lh__brand-anchor {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding-bottom: 18px;
        }
        .lh__brand-ring {
          width: 68px; height: 68px;
          border-radius: 20px;
          background: linear-gradient(145deg, #fffdf0, #fdf5d0);
          border: 1.5px solid rgba(184,134,11,0.3);
          box-shadow:
            0 4px 20px rgba(184,134,11,0.15),
            0 0 0 4px rgba(184,134,11,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lh__brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #a07008;
          letter-spacing: 1.5px;
          line-height: 1;
        }
        .lh__brand-tagline {
          font-size: 10.5px;
          font-weight: 600;
          color: #b8a060;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* ── Powering divider ── */
        .lh__divider {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          margin-bottom: 14px;
        }
        .lh__divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c8d4f0, transparent);
        }
        .lh__divider-label {
          font-size: 9.5px;
          font-weight: 800;
          color: #3D72FC;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Infinite scroll marquee ── */
        .lh__marquee-wrap {
          position: relative;
          z-index: 2;
          flex: 1;
          width: 100%;
          overflow: hidden;
          /* Fade top and bottom edges */
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 14%,
            black 86%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 14%,
            black 86%,
            transparent 100%
          );
        }

        .lh__marquee-track {
          display: flex;
          flex-direction: column;
          gap: 8px;
          animation: marquee-up 18s linear infinite;
          will-change: transform;
        }
        /* Pause on hover for readability */
        .lh__marquee-wrap:hover .lh__marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        /* Each logo card */
        .lh__logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 60px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e8edf8;
          border-radius: 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(61,114,252,0.03);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
          padding: 8px 20px;
        }
        .lh__logo-card:hover {
          border-color: rgba(61,114,252,0.22);
          box-shadow: 0 4px 16px rgba(61,114,252,0.1), 0 0 0 2px rgba(61,114,252,0.08);
          transform: scale(1.025);
          z-index: 1;
          position: relative;
        }

        /* ═══════════ RESPONSIVE ═══════════ */
        @media (max-width: 1100px) {
          .lh__left  { padding: 0 48px; }
          .lh__title { font-size: 54px; }
        }
        @media (max-width: 768px) {
          .lh {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .lh__left  { flex: none; padding: 64px 28px 52px; min-height: 60vh; }
          .lh__right { flex: none; min-height: 440px; padding: 32px 24px 40px; border-left: none; border-top: 1px solid #e4e8f4; }
          .lh__title { font-size: 44px; letter-spacing: -1px; }
          .lh__badge { font-size: 11.5px; gap: 6px; }
          .lh__desc  { font-size: 14.5px; }
        }
        @media (max-width: 480px) {
          .lh__title { font-size: 36px; }
          .lh__cta   { width: 100%; justify-content: center; }
          .lh__step  { padding: 10px 14px; }
        }

        /* ═══════════ PRINT ═══════════ */
        @media print {
          .lh { height: auto; overflow: visible; }
        }
      `}</style>
    </div>
  );
}
