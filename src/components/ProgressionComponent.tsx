import React, { useState } from "react";
import { DetermineChordsList } from "../IProgression";
import { findChordsScale } from "../Scale";
import KeyButton from "./buttons/KeyButton";
import ModeButton from "./buttons/ModeButton";
import MoodButton from "./buttons/MoodButton";
import ProgressionDisplayComponent from "./progressions/ProgressionDisplay";
import ChordsScaleDisplayComponent from "./scales/ScaleDisplay";
import '../components/progressions/Progressions.css';

export interface IProgressionComponent {
  tonic?: string;
  mode?: string;
  mood?: string;
  chords_list?: string;
}

const ProgressionComponent: React.FC<IProgressionComponent> = ({}) => {
  const [tonic, setTonic] = useState("");
  const [mode, setMode] = useState("");
  const [mood, setMood] = useState("");
  const [chordsList, setChordsList] = useState("");
  const [chordsScale, setchordsScale] = useState([""]);

  const ModeCallback = (mode: string) => {
    setMode(mode);
    if (tonic && mode) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, mode, mood));
      setchordsScale(findChordsScale(tonic, mode));
    }
  };

  const KeyCallback = (tonic: string) => {
    setTonic(tonic);
    if (mode && tonic) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, mode, mood));
      setchordsScale(findChordsScale(tonic, mode));
    }
  };

  const MoodCallback = (mood: string) => {
    setMood(mood);
    if (tonic && mode && mood) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, mode, mood));
    }
  };

  return (
    <div className="centered-box">
      <KeyButton parentCallback={KeyCallback} />
      <ModeButton parentCallback={ModeCallback} />
      <MoodButton parentCallback={MoodCallback} />
      <ProgressionDisplayComponent
        tonic={tonic}
        mode={mode}
        mood={mood ? mood : ""}
        chords_list={chordsList ? chordsList : ""}
      />
      <ChordsScaleDisplayComponent
        tonic={tonic}
        mode={mode}
        chords_scale={chordsScale}
      />
      <br />
    </div>
  );
};

export default ProgressionComponent;
