import React, { useState, useEffect } from "react";
import { useDidUpdate } from "../hooks/useDidUpdate";
import { PlayChord } from "../../Chords";
import ScalePianoDisplay from "./ScalePianoDisplay";
import "./Scales.css";
import { SetupSynth } from "../../audio/Synth";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";

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

  const style: string = "scale-chord-btn-pressed";

  const handleClick = (chord: string, event?: any) => {
    PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);

    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
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
    SetupSynth();
    unPressElementsStyleWithoutEvent(style);
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  // Reset chord selected when changing tonality or mode.
  useDidUpdate(() => {
    setChordState(false);
  }, [tonic, mode]);

  return (
    <div className="scale-box">
      <h3>{chordsScale ? "Chords on Scale " + tonic + " " + mode : ""}</h3>
      {chordsScaleList}
      {chordState ? <ScalePianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordsScaleDisplayComponent;
