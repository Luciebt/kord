import React, { useEffect } from "react";
import "./Settings.css";

interface IShortcutsProps {}

// TODO: Handle click outside.

const ShortcutsPanel = ({}: IShortcutsProps): JSX.Element => {
  // Move keyboard focus to the panel when Shortcut button toggled
  useEffect(() => {
    const shortcutsSettingsDiv = document.getElementById(
      "shortcuts-settings-panel"
    ) as HTMLElement;
    if (shortcutsSettingsDiv) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // shortcutsSettingsDiv.focus();
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
          Press <strong>M</strong> to mute/unmute the sound.
        </ul>
        <ul>
          Press <strong>1 to 8</strong> (or <strong>azerty</strong> keys) to
          play each chord of the progression.
        </ul>
        <ul>
          Press <strong>Space</strong> to toggle the loop.
        </ul>
        <ul>
          Press <strong>?</strong> to toggle this shortcut panel.
        </ul>
      </p>
    </div>
  );
};

export default ShortcutsPanel;
