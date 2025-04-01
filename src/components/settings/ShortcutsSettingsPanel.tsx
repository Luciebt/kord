import React, { useEffect } from "react";
import "./Settings.scss";

interface IShortcutsProps {}

const ShortcutsPanel = ({}: IShortcutsProps): JSX.Element => {
  // Move keyboard focus to the panel when Shortcut button toggled
  useEffect(() => {
    const shortcutsSettingsDiv = document.getElementById(
      "shortcuts-settings-panel",
    ) as HTMLElement;
    if (shortcutsSettingsDiv) {
      shortcutsSettingsDiv.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      tabIndex={0}
      arial-label="Keyboard shortcuts for KORD"
      id="shortcuts-settings-panel"
    >
      <p>
        <ul>
          - <mark>1</mark> to <mark>8</mark> (or <mark>azerty</mark>) to play
          chords.
        </ul>
        <ul>
          - <mark>Space</mark> to toggle the loop.
        </ul>
        <ul>
          - <mark>?</mark> / <mark>Esc</mark> to toggle this shortcut panel.
        </ul>
      </p>
    </div>
  );
};

export default ShortcutsPanel;
