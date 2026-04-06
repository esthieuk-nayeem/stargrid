"use client";

import AnimatedTitle from "@/components/elements/AnimatedTitle";
import { useRouter } from "next/navigation";

const steps = [
  {
    num: "01",
    title: "Complete Your First Site",
    text: "Start with selecting one site and complete all survey questions. The 20-question survey takes around 10 minutes per site.",
    tag: "~10 min",
  },
  {
    num: "02",
    title: "Add More Sites",
    text: "After completing the first site, create a new second site by copying the settings of your first site and adjusting them to the new site.",
    tag: "Copy & adjust",
  },
  {
    num: "03",
    title: "Build Your Full Plan",
    text: "Complete the process with as many sites as you need — fixed locations, moving vehicles, or anything in between.",
    tag: "No limit",
  },
];

export default function ConfiguratorHow() {
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
      <section className="cfg-how" id="cfg-how">
        <div className="cfg-how__bg" />

        <div className="container">
          <div className="section-title text-center sec-title-animation animation-style1">
            <div className="section-title__tagline-box">
              <div className="section-title__tagline-shape-1" />
              <span className="section-title__tagline">How To Use It</span>
              <div className="section-title__tagline-shape-2" />
            </div>
            <AnimatedTitle>
              <h2 className="section-title__title title-animation">
                Three Simple Steps to Your <br />
                <span>Complete Connectivity Plan</span>
              </h2>
            </AnimatedTitle>
          </div>

          <div className="cfg-how__steps">
            {steps.map((s, i) => (
              <div key={i} className="cfg-how__step">
                <div className="cfg-how__step-top">
                  <div className="cfg-how__step-num">{s.num}</div>
                  {i < steps.length - 1 && <div className="cfg-how__connector" />}
                </div>
                <div className="cfg-how__step-body">
                  <span className="cfg-how__tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cfg-how__cta">
            <button className="thm-btn" onClick={handleStart}>
              Start Configuring <span className="icon-right-arrow" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .cfg-how {
          position: relative;
          padding: 120px 0 100px;
          background: #070c14;
          overflow: hidden;
        }
        .cfg-how__bg {
          position: absolute; inset: 0;
          background: linear-gradient(
            180deg,
            rgba(61,114,252,0.05) 0%,
            transparent 40%,
            transparent 60%,
            rgba(92,176,233,0.04) 100%
          );
          pointer-events: none;
        }

        .cfg-how__steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 72px;
        }

        .cfg-how__step {
          padding: 0 36px;
          display: flex;
          flex-direction: column;
        }

        .cfg-how__step-top {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 28px;
        }

        .cfg-how__step-num {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC, #5CB0E9);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 800; color: #fff;
          box-shadow: 0 8px 28px rgba(61,114,252,0.35);
          flex-shrink: 0; position: relative; z-index: 1;
        }

        .cfg-how__connector {
          position: absolute;
          left: 72px;
          width: calc(100% + 36px);
          height: 2px;
          background: linear-gradient(90deg, rgba(61,114,252,0.5), rgba(92,176,233,0.15));
          border-radius: 1px;
        }

        .cfg-how__tag {
          display: inline-flex;
          padding: 4px 14px;
          background: rgba(61,114,252,0.12);
          border: 1px solid rgba(61,114,252,0.28);
          border-radius: 20px;
          font-size: 12px; font-weight: 600; color: #5CB0E9;
          margin-bottom: 14px; letter-spacing: 0.3px;
        }
        .cfg-how__step-body h3 {
          font-size: 20px; font-weight: 700; color: #fff;
          margin: 0 0 12px; line-height: 1.3;
        }
        .cfg-how__step-body p {
          font-size: 15px; line-height: 1.75;
          color: rgba(255,255,255,0.55); margin: 0;
        }

        .cfg-how__cta { text-align: center; margin-top: 72px; }

        @media (max-width: 992px) {
          .cfg-how__steps { grid-template-columns: 1fr; gap: 48px; }
          .cfg-how__connector { display: none; }
          .cfg-how__step {
            padding: 0 0 0 28px;
            border-left: 2px solid rgba(61,114,252,0.3);
          }
        }
        @media (max-width: 576px) {
          .cfg-how { padding: 70px 0 60px; }
        }
      `}</style>
    </>
  );
}
