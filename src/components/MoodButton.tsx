import React, { useState, useEffect } from "react";

interface IMoodButton {
  parentCallback?: any;
}

const MoodButton: React.FC<IMoodButton> = ({ parentCallback }) => {
  const [theMood, setMood] = useState("All");

  useEffect(() => {
    // nothing for now.
  });

  const moods: string[] = ["All", "Jazzy", "Melancholic", "Energised", "Pop"];
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
