import { hot } from "react-hot-loader";
import React from "react";
import ProgressionComponent from "./components/ProgressionComponent";
import "./index.css";

const App = () => {
  return (
    <main className="App">
      <h1>Kord</h1>
      <ProgressionComponent />
    </main>
  );
};

export default hot(module)(App);
