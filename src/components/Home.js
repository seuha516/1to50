import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Board from "./Board";
import Target from "./Target";
import Time from "./Time";
import Title from "./Title";
import "./Home.scss";
import * as fn from "../utils/functions";
import * as sound from "../utils/sound";
import Result from "./Result";

const Home = ({ name, setName }) => {
  const [boardstate, setBoardstate] = useState(fn.createArray(5, 5)); //보드 2차원 배열
  const [target, setTarget] = useState(""); //다음 타겟
  const [wait, setWait] = useState(-1); //-1: 시작 전, 1~3: 카운트다운, 0: 게임중, 999: 재시작 대기
  const [waitRanking, setWaitRanking] = useState(false);
  const [leftnums, setLeftnums] = useState(fn.setList()); //보드에 없는 남은 숫자들
  const [newRecord, setNewRecord] = useState(false);
  const timeComponent = useRef(); //타이머 컴포넌트 Ref

  const get_date_str = (date) => {
    let sYear = date.getFullYear() % 100;
    let sMonth = date.getMonth() + 1;
    let sDate = date.getDate();
    let sHour = date.getHours();
    let sMin = date.getMinutes();
    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate = sDate > 9 ? sDate : "0" + sDate;
    sHour = sHour > 9 ? sHour : "0" + sHour;
    sMin = sMin > 9 ? sMin : "0" + sMin;
    return `${sYear}.${sMonth}.${sDate} ${sHour}:${sMin}`;
  };
  const updateRanking = async (name, score) => {
    if (name === "" || name === null) {
      setWaitRanking(false);
      return;
    }
    console.log(`${name}가 ${score / 100}초에 성공!`);
    await axios
      .post("https://one-to-fifty-backend.herokuapp.com/api/ranking/update", {
        name: name,
        score: score / 100,
        date: get_date_str(new Date()),
      })
      .then((res) => {
        console.log("기록갱신?", res.data);
        setNewRecord(res.data);
      })
      .catch((err) => {
        console.log("ERROR!", err);
      });
    setWaitRanking(false);
  };

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
  const onClick = async (e) => {
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
        timeComponent.current.timerStop();
        sound.gameWin();
        setWait(999);
        setWaitRanking(true);
        if (name === "" || name === null) {
          await fn.delaySetWait(() => {}, null, 150);
          const newname = prompt("기록을 저장하려면 이름을 입력해 주세요.");
          setName(newname);
          updateRanking(newname, timeComponent.current.time);
        } else {
          updateRanking(name, timeComponent.current.time);
        }
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
      <Title wait={wait} />
      {(wait === 0 || wait === 999) && (
        <div className="Info">
          {wait === 0 ? (
            <Target target={target} />
          ) : (
            <Result waitRanking={waitRanking} newRecord={newRecord} />
          )}
          <Time ref={timeComponent} wait={wait} waitRanking={waitRanking} />
        </div>
      )}
      <Board
        list={boardstate}
        wait={wait}
        target={target}
        onStartClick={onStartClick}
        onClick={onClick}
        waitRanking={waitRanking}
      />
      {(wait === 999 || wait < 0) && !waitRanking && (
        <Link to="/ranking" className="Ranking">
          Ranking
        </Link>
      )}
    </div>
  );
};

export default Home;
