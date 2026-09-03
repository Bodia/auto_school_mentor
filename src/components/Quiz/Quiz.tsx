"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { quizQuestions, Question } from '@/data/quizQuestions';
import FadeUp from '../animations/FadeUp';
import './Quiz.css';

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const initQuiz = () => {
    const shuffled = shuffleArray(quizQuestions).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setErrors(0);
    setIsFinished(false);
    setIsStarted(true);
  };

  // Initialize quiz with 10 random questions on client mount to prevent SSR hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initQuiz();
  }, []);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(index);
    if (index !== questions[currentIndex].correctAnswerIndex) {
      setErrors((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (!isStarted || questions.length === 0) {
    return (
      <div className="quiz-container text-center">
        <h2 className="section-title">Завантаження...</h2>
      </div>
    );
  }

  if (isFinished) {
    const isSuccess = errors <= 2;
    return (
      <FadeUp>
        <div className="quiz-container quiz-result">
          <h2 className="quiz-result-title">
            {isSuccess ? "Вітаємо! Ви чудово впорались 🎉" : "Тест завершено"}
          </h2>
          <div className="quiz-result-score">
            Ви зробили <strong>{errors}</strong> {errors === 1 ? "помилку" : (errors > 1 && errors < 5) ? "помилки" : "помилок"} з {questions.length}.
          </div>
          <p className="quiz-result-message">
            {isSuccess 
              ? "У вас чудові знання ПДР. Якщо ви хочете закріпити їх на практиці перед іспитом або відчути себе впевненіше за кермом, запишіться на заняття-знайомство!"
              : "Схоже, деякі теми ще потребують уваги. На іспиті допускається не більше 2 помилок. Запишіться на заняття зі мною, і ми розберемо всі складні моменти, щоб ви склали іспит з першого разу!"}
          </p>
          <div className="quiz-result-actions">
            <Link href="/booking" className="btn btn-primary">
              Забронювати заняття
            </Link>
            <button onClick={initQuiz} className="btn btn-outline">
              Спробувати ще раз
            </button>
          </div>
        </div>
      </FadeUp>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedOption !== null;

  return (
    <FadeUp>
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress">Питання {currentIndex + 1} з {questions.length}</div>
          <div className="quiz-errors">Помилок: {errors} / 2</div>
        </div>

        <h3 className="quiz-question-text">{currentQuestion.text}</h3>

        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => {
            let className = "quiz-option";
            if (isAnswered) {
              if (index === currentQuestion.correctAnswerIndex) {
                className += " correct";
              } else if (index === selectedOption) {
                className += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="quiz-feedback">
            <div className="quiz-explanation">
              <strong>Пояснення:</strong> {currentQuestion.explanation}
            </div>
            <button onClick={handleNext} className="btn btn-primary btn-next">
              {currentIndex < questions.length - 1 ? "Наступне питання" : "Завершити тест"}
            </button>
          </div>
        )}
      </div>
    </FadeUp>
  );
}
