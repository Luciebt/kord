import React from "react";
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

    const toUnpress = document.getElementsByClassName("mood-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("mood-btn-pressed");
      });
    }
    event.target.classList.add("mood-btn-pressed");
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
