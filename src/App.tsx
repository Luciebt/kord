import "./App.scss";
import { hot } from "react-hot-loader";
import React, { createContext, useState } from "react";
import Settings from "./components/settings/Settings";
import ProgressionComponent from "./components/progressions/ProgressionComponent";
import ProgressionBuilderComponent from "./components/builder/ProgressionBuilderComponent";

export const BpmValueContext = createContext({
  bpm: 120,
  updateBpm: (newBpm) => { },
});

const App = () => {
  const [bpm, setBpm] = useState(120);

  const updateBpm = (bpm: number) => {
    setBpm(bpm);
  };

  return (
    <main className="App app-container">
      <h1>
        <a href="#" className="app-title">
          Kord
        </a>
      </h1>

      <Settings />
      <BpmValueContext.Provider value={{ bpm, updateBpm }}>
        <ProgressionBuilderComponent />
        <ProgressionComponent />
      </BpmValueContext.Provider>
    </main>
  );
};

export default hot(module)(App);
