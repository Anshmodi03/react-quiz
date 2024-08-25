import React from "react";
import { QuizProvider } from "./context/QuizContext";
import Quiz from "./components/Quiz";

const App = () => (
  <QuizProvider>
    <div className="App">
      <h1>React Quiz</h1>
      <Quiz />
    </div>
  </QuizProvider>
);

export default App;
