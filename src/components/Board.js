import React from "react";
import "./Board.scss";
import Target from "./Target";
import Time from "./Time";

const Board = () => {
  return (
    <>
      <Target />
      <Time />
      <div className="Board"></div>
    </>
  );
};

export default Board;
