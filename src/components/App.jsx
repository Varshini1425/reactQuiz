import React, { useEffect } from "react";
import MainSec from "./MainSec";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import { useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
// import DateCounter from "./DateCounter";

const App = () => {
  const initialState = {
    questions: [],

    // 'loading', 'ready', 'error', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "newAnswer": {
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      }
      default:
        throw new Error("Action unknown");
    }
  }
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  useEffect(() => {
    fetch(`http://localhost:5174/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <MainSec>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </MainSec>
    </div>
  );
};

export default App;
