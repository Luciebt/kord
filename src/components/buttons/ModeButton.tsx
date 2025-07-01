import React, { useCallback, memo } from "react";
import { TMode } from "../../types";
import { usePressedState } from "../../hooks/usePressedState";
import GenericButton from "./GenericButton";
import "./Buttons.scss";
import "./Tooltips.scss";

interface IModeButton {
  onPressMode?: (mode: TMode) => void;
  fullModes?: boolean;
}

const ModeButton: React.FC<IModeButton> = memo(({ onPressMode = () => { }, fullModes = false }) => {
  const modes: TMode[] = fullModes ? ["Major", "Minor", "Dorian", "Mixolydian", "Phrygian", "Lydian", "Locrian"] : ["Major", "Minor"];
  const handlePress = usePressedState("mode-btn-pressed");

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, mode: TMode) => {
      onPressMode(mode);
      handlePress(event);
    },
    [onPressMode, handlePress],
  );

  const ModesToolTip = (mode: TMode): string => {
    switch (mode) {
      case "Major":
        return "bright, happy.";
      case "Minor":
        return "dark, melancholic.";
      case "Dorian":
        return "jazzy, soulful.";
      case "Mixolydian":
        return "bluesy, rock.";
      case "Phrygian":
        return "exotic, spanish.";
      case "Lydian":
        return "dreamy, ethereal.";
      case "Locrian":
        return "tense, unstable.";
      default:
        return "";
    }
  };

  return (
    <section
      aria-label="Choose a mode for your chord progression"
      className={fullModes ? "mode-btn-section" : "main-mode-btn-section"}
    >
      {modes.map((mode) => (
        <GenericButton
          key={mode}
          className={`chord-btn ${fullModes ? "btn-w-tooltip" : ""}`}
          onClick={(e) => handleClick(e, mode)}
        >
          {mode}
          {fullModes ? <span className="tooltip">{ModesToolTip(mode)}</span> : null}
        </GenericButton>
      ))}
    </section>
  );
});

export default ModeButton;
