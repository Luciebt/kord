import React, { useCallback } from "react";
import { TChords } from "../../types";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.css";

interface IChordButton {
  onPressKey?: (quality: TChords) => void;
}

const chordsQualities: TChords[] = [
  "Major",
  "Minor",
  "Major7",
  "Minor7",
  "Diminished",
  "Minor7Flat5",
];

const ChordButton: React.FC<IChordButton> = ({ onPressKey = () => {} }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, quality: TChords) => {
      onPressKey(quality);
      unPressElementsStyleWithoutEvent("chordbuild-btn-pressed");
      event.currentTarget.classList.add("chordbuild-btn-pressed");
    },
    [onPressKey],
  );

  return (
    <section aria-label="Choose a chord quality">
      <h2>Quality</h2>
      {chordsQualities.map((quality) => (
        <button
          key={quality}
          id={quality}
          value={quality}
          aria-label={`Select ${quality} chord`}
          onClick={(e) => handleClick(e, quality)}
          className="key-btn"
        >
          {quality}
        </button>
      ))}
    </section>
  );
};

export default ChordButton;
