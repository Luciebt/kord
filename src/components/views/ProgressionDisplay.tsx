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
      <b>Tonic: {tonic} </b>
      <br />
      <b>Quality: {quality} </b>
      <br />
      <b>{mood ? mood : ""}</b>
      <br />
      <b>{chordsBloc}</b>
      {chordsState ? <ChordDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ProgressionDisplayComponent;
