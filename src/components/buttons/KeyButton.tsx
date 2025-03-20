import React, { useCallback } from "react";
import { TKey } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.css";

interface IKeyButton {
  onPressKey?: (note: string) => void;
}

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

const KeyButton: React.FC<IKeyButton> = ({ onPressKey = () => {} }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, note: string) => {
      onPressKey(note);
      unPressElementsStyleWithoutEvent("key-btn-pressed");
      event.currentTarget.classList.add("key-btn-pressed");
    },
    [onPressKey],
  );

  return (
    <section aria-label="Choose a key for your chord progression">
      <h2>Key</h2>
      {keys.map((note) => (
        <button
          id={note}
          key={note}
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

