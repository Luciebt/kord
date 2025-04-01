import React, { useCallback } from "react";
import { TMood } from "../../types";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
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

const MoodButton: React.FC<IMoodButton> = ({ onPressMood = () => {} }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, mood: TMood) => {
      onPressMood(mood);

      const style = "mood-btn-pressed";
      unPressElementsStyleWithoutEvent(style);
      event.currentTarget.classList.add(style);
    },
    [onPressMood],
  );

  return (
    <section
      aria-label="Choose a mood for your chord progression"
      className="buttons-section mood-btn-section"
    >
      {moods.map((mood) => (
        <button
          key={mood}
          className="mood-btn"
          onClick={(e) => handleClick(e, mood)}
        >
          {mood}
        </button>
      ))}
    </section>
  );
};

export default MoodButton;
