import React from "react";
import "./Result.scss";

const Result = ({ waitRanking, newRecord }) => {
  return newRecord ? (
    <div
      className="Result new"
      style={{
        opacity: waitRanking ? "0" : "1",
        fontSize: waitRanking && "0px",
      }}
    >
      New Record!{" "}
    </div>
  ) : (
    <div
      className="Result"
      style={{
        opacity: waitRanking ? "0" : "1",
        fontSize: waitRanking && "0px",
      }}
    >
      Result:{" "}
    </div>
  );
};

export default Result;
