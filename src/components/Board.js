import React from "react";
import "./Board.scss";
import Cell from "./Cell";

const Board = ({ list, wait, onStartClick, onClick }) => {
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
          <div className="Countdown">{wait}</div>
        )}
      </div>
    </>
  );
};

export default Board;
