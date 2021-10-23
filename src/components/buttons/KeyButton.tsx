import React, { useState } from "react";
import { TKey } from "../../type";
import './Buttons.css';


interface IKeyButton {
  parentCallback?: any;
}

const KeyButton: React.FC<IKeyButton> = ({ parentCallback }) => {
  const [theTonic, setTonic] = useState("");

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

  const handleClick = (event: any, note: string) => {
    setTonic(note);
    parentCallback(note);

    const toUnpress = document.getElementsByClassName("key-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("key-btn-pressed");
      });
    }
    event.target.classList.add("key-btn-pressed");
  };

  notes.forEach((note, i) => {
    notesButtons.push(
      <button
        key={i}
        value={note}
        onClick={(e) => {
          handleClick(e, note);
        }}
        className="key-btn"
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
