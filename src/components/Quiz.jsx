import React from "react";
import { useQuiz } from "../context/QuizContext";

const Quiz = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    questions,
    nextQuestion,
    score,
    userAnswers,
    quizFinished,
    timeLeft,
    quizStarted,
    handleStartQuiz,
  } = useQuiz();

  // Render for when the quiz has not started yet
  if (!quizStarted) {
    return (
      <div className="container">
        <h1>Welcome to the Quiz!</h1>
        <button onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    );
  }

  // Render for when the quiz is finished
  if (quizFinished) {
    return (
      <div className="container">
        <h2>Quiz Finished</h2>
        <div className="bold">Your final score is: {score}</div>
        <div className="result">
          <h3>Results:</h3>
          {userAnswers.map((answer, index) => {
            const questionNumber =
              questions.findIndex((q) => q.question === answer.question) + 1;
            return (
              <div key={index}>
                <p>
                  <strong>Question {questionNumber}:</strong> {answer.question}
                </p>
                <p>
                  <strong>Your Answer:</strong> {answer.selectedAnswer}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {answer.correctAnswer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render for the ongoing quiz
  if (!currentQuestion) {
    return <div className="container">Loading...</div>; // Handle the loading state
  }

  return (
    <div className="container">
      <h2>
        Question {currentQuestionIndex + 1}: {currentQuestion.question}
      </h2>
      <div>Time Left: {timeLeft} seconds</div>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => nextQuestion(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
