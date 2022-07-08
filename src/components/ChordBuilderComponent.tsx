import React, { useState, useEffect } from "react";
import { PlayChord } from "../Chords";
import KeyButton from "./buttons/KeyButton";
import QualityButton from "./buttons/QualityButton";
import ProgressionGridDisplayComponent from "./progressions/ProgressionGridDisplayComponent";
import { SoundOnContext } from "../App";
import { polySynth } from "../audio/Synth";

const ChordBuilderComponent = (): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [chordKey, setChordKey] = useState("");
  const [chordQuality, setChordQuality] = useState("");
  const [chordSelected, setChordSelected] = useState("");

  const KeyCallback = (key: string) => {
    setChordKey(key);
    Play();
  };

  const ChordQualityCallback = (quality: string) => {
    setChordQuality(quality);
    Play();
  };

  const Play = () => {
    if (chordKey && chordQuality) {
      if (SoundOn) {
        polySynth.releaseAll();
        // TODO: add "true" bool to PlayChord?
        PlayChord(chordKey + chordQuality, true);
      }
    }
  };

  useEffect(() => {
    if (chordKey && chordQuality) {
      const chordToBuild = chordKey + chordQuality;
      setChordSelected(chordToBuild);
      if (SoundOn) {
        polySynth.releaseAll();
        // TODO: add "true" bool to PlayChord?
        console.log("CHORD TO BUILD CHORD BUILDER COMP___", chordToBuild);
        PlayChord(chordToBuild, true);
      }
    }
  }, [chordKey, chordQuality]);

  return (
    <section className="centered-box">
      <div className="prog-chooser-box">
        {" "}
        <KeyButton onPressKey={KeyCallback} />
        <QualityButton onPressKey={ChordQualityCallback} />
      </div>

      <ProgressionGridDisplayComponent chordToAdd={chordSelected} />

      <br />
    </section>
  );
};

export default ChordBuilderComponent;
