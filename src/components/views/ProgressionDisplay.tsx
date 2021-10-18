import React, { useState } from "react";
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

  // TODO: update chords_list when changing tonality or quality.
  const chordsArr: string[] = chords_list.split(" | ");
  let chordsBloc: JSX.Element[] = [];

  chordsArr.forEach((chords) => {
    chordsBloc.push(
      <button
        key={chords}
        onClick={() => {
          setChordsState(true), setChordSelected(chords);
        }}
      >
        {chords}
      </button>
    );
  });

  return (
    <div className="prog-box">
      <h2>
        {tonic && quality ? tonic + " | " + quality : ""}
        {mood ? " | " + mood : ""}
      </h2>
      <h2>{tonic && quality ? "Suggested progressions" : ""}</h2>
      <b>{chordsBloc}</b>
      {chordsState ? <ChordDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ProgressionDisplayComponent;
