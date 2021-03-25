import React from "react";
import Board from "./components/Board";
import "./components/Mainsetting.scss";
import Title from "./components/Title";

const App = () => {
  return (
    <div className="items">
      <Title />
      <Board />
    </div>
  );
};

export default App;
