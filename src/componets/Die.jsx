// eslint-disable-next-line react/prop-types
export default function Die({ value, isHeld, hold }) {
  return (
    <button
      onClick={hold}
      style={{ backgroundColor: isHeld ? "lightGreen" : "white" }}
      className="dice-btn"
    >
      {value}
    </button>
  );
}
