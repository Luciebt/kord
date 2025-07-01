import React, { useCallback, memo } from "react";
import { TChords } from "../../types";
import { usePressedState } from "../../hooks/usePressedState";
import GenericButton from "./GenericButton";
import "./Buttons.scss";

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

const ChordButton: React.FC<IChordButton> = memo(({ onPressKey = () => {} }) => {
  const handlePress = usePressedState("chordbuild-btn-pressed");

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, quality: TChords) => {
      onPressKey(quality);
      handlePress(event);
    },
    [onPressKey, handlePress],
  );

  return (
    <section aria-label="Choose a chord quality">
      <h2>Quality</h2>
      {chordsQualities.map((quality) => (
        <GenericButton
          key={quality}
          id={quality}
          value={quality}
          ariaLabel={`Select ${quality} chord`}
          onClick={(e) => handleClick(e, quality)}
          className="key-btn"
        >
          {quality}
        </GenericButton>
      ))}
    </section>
  );
});

export default ChordButton;
