"use client";

import { useState, useEffect } from "react";

export default function DualSingleChoice({ question, answer, onAnswer }) {
  const [selections, setSelections] = useState({
    downlink: null,
    uplink: null
  });

  useEffect(() => {
    if (answer) {
      setSelections({
        downlink: answer.downlink || null,
        uplink: answer.uplink || null
      });
    }
  }, [answer]);

  const handleSelect = (type, option) => {
    // Handle both string and object options
    const optionValue = typeof option === 'object' ? (option.value || option.label) : option;
    
    const newSelections = {
      ...selections,
      [type]: typeof option === 'object' ? option : { value: optionValue, label: optionValue }
    };
    
    setSelections(newSelections);
    onAnswer(question.id, newSelections);
  };

  const getOptionValue = (option) => {
    if (typeof option === 'string') return option;
    return option.value || option.label;
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.label;
  };

  const isSelected = (type, option) => {
    const currentSelection = selections[type];
    if (!currentSelection) return false;
    
    const optionValue = getOptionValue(option);
    
    if (typeof currentSelection === 'string') {
      return currentSelection === optionValue;
    }
    
    if (typeof currentSelection === 'object') {
      return currentSelection.value === optionValue || currentSelection.label === optionValue;
    }
    
    return false;
  };

  return (
    <div className="dual-single-choice">
      {question.subQuestions.map((subQuestion, subIndex) => {
        const type = subQuestion.label.toLowerCase();
        
        return (
          <div key={subIndex} className="dual-single-choice__section">
            <div className="dual-single-choice__label">
              <span className="dual-single-choice__label-icon">
                {type === 'downlink' ? '↓' : '↑'}
              </span>
              <h4>{subQuestion.label}</h4>
            </div>
            
            <div className="dual-single-choice__options">
              {subQuestion.options.map((option, optIndex) => {
                const selected = isSelected(type, option);
                
                return (
                  <div
                    key={optIndex}
                    className={`dual-single-choice__option ${selected ? 'selected' : ''}`}
                    onClick={() => handleSelect(type, option)}
                  >
                    <div className="dual-single-choice__option-radio">
                      <div className="dual-single-choice__option-radio-outer">
                        <div className="dual-single-choice__option-radio-inner"></div>
                      </div>
                    </div>
                    <div className="dual-single-choice__option-content">
                      <span>{getOptionLabel(option)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .dual-single-choice {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .dual-single-choice__section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dual-single-choice__label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dual-single-choice__label-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          color: var(--techguru-white);
          font-size: 18px;
          font-weight: 700;
        }

        .dual-single-choice__label h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--techguru-white);
          margin: 0;
        }

        .dual-single-choice__options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .dual-single-choice__option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dual-single-choice__option:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(92, 176, 233, 0.3);
          transform: translateY(-2px);
        }

        .dual-single-choice__option.selected {
          background: rgba(61, 114, 252, 0.1);
          border-color: #3D72FC;
        }

        .dual-single-choice__option.selected .dual-single-choice__option-radio-outer {
          border-color: #3D72FC;
        }

        .dual-single-choice__option.selected .dual-single-choice__option-radio-inner {
          transform: scale(1);
          opacity: 1;
        }

        .dual-single-choice__option-radio {
          position: relative;
          flex-shrink: 0;
        }

        .dual-single-choice__option-radio-outer {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .dual-single-choice__option-radio-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          transform: scale(0);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .dual-single-choice__option-content {
          flex: 1;
        }

        .dual-single-choice__option-content span {
          font-size: 15px;
          font-weight: 500;
          color: var(--techguru-white);
        }

        @media (max-width: 768px) {
          .dual-single-choice__options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}