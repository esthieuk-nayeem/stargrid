"use client";

import { useState, useEffect } from "react";

export default function ScaleRating({ question, answer, onAnswer, showOtherInput, setShowOtherInput }) {
  const [ratings, setRatings] = useState({});
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (answer) {
      setRatings(answer);
      const otherKey = Object.keys(answer).find(key => key.startsWith('Other:'));
      if (otherKey) {
        setShowOtherInput(true);
        setOtherText(otherKey.replace('Other: ', ''));
      }
    }
  }, [answer]);

  const handleRating = (option, rating) => {
    const key = typeof option === 'string' ? option : option.value || option.label;
    
    const newRatings = {
      ...ratings,
      [key]: rating
    };

    if (typeof option === 'object' && option.hasInput && !showOtherInput) {
      setShowOtherInput(true);
    }

    setRatings(newRatings);
    onAnswer(question.id, newRatings);
  };

  const handleOtherInput = (e) => {
    const text = e.target.value;
    setOtherText(text);
    
    // Remove old "Other:" keys
    const newRatings = Object.keys(ratings).reduce((acc, key) => {
      if (!key.startsWith('Other:') && key !== 'other') {
        acc[key] = ratings[key];
      }
      return acc;
    }, {});

    if (text.trim() && ratings['other']) {
      newRatings[`Other: ${text}`] = ratings['other'];
    }

    setRatings(newRatings);
    onAnswer(question.id, newRatings);
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.label;
  };

  const getOptionValue = (option) => {
    if (typeof option === 'string') return option;
    return option.value || option.label;
  };

  return (
    <div className="scale-rating">
      <div className="scale-rating__header">
        <div className="scale-rating__labels">
          <span className="scale-rating__label-item"></span>
          {question.scaleLabels.map((label, index) => (
            <span key={index} className="scale-rating__label-item">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="scale-rating__options">
        {question.options.map((option, index) => {
          const optionValue = getOptionValue(option);
          const currentRating = ratings[optionValue];
          const isOtherOption = typeof option === 'object' && option.hasInput;
          
          return (
            <div key={index} className="scale-rating__row">
              <div className="scale-rating__option-label">
                <span>{getOptionLabel(option)}</span>
              </div>
              <div className="scale-rating__scale">
                {question.scaleRange.map((value) => (
                  <div
                    key={value}
                    className={`scale-rating__scale-item ${currentRating === value ? 'selected' : ''}`}
                    onClick={() => handleRating(option, value)}
                  >
                    <div className="scale-rating__scale-circle">
                      <div className="scale-rating__scale-inner"></div>
                    </div>
                    <span className="scale-rating__scale-number">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showOtherInput && ratings['other'] && (
        <div className="scale-rating__other-input">
          <input
            type="text"
            placeholder="Please specify other constraint/driver..."
            value={otherText}
            onChange={handleOtherInput}
            autoFocus
          />
        </div>
      )}

      <style jsx>{`
        .scale-rating {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .scale-rating__header {
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .scale-rating__labels {
          display: grid;
          grid-template-columns: 250px repeat(5, 1fr);
          gap: 8px;
          text-align: center;
        }

        .scale-rating__label-item {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .scale-rating__options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .scale-rating__row {
          display: grid;
          grid-template-columns: 250px repeat(5, 1fr);
          gap: 8px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
        }

        .scale-rating__row:last-child {
          border-bottom: none;
        }

        .scale-rating__option-label {
          padding-right: 20px;
        }

        .scale-rating__option-label span {
          font-size: 15px;
          font-weight: 500;
          color: var(--techguru-white);
          line-height: 1.4;
        }

        .scale-rating__scale {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          grid-column: 2 / -1;
        }

        .scale-rating__scale-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .scale-rating__scale-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .scale-rating__scale-circle {
          position: relative;
          width: 32px;
          height: 32px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .scale-rating__scale-item:hover .scale-rating__scale-circle {
          border-color: rgba(92, 176, 233, 0.5);
          transform: scale(1.1);
        }

        .scale-rating__scale-item.selected .scale-rating__scale-circle {
          border-color: #3D72FC;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
        }

        .scale-rating__scale-inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .scale-rating__scale-item.selected .scale-rating__scale-inner {
          opacity: 1;
          transform: scale(1);
          background: var(--techguru-white);
        }

        .scale-rating__scale-number {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .scale-rating__scale-item.selected .scale-rating__scale-number {
          color: #3D72FC;
          font-size: 14px;
        }

        .scale-rating__other-input {
          margin-top: 10px;
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

        .scale-rating__other-input input {
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

        .scale-rating__other-input input:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .scale-rating__other-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 1024px) {
          .scale-rating__labels,
          .scale-rating__row {
            grid-template-columns: 200px repeat(5, 1fr);
          }

          .scale-rating__option-label span {
            font-size: 14px;
          }

          .scale-rating__scale-circle {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 768px) {
          .scale-rating__labels {
            display: none;
          }

          .scale-rating__row {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .scale-rating__option-label {
            padding-right: 0;
          }

          .scale-rating__scale {
            grid-column: 1;
            justify-content: space-between;
          }

          .scale-rating__scale-item {
            padding: 4px;
          }
        }
      `}</style>
    </div>
  );
}
