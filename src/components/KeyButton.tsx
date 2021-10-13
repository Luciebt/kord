import React, { useState, useEffect } from "react";
import { TKey } from "../IProgression";

interface IKeyButton {
  parentCallback?: any;
}

const KeyButton: React.FC<IKeyButton> = ({ parentCallback }) => {
  const [theKey, setKey] = useState("");

  useEffect(() => {
    // nothing for now.
  });

  const notes: TKey[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const notesButtons: JSX.Element[] = [];

  for (let note of notes) {
    notesButtons.push(
      <button
        onClick={() => {
          setKey(note);
          parentCallback(note);
        }}
      >
        {note}
      </button>
    );
  }

  return (
    <div className="">
      <h3>Set the key: {theKey}</h3>
      {notesButtons}
    </div>
  );
};

export default KeyButton;
