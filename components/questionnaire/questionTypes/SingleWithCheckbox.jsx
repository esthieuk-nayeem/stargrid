"use client";

import { useState, useEffect } from "react";

export default function SingleWithCheckbox({ question, answer, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isHighTheftRisk, setIsHighTheftRisk] = useState(false);

  useEffect(() => {
    if (answer) {
      setSelectedOption(answer.option || '');
      setIsHighTheftRisk(answer.highTheftRisk || false);
    }
  }, [answer]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onAnswer(question.id, {
      option: option,
      highTheftRisk: isHighTheftRisk
    });
  };

  const handleCheckbox = () => {
    const newValue = !isHighTheftRisk;
    setIsHighTheftRisk(newValue);
    onAnswer(question.id, {
      option: selectedOption,
      highTheftRisk: newValue
    });
  };

  return (
    <div className="single-with-checkbox">
      <div className="single-with-checkbox__options">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option;
          
          return (
            <div
              key={index}
              className={`single-with-checkbox__option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelectOption(option)}
            >
              <div className="single-with-checkbox__option-radio">
                <div className="single-with-checkbox__option-radio-outer">
                  <div className="single-with-checkbox__option-radio-inner"></div>
                </div>
              </div>
              <div className="single-with-checkbox__option-content">
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOption && (
        <div className="single-with-checkbox__additional">
          <div
            className={`single-with-checkbox__checkbox ${isHighTheftRisk ? 'checked' : ''}`}
            onClick={handleCheckbox}
          >
            <div className="single-with-checkbox__checkbox-box">
              <div className="single-with-checkbox__checkbox-inner">
                <span className="icon-check"></span>
              </div>
            </div>
            <div className="single-with-checkbox__checkbox-label">
              <span>{question.additionalCheckbox}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .single-with-checkbox__options {
          display: grid;
          gap: 16px;
        }

        .single-with-checkbox__option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .single-with-checkbox__option:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(92, 176, 233, 0.3);
          transform: translateX(4px);
        }

        .single-with-checkbox__option.selected {
          background: rgba(61, 114, 252, 0.1);
          border-color: #3D72FC;
        }

        .single-with-checkbox__option.selected .single-with-checkbox__option-radio-outer {
          border-color: #3D72FC;
        }

        .single-with-checkbox__option.selected .single-with-checkbox__option-radio-inner {
          transform: scale(1);
          opacity: 1;
        }

        .single-with-checkbox__option-radio {
          position: relative;
          flex-shrink: 0;
        }

        .single-with-checkbox__option-radio-outer {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .single-with-checkbox__option-radio-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          transform: scale(0);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .single-with-checkbox__option-content {
          flex: 1;
        }

        .single-with-checkbox__option-content span {
          font-size: 16px;
          font-weight: 500;
          color: var(--techguru-white);
          line-height: 1.5;
        }

        .single-with-checkbox__additional {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
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

        .single-with-checkbox__checkbox {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(250, 86, 116, 0.05);
          border: 1px solid rgba(250, 86, 116, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .single-with-checkbox__checkbox:hover {
          background: rgba(250, 86, 116, 0.1);
          border-color: rgba(250, 86, 116, 0.3);
        }

        .single-with-checkbox__checkbox.checked {
          background: rgba(250, 86, 116, 0.15);
          border-color: #FA5674;
        }

        .single-with-checkbox__checkbox-box {
          position: relative;
          flex-shrink: 0;
        }

        .single-with-checkbox__checkbox-box {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(250, 86, 116, 0.4);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .single-with-checkbox__checkbox.checked .single-with-checkbox__checkbox-box {
          border-color: #FA5674;
          background: linear-gradient(135deg, #FA5674 0%, #6065D4 100%);
        }

        .single-with-checkbox__checkbox-inner {
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          color: var(--techguru-white);
          font-size: 14px;
        }

        .single-with-checkbox__checkbox.checked .single-with-checkbox__checkbox-inner {
          opacity: 1;
          transform: scale(1);
        }

        .single-with-checkbox__checkbox-label {
          flex: 1;
        }

        .single-with-checkbox__checkbox-label span {
          font-size: 16px;
          font-weight: 600;
          color: var(--techguru-white);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .single-with-checkbox__checkbox-label span::before {
          content: '⚠';
          font-size: 18px;
          color: #FA5674;
        }

        @media (max-width: 768px) {
          .single-with-checkbox__option,
          .single-with-checkbox__checkbox {
            padding: 16px 18px;
          }

          .single-with-checkbox__option-content span,
          .single-with-checkbox__checkbox-label span {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
