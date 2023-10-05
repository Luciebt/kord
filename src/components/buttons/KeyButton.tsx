import React from "react";
import { TKey } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.css";

interface IKeyButton {
  onPressKey?: (note: string) => void;
}

const KeyButton = ({ onPressKey = () => {} }: IKeyButton): JSX.Element => {
  const keys: TKey[] = [
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
    unPressElementsStyleWithoutEvent("key-btn-pressed");
    event.target.classList.add("key-btn-pressed");
  };

  return (
    <section arial-label="Choose a key for your chord progression">
      <h2>Key</h2>
      {keys.map((note, i) => (
        <button
          id={note}
          key={i}
          value={note}
          onClick={(e) => handleClick(e, note)}
          className="key-btn"
        >
          {note}
        </button>
      ))}
    </section>
  );
};

export default KeyButton;