import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src-no-context/components/App.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";

console.log("Index mounted");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
);
