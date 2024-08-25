import { createContext, useState, useContext, useEffect } from "react";

// Create a context for the quiz
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  // Initialize questions and states
  const [questions] = useState([
    {
      id: 1,
      question: "What is React?",
      options: ["Library", "Framework", "Language"],
      answer: "Library",
    },
    {
      id: 2,
      question: "What is JSX?",
      options: [
        "JavaScript Syntax Extension",
        "CSS Preprocessor",
        "JavaScript Framework",
      ],
      answer: "JavaScript Syntax Extension",
    },
    {
      id: 3,
      question: "What is the virtual DOM?",
      options: [
        "A real DOM",
        "A lightweight copy of the real DOM",
        "A server-side rendering technique",
      ],
      answer: "A lightweight copy of the real DOM",
    },
    {
      id: 4,
      question:
        "Which method is used to update the state in a class component?",
      options: ["setState", "useState", "updateState"],
      answer: "setState",
    },
    {
      id: 5,
      question: "How do you create a functional component?",
      options: [
        "function MyComponent() {}",
        "class MyComponent extends React.Component",
        "const MyComponent = () => {}",
      ],
      answer: "function MyComponent() {}",
    },
    {
      id: 6,
      question:
        "What hook is used for managing state in functional components?",
      options: ["useEffect", "useState", "useReducer"],
      answer: "useState",
    },
    {
      id: 7,
      question: "What is the purpose of the useEffect hook?",
      options: [
        "To manage state",
        "To perform side effects",
        "To handle events",
      ],
      answer: "To perform side effects",
    },
    {
      id: 8,
      question: "How can you pass data to a child component?",
      options: ["Props", "State", "Context"],
      answer: "Props",
    },
    {
      id: 9,
      question: "What does the useReducer hook do?",
      options: [
        "Manages side effects",
        "Manages state in a functional component",
        "Handles routing",
      ],
      answer: "Manages state in a functional component",
    },
    {
      id: 10,
      question: "What is React Router used for?",
      options: [
        "State management",
        "Routing in single-page applications",
        "Server-side rendering",
      ],
      answer: "Routing in single-page applications",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            moveToNextQuestion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [quizStarted, quizFinished, currentQuestionIndex]);

  // Move to the next question
  const moveToNextQuestion = () => {
    const { answer, question } = questions[currentQuestionIndex];
    setUserAnswers((prev) => [
      ...prev,
      { question, selectedAnswer: "Time up", correctAnswer: answer },
    ]);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setQuizFinished(true);
    }
  };

  // Start the quiz
  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setQuizFinished(false);
    setQuizStarted(true);
    setTimeLeft(10);
  };

  // Handle answer selection
  const nextQuestion = (selectedOption) => {
    const { answer, question } = questions[currentQuestionIndex];
    setUserAnswers((prev) => [
      ...prev,
      { question, selectedAnswer: selectedOption, correctAnswer: answer },
    ]);

    if (selectedOption === answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setQuizFinished(true);
    }
  };

  // Context value
  const value = {
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    score,
    userAnswers,
    quizFinished,
    timeLeft,
    quizStarted,
    handleStartQuiz,
    nextQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook to use the quiz context
export const useQuiz = () => useContext(QuizContext);
