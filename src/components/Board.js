import "./Board.scss";
import React, { useState } from "react";
import Target from "./Target";
import Time from "./Time";

const Board = () => {
  const [nextNumber, setNextNumber] = useState(26);
  return (
    <>
      <Target />
      <Time />
      <div className="Board"></div>
    </>
  );
};

export default Board;
