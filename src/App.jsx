import { useState } from "react";
import "./App.css";
import Die from "./componets/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => getAllDiceNumber());

  const isWon = dice.every(
    (diceObj) =>
      diceObj.isHeld === dice[0].isHeld && diceObj.value === dice[0].value
  );

  function getAllDiceNumber() {
    console.log("Hello");
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((dice) =>
        id === dice.id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const dieElements = dice.map((diceObj) => (
    <Die
      hold={() => hold(diceObj.id)}
      key={diceObj.id}
      value={diceObj.value}
      isHeld={diceObj.isHeld}
    />
  ));

  function rollDice() {
    if (!isWon) {
      setDice((prevDice) =>
        prevDice.map((dice) =>
          dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(getAllDiceNumber());
    }
  }

  return (
    <main>
      <p className="title">Tenzies</p>
      <div className="description ">
        <p>Roll until all dice show the same number.</p>
        <p> Click each die to freeze it at its current value.</p>
      </div>
      {isWon && <Confetti />}
      <div className="container">{dieElements}</div>
      <button onClick={rollDice} className="rollDice">
        {isWon ? "Start New Game" : "Roll"}
      </button>
      <p style={{ marginTop: "10px" }}>
        <i>
          Developed with ❤️ by <u>Chaitanya Patil.</u>
        </i>
      </p>
    </main>
  );
}

export default App;
