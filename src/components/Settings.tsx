import React, { useState, useEffect, useRef } from "react";
import { useToggle } from "../components/hooks/useToggle";
import ShortcutsPanel from "./views/ShortcutsSettingsPanel";
import SoundsSettingsPanel from "./views/ShortcutsSettingsPanel";

interface ISettings {
  parentCallback?: any;
}

// TODO: handle click outside.

const Settings: React.FC<ISettings> = ({ parentCallback }) => {
  // Whether the audio is on or off
  const [audioPref, setAudioPref] = useToggle(true);
  const [audioSound, setAudioSound] = useState([""]);

  const [toggleShortcutsPanel, setToggleShortcutsPanel] = useToggle(false);
  const [toggleSoundsSettingsPanel, setToggleSoundsSettingsPanel] =
    useToggle(false);

  const audioDropRef = useRef(null);
  const soundDropRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  return (
    <div>
      <div id="settings-box">
        <button id="audio-btn" onClick={() => setAudioPref()}>
          {audioPref ? "Audio on" : "Audio off"}
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
