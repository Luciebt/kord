import { hot } from "react-hot-loader";
import React, { createContext, useState } from "react";
import Settings from "./components/settings/Settings";
import TabComponent from "./components/tabs/TabComponent";
import "./App.css";

export const SoundOnContext = createContext(true);
export const BpmValueContext = createContext({
  bpm: 120,
  updateBpm: (newBpm) => {} 
});


const App = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [bpm, setBpm] = useState(120);

  const SoundCallback = (sound: boolean) => {
    setSoundOn(sound);
  };

  const updateBpm = (bpm: number) => {
    setBpm(bpm);
  };

  return (
    <main className="App">
      <h1>
        <a href="#" className="app-title">
          Kord
        </a>
      </h1>

      <Settings onSoundOn={SoundCallback} />
      <SoundOnContext.Provider value={soundOn}>
        <BpmValueContext.Provider value={{bpm, updateBpm}}>
          <TabComponent />
        </BpmValueContext.Provider>
      </SoundOnContext.Provider>
    </main>
  );
};

export default hot(module)(App);
