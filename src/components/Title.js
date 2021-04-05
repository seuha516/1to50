import classNames from "classnames";
import React from "react";
import "./Title.scss";

const Title = ({ wait, onClick, pointer }) => {
  return (
    <div
      className={classNames(
        "Title",
        wait === 0 && "ingame",
        wait === 999 && "restart",
        pointer && "pointer"
      )}
      onClick={onClick}
    >
      1 to 50
    </div>
  );
};

export default Title;
