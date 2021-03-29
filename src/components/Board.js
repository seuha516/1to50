import React from "react";
import "./Board.scss";

const Board = ({ list, wait, onStartClick }) => {
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
                  <li key={cell.id} className="Cell">
                    {cell.value}
                  </li>
                ))}
              </ul>
            ))}
          </ul>
        ) : (
          <div className="Countdown">{wait}</div>
        )}
      </div>
    </>
  );
};

export default Board;
