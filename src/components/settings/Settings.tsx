import React, { useState } from "react";
import useKeypress from "react-use-keypress";
import { useToggle } from "../../hooks/useToggle";
import ShortcutsPanel from "./ShortcutsSettingsPanel";
import { SetSynthSound } from "../../audio/Play";
import "./Settings.css";

interface ISettings {
  onSettings?: any;
}

const Settings = ({ onSettings }: ISettings): JSX.Element => {
  const [toggleShortcutsPanel, setToggleShortcutsPanel] = useToggle(false);

  useKeypress(["Escape", "?"], () => {
    setToggleShortcutsPanel();
  });

  const ChooseSynth = (event: any): void => {
    event.preventDefault();
    SetSynthSound(event.target.value);
  };

  return (
    <section>
      <section aria-label="settings" id="settings-box">
        {/* <select
          name="synthPartials"
          onChange={(e) => ChooseSynth(e)}
          className="sound-select"
          role="Shoose a sound"
        >
          <option value="cuteSine">Cute Sine</option>
          <option value="imperatrice">Madame l'Imperatrice</option>
        </select> */}

        <button
          id="shortcuts-btn"
          className={toggleShortcutsPanel ? "shortcuts-selected-btn" : ""}
          onClick={() => setToggleShortcutsPanel()}
        >
          Shortcuts
        </button>
        <br />
      </section>
      {toggleShortcutsPanel ? <ShortcutsPanel /> : ""}
    </section>
  );
};

export default Settings;
