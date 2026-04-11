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

      {/* ── Left Panel ─────────────────────────────────────────────────── */}
      <div className="lh__left">
        <div className="lh__content">

          <p className="lh__eyebrow">
            StarGrid 100% Connectivity<br />
            Cellular – Satellite - Fixed
          </p>

          <h1 className="lh__title">
            Connectivity<br />Planner App
          </h1>

          <p className="lh__desc">
            Use the 20-questions tool, make a connectivity plan
            for your use case and receive instantly your personal
            multi-connectivity proposal within 30 minutes
          </p>

          <ol className="lh__steps">
            <li>Complete your first Site</li>
            <li>Add and copy more Sites</li>
            <li>Get your Connectivity Plan and Proposal</li>
          </ol>

          <button className="lh__cta" onClick={handleStart}>
            Get Started
          </button>

        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────────────── */}
      <div className="lh__right">
        <div className="lh__right-inner">

          <div className="lh__brand">
            <Image
              src="/assets/images/icon/icon.png"
              alt="StarGrid"
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />
            <span className="lh__brand-name">StarGrid</span>
          </div>

          <p className="lh__powering">Powering</p>

          <div className="lh__logos">
            {logos.map((logo, i) => (
              <div key={i} className="lh__logo-row">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{ objectFit: "contain", maxHeight: 46 }}
                  priority
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        /* ── Full-viewport split ─────────────────────────── */
        .lh {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        /* ── Left — dark navy ──────────────────────────────── */
        .lh__left {
          flex: 0 0 63%;
          background: #0e1470;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 72px;
        }
        .lh__content {
          width: 100%;
          max-width: 540px;
          text-align: center;
        }

        .lh__eyebrow {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          line-height: 1.55;
          margin: 0 0 28px;
        }

        .lh__title {
          font-size: 62px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 28px;
          letter-spacing: -0.5px;
        }

        .lh__desc {
          font-size: 17px;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          margin: 0 0 24px;
        }

        .lh__steps {
          list-style: decimal;
          text-align: left;
          display: inline-block;
          padding-left: 24px;
          margin: 0 0 36px;
          color: rgba(255,255,255,0.82);
          font-size: 16px;
          line-height: 2.1;
        }

        .lh__cta {
          display: inline-block;
          padding: 15px 56px;
          background: rgba(80,120,210,0.45);
          border: 2px solid rgba(110,150,240,0.55);
          border-radius: 8px;
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          letter-spacing: 0.2px;
        }
        .lh__cta:hover {
          background: rgba(80,120,210,0.65);
          transform: translateY(-2px);
        }

        /* ── Right — white ─────────────────────────────────── */
        .lh__right {
          flex: 0 0 37%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 40px;
          border-left: 1px solid #e8eaf0;
        }
        .lh__right-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 280px;
        }

        .lh__brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .lh__brand-name {
          font-size: 26px;
          font-weight: 800;
          color: #b8860b;
          letter-spacing: 0.5px;
        }

        .lh__powering {
          font-size: 14px;
          font-weight: 600;
          color: #3D72FC;
          margin: 0 0 16px;
          letter-spacing: 0.3px;
        }

        .lh__logos {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .lh__logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 6px 12px;
        }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 1024px) {
          .lh__left { padding: 40px 48px; }
          .lh__title { font-size: 50px; }
        }
        @media (max-width: 768px) {
          .lh {
            flex-direction: column;
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .lh__left {
            flex: none;
            padding: 60px 28px 48px;
          }
          .lh__right {
            flex: none;
            padding: 40px 28px 60px;
            border-left: none;
            border-top: 1px solid #e8eaf0;
          }
          .lh__title { font-size: 40px; }
          .lh__eyebrow { font-size: 15px; }
          .lh__desc { font-size: 15px; }
          .lh__logos { gap: 10px; }
        }
        @media (max-width: 480px) {
          .lh__title { font-size: 34px; }
          .lh__cta { width: 100%; }
        }
      `}</style>
    </div>
  );
}
