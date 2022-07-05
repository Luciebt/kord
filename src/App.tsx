import { hot } from "react-hot-loader";
import React, { useState } from "react";
import Settings from "./components/settings/Settings";
import TabComponent from "./components/tabs/TabComponent";
import "./App.css";

export const SoundOnContext = React.createContext(true);

const App = () => {
  const [soundOn, setSoundOn] = useState(true);

  const SoundCallback = (sound: boolean) => {
    setSoundOn(sound);
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
        <TabComponent />
      </SoundOnContext.Provider>
    </main>
  );
};

export default hot(module)(App);
