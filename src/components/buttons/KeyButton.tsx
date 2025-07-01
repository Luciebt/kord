import React, { useCallback, memo } from "react";
import { TKey } from "../../types";
import { usePressedState } from "../../hooks/usePressedState";
import GenericButton from "./GenericButton";
import "./Buttons.scss";

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

const KeyButton: React.FC<IKeyButton> = memo(({ onPressKey = () => { } }) => {
  const handlePress = usePressedState("key-btn-pressed");

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, note: string) => {
      onPressKey(note);
      handlePress(event);
    },
    [onPressKey, handlePress],
  );

  return (
    <section
      aria-label="Choose a key for your chord progression"
      className="key-btn-section"
    >
      {keys.map((note) => (
        <GenericButton
          id={note}
          key={note}
          value={note}
          onClick={(e) => handleClick(e, note)}
          className="key-btn"
        >
          {note}
        </GenericButton>
      ))}
    </section>
  );
});

export default KeyButton;
