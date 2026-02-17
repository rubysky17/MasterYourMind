import { useSound } from "../../hooks/useSound";
import { Icons } from "../Icon/Icons";

import submitClickMp3 from "../../assets/sounds/submit-click.mp3";
import normalClickMp3 from "../../assets/sounds/normal-click.mp3";

import "./styles.css";

function Numpad(props) {
  const { onHandleKeyPress, onHandleDelete, onHandleNextQuestion } = props;
  const playClickButtonSubmitSound = useSound(submitClickMp3);
  const playClickKeynumSound = useSound(normalClickMp3);
  
  const NUMPAD_LAYOUT = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["backspace", 0, "next"],
  ];

  return (
    <div className="keypad">
      {NUMPAD_LAYOUT.map((row, index) => {
        return (
          <div key={index} className="keypad-row">
            {row.map((keypad, idx) => {
              return (
                <button
                  className={
                    keypad === "next"
                      ? "next"
                      : keypad === "backspace"
                        ? "backspace"
                        : ""
                  }
                  key={idx}
                  onClick={() => {
                    if (keypad === "backspace") {
                      onHandleDelete();
                      playClickKeynumSound();
                      return;
                    }

                    if (keypad === "next") {
                      onHandleNextQuestion();
                      playClickButtonSubmitSound();
                      return;
                    }
                    onHandleKeyPress(keypad);
                    playClickKeynumSound();
                  }}
                >
                  {keypad === "backspace"
                    ? Icons.backspace
                    : keypad === "next"
                      ? Icons.checkNumpad
                      : keypad}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Numpad;
