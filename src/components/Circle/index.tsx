import { useMemo } from "react";
import "./styles.css"

function Circle(props) {
  const { percent } = props;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = useMemo(
    () => circumference - (percent / 100) * circumference,
    [circumference, percent],
  );

  return (
    <div className="score-section">
      <div className="circular-chart">
        <svg viewBox="0 0 120 120" className="progress-ring">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <circle cx="60" cy="60" r="50" className="bg-ring" />

          <circle
            cx="60"
            cy="60"
            r="50"
            className="progress-ring-circle"
            stroke="url(#gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="score-text">
          <div className="score-number">
            {percent}
            <span className="percent">%</span>
          </div>
          <div className="score-label">CORRECT</div>
        </div>
      </div>
    </div>
  );
}

export default Circle;
