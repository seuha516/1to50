import React, { useEffect, useState } from "react";
import "./Time.scss";

const Time = () => {
  const [time, setTime] = useState(0);
  const min =
    Math.floor(time / 100) < 10
      ? "0" + String(Math.floor(time / 100))
      : String(Math.floor(time / 100));
  const sec = time % 100 < 10 ? "0" + String(time % 100) : String(time % 100);
  useEffect(() => {
    let TIMER = setInterval(() => {
      setTime((time) => time + 5);
    }, 50);
    return () => clearInterval(TIMER);
  });
  return <div className="Time">{`${min}:${sec}`}</div>;
};

export default Time;
