import React, { useRef, useState } from "react";
import Board from "./components/Board";
import Target from "./components/Target";
import Time from "./components/Time";
import Title from "./components/Title";
import "./components/Mainsetting.scss";
import * as fn from "./utils/functions";
import * as sound from "./utils/sound";
import Result from "./components/Result";

const App = () => {
  const [boardstate, setBoardstate] = useState(fn.createArray(5, 5)); //보드 2차원 배열
  const [target, setTarget] = useState(""); //다음 타겟
  const [wait, setWait] = useState(-1); //-1: 시작 전, 1~3: 카운트다운, 0: 게임중, 999: 재시작 대기
  const [leftnums, setLeftnums] = useState(fn.setList()); //보드에 없는 남은 숫자들

  const timeComponent = useRef(); //타이머 컴포넌트 Ref

  //시작 버튼 클릭
  const onStartClick = async () => {
    setTarget(1);
    setBoardstate(fn.setArray(5, 5));
    setLeftnums(fn.setList());
    sound.countdownStart();
    setWait(3);
    for (let i = 2; i >= 0; i--) await fn.delaySetWait(setWait, i, 1000);
    timeComponent.current.timerStart();
  };
  //숫자 칸 클릭
  const onClick = (e) => {
    if (e.target.textContent === "") return;
    if (e.target.textContent === String(target)) {
      sound.correctbuttonClick();
      let [nextnum, nextleftnums] = fn.findnextnum(leftnums);
      setLeftnums(nextleftnums);
      setBoardstate(
        boardstate.map((line) =>
          line.map((cell) =>
            cell.value === target ? { id: target + 50, value: nextnum } : cell
          )
        )
      );
      if (target === 50) {
        setWait(999);
        timeComponent.current.timerStop();
        sound.gameWin();
      } else {
        setTarget((target) => target + 1);
      }
    } else {
      sound.wrongbuttonClick();
      e.target.animate(
        [
          { backgroundColor: "rgba(238, 78, 78, 0)" },
          { backgroundColor: "rgba(238, 78, 78, 0.705)" },
          { backgroundColor: "rgba(238, 78, 78, 0)" },
        ],
        {
          duration: 500,
          easing: "cubic-bezier(.32,.86,.73,.19)",
          fill: "forwards",
        }
      );
    }
  };

  return (
    <div className="Items">
      <Title marginBottom={wait === 999 ? true : false} />
      {(wait === 0 || wait === 999) && (
        <div className="Info">
          {wait === 0 ? <Target target={target} /> : <Result />}
          <Time ref={timeComponent} />
        </div>
      )}
      <Board
        list={boardstate}
        wait={wait}
        target={target}
        onStartClick={onStartClick}
        onClick={onClick}
      />
    </div>
  );
};

export default App;
