import React, { useState, useEffect } from "react";
import { useDidUpdate } from "../hooks/useDidUpdate";
import { PlayChord } from "../../Chords";
import ScalePianoDisplay from "./ScalePianoDisplay";
import "./Scales.css";

export interface IChordsScaleDisplayComponent {
  tonic: string;
  mode: string;
  chordsScale: string[];
}

const ChordsScaleDisplayComponent = ({
  tonic,
  mode,
  chordsScale,
}: IChordsScaleDisplayComponent): JSX.Element => {
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

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

  const chordsScaleList: JSX.Element[] = chordsScale.map((chords, i) => (
    <button
      key={i}
      onClick={(e) => {
        handleClick(chords, e);
      }}
      className="scale-chord-btn"
    >
      {chords}
    </button>
  ));

  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [chordsScale]);

  // Reset chord selected when changing tonality or mode.
  useDidUpdate(() => {
    setChordState(false);
  }, [tonic, mode]);

  return (
    <div className="scale-box">
      <h3>{chordsScale ? "Chords on Scale " + tonic + " " + mode : ""}</h3>
      <b>{chordsScaleList}</b>
      {chordState ? <ScalePianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordsScaleDisplayComponent;
