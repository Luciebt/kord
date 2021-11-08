import React, { useState, useEffect, useRef } from "react";
import { useToggle } from "../hooks/useToggle";
import ShortcutsPanel from "./ShortcutsSettingsPanel";
import SoundsSettingsPanel from "./ShortcutsSettingsPanel";
import "./Settings.css";

interface ISettings {
  onSettings?: any;
  onSoundOn: (sound: boolean) => void;
}

// TODO: handle click outside.

const Settings = ({ onSettings, onSoundOn }: ISettings): JSX.Element => {
  // Whether the audio is on or off
  const [audioPref, setAudioPref] = useState(false);
  const [audioSound, setAudioSound] = useState([""]);

  const handleClick = (event: any) => {
    setAudioPref(!audioPref);
    onSoundOn(audioPref);

  }

  const [toggleShortcutsPanel, setToggleShortcutsPanel] = useToggle(false);
  const [toggleSoundsSettingsPanel, setToggleSoundsSettingsPanel] =
    useToggle(false);

  // const audioDropRef = useRef(null);
  // const soundDropRef = useRef(null);
  // const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div id="settings-box">
        <button id="audio-btn" onClick={(e) => handleClick(e)}>
          {audioPref ? "Audio OFF" : "Audio ON"}
        </button>

        <button
          id="sound-btn"
          className={toggleSoundsSettingsPanel ? "sound-selected-btn" : ""}
          onClick={() => setToggleSoundsSettingsPanel()}
        >
          Sound
        </button>
        <button
          id="shortcuts-btn"
          className={toggleShortcutsPanel ? "shortcuts-selected-btn" : ""}
          onClick={() => setToggleShortcutsPanel()}
        >
          Shortcuts
        </button>
      </div>
      {toggleShortcutsPanel ? <ShortcutsPanel /> : ""}
      {toggleSoundsSettingsPanel ? <SoundsSettingsPanel /> : ""}
    </div>
  );
};

export default Settings;
