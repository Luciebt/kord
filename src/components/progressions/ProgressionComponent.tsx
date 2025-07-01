import React, { useState, useCallback, useEffect } from "react";
import { DetermineChordsList } from "../../ProgressionLogic";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import MoodButton from "../buttons/MoodButton";
import ProgressionDisplayComponent from "./ProgressionDisplay";
import "./Progressions.scss";
import { useProgressionStore } from "../../ProgressionStore";

const ProgressionComponent: React.FC<{}> = ({ }) => {
  const { key, mode, mood, setKey, setMode, setMood } = useProgressionStore();
  const [chordsList, setChordsList] = useState("");

  useEffect(() => {
    if (key && mode) {
      setChordsList(DetermineChordsList(key, mode, mood));
    }
  }, [key, mode, mood]);

  return (
    <section className="centered-box">
      <div className="selection-panel">
        <div className="buttons-container">
          <h4>Mood</h4>
          <MoodButton onPressMood={setMood} />
          <h4>Key</h4>
          <KeyButton onPressKey={setKey} />
          <h4>Mode</h4>
          <ModeButton onPressMode={setMode} />
        </div>
      </div>
      <ProgressionDisplayComponent
        tonic={key}
        mode={mode}
        mood={mood ? mood : ""}
        chordsList={chordsList ? chordsList : ""}
      />
      <br />
    </section>
  );
};

export default ProgressionComponent;
