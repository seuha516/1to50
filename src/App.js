import React, { useState } from "react";
import Board from "./components/Board";
import Target from "./components/Target";
import Time from "./components/Time";
import Title from "./components/Title";
import "./components/Mainsetting.scss";
import * as fn from "./utils/functions";
import * as sound from "./utils/sound";

const App = () => {
  const [boardstate, setBoardstate] = useState(fn.createArray(5, 5)); //보드 2차원 배열
  const [target, setTarget] = useState(""); //다음 타겟
  const [wait, setWait] = useState(-1); //-1: 시작 전, 1~3: 카운트다운, 0: 게임중
  const onStartClick = async () => {
    //시작 버튼 클릭
    setWait(3);
    sound.countdownStart();
    for (let i = 2; i >= 0; i--) await fn.delaySetWait(setWait, i);
    setTarget(1);
    setBoardstate(fn.setArray(5, 5));
  };
  const onClick = (e) => {
    //숫자 클릭
    if (e.target.textContent === String(target)) {
      sound.correctbuttonClick();
      if (target >= 26) {
        boardstate.map((line) =>
          line.map((cell) => (cell.value === target ? (cell.value = "") : cell))
        );
      } else {
        let nextnum = fn.findnextnum(boardstate, target);
        setBoardstate(
          boardstate.map((line) =>
            line.map((cell) =>
              cell.value === target ? { id: nextnum, value: nextnum } : cell
            )
          )
        );
      }
      if (target === 5) {
        setBoardstate(fn.createArray(5, 5));
        setTarget("");
        setWait(999);
        sound.gameWin();
      } else {
        setTarget((target) => target + 1);
      }
    } else {
      sound.wrongbuttonClick();
    }
  };

  return (
    <div className="Items">
      <Title />
      {wait === 0 ? (
        <div className="Info">
          <Target target={target} />
          <Time />
        </div>
      ) : null}
      <Board
        list={boardstate}
        wait={wait}
        onStartClick={onStartClick}
        onClick={onClick}
      />
    </div>
  );
};

export default App;
