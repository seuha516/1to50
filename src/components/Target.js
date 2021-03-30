import React, { useEffect, useRef } from "react";
import "./Target.scss";

const Target = ({ target }) => {
  const targetNumber = useRef(null);
  useEffect(() => {
    if (!targetNumber.current) return;
    console.log(targetNumber.current.children);
    targetNumber.current.animate(
      [{ marginLeft: "90px" }, { marginLeft: "0px" }],
      {
        duration: 300,
        easing: "cubic-bezier(.17,.99,.69,.97)",
        fill: "forwards",
      }
    );
  }, [target]);
  return (
    <>
      <div className="Box">
        <div className="Text">Next</div>
        <div className="Target">
          <div ref={targetNumber}>{target}</div>
        </div>
      </div>
    </>
  );
};

export default Target;
