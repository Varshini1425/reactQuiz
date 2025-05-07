import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

const Question = () => {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index]; // ✅ This fixes your crash
  console.log("Current question:", question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
