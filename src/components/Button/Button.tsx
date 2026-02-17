import "./styles.css"

function Button(props) {
  const { children, onClick } = props;
  return <button className="start-btn" onClick={onClick}>
    {children}
    </button>;
}

export default Button;
