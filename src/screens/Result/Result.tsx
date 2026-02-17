import { useMemo } from "react";
import Circle from "../../components/Circle";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import Stats from "../../components/Stats/Stats";
import { useApp } from "../../store/Context";
import { AppActions } from "../../store/Store";

import { useSound } from "../../hooks/useSound";
import submitClickMp3 from "../../assets/sounds/submit-click.mp3";
import normalClickMp3 from "../../assets/sounds/normal-click.mp3";

import "./styles.css";
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const RefreshIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const ResultScreen = () => {
  const { state, dispatch } = useApp();
  const playClickButtonSubmitSound = useSound(submitClickMp3);
  const playClickKeynumSound = useSound(normalClickMp3);
  const scoreData = useMemo(() => {
    const list = state.currentMathList;
    const total = list.length;
    if (total === 0)
      return { percent: 0, solved: 0, time: "0:00", accuracy: "0%" };

    const correctCount = list.filter((item) => item.result).length;
    const percent = Math.round((correctCount / total) * 100);
    const totalMs = list.reduce((sum, item) => sum + item.timer, 0);
    const totalSeconds = Math.floor(totalMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const time = `${minutes}:${String(seconds).padStart(2, "0")}`;

    return {
      percent,
      solved: correctCount,
      time,
      accuracy: `${percent}%`,
    };
  }, [state.currentMathList]);

  if (!state.isFinished) return null;

  return (
    <div className="result-container">
      <header className="res-header">
        <button className="icon-btn-circle">✕</button>
        <span className="res-title">Result</span>
        <div style={{ width: 28 }}></div>
      </header>

      <Circle percent={scoreData.percent} />
      <Stats
        solved={scoreData.solved}
        accuracy={scoreData.accuracy}
        time={scoreData.time}
      />

      <div className="review-section">
        <div className="review-header">
          <span className="review-title">Review </span>
        </div>

        <div className="review-list">
          {state.currentMathList.map((item, id) => (
            <ReviewItem key={id} item={item} />
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="footer-actions">
        <button
          className="btn-home"
          onClick={() => {
            dispatch(AppActions.setIsFinished(false));
            dispatch(AppActions.setIsStarted(false));
            dispatch(AppActions.setCurrentMathList([]));
            dispatch(AppActions.setSelectedLevel(1));
            playClickKeynumSound();
          }}
        >
          <HomeIcon /> <span>HOME</span>
        </button>

        <button
          className="btn-play-again"
          onClick={() => {
            dispatch(AppActions.setIsFinished(false));
            dispatch(AppActions.setIsStarted(true));
            dispatch(AppActions.setCurrentMathList([]));
            playClickButtonSubmitSound();
          }}
        >
          <RefreshIcon /> <span>PLAY AGAIN</span>
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
