import React, { useCallback } from "react";
import { TMood } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.css";

interface IMoodButton {
  onPressMood?: (mood: TMood) => void;
}

const moods: TMood[] = [
  "Jazzy 🎷",
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
    <section aria-label="Choose a mood for your chord progression">
      <h2>Mood</h2>
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
