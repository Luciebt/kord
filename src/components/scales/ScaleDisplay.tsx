import React, { useState, useEffect } from "react";
import { useDidUpdate } from "../hooks/useDidUpdate";
import { PlayChord } from "../../Chords";
import ScalePianoDisplay from "./ScalePianoDisplay";
import './Scales.css';

export interface IChordsScaleDisplayComponent {
  tonic: string;
  mode: string;
  chords_scale: string[];
}

const ChordsScaleDisplayComponent = ({
  tonic,
  mode,
  chords_scale,
}: IChordsScaleDisplayComponent): JSX.Element => {
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  let chordsBloc: JSX.Element[] = [];

  const handleClick = (chord: string, event?: any) => {
    PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);

    const toUnpress = document.getElementsByClassName(
      "scale-chord-btn-pressed"
    );
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("scale-chord-btn-pressed");
      });
    }
    event.target.classList.add("scale-chord-btn-pressed");
  };

  if (chords_scale) {
    chords_scale.forEach((chords, i) => {
      chordsBloc.push(
        <button
          key={i}
          onClick={(e) => {
            handleClick(chords, e);
          }}
          className="scale-chord-btn"
        >
          {chords}
        </button>
      );
    });
  }
  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [chords_scale]);

  // Reset chord selected when changing tonality or mode.
  useDidUpdate(() => {
    setChordState(false);
  }, [tonic, mode]);

  return (
    <div className="scale-box">
      <h3>{chords_scale ? "Chords on Scale " + tonic + " " + mode : ""}</h3>
      <b>{chordsBloc && chordsBloc}</b>
      {chordState ? <ScalePianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordsScaleDisplayComponent;
