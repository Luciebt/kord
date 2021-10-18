import React, { useState, useEffect } from "react";
import { PlayPianoChord } from "../../IChords";
import PianoDisplay from "./PianoDisplay";
import { useKeyPress } from "../hooks/KeyPressHook";

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
  const chordArr: string[] = chord.split(",");
  let chordButton: JSX.Element[] = [];

  // Use numerical keys to play chords of one progression.
  const FirstNumKey = useKeyPress("1");
  const SecondNumKey = useKeyPress("2");
  const ThirdNumKey = useKeyPress("3");
  const FourthNumKey = useKeyPress("4");
  const FifthNumKey = useKeyPress("5");
  const SixthNumKey = useKeyPress("6");

  if (FirstNumKey) {
    PlayPianoChord(chordArr[0]);
  }
  if (SecondNumKey) {
    PlayPianoChord(chordArr[1]);
  }
  if (ThirdNumKey && chordArr.length > 2) {
    PlayPianoChord(chordArr[2]);
  }
  if (FourthNumKey && chordArr.length > 3) {
    PlayPianoChord(chordArr[3]);
  }
  if (FifthNumKey && chordArr.length > 4) {
    PlayPianoChord(chordArr[4]);
  }
  if (SixthNumKey && chordArr.length > 5) {
    PlayPianoChord(chordArr[5]);
  }

  chordArr.forEach((c) => {
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

  return (
    <div className="">
      <h3>{chordButton}</h3>
      {chordState ? <PianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordDisplayComponent;
