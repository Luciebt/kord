import React from "react";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Buttons.css";

interface IMoodButton {
  onPressMood?: any;
}

const MoodButton = ({ onPressMood }: IMoodButton): JSX.Element => {
  const moods: string[] = [
    "All",
    "Jazzy",
    "Sad",
    "Hopeful",
    "Happy",
    "Dark",
    "Weird",
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
    <div className="">
      <h3>Mood</h3>
      {moodsList}
    </div>
  );
};

export default MoodButton;
