import { hot } from "react-hot-loader";
import React from "react";
import ProgressionComponent from "./components/ProgressionComponent";

const App = () => {
  return (
    <main className="App">
      <h1>Kord Prog</h1>
      <ProgressionComponent
        tonality="C"
        quality="major"
        progression_list="I VI III"
      />
    </main>
  );
};

export default hot(module)(App);
