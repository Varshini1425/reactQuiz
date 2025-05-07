import React from "react";
import { useQuiz } from "../context/QuizContext";

const NextButton = () => {
  const { answer, index, numQuestions, dispatch } = useQuiz();

  console.log("NextButton rendered", { answer, index });

  if (answer === null) return null;

  const isLast = index === numQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: isLast ? "finish" : "nextQuestion" })}
    >
      {isLast ? "Finish" : "Next"}
    </button>
  );
};

export default NextButton;
