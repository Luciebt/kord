import React, { useState } from "react";
import { DetermineChordsList } from "../IProgression";
import { findChordsScale } from "../Scale";
import KeyButton from "./buttons/KeyButton";
import ModeButton from "./buttons/ModeButton";
import MoodButton from "./buttons/MoodButton";
import ProgressionDisplayComponent from "./progressions/ProgressionDisplay";
import ChordsScaleDisplayComponent from "./scales/ScaleDisplay";
import "../components/progressions/Progressions.css";

const ProgressionComponent = (): JSX.Element => {
  const [tonic, setTonic] = useState("");
  const [mode, setMode] = useState("");
  const [mood, setMood] = useState("");
  const [chordsList, setChordsList] = useState("");
  const [chordsScale, setchordsScale] = useState([""]);

  const ModeCallback = (mode: string) => {
    setMode(mode);
    if (tonic && mode) {
      setChordsList(DetermineChordsList(tonic, mode, mood));
      setchordsScale(findChordsScale(tonic, mode));
    }
  };

  const KeyCallback = (tonic: string) => {
    setTonic(tonic);
    if (mode && tonic) {
      setChordsList(DetermineChordsList(tonic, mode, mood));
      setchordsScale(findChordsScale(tonic, mode));
    }
  };

  const MoodCallback = (mood: string) => {
    setMood(mood);
    if (tonic && mode && mood) {
      setChordsList(DetermineChordsList(tonic, mode, mood));
    }
  };

  return (
    <div className="centered-box">
      <KeyButton onPressKey={KeyCallback} />
      <ModeButton onPressMode={ModeCallback} />
      <MoodButton onPressMood={MoodCallback} />
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
    </div>
  );
};

export default ProgressionComponent;
