import React from "react";
import { TKey } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
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

    const style: string = "key-btn-pressed";
    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
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
    <section className="">
      <h2>Key</h2>
      {notesList}
    </section>
  );
};

export default KeyButton;
