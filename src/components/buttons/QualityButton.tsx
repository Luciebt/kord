import React from "react";
import { TChords } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Buttons.css";

interface IChordButton {
  onPressKey?: any;
}

const ChordButton = ({ onPressKey }: IChordButton): JSX.Element => {
  // TODO: is major the default?
  // TODO: Add more chordsQualities...
  const chordsQualities: TChords[] = [
    "Major",
    "Minor",
    "Major7",
    "Minor7",
    "Diminished",
    "Minor7Flat5",
  ];

  const handleClick = (event: any, quality: string) => {
    onPressKey(quality);

    const style: string = "chordbuild-btn-pressed";
    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
  };

  const chordsQualitiesList: JSX.Element[] = chordsQualities.map(
    (quality, i) => (
      <button
        id={quality}
        key={i}
        value={quality}
        onClick={(e) => {
          handleClick(e, quality);
        }}
        className="key-btn"
      >
        {quality}
      </button>
    )
  );

  return (
    <section aria-label="Choose a quality to the chord">
      <h2>Quality</h2>
      {chordsQualitiesList}
    </section>
  );
};

export default ChordButton;
