function Timer(props) {
  const { timeLeft, maxTime } = props;

  return (
    <div className="timer-container">
      <div
        className="timer-bar"
        style={{ width: `${(timeLeft / maxTime) * 100}%` }}
      ></div>
    </div>
  );
}

export default Timer;
