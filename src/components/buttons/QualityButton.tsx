import React from "react";
import { TChords } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Buttons.css";

interface IChordButton {
  onPressKey?: any;
}

const ChordButton = ({ onPressKey }: IChordButton): JSX.Element => {
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
    unPressElementsStyleWithoutEvent("chordbuild-btn-pressed");
    event.target.classList.add("chordbuild-btn-pressed");
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
