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

  return (
    <div className="prog-box">
      <h2>
        {tonic && !quality ? tonic : ""}
        {!tonic && quality ? quality : ""}
        {tonic && quality ? tonic + " | " + quality : ""}
        {mood && tonic && quality ? " | " + mood : ""}
      </h2>
      <b>{chordsBloc}</b>
      {chordsState ? <ChordDisplay chord={chordSelected} /> : null}
    </div>
  );
};

export default ProgressionDisplayComponent;
