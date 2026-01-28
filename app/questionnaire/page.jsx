"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/questionnaire/QuestionCard";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import NavigationButtons from "@/components/questionnaire/NavigationButtons";
import { questionnaireData } from "@/data/questionnaireData";

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const totalQuestions = questionnaireData.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Check if current question should be shown based on conditional logic
  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;
    if (question.showWhen) {
      return question.showWhen(answers);
    }
    return true;
  };

  // Skip questions that shouldn't be shown
  useEffect(() => {
    const question = questionnaireData[currentQuestion];
    if (question && !shouldShowQuestion(question)) {
      if (direction === "forward" && currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else if (direction === "backward" && currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      }
    }
  }, [currentQuestion, answers, direction]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    console.log(questionId);
    console.log(answer);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Navigate to site summary or contact form
      router.push("/questionnaire/contact");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection("backward");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const currentQuestionData = questionnaireData[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  const isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "";

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-page__bg-shape"></div>
      <div className="questionnaire-page__bg-shape-2"></div>
      
      <div className="container">
        <div className="questionnaire-page__inner">
          {/* Header */}
          <div className="questionnaire-page__header">
            <div className="questionnaire-page__logo">
              <h2>Connectivity Configurator</h2>
            </div>
            <div className="questionnaire-page__progress-info">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={progress} />

          {/* Question Card */}
          <div className={`questionnaire-page__content ${isAnimating ? 'animating' : ''} ${direction}`}>
            {currentQuestionData && (
              <QuestionCard
                question={currentQuestionData}
                answer={currentAnswer}
                onAnswer={handleAnswer}
              />
            )}
          </div>

          {/* Navigation */}
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSkip={handleSkip}
            canGoPrevious={currentQuestion > 0}
            canGoNext={true}
            isAnswered={isAnswered}
            currentQuestion={currentQuestion + 1}
            totalQuestions={totalQuestions}
          />
        </div>
      </div>

      <style jsx>{`
        .questionnaire-page {
          position: relative;
          min-height: 100vh;
          background-color: var(--techguru-black);
          padding: 60px 0;
          overflow: hidden;
        }

        .questionnaire-page__bg-shape {
          position: absolute;
          width: 927px;
          height: 927px;
          right: -270px;
          top: -40px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(22, 14, 255, 0.1539) 0%, rgba(22, 14, 255, 0) 87.1%);
          z-index: 0;
        }

        .questionnaire-page__bg-shape-2 {
          position: absolute;
          left: 24.95%;
          right: 24.95%;
          top: 30%;
          bottom: -11.72%;
          opacity: .30;
          filter: blur(120px);
          background: radial-gradient(50% 50% at 50% 50%, #6669D8 0%, rgba(7, 12, 20, 0) 100%);
          z-index: 0;
        }

        .questionnaire-page__inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .questionnaire-page__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .questionnaire-page__logo h2 {
          font-size: 28px;
          font-weight: 700;
          color: var(--techguru-white);
          margin: 0;
          background: linear-gradient(270deg, #5CB0E9 0%, #3D72FC 100%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .questionnaire-page__progress-info {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .questionnaire-page__content {
          margin: 60px 0;
          transition: all 0.3s ease-in-out;
        }

        .questionnaire-page__content.animating.forward {
          opacity: 0;
          transform: translateX(30px);
        }

        .questionnaire-page__content.animating.backward {
          opacity: 0;
          transform: translateX(-30px);
        }

        @media (max-width: 768px) {
          .questionnaire-page {
            padding: 30px 0;
          }

          .questionnaire-page__header {
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px;
          }

          .questionnaire-page__logo h2 {
            font-size: 24px;
          }

          .questionnaire-page__content {
            margin: 40px 0;
          }
        }
      `}</style>
    </div>
  );
}