import React, { useState, useEffect } from "react";
import { TKey } from "../type.d";

interface IKeyButton {
  parentCallback?: any;
}

const KeyButton: React.FC<IKeyButton> = ({ parentCallback }) => {
  const [theTonic, setTonic] = useState("");

  // useEffect(() => {
  // });

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

  const setBtnPressed = (note: string): void => {
    const selectedBtn = document.getElementById(note);
    if (selectedBtn) {
      console.log(selectedBtn);
      selectedBtn.classList.add("btn-pressed");
    }
  };

  notes.forEach((note, i) => {
    notesButtons.push(
      <button
        key={i}
        onClick={() => {
          setTonic(note);
          setBtnPressed(note);
          parentCallback(note);
        }}
      >
        {note}
      </button>
    );
  });

  return (
    <div className="">
      <h3>Key</h3>
      {notesButtons}
    </div>
  );
};

export default KeyButton;
