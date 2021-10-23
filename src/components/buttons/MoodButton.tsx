import React, { useState } from "react";
import './Buttons.css';

interface IMoodButton {
  parentCallback?: any;
}

const MoodButton: React.FC<IMoodButton> = ({ parentCallback }) => {
  const [theMood, setMood] = useState("All");

  const moods: string[] = [
    "All",
    "Jazzy",
    "Sad",
    "Hopeful",
    "Happy",
    "Dark",
    "Weird",
  ];
  const moodsButtons: JSX.Element[] = [];

  const handleClick = (event: any, mood: string) => {
    setMood(mood);
    parentCallback(mood);

    const toUnpress = document.getElementsByClassName("mood-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("mood-btn-pressed");
      });
    }
    event.target.classList.add("mood-btn-pressed");
  };

  moods.forEach((mood, i) => {
    moodsButtons.push(
      <button
        key={i}
        onClick={(e) => {
          handleClick(e, mood);
        }}
      >
        {mood}
      </button>
    );
  });

  return (
    <div className="">
      <h3>Mood</h3>
      {moodsButtons}
    </div>
  );
};

export default MoodButton;
