import React from "react";
import "./Target.scss";

const Target = ({ target }) => {
  return (
    <>
      <div className="Box">
        <div className="Text">Next</div>
        <div className="Target">{target}</div>
      </div>
    </>
  );
};

export default Target;
