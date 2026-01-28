"use client";

export default function SingleChoice({ question, answer, onAnswer, showOtherInput, setShowOtherInput }) {
  const handleSelect = (option) => {
    const value = typeof option === 'string' ? option : option.value || option.label;
    
    if (typeof option === 'object' && option.hasInput) {
      setShowOtherInput(true);
      onAnswer(question.id, value);
    } else {
      setShowOtherInput(false);
      onAnswer(question.id, value);
    }
  };

  const handleOtherInput = (e) => {
    onAnswer(question.id, `Other: ${e.target.value}`);
  };

  const getOptionValue = (option) => {
    if (typeof option === 'string') return option;
    return option.value || option.label;
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.label;
  };

  const getOptionDescription = (option) => {
    if (typeof option === 'object' && option.description) {
      return option.description;
    }
    return null;
  };

  return (
    <div className="single-choice">
      <div className="single-choice__options">
        {question.options.map((option, index) => {
          const optionValue = getOptionValue(option);
          const isSelected = answer === optionValue || (answer && answer.startsWith('Other:') && optionValue === 'other');
          const hasDescription = getOptionDescription(option);
          
          return (
            <div
              key={index}
              className={`single-choice__option ${isSelected ? 'selected' : ''} ${hasDescription ? 'has-description' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <div className="single-choice__option-radio">
                <div className="single-choice__option-radio-outer">
                  <div className="single-choice__option-radio-inner"></div>
                </div>
              </div>
              <div className="single-choice__option-content">
                <span className="single-choice__option-label">
                  {getOptionLabel(option)}
                </span>
                {hasDescription && (
                  <span className="single-choice__option-description">
                    {getOptionDescription(option)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showOtherInput && answer && answer.startsWith('Other:') && (
        <div className="single-choice__other-input">
          <input
            type="text"
            placeholder="Please specify..."
            value={answer.replace('Other: ', '')}
            onChange={handleOtherInput}
            autoFocus
          />
        </div>
      )}

      <style jsx>{`
        .single-choice__options {
          display: grid;
          gap: 16px;
        }

        .single-choice__option {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .single-choice__option:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(92, 176, 233, 0.3);
          transform: translateX(4px);
        }

        .single-choice__option.selected {
          background: rgba(61, 114, 252, 0.1);
          border-color: #3D72FC;
        }

        .single-choice__option.selected .single-choice__option-radio-outer {
          border-color: #3D72FC;
        }

        .single-choice__option.selected .single-choice__option-radio-inner {
          transform: scale(1);
          opacity: 1;
        }

        .single-choice__option-radio {
          position: relative;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .single-choice__option-radio-outer {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .single-choice__option-radio-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          transform: scale(0);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .single-choice__option-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .single-choice__option-label {
          font-size: 16px;
          font-weight: 500;
          color: var(--techguru-white);
          line-height: 1.5;
        }

        .single-choice__option-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
        }

        .single-choice__other-input {
          margin-top: 20px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .single-choice__other-input input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: var(--techguru-white);
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        .single-choice__other-input input:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .single-choice__other-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .single-choice__option {
            padding: 16px 18px;
          }

          .single-choice__option-label {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
