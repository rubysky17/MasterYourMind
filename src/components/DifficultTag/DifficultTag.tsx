import { Icons } from "../Icon/Icons";

import "./styles.css";

function DifficultTag(props) {
  const { isSelected, name, example, bgColor, icon , onHandleClick, id } = props;

  return (
    <button
      className={`level-card ${isSelected ? "selected" : ""}`}
      onClick={() => {
        onHandleClick({
          name, 
          id
        })
      }}
    >
      <div className="level-description">
        <div
          className={`level-icon icon-${name.toLowerCase()}`}
          style={{
            backgroundColor: `rgb(from ${bgColor} r g b / 0.1);`,
          }}
        >
          {icon}
        </div>

        <div className="level-info">
          <h3>{name}</h3>
          <p>
            {name === "Novice"
              ? "Simple addition & subtraction"
              : name === "Pro"
                ? "Multiplication & division"
                : "Complex multi-step"}
          </p>
        </div>
      </div>

      <div className="level-example">
        <code>{example}</code>
      </div>
      {isSelected && <div className="check-badge">
        {Icons.check}
        </div>}
    </button>
  );
}

export default DifficultTag;
