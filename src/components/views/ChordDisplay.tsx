import React, { useState, useEffect } from "react";
import { PlayPianoChord } from "../../IChords";
import { useKeyPress } from "../hooks/KeyPressHook";
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
  let chordArr: string[] = chord.split(",");
  let chordButton: JSX.Element[] = [];

  const handleClick = (chord: string, event?: any) => {
    PlayPianoChord(chord);
    setChordState(true);
    setChordSelected(chord);

    const toUnpress = document.getElementsByClassName("chord-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("chord-btn-pressed");
      });
    }
    event.target.classList.add("chord-btn-pressed");
  };

  // Use numerical keys to play chords of one progression.
  const FirstNumKey = useKeyPress("1");
  const SecondNumKey = useKeyPress("2");
  const ThirdNumKey = useKeyPress("3");
  const FourthNumKey = useKeyPress("4");
  const FifthNumKey = useKeyPress("5");
  const SixthNumKey = useKeyPress("6");

  // TODO: not only play chords, but also show the piano display.
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
  if (SixthNumKey && chordArr.length > 6) {
    PlayPianoChord(chordArr[6]);
  }

  // FIXME: empty button?
  // TODO: useEffect: build the buttons when mounted, clear all buttons when unmounted.
  if (chordArr) {
    chordArr.forEach((c, i) => {
      chordButton.push(
        <button
          key={i}
          onClick={(e) => {
            handleClick(c, e);
          }}
          className="chord-btn"
        >
          {c}
        </button>
      );
    });
  }

  return (
    <div className="chords-box">
      <h3>{chordButton && chordButton}</h3>
      <p>{chordButton ? "Press number keys to play chords" : ""}</p>

      {chordState && chordSelected ? (
        <PianoDisplay chord={chordSelected} />
      ) : null}
    </div>
  );
};

export default ChordDisplayComponent;
