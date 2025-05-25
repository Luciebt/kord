import React, { useState, useCallback } from "react";
import { DetermineChordsList } from "../../IProgression";
import { findChordsScale } from "../../Scale";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import MoodButton from "../buttons/MoodButton";
import ProgressionDisplayComponent from "./ProgressionDisplay";
import ChordsScaleDisplayComponent from "../scales/ScaleDisplay";
import "./Progressions.scss";

// const ProgressionComponent = (): JSX.Element => {
const ProgressionComponent: React.FC<{  }> = ({  }) => {
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

  const ModeCallback = useCallback((mode: string) => {
    setMode(mode);
    updateChords(tonic, mode, mood);
  }, [tonic, mode, mood]);

  const KeyCallback = useCallback((tonic: string) => {
    setTonic(tonic);
    updateChords(tonic, mode, mood);
  }, [tonic, mode, mood]);

  const MoodCallback = useCallback((mood: string) => {
    setMood(mood);
    updateChords(tonic, mode, mood);
  }, [tonic, mode, mood]);

  return (
    <section className="centered-box">
      <div className="selection-panel">
        <div className="buttons-container">
          <h4 className="selection-label">Key</h4>
          <KeyButton onPressKey={KeyCallback} />
          <h4 className="selection-label">Mode</h4>
          <ModeButton onPressMode={ModeCallback} />
          <h4 className="selection-label">Mood</h4>
          <MoodButton onPressMood={MoodCallback} />
        </div>
      </div>
      <ProgressionDisplayComponent
        tonic={tonic}
        mode={mode}
        mood={mood ? mood : ""}
        chordsList={chordsList ? chordsList : ""}
      />
      <br />
    </section>
  );
};

export default ProgressionComponent;
