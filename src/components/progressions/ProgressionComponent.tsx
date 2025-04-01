import React, { useState } from "react";
import { DetermineChordsList } from "../../IProgression";
import { findChordsScale } from "../../Scale";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import MoodButton from "../buttons/MoodButton";
import ProgressionDisplayComponent from "./ProgressionDisplay";
import ChordsScaleDisplayComponent from "../scales/ScaleDisplay";
import "./Progressions.scss";

const ProgressionComponent = (): JSX.Element => {
  const [tonic, setTonic] = useState("");
  const [mode, setMode] = useState("");
  const [mood, setMood] = useState("");
  const [chordsList, setChordsList] = useState("");
  const [chordsScale, setchordsScale] = useState([""]);

  const updateChords = (tonic: string, mode: string, mood: string) => {
    if (tonic && mode) {
      setChordsList(DetermineChordsList(tonic, mode, mood));
      setchordsScale(findChordsScale(tonic, mode));
    }
  };

  const ModeCallback = (mode: string) => {
    setMode(mode);
    updateChords(tonic, mode, mood);
  };

  const KeyCallback = (tonic: string) => {
    setTonic(tonic);
    updateChords(tonic, mode, mood);
  };

  const MoodCallback = (mood: string) => {
    setMood(mood);
    updateChords(tonic, mode, mood);
  };

  return (
    <section className="centered-box">
      <div className="buttons-container">
        <ModeButton onPressMode={ModeCallback} />
        <KeyButton onPressKey={KeyCallback} />
        <MoodButton onPressMood={MoodCallback} />
      </div>
      <ProgressionDisplayComponent
        tonic={tonic}
        mode={mode}
        mood={mood ? mood : ""}
        chordsList={chordsList ? chordsList : ""}
      />
      <ChordsScaleDisplayComponent
        tonic={tonic}
        mode={mode}
        chordsScale={chordsScale}
      />
      <br />
    </section>
  );
};

export default ProgressionComponent;
