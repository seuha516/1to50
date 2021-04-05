import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";

const App = () => {
  const [name, setName] = useState("");
  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Home name={name} setName={setName} />}
        />
        <Route path="/ranking" exact component={Ranking} />
        <Route
          render={({ location }) => (
            <div style={{ color: "white" }}>
              <h2>Not Found</h2>
              <br />
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default App;
