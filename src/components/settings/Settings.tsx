import React, { useState } from "react";
import { useToggle } from "../hooks/useToggle";
import ShortcutsPanel from "./ShortcutsSettingsPanel";
import { SetSynthSound } from "../../audio/Synth";
import "./Settings.css";

interface ISettings {
  onSettings?: any;
  onSoundOn: (sound: boolean) => void;
}

// TODO: handle click outside.

const Settings = ({ onSettings, onSoundOn }: ISettings): JSX.Element => {
  // Whether the audio is on or off
  const [audioPref, setAudioPref] = useState(false);

  const handleClick = (event: any) => {
    setAudioPref(!audioPref);
    onSoundOn(audioPref);
  };

  const [toggleShortcutsPanel, setToggleShortcutsPanel] = useToggle(false);

  const ChooseSynth = (event: any): void => {
    event.preventDefault();
    SetSynthSound(event.target.value);
    console.log(event.target.value);
  };

  return (
    <section>
      <section id="settings-box">
        <button id="audio-btn" onClick={(e) => handleClick(e)}>
          {audioPref ? "Audio OFF 🔇" : "Audio ON 🔊"}
        </button>
        {/* <select
          name="synthPartials"
          onChange={(e) => ChooseSynth(e)}
          className="sound-select"
          role="Shoose a sound"
        >
          <option value="cuteSine">Cute Sine</option>
          <option value="imperatrice">Madame l'Imperatrice</option>
        </select> */}

        {/* <button
          id="shortcuts-btn"
          className={toggleShortcutsPanel ? "shortcuts-selected-btn" : ""}
          onClick={() => setToggleShortcutsPanel()}
        >
          Shortcuts
        </button> */}
      </section>
      {/* {toggleShortcutsPanel ? <ShortcutsPanel /> : ""} */}
    </section>
  );
};

export default Settings;
