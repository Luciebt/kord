import React, { useState, useEffect } from "react";
import IProgression, { DetermineChordsList } from "../IProgression";
import { findChordsScale } from "../IScale";
import KeyButton from "./KeyButton";
import QualityButton from "./QualityButton";
import MoodButton from "./MoodButton";
import ProgressionDisplayComponent from "./views/ProgressionDisplay";
import ChordsScaleDisplayComponent from "./views/ScaleDisplay";

// The IProgression has been imported and passed down as the props of the ProgressionComponent. In the constructor, we checked that the props passed are of the IProgression type and in the render function, the data will be displayed.

export interface IProgressionComponent {
  tonic?: string;
  quality?: string;
  mood?: string;
  chords_list?: string;
}

const ProgressionComponent: React.FC<IProgressionComponent> = ({}) => {
  const [tonic, setTonic] = useState("");
  const [quality, setQuality] = useState("");
  const [mood, setMood] = useState("");
  const [chordsList, setChordsList] = useState("");
  const [chordsScale, setchordsScale] = useState([""]);

  const QualityCallback = (quality: string) => {
    setQuality(quality);
    if (tonic && quality) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, quality, mood));
      setchordsScale(findChordsScale(tonic, quality));
    }
  };

  const KeyCallback = (tonic: string) => {
    setTonic(tonic);
    if (quality && tonic) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, quality, mood));
      setchordsScale(findChordsScale(tonic, quality));
    }
  };

  const MoodCallback = (mood: string) => {
    setMood(mood);
    if (tonic && quality && mood) {
      setChordsList("");
      setChordsList(DetermineChordsList(tonic, quality, mood));
    }
  };

  return (
    <div className="centered-box">
      <KeyButton parentCallback={KeyCallback} />
      <QualityButton parentCallback={QualityCallback} />
      <MoodButton parentCallback={MoodCallback} />
      <ProgressionDisplayComponent
        tonic={tonic}
        quality={quality}
        mood={mood ? mood : ""}
        chords_list={chordsList ? chordsList : ""}
      />
      <ChordsScaleDisplayComponent
        tonic={tonic}
        quality={quality}
        chords_scale={chordsScale}
      />
      <br />
    </div>
  );
};

export default ProgressionComponent;
