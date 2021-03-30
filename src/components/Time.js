import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as fn from "../utils/functions";
import "./Time.scss";

const Time = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [min, sec] = fn.makeTimer(time);
  const TIMER = useRef(null);
  useImperativeHandle(ref, () => ({
    timerStart() {
      TIMER.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    },
    timerStop() {
      clearInterval(TIMER.current);
    },
  }));
  return <div className="Time">{`${min}:${sec}`}</div>;
});

export default Time;
