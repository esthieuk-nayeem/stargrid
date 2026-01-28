"use client";

import { useState } from "react";
import SingleChoice from "./questionTypes/SingleChoice";
import MultipleChoice from "./questionTypes/MultipleChoice";
import LocationInput from "./questionTypes/LocationInput";
import DualSingleChoice from "./questionTypes/DualSingleChoice";
import BooleanChoice from "./questionTypes/BooleanChoice";
import ScaleRating from "./questionTypes/ScaleRating";
import SingleWithCheckbox from "./questionTypes/SingleWithCheckbox";

export default function QuestionCard({ question, answer, onAnswer }) {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const renderQuestionType = () => {
    switch (question.type) {
      case "single":
        return (
          <SingleChoice
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            showOtherInput={showOtherInput}
            setShowOtherInput={setShowOtherInput}
          />
        );
      
      case "multiple":
        return (
          <MultipleChoice
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            showOtherInput={showOtherInput}
            setShowOtherInput={setShowOtherInput}
          />
        );
      
      case "location":
        return (
          <LocationInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
          />
        );
      
      case "dual-single":
        return (
          <DualSingleChoice
            question={question}
            answer={answer}
            onAnswer={onAnswer}
          />
        );
      
      case "boolean":
        return (
          <BooleanChoice
            question={question}
            answer={answer}
            onAnswer={onAnswer}
          />
        );
      
      case "scale":
        return (
          <ScaleRating
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            showOtherInput={showOtherInput}
            setShowOtherInput={setShowOtherInput}
          />
        );
      
      case "single-with-checkbox":
        return (
          <SingleWithCheckbox
            question={question}
            answer={answer}
            onAnswer={onAnswer}
          />
        );
      
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="question-card">
      <div className="question-card__inner">
        {/* Section Badge */}
        {question.section && (
          <div className="question-card__section">
            <div className="question-card__section-badge">
              <span>{question.section}</span>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="question-card__question">
          <h3>{question.question}</h3>
        </div>

        {/* Question Input Area */}
        <div className="question-card__options">
          {renderQuestionType()}
        </div>
      </div>

      <style jsx>{`
        .question-card {
          position: relative;
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .question-card__inner {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 24px;
          padding: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .question-card__section {
          margin-bottom: 24px;
        }

        .question-card__section-badge {
          display: inline-block;
          position: relative;
          padding: 8px 20px;
          border-radius: 20px;
          background: rgba(61, 114, 252, 0.1);
          border: 1px solid rgba(61, 114, 252, 0.3);
        }

        .question-card__section-badge span {
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .question-card__question {
          margin-bottom: 40px;
        }

        .question-card__question h3 {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.4;
          color: var(--techguru-white);
          margin: 0;
        }

        .question-card__options {
          position: relative;
        }

        @media (max-width: 768px) {
          .question-card__inner {
            padding: 30px 20px;
          }

          .question-card__question h3 {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
