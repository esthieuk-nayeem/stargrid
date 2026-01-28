"use client";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div 
          className="progress-bar__fill"
          style={{ width: `${progress}%` }}
        >
          <div className="progress-bar__glow"></div>
        </div>
      </div>
      <div className="progress-bar__percentage">
        <span>{Math.round(progress)}%</span>
      </div>

      <style jsx>{`
        .progress-bar {
          position: relative;
          margin-bottom: 40px;
        }

        .progress-bar__track {
          position: relative;
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar__fill {
          position: relative;
          height: 100%;
          background: linear-gradient(90deg, #3D72FC 0%, #5CB0E9 100%);
          border-radius: 10px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-bar__glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-bar__percentage {
          position: absolute;
          top: -30px;
          right: 0;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .progress-bar__track {
            height: 6px;
          }

          .progress-bar__percentage {
            font-size: 12px;
            top: -26px;
          }
        }
      `}</style>
    </div>
  );
}
