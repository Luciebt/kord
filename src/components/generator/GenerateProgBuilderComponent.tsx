import React, { useState, useEffect } from "react";
import "./GenerateProgBuilder.scss";
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
    onGenerateProg(GenerateProg(selectedChord, progLength));
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

