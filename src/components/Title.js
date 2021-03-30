import React from "react";
import "./Title.scss";

const Title = ({ marginBottom }) => {
  return (
    <div id="Title" style={marginBottom ? { marginBottom: "-100px" } : null}>
      1 to 50
    </div>
  );
};

export default Title;
