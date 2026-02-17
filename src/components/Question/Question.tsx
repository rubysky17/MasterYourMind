import "./styles.css";

function Question(props) {
  const { answer, question } = props;
  const renderExpression = (expression) => {
    const parts = expression.match(/(\d+|[+\-*/])/g);

    if (!parts) return null;

    return parts.map((part, index) => {
      const isOperator = ["+", "-", "*", "/"].includes(part);

      if (isOperator) {
        let displayOp = part;
        if (part === "*") displayOp = "×";
        if (part === "/") displayOp = "÷";

        return (
          <span key={index} className="op">
            {displayOp}
          </span>
        );
      }

      return (
        <span key={index} className="num highlight">
          {part}
        </span>
      );
    });
  };
  return (
    <div className="display-area">
      <div className="equation">{renderExpression(question?.expression)}</div>

      <div className="input-wrapper">
        <span className="input-value">{answer}</span>
        <span className="cursor"></span>
      </div>
      <div className="helper-text">Type your answer</div>
    </div>
  );
}

export default Question;
