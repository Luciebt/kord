import React, { useCallback, memo } from "react";
import { TMood } from "../../types";
import { usePressedState } from "../../hooks/usePressedState";
import GenericButton from "./GenericButton";
import "./Buttons.scss";

interface IMoodButton {
  onPressMood?: (mood: TMood) => void;
}

const moods: TMood[] = [
  "Sad 🌧️",
  "Hopeful 🌈",
  "Happy 🌻",
  "Dark 👻",
  "Weird 👾",
  "Suspenseful 🎭",
];

const MoodButton: React.FC<IMoodButton> = memo(({ onPressMood = () => { } }) => {
  const handlePress = usePressedState("mood-btn-pressed");

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, mood: TMood) => {
      onPressMood(mood);
      handlePress(event);
    },
    [onPressMood, handlePress],
  );

  return (
    <section
      aria-label="Choose a mood for your chord progression"
      className="mood-btn-section"
    >
      {moods.map((mood) => (
        <GenericButton
          key={mood}
          className="mood-btn"
          onClick={(e) => handleClick(e, mood)}
        >
          {mood}
        </GenericButton>
      ))}
    </section>
  );
});

export default MoodButton;
