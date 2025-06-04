import React, { useCallback } from "react";
import { TMode } from "../../types";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.scss";
import "./Tooltips.scss";

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

  const ModesToolTip = (mode: TMode): string => {
    switch (mode) {
      case "Major":
        return "bright, happy.";
      case "Minor":
        return "dark, melancholic.";
      case "Dorian":
        return "Jazzy, soulful.";
      case "Mixolydian":
        return "Bluesy, rock.";
      case "Phrygian":
        return "Exotic, spanish.";
      case "Lydian":
        return "Dreamy and ethereal.";
      case "Locrian":
        return "Tense and unstable.";
      default:
        return "";
    }
  };

  return (
    <section
      aria-label="Choose a mode for your chord progression"
      className="buttons-section mode-btn-section"
    >
      {modes.map((mode) => (
        <button
          key={mode}
          className={`chord-btn ${fullModes ? "btn-w-tooltip" : ""}`}
          onClick={(e) => handleClick(e, mode)}
        >
          {mode}
          {fullModes ? <span className="tooltip">{ModesToolTip(mode)}</span> : null}
        </button>
      ))}
    </section>
  );
};

export default ModeButton;
