import React, { useState, useCallback } from "react";
import { DetermineChordsList } from "../../ProgressionLogic";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import MoodButton from "../buttons/MoodButton";
import ProgressionDisplayComponent from "./ProgressionDisplay";
import "./Progressions.scss";

const ProgressionComponent: React.FC<{}> = ({ }) => {
  const [tonic, setTonic] = useState("");
  const [mode, setMode] = useState("");
  const [mood, setMood] = useState("");
  const [chordsList, setChordsList] = useState("");

  const updateChords = (tonic: string, mode: string, mood: string) => {
    if (tonic && mode) {
      setChordsList(DetermineChordsList(tonic, mode, mood));
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
          <h4>Mood</h4>
          <MoodButton onPressMood={MoodCallback} />
          <h4>Key</h4>
          <KeyButton onPressKey={KeyCallback} />
          <h4>Mode</h4>
          <ModeButton onPressMode={ModeCallback} />
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
