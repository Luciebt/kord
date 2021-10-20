import React, { useState, useEffect } from "react";
import { useDidUpdate } from "../hooks/useDidUpdate";
import { findChordsScale } from "../../IScale";
import { PlayPianoChord } from "../../IChords";
import ScalePianoDisplay from "./ScalePianoDisplay";

export interface IChordsScaleDisplayComponent {
  tonic: string;
  quality: string;
  chords_scale: string[];
}

const ChordsScaleDisplayComponent = ({
  tonic,
  quality,
  chords_scale,
}: IChordsScaleDisplayComponent): JSX.Element => {
  // chords_scale should be an array of chords
  // use ShowChords for each chord to get the notes
  // Display each of them in a button.
  // Display piano chart.

  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  let chordsBloc: JSX.Element[] = [];

  const handleClick = (chord: string, event?: any) => {
    PlayPianoChord(chord);
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
    console.log(chords_scale);
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
    console.log("chords_scale updated");
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [chords_scale]);

  // Reset chord selected when changing tonality or quality.
  useDidUpdate(() => {
    setChordState(false);
  }, [tonic, quality]);

  return (
    <div className="scale-box">
      <h3>{chords_scale ? "Chords on Scale " + tonic + " " + quality : ""}</h3>
      <b>{chordsBloc && chordsBloc}</b>
      {chordState ? <ScalePianoDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ChordsScaleDisplayComponent;
