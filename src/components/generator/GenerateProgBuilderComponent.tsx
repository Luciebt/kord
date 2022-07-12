import React, { useState, useEffect } from "react";
import "./GenerateProgBuilder.css";
import { GenerateProg } from "./ProgGenerator";

export interface INextChordDisplayProps {
  selectedChord?: string;
  key?: string;
  mode?: string;
  progLength?: number;
  onGenerateProg?: any;
}

const GenerateProgBuilderComponent = ({
  selectedChord,
  key,
  mode,
  progLength,
  onGenerateProg
}: INextChordDisplayProps): JSX.Element => {

  const handleClick = (event: any) => {
    if (!selectedChord || !progLength) return;
    GenerateProg(selectedChord, progLength);
    const newProg = ["A#", "Dm"];
    onGenerateProg(newProg);
  }

  return (
    <button
      arial-label="Generate a progression"
      title="Generate a progression"
      className="box generate-btn"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      🎲
    </button>
  );
};

export default GenerateProgBuilderComponent;

