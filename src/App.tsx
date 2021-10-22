import { hot } from "react-hot-loader";
import React from "react";
import ProgressionComponent from "./components/ProgressionComponent";
import Settings from "./components/Settings";
import "./index.css";

// TODO: use React.Context to set the preferences like sound on/off and instrument type?
const App = () => {
  return (
    <main className="App">
      <h1>Kord</h1>
      {/* <Settings /> */}
      <ProgressionComponent />
    </main>
  );
};

export default hot(module)(App);
