"use client";

import { useState, useEffect } from "react";

export default function MultipleChoice({ question, answer, onAnswer, showOtherInput, setShowOtherInput }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (answer && Array.isArray(answer)) {
      setSelectedOptions(answer);
      
      // Check for "other" option
      const otherItem = answer.find(a => 
        (typeof a === 'object' && a.value === 'other') ||
        (typeof a === 'string' && a.toLowerCase().includes('other:'))
      );
      
      if (otherItem) {
        setShowOtherInput(true);
        if (typeof otherItem === 'object' && otherItem.customText) {
          setOtherText(otherItem.customText);
        } else if (typeof otherItem === 'string') {
          setOtherText(otherItem.replace(/^Other:\s*/i, ''));
        }
      }
    }
  }, [answer, setShowOtherInput]);

  const handleToggle = (option) => {
    const optionValue = typeof option === 'object' ? (option.value || option.label) : option;
    
    // Check if already selected
    const isAlreadySelected = selectedOptions.some(item => {
      if (typeof item === 'string') {
        return item === optionValue;
      }
      if (typeof item === 'object') {
        return item.value === optionValue || item.label === optionValue;
      }
      return false;
    });

    let newSelected;
    
    if (isAlreadySelected) {
      // Remove from selection
      newSelected = selectedOptions.filter(item => {
        if (typeof item === 'string') {
          return item !== optionValue;
        }
        if (typeof item === 'object') {
          return item.value !== optionValue && item.label !== optionValue;
        }
        return true;
      });
      
      // If removing "other", hide input
      if (optionValue === 'other' || (typeof option === 'object' && option.hasInput)) {
        setShowOtherInput(false);
        setOtherText('');
      }
    } else {
      // Add to selection
      if (typeof option === 'object') {
        newSelected = [...selectedOptions, option];
        if (option.hasInput) {
          setShowOtherInput(true);
        }
      } else {
        newSelected = [...selectedOptions, optionValue];
      }
    }

    setSelectedOptions(newSelected);
    onAnswer(question.id, newSelected);
  };

  const handleOtherInput = (e) => {
    const text = e.target.value;
    setOtherText(text);
    
    // Find the "other" option in the original question
    const otherOption = question.options.find(opt => 
      typeof opt === 'object' && opt.hasInput
    );
    
    // Update selected options with new text
    const newSelected = selectedOptions.map(item => {
      if (typeof item === 'object' && item.value === 'other') {
        return {
          ...item,
          customText: text
        };
      }
      return item;
    });
    
    // If "other" not in selection yet, add it
    if (!selectedOptions.some(item => 
      (typeof item === 'object' && item.value === 'other') ||
      (typeof item === 'string' && item === 'other')
    ) && text.trim()) {
      newSelected.push({
        value: 'other',
        label: 'Other',
        customText: text,
        score: otherOption?.score || {}
      });
    }
    
    setSelectedOptions(newSelected);
    onAnswer(question.id, newSelected);
  };

  const getOptionValue = (option) => {
    if (typeof option === 'string') return option;
    return option.value || option.label;
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.label;
  };

  const isSelected = (option) => {
    const optionValue = getOptionValue(option);
    
    return selectedOptions.some(item => {
      if (typeof item === 'string') {
        return item === optionValue;
      }
      if (typeof item === 'object') {
        return item.value === optionValue || item.label === optionValue;
      }
      return false;
    });
  };

  return (
    <div className="multiple-choice">
      <div className="multiple-choice__options">
        {question.options.map((option, index) => {
          const selected = isSelected(option);
          
          return (
            <div
              key={index}
              className={`multiple-choice__option ${selected ? 'selected' : ''}`}
              onClick={() => handleToggle(option)}
            >
              <div className="multiple-choice__option-checkbox">
                <div className="multiple-choice__option-checkbox-outer">
                  <div className="multiple-choice__option-checkbox-inner">
                    <span className="icon-check">✓</span>
                  </div>
                </div>
              </div>
              <div className="multiple-choice__option-content">
                <span className="multiple-choice__option-label">
                  {getOptionLabel(option)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showOtherInput && selectedOptions.some(item => 
        (typeof item === 'object' && item.value === 'other') ||
        (typeof item === 'string' && item === 'other')
      ) && (
        <div className="multiple-choice__other-input">
          <input
            type="text"
            placeholder="Please specify..."
            value={otherText}
            onChange={handleOtherInput}
            autoFocus
          />
        </div>
      )}

      <style jsx>{`
        .multiple-choice__options {
          display: grid;
          gap: 16px;
        }

        .multiple-choice__option {
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

        .multiple-choice__option:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(92, 176, 233, 0.3);
          transform: translateX(4px);
        }

        .multiple-choice__option.selected {
          background: rgba(61, 114, 252, 0.1);
          border-color: #3D72FC;
        }

        .multiple-choice__option.selected .multiple-choice__option-checkbox-outer {
          border-color: #3D72FC;
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
        }

        .multiple-choice__option.selected .multiple-choice__option-checkbox-inner {
          opacity: 1;
          transform: scale(1);
        }

        .multiple-choice__option-checkbox {
          position: relative;
          flex-shrink: 0;
        }

        .multiple-choice__option-checkbox-outer {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .multiple-choice__option-checkbox-inner {
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
          color: var(--techguru-white);
          font-size: 14px;
        }

        .multiple-choice__option-content {
          flex: 1;
        }

        .multiple-choice__option-label {
          font-size: 16px;
          font-weight: 500;
          color: var(--techguru-white);
          line-height: 1.5;
        }

        .multiple-choice__other-input {
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

        .multiple-choice__other-input input {
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

        .multiple-choice__other-input input:focus {
          border-color: #3D72FC;
          background: rgba(255, 255, 255, 0.08);
        }

        .multiple-choice__other-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .multiple-choice__option {
            padding: 16px 18px;
          }

          .multiple-choice__option-label {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}