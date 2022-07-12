import React, { useState, useEffect } from "react";
import { SoundOnContext } from "../../App";
import { polySynth } from "../../audio/Play";
import { PlayChord } from "../../Chords";
import ProgressionGridDisplayComponent from "./ProgressionGridDisplayComponent";
import "./GenerateProgBuilder.css";

export interface INextChordDisplayProps {
  tonic?: string;
  nextChords?: string;
}

const GenerateProgBuilderComponent = ({
  tonic,
  nextChords,
}: INextChordDisplayProps): JSX.Element => {
  //   const SoundOn = React.useContext(SoundOnContext);

  return (
    <button
      arial-label="Generate a progression"
      title="Generate a progression"
      className="box generate-btn"
    >
      🎲
    </button>
  );
};

export default GenerateProgBuilderComponent;
