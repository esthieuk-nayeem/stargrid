"use client";

export default function BooleanChoice({ question, answer, onAnswer }) {
  const handleSelect = (option) => {
    onAnswer(question.id, option);
  };

  return (
    <div className="boolean-choice">
      <div className="boolean-choice__options">
        {question.options.map((option, index) => {
          const isSelected = answer === option;
          const isYes = option.toLowerCase() === 'yes';
          
          return (
            <div
              key={index}
              className={`boolean-choice__option ${isSelected ? 'selected' : ''} ${isYes ? 'yes' : 'no'}`}
              onClick={() => handleSelect(option)}
            >
              <div className="boolean-choice__option-icon">
                <span className={isYes ? 'icon-check' : 'icon-close'}></span>
              </div>
              <div className="boolean-choice__option-content">
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .boolean-choice__options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 500px;
        }

        .boolean-choice__option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 40px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .boolean-choice__option::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(61, 114, 252, 0.1) 0%, rgba(92, 176, 233, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .boolean-choice__option:hover {
          border-color: rgba(92, 176, 233, 0.4);
          transform: translateY(-4px);
        }

        .boolean-choice__option:hover::before {
          opacity: 1;
        }

        .boolean-choice__option.selected {
          border-color: #3D72FC;
        }

        .boolean-choice__option.selected::before {
          opacity: 1;
        }

        .boolean-choice__option.selected.yes {
          background: rgba(92, 176, 233, 0.15);
          border-color: #5CB0E9;
        }

        .boolean-choice__option.selected.no {
          background: rgba(250, 86, 116, 0.15);
          border-color: #FA5674;
        }

        .boolean-choice__option-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .boolean-choice__option.selected .boolean-choice__option-icon {
          background: linear-gradient(135deg, #3D72FC 0%, #5CB0E9 100%);
          border-color: transparent;
          transform: scale(1.1);
        }

        .boolean-choice__option.selected.yes .boolean-choice__option-icon {
          background: linear-gradient(135deg, #5CB0E9 0%, #3D72FC 100%);
        }

        .boolean-choice__option.selected.no .boolean-choice__option-icon {
          background: linear-gradient(135deg, #FA5674 0%, #6065D4 100%);
        }

        .boolean-choice__option-icon span {
          font-size: 28px;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }

        .boolean-choice__option.selected .boolean-choice__option-icon span {
          color: var(--techguru-white);
        }

        .boolean-choice__option-content {
          position: relative;
          z-index: 1;
        }

        .boolean-choice__option-content span {
          font-size: 20px;
          font-weight: 600;
          color: var(--techguru-white);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .boolean-choice__options {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .boolean-choice__option {
            padding: 30px 20px;
          }

          .boolean-choice__option-icon {
            width: 50px;
            height: 50px;
          }

          .boolean-choice__option-icon span {
            font-size: 24px;
          }

          .boolean-choice__option-content span {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
