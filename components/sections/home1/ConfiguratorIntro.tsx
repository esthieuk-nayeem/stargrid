"use client";

import { useRouter } from "next/navigation";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import Link from "next/link";

const pillars = [
  {
    icon: "icon-tick-inside-circle",
    title: "Saves Months of Work",
    text: "Commercial teams, project teams, and IT departments no longer need months to determine the right connectivity for global sites.",
  },
  {
    icon: "icon-tick-inside-circle",
    title: "No Deep Expertise Required",
    text: "It removes the complexity of combining cellular, satellite, and fixed connectivity — comprehensive knowledge across all fields is no longer necessary.",
  },
  {
    icon: "icon-tick-inside-circle",
    title: "Quality, Efficiency & Control",
    text: "A complete connectivity plan in 10 minutes — with quality built in and full control over every site configuration.",
  },
  {
    icon: "icon-tick-inside-circle",
    title: "Multi-Technology in One Plan",
    text: "Assign multiple types of connectivity to a single site. Cellular, fixed, and satellite — all in one comprehensive output.",
  },
];

export default function ConfiguratorIntro() {
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
    <>
      <section className="cfg-intro">
        <div className="cfg-intro__blob-1" />
        <div className="cfg-intro__blob-2" />

        <div className="container">

          {/* Section header */}
          <div className="section-title text-center sec-title-animation animation-style1" style={{ marginBottom: 64 }}>
            <div className="section-title__tagline-box">
              <div className="section-title__tagline-shape-1" />
              <span className="section-title__tagline">Connectivity Planner</span>
              <div className="section-title__tagline-shape-2" />
            </div>
            <AnimatedTitle>
              <h2 className="section-title__title title-animation">
                What is the StarGrid<br />
                <span>Connectivity Planner?</span>
              </h2>
            </AnimatedTitle>
          </div>

          <div className="row align-items-center">

            {/* Left — description */}
            <div className="col-xl-6 col-lg-6">
              <div className="cfg-intro__left">
                <p className="cfg-intro__lead">
                  The StarGrid Connectivity Planner is a digital tool that provides you a complete
                  connectivity plan for all your industrial sites, whether they are fixed locations
                  or moving vehicles.
                </p>
                <p className="cfg-intro__body">
                  The planner includes cellular, fixed and satellite connectivity and you can assign
                  multiple types of connectivity to one site. With 20 survey questions you can define
                  a complete global connectivity plan in <strong>10 minutes</strong>.
                </p>
                <p className="cfg-intro__body">
                  The StarGrid Connectivity Planner will save commercial teams, project teams, IT
                  departments months of time in determining the right connectivity for all your global
                  sites. It takes away the complexity of combining cellular, satellite and fixed
                  connectivity. A comprehensive expertise on all these fields is not necessary anymore.
                </p>
                <p className="cfg-intro__tagline-text">
                  The StarGrid Connectivity Planner saves time and gives you{" "}
                  <span>quality</span>, <span>efficiency</span> and <span>control</span>.
                </p>

                <div className="cfg-intro__btn-row">
                  <button className="thm-btn" onClick={handleStart}>
                    Launch Planner <span className="icon-right-arrow" />
                  </button>
                  <Link href="#cfg-how" className="cfg-intro__learn-link">
                    See how it works <span className="icon-right-arrow" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — benefit cards */}
            <div className="col-xl-6 col-lg-6">
              <div className="cfg-intro__right">
                {pillars.map((b, i) => (
                  <div key={i} className="cfg-intro__card">
                    <div className="cfg-intro__card-icon">
                      <span className={b.icon} />
                    </div>
                    <div className="cfg-intro__card-body">
                      <h4>{b.title}</h4>
                      <p>{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .cfg-intro {
          position: relative;
          padding: 120px 0;
          background: var(--techguru-black, #070c14);
          overflow: hidden;
        }
        .cfg-intro__blob-1 {
          position: absolute;
          width: 800px; height: 800px; border-radius: 50%;
          right: -200px; top: -150px;
          background: radial-gradient(circle, rgba(22,14,255,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .cfg-intro__blob-2 {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          left: -120px; bottom: -100px;
          background: radial-gradient(circle, rgba(102,105,216,0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .cfg-intro__left { padding-right: 56px; }

        /* Lead paragraph — big opener */
        .cfg-intro__lead {
          font-size: 20px;
          font-weight: 500;
          line-height: 1.8;
          color: rgba(255,255,255,0.92);
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        /* Body paragraphs */
        .cfg-intro__body {
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.65);
          margin-bottom: 18px;
        }
        .cfg-intro__body strong {
          color: rgba(255,255,255,0.9);
          font-weight: 700;
        }

        /* Closing tagline */
        .cfg-intro__tagline-text {
          font-size: 17px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          margin-top: 28px;
          margin-bottom: 0;
          line-height: 1.65;
          padding: 18px 22px;
          border-left: 3px solid #3D72FC;
          background: rgba(61,114,252,0.07);
          border-radius: 0 12px 12px 0;
        }
        .cfg-intro__tagline-text span {
          color: #5CB0E9;
          font-weight: 700;
        }

        .cfg-intro__btn-row {
          display: flex; align-items: center;
          gap: 28px; margin-top: 44px; flex-wrap: wrap;
        }
        .cfg-intro__learn-link {
          font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.55); text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: color 0.25s;
        }
        .cfg-intro__learn-link:hover { color: #5CB0E9; }

        /* Cards */
        .cfg-intro__right {
          display: grid; grid-template-columns: 1fr 1fr; gap: 22px;
        }
        .cfg-intro__card {
          display: flex; flex-direction: column; gap: 16px;
          padding: 32px 26px;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 22px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .cfg-intro__card:hover {
          border-color: rgba(61,114,252,0.45);
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(61,114,252,0.12), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .cfg-intro__card-icon {
          width: 52px; height: 52px; border-radius: 15px;
          background: linear-gradient(135deg, rgba(61,114,252,0.25), rgba(92,176,233,0.18));
          border: 1px solid rgba(92,176,233,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: #5CB0E9; flex-shrink: 0;
        }
        .cfg-intro__card-body h4 {
          font-size: 17px; font-weight: 700;
          color: #fff; margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        .cfg-intro__card-body p {
          font-size: 14px; line-height: 1.75;
          color: rgba(255,255,255,0.58); margin: 0;
        }

        @media (max-width: 1200px) {
          .cfg-intro__left { padding-right: 0; margin-bottom: 52px; }
        }
        @media (max-width: 600px) {
          .cfg-intro { padding: 70px 0; }
          .cfg-intro__right { grid-template-columns: 1fr; }
          .cfg-intro__lead { font-size: 17px; }
          .cfg-intro__body { font-size: 15px; }
        }
      `}</style>
    </>
  );
}
