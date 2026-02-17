import { useState, useEffect, useMemo } from "react";
import { useApp } from "../../store/Context";
import { useGenerateGame } from "../../hooks/useGenerateGame";

import Numpad from "../../components/Numpad/Numpad";
import Question from "../../components/Question/Question";
import Timer from "../../components/Timer/Timer";
import { LevelList, MAX_QUESTION } from "../../store/types";
import { AppActions } from "../../store/Store";

import "./styles.css";

const MAX_TIME = 15 * 1000;

const MathTrainer = () => {
  const { state, dispatch } = useApp();

  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [questionCount, setQuestionCount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [gameRound, setGameRound] = useState(0);

  const questions = useGenerateGame({
    levelSelected: LevelList[state.selectedLevel - 1],
    maxQuestion: MAX_QUESTION,
    gameRound,
  });

  useEffect(() => {
    if (!state.isFinished && isFinished) {
      setInput("");
      setResult([]);
      setTimeLeft(MAX_TIME);
      setQuestionCount(1);
      setIsFinished(false);
      setGameRound((prev) => prev + 1);
    }
  }, [state.isFinished, isFinished]);

  const currentLevelDetail = useMemo(
    () => LevelList[state.selectedLevel - 1],
    [state.selectedLevel],
  );

  useEffect(() => {
    if (!state.isStarted || isFinished) return;

    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 100);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isStarted, timeLeft, isFinished]);

  const handleKeyPress = (key) => {
    if (input.length < 5) {
      setInput((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleNextQuestion = () => {
    if (isFinished) return;

    const newResult = handleResult();
    setInput("");

    if (questionCount >= MAX_QUESTION) {
      setIsFinished(true);
      dispatch(AppActions.setIsFinished(true));
      dispatch(AppActions.setCurrentMathList(newResult));
      return;
    }

    setTimeLeft(MAX_TIME);
    setQuestionCount((prev) => prev + 1);
  };

  const handleResetState = () => {
    setInput("");
    setTimeLeft(MAX_TIME);
    setQuestionCount(1);
    setResult([]);
    setIsFinished(false);
    dispatch(AppActions.setIsFinished(false));
  };

  const handleResult = () => {
    const currentQuestion = questions[questionCount - 1];
    const newResult = [
      ...result,
      {
        ...currentQuestion,
        result: parseInt(input) === currentQuestion.answer,
        timer: MAX_TIME - timeLeft,
        userInput: input,
      },
    ];
    setResult(newResult);
    return newResult;
  };

  if (!state.isStarted || state.isFinished) return null;

  return (
    <div className="app-container">
      <header className="header">
        <button
          className="icon-btn"
          onClick={() => {
            dispatch(AppActions.setIsStarted(false));
            dispatch(AppActions.setSelectedLevel(1));
            handleResetState();
          }}
        >
          ✕
        </button>

        <div className="header-center">
          <span
            className="mode-title"
            style={{
              color: currentLevelDetail.bgColor,
              textTransform: "uppercase",
            }}
          >
            {currentLevelDetail.name} mode
          </span>

          <div className="progress-dots">
            <div className="dot-wrapper">
              <span className="dot active"></span>
              <span className="dot active"></span>
              <span className="dot active"></span>
              <span className="dot current"></span>
            </div>

            <span className="dot text">
              {questionCount}/{MAX_QUESTION}
            </span>
          </div>
        </div>

        <button className="icon-btn">{/* {Icons.setting} */}</button>
      </header>

      <Timer key={questionCount} timeLeft={timeLeft} maxTime={MAX_TIME} />

      {questions?.length && (
        <Question answer={input} question={questions[questionCount - 1]} />
      )}

      <Numpad
        onHandleDelete={handleDelete}
        onHandleKeyPress={handleKeyPress}
        onHandleNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default MathTrainer;
