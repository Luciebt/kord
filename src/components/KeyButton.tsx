import React, { useState, useEffect } from "react";
import { TKey } from "../type.d";

interface IKeyButton {
  parentCallback?: any;
}

const KeyButton: React.FC<IKeyButton> = ({ parentCallback }) => {
  const [theTonic, setTonic] = useState("");

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
    "Bb",
    "B",
  ];
  const notesButtons: JSX.Element[] = [];

  for (let note of notes) {
    notesButtons.push(
      <button
        key={note}
        onClick={() => {
          setTonic(note);
          parentCallback(note);
        }}
      >
        {note}
      </button>
    );
  }

  return (
    <div className="">
      <h3>
        Set the key: <mark>{theTonic}</mark>
      </h3>
      {notesButtons}
    </div>
  );
};

export default KeyButton;
