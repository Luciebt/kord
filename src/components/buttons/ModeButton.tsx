import React, { useCallback } from "react";
import { TMode } from "../../types";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.scss";

interface IModeButton {
  onPressMode?: (mode: TMode) => void;
  fullModes?: boolean;
}

const ModeButton: React.FC<IModeButton> = ({ onPressMode = () => { }, fullModes = false }) => {
  const modes: TMode[] = fullModes ? ["Major", "Minor", "Dorian", "Mixolydian", "Phrygian", "Lydian", "Locrian"] : ["Major", "Minor"];
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, mode: TMode) => {
      onPressMode(mode);
      unPressElementsStyleWithoutEvent("mode-btn-pressed");
      event.currentTarget.classList.add("mode-btn-pressed");
    },
    [onPressMode],
  );

  return (
    <section
      aria-label="Choose a mode for your chord progression"
      className="buttons-section mode-btn-section"
    >
      {modes.map((mode) => (
        <button
          key={mode}
          className="mode-btn"
          onClick={(e) => handleClick(e, mode)}
        >
          {mode}
        </button>
      ))}
    </section>
  );
};

export default ModeButton;
