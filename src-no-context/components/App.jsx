import MainSec from "./MainSec";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

// import DateCounter from "./DateCounter";

const App = () => {
  const { status } = useQuiz();
  console.log("App status", status);
  console.log(useQuiz());
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <MainSec>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </MainSec>
    </div>
  );
};

export default App;
