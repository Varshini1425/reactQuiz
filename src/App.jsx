import React, { useEffect } from "react";
import MainSec from "./MainSec";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import { useReducer } from "react";
import StartScreen from "./StartScreen";
// import DateCounter from "./DateCounter";

const App = () => {
  const initialState = {
    questions: [],
    status: "loading",
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
      default:
        throw new Error("Action unknown");
    }
  }
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </MainSec>
    </div>
  );
};

export default App;
