import { MAX_QUESTION } from "../../store/types";

import "./styles.css"

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#60a5fa"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const TargetIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#60a5fa"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

function Stats(props) {
  const { solved, accuracy, time } = props;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon text-cyan">?</div>
        <div className="stat-value">
          {solved}/{MAX_QUESTION}
        </div>
        <div className="stat-label">SOLVED</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon text-blue">
          <ClockIcon />
        </div>
        <div className="stat-value">{time}</div>
        <div className="stat-label">TIME</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon text-cyan">
          <TargetIcon />
        </div>
        <div className="stat-value">{accuracy}</div>
        <div className="stat-label">ACCURACY</div>
      </div>
    </div>
  );
}

export default Stats;
