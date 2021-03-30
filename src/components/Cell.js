import React, { useEffect, useRef } from "react";
import "./Cell.scss";

const Cell = ({ value, onClick, target }) => {
  const newCell = useRef(null);
  useEffect(() => {
    if (!newCell.current || target === 1) return;
    newCell.current.animate(
      [
        { fontSize: "25px", backgroundColor: "rgba(110, 255, 122, 0.541)" },
        { fontSize: "50px", backgroundColor: "rgba(110, 255, 122, 0)" },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(.19,.91,.29,.95)",
        fill: "forwards",
      }
    );
  }, [value]);
  return (
    <li className="Cell" onClick={onClick} ref={newCell}>
      {value}
    </li>
  );
};

export default Cell;
