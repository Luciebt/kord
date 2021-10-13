import React from "react";

export interface IChordDisplayProps {
  key?: number;
  chord: string;
}

const ChordDisplayComponent = ({
  key,
  chord,
}: IChordDisplayProps): JSX.Element => {
  let chordButton: JSX.Element[] = [];

  chord.split(",").forEach((c) => {
    chordButton.push(<button>{c}</button>);
  });

  // TODO: Play chords w 1, 2, 3, 4.
  return (
    <div className="">
      <h3>chordsBtn_ {chordButton}</h3>
    </div>
  );
};

export default ChordDisplayComponent;
