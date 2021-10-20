import React, { useState, useEffect } from "react";
import { useDidUpdate } from "../hooks/useDidUpdate";
import ProgressionComponent from "../ProgressionComponent";
import IProgression from "../../IProgression";
import ChordDisplay from "./ChordDisplay";

export interface IProgressionDisplayProps {
  tonic: string;
  quality: string;
  mood?: string;
  chords_list: string;
  chordsList?: any;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const ProgressionDisplayComponent = ({
  tonic,
  quality,
  mood,
  chords_list,
}: IProgressionDisplayProps): JSX.Element => {
  const [chordsState, setChordsState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  let chordsArr: string[] = chords_list.split(" | ");
  let chordsBloc: JSX.Element[] = [];

  const handleClick = (event: any, chords: string) => {
    setChordsState(true);
    setChordSelected(chords);

    const toUnpress = document.getElementsByClassName("prog-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("prog-btn-pressed");
      });
    }
    event.target.classList.add("prog-btn-pressed");
  };

  chordsArr.forEach((chords, i) => {
    chordsBloc.push(
      <button
        key={i}
        onClick={(e) => {
          handleClick(e, chords);
        }}
      >
        {chords}
      </button>
    );
  });

  // Reset chord selected when changing tonality or quality.
  useDidUpdate(() => {
    setChordsState(false);
  }, [tonic, quality, mood]);

  return (
    <div className="prog-box">
      <h3>Progressions </h3>
      {/* Progressions buttons: */}
      <div className="prog-btn-box">
        <b>{chords_list ? chordsBloc : ""}</b>
      </div>
      {/* Chords buttons: */}
      {chords_list && chordsState ? (
        <ChordDisplay chord={chordSelected} />
      ) : null}
    </div>
  );
};

export default ProgressionDisplayComponent;
