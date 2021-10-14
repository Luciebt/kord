import React, { useState } from "react";
import { PlayPianoChord } from "../../IChords";
import PianoDisplay from "./PianoDisplay";

export interface IChordDisplayProps {
  key?: number;
  chord: string;
}

const ChordDisplayComponent = ({
  key,
  chord,
}: IChordDisplayProps): JSX.Element => {
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  let chordButton: JSX.Element[] = [];

  chord.split(",").forEach((c) => {
    chordButton.push(
      <button
        key={c}
        onClick={() => {
          setChordState(true), setChordSelected(c), PlayPianoChord(c);
        }}
      >
        {c}
      </button>
    );
  });

  // TODO: Play chords w keys 1, 2, 3, 4.
  return (
    <div className="">
      <h3>{chordButton}</h3>
      {chordState ? <PianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordDisplayComponent;
