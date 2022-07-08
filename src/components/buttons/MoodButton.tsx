import React from "react";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Buttons.css";

interface IMoodButton {
  onPressMood?: any;
}

const MoodButton = ({ onPressMood }: IMoodButton): JSX.Element => {
  const moods: string[] = [
    "All",
    "Jazzy 🎷",
    "Sad 🌧️",
    "Hopeful 🌈",
    "Happy 🌻",
    "Dark 👻",
    "Weird 👾",
    // "Todo",
  ];

  const handleClick = (event: any, mood: string) => {
    onPressMood(mood);

    const style: string = "mood-btn-pressed";
    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
  };

  const moodsList: JSX.Element[] = moods.map((mood, i) => (
    <button
      key={i}
      onClick={(e) => {
        handleClick(e, mood);
      }}
    >
      {mood}
    </button>
  ));

  return (
    <section arial-label="Choose a mood for your chord progression">
      <h2>Mood</h2>
      {moodsList}
    </section>
  );
};

export default MoodButton;
