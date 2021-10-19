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

  moods.forEach((mood, i) => {
    moodsButtons.push(
      <button
        key={i}
        onClick={() => {
          setMood(mood);
          parentCallback(mood);
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
