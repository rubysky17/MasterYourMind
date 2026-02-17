import { useApp } from "../../store/Context";
import { useSound } from "../../hooks/useSound";

import Button from "../../components/Button/Button";
import { Icons } from "../../components/Icon/Icons";
import { LevelList } from "../../store/types";
import DifficultTag from "../../components/DifficultTag/DifficultTag";
import submitClickMp3 from "../../assets/sounds/submit-click.mp3";
import normalClickMp3 from "../../assets/sounds/normal-click.mp3";

import { AppActions } from "../../store/Store";

import "./styles.css";

function OnboardScreen() {
  const { state, dispatch } = useApp();
  const playClickButtonSubmitSound = useSound(submitClickMp3);
  const playClickCardSound = useSound(normalClickMp3);
  
  const handleClickSelectedLevel = ({ id }) => {
    if (state.selectedLevel === id) return;

    playClickCardSound();
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    dispatch(AppActions.setSelectedLevel(parseInt(id)))
  };

  if (state.isStarted) return null;

  return (
    <div className="onboard-container">
      <div className="header-section">
        <div className="logo-icon">{Icons.mind}</div>
        <h1 className="title">
          Master <br />
          <span>Your Mind</span>
        </h1>
        <p className="subtitle">
          Train your brain with daily mental math exercises designed to improve
          speed and accuracy.
        </p>
      </div>

      <div className="difficulty-section">
        <p className="section-label">{Icons.config} CHOOSE DIFFICULTY</p>
        <div className="level-list">
          {LevelList.map((level) => {
            const isSelected = parseInt(state.selectedLevel) === level.id;

            return (
              <DifficultTag
                key={level.id}
                isSelected={isSelected}
                onHandleClick={handleClickSelectedLevel}
                {...level}
              />
            );
          })}
        </div>
      </div>

      <Button
        onClick={() => {
          playClickButtonSubmitSound();
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
          dispatch(AppActions.setIsStarted(true))
        }}
      >
        Start Training
        {Icons.arrowRight}
      </Button>
    </div>
  );
}

export default OnboardScreen;
