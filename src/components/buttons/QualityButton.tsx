import React from "react";
import { TChords } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Buttons.css";

interface IChordButton {
  onPressKey?: any;
}

const ChordButton = ({ onPressKey }: IChordButton): JSX.Element => {
  // TODO: is major the default?
  // TODO: Add more chords...
  const chords: TChords[] = [
    "Major",
    "Minor",
    "Major7",
    "Minor7",
    "Diminished",
    "Minor7Flat5",
  ];

  const handleClick = (event: any, chord: string) => {
    onPressKey(chord);

    const style: string = "chordbuild-btn-pressed";
    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
  };

  const chordsList: JSX.Element[] = chords.map((chord, i) => (
    <button
      key={i}
      value={chord}
      onClick={(e) => {
        handleClick(e, chord);
      }}
      className="key-btn"
    >
      {chord}
    </button>
  ));

  return (
    <section aria-label="Choose a quality to the chord">
      <h2>Quality</h2>
      {chordsList}
    </section>
  );
};

export default ChordButton;
