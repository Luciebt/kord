import React from "react";
import { TKey } from "../../type";
import "./Buttons.css";

interface IKeyButton {
  onPressKey?: any;
}

const KeyButton = ({ onPressKey }: IKeyButton): JSX.Element => {
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

  const handleClick = (event: any, note: string) => {
    onPressKey(note);

    const toUnpress = document.getElementsByClassName("key-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("key-btn-pressed");
      });
    }
    event.target.classList.add("key-btn-pressed");
  };

  const notesList: JSX.Element[] = notes.map((note, i) => (
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
  ));

  return (
    <div className="">
      <h3>Key</h3>
      {notesList}
    </div>
  );
};

export default KeyButton;
