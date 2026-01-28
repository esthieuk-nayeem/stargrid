"use client";

export default function NavigationButtons({ 
  onPrevious, 
  onNext, 
  onSkip, 
  canGoPrevious, 
  canGoNext, 
  isAnswered,
  currentQuestion,
  totalQuestions
}) {
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="navigation-buttons">
      <div className="navigation-buttons__inner">
        <button
          className="navigation-buttons__btn navigation-buttons__btn--previous"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          <span className="icon-arrow-left"></span>
          Previous
        </button>

        <div className="navigation-buttons__right">
          {!isAnswered && (
            <button
              className="navigation-buttons__btn navigation-buttons__btn--skip"
              onClick={onSkip}
            >
              Skip for now
              <span className="icon-arrow-right"></span>
            </button>
          )}
          
          <button
            className={`navigation-buttons__btn navigation-buttons__btn--next ${isAnswered ? 'answered' : ''}`}
            onClick={onNext}
            disabled={!canGoNext}
          >
            {isLastQuestion ? 'Complete' : 'Next Question'}
            <span className="icon-arrow-right"></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navigation-buttons {
          position: relative;
          margin-top: 60px;
        }

        .navigation-buttons__inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .navigation-buttons__right {
          display: flex;
          gap: 12px;
        }

        .navigation-buttons__btn {
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
          white-space: nowrap;
        }

        .navigation-buttons__btn--previous {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--techguru-white);
        }

        .navigation-buttons__btn--previous:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(-4px);
        }

        .navigation-buttons__btn--previous:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .navigation-buttons__btn--skip {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
        }

        .navigation-buttons__btn--skip:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
          color: var(--techguru-white);
        }

        .navigation-buttons__btn--next {
          background: rgba(61, 114, 252, 0.3);
          border: 1px solid rgba(61, 114, 252, 0.5);
          color: var(--techguru-white);
          position: relative;
          overflow: hidden;
        }

        .navigation-buttons__btn--next.answered {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-color: transparent;
        }

        .navigation-buttons__btn--next:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(61, 114, 252, 0.4);
        }

        .navigation-buttons__btn--next.answered:hover:not(:disabled) {
          box-shadow: 0 12px 30px rgba(61, 114, 252, 0.5);
        }

        .navigation-buttons__btn--next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .navigation-buttons__btn span[class^="icon-"] {
          font-size: 14px;
          transition: transform 0.3s ease;
        }

        .navigation-buttons__btn--previous:hover:not(:disabled) span {
          transform: translateX(-3px);
        }

        .navigation-buttons__btn--next:hover:not(:disabled) span,
        .navigation-buttons__btn--skip:hover span {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .navigation-buttons__inner {
            flex-direction: column;
          }

          .navigation-buttons__right {
            width: 100%;
            flex-direction: column;
          }

          .navigation-buttons__btn {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
