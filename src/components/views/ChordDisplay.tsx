import React from "react";
import { PlayPianoChord } from "../../IChords";

export interface IChordDisplayProps {
  key?: number;
  chord: string;
}

const ChordDisplayComponent = ({
  key,
  chord,
}: IChordDisplayProps): JSX.Element => {
  let chordButton: JSX.Element[] = [];

  chord.split(",").forEach((c) => {
    chordButton.push(
      <button key={c} onClick={() => PlayPianoChord(c)}>
        {c}
      </button>
    );
  });

  // TODO: Play chords w keys 1, 2, 3, 4.
  return (
    <div className="">
      <h3>{chordButton}</h3>
    </div>
  );
};

export default ChordDisplayComponent;
