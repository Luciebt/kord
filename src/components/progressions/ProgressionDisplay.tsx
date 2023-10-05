import React, { useState } from "react";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import ChordDisplay from "./ChordDisplay";
import "./Progressions.css";

export interface IProgressionDisplayProps {
  tonic: string;
  mode: string;
  mood?: string;
  chordsList: string;
}

const ProgressionDisplayComponent = ({
  tonic,
  mode,
  mood,
  chordsList,
}: IProgressionDisplayProps): JSX.Element => {
  const [chordsState, setChordsState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  const chordsArr: string[] = chordsList.split(" | ");

  const handleClick = (event: any, chords: string) => {
    setChordsState(true);
    setChordSelected(chords);

    unPressElementsStyleWithoutEvent("prog-btn-pressed");
    event.target.classList.add("prog-btn-pressed");
  };

  // Reset chord selected when changing tonality or mode.
  useDidUpdate(() => {
    setChordsState(false);
  }, [tonic, mode, mood]);

  const progressionsList: JSX.Element[] = chordsArr.map((chords, i) => (
    <button
      key={i}
      onClick={(e) => {
        handleClick(e, chords);
      }}
      className="prog-btn"
    >
      {chords}
    </button>
  ));

  return (
    <section className="box prog-box">
      <h2>Progressions </h2>
      <section
        aria-label="Progressions found for your criteria"
        className="prog-btn-box"
      >
        <div className="prog-grid-results">
          {chordsList ? progressionsList : ""}
        </div>
      </section>
      {/* Chords buttons: */}
      {chordsList && chordsState ? (
        <ChordDisplay tonic={tonic} chord={chordSelected} />
      ) : null}
    </section>
  );
};

export default ProgressionDisplayComponent;
