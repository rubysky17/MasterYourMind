const CheckCircle = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const CrossCircle = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
function ReviewItem(props) {
  const { item } = props;
  console.log({item})
  return (
    <div
      key={item.id}
      className={`review-card ${item.result ? "correct" : "incorrect"}`}
    >
      <div className={`status-icon ${item.result ? "bg-green" : "bg-red"}`}>
        {item.result ? <CheckCircle /> : <CrossCircle />}
      </div>

      <div className="review-content">
        <div className="expr-text">{item.expression}</div>
        {!item.result && (
          <div className="correction-sub">
            Correct: <span className="text-green-light">{item.answer}</span>
          </div>
        )}
      </div>

      <div className="review-right">
        <div
          className={`user-ans ${item.result ? "text-green-light" : "text-red strikethrough"}`}
        >
          {item.userInput}
        </div>
        <div className="time-taken">{item.timer / 1000}s</div>
      </div>
    </div>
  );
}

export default ReviewItem;
