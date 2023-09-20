import React, { useState, useEffect } from "react";

function GreenLightRedLight() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const difficultyConfig = {
    Easy: { n: 10, y: 40 },
    Medium: { n: 15, y: 40 },
    Hard: { n: 25, y: 40 }
  };
  const [difficulty, setDifficulty] = useState(userData?.difficultyLevel);
  const [boxColor, setBoxColor] = useState("green");
  const [score, setScore] = useState(0);

  const [colorTimer, setColorTimer] = useState("");
  const [gameOver, setOver] = useState(false);
  const [win, setWin] = useState(false);

  const { n, y } = difficultyConfig[difficulty];
  const [time, setTime] = useState(y);

  useEffect(() => {
    if (time <= 0) {
      setOver(true);
      clearInterval(colorTimer);
      setScore(0);
    }
    if (score == n) {
      setWin(true);
      clearInterval(colorTimer);
      setScore(0);
    }
  }, [time, score]);

  // if you want change color dynamically than unComment below this code

  // const StartGame = () => {
  //   setTime(40);
  //   setOver(false);
  //   setWin(false);
  //   setColorTimer(
  //     setInterval(() => {
  //       setTime((time) => time - 1);
  //       setBoxColor(Math.random() < 0.5 ? "red" : "green");
  //     }, 1000)
  //   );
  // };

  const StartGame = () => {
    setTime(40);
    setOver(false);
    setWin(false);
    setColorTimer(
      setInterval(() => {
        setTime((time) => time - 1);
        setBoxColor((clr) => (clr === "red" ? "green" : "red"));
      }, Math.floor(Math.random() * 1000) + 1000)
    );
  };

  const boxClick = () => {
    if (boxColor === "green") {
      setScore(score + 1);
    } else {
      setOver(true);
      setScore(0);
      setTime(0);
      clearInterval(colorTimer);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        {colorTimer !== "" && !gameOver && !win ? (
          <>
            <h3 className="score">
              Score: {score}/{n}
            </h3>
            <h3 className="time">Remaining Time: {time}</h3>
            <div onClick={boxClick} className={`box ${boxColor}`}></div>
          </>
        ) : (
          <div>
            <div className="level-dropdown">
              <label htmlFor="level">Select Level:</label>
              <select
                id="level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <ul className="game-guidance">
              <h3>{difficulty} Level :</h3>
              <li>
                Click on the green box as many times as possible within {y}{" "}
                seconds.
              </li>
              <li>
                If you click on the red box or if the timer expires, it's game
                over.
              </li>
              <li>
                If you manage to click the green box {n} times within {y}{" "}
                seconds, you win!
              </li>
            </ul>
            <button onClick={StartGame} className="start-button">
              Start Game
            </button>
          </div>
        )}
      </div>
      {gameOver && <p className="game-over">Game Over</p>}
      {win && <p className="you-won">You Won</p>}
    </div>
  );
}

export default GreenLightRedLight;
