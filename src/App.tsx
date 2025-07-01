import "./App.scss";
import React, { createContext, useState, lazy, Suspense } from "react";
import Settings from "./components/settings/Settings";

const ProgressionComponent = lazy(() => import("./components/progressions/ProgressionComponent"));
const ProgressionBuilderComponent = lazy(() => import("./components/builder/ProgressionBuilderComponent"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <ProgressionBuilderComponent />
          <ProgressionComponent />
        </Suspense>
      </BpmValueContext.Provider>
    </main>
  );
};

export default App;
