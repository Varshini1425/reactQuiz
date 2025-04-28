import React, { useEffect } from "react";
import MainSec from "./MainSec";
import Header from "./Header";
import { useReducer } from "react";
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
          status: "failed",
        };
      default:
        throw new Error("Action unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
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
      <MainSec />
    </div>
  );
};

export default App;
