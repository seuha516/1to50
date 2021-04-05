import classNames from "classnames";
import React from "react";
import "./Title.scss";

const Title = ({ wait }) => {
  return (
    <div
      className={classNames(
        "Title",
        wait === 0 && "ingame",
        wait === 999 && "restart"
      )}
    >
      1 to 50
    </div>
  );
};

export default Title;
