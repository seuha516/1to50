import React, { useState } from "react";
import Board from "./components/Board";
import "./components/Mainsetting.scss";
import Target from "./components/Target";
import Time from "./components/Time";
import Title from "./components/Title";
import { createArray } from "./utils/functions";

const App = () => {
  const [boardstate, setBoardstate] = useState(createArray(5, 5));
  const [wait, setWait] = useState(-1);

  const delaySetWait = (x) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setWait(x);
        resolve();
      }, 1000);
    });
  const onStartClick = async () => {
    for (let i = 3; i >= 0; i--) await delaySetWait(i);
  };

  return (
    <div className="Items">
      <Title />
      <div className="Info">
        <Target />
        <Time />
      </div>
      <Board list={boardstate} wait={wait} onStartClick={onStartClick} />
    </div>
  );
};

export default App;
