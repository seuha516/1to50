import React from "react";
import "./Cell.scss";

const Cell = ({ value, onClick }) => {
  return (
    <li className="Cell" onClick={onClick}>
      {value}
    </li>
  );
};

export default Cell;
