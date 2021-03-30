import React, { useEffect, useRef } from "react";
import "./Board.scss";
import Cell from "./Cell";

const Board = ({ list, wait, onStartClick, onClick }) => {
  const Count = useRef(null);
  useEffect(() => {
    if (!Count.current) return;
    console.log(Count.current);
    Count.current.animate([{ fontSize: "150px" }, { fontSize: "0px" }], {
      duration: 500,
      easing: "cubic-bezier(.66,.11,1,-0.08)",
      fill: "forwards",
    });
  }, [wait]);
  return (
    <>
      <div className="Board">
        {wait < 0 ? (
          <div className="StartButton" onClick={onStartClick}>
            START
          </div>
        ) : wait === 0 ? (
          <ul>
            {list.map((line) => (
              <ul key={line[0].id} className="Line">
                {line.map((cell) => (
                  <Cell key={cell.id} value={cell.value} onClick={onClick} />
                ))}
              </ul>
            ))}
          </ul>
        ) : wait === 999 ? (
          <div className="RestartButton" onClick={onStartClick}>
            Restart
          </div>
        ) : (
          <div ref={Count} className="Countdown">
            {wait}
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
