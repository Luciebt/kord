import React, { useState, useContext, useEffect } from "react";
import { PlayChord } from "../Chords";
import KeyButton from "./buttons/KeyButton";
import QualityButton from "./buttons/QualityButton";
import ChordDisplayComponent from "./progressions/ChordDisplay";
import PianoDisplay from "./progressions/PianoDisplay";
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
        PlayChord(chordKey + chordQuality);
      }
    }
  };

  useEffect(() => {
    if (chordKey && chordQuality) {
      const chordToBuild = chordKey + chordQuality;
      setChordSelected(chordToBuild);
      if (SoundOn) {
        polySynth.releaseAll();
        PlayChord(chordToBuild);
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

      {chordKey && chordQuality ? (
        <div className="prog-box">
          <h2>{chordKey + " " + chordQuality}</h2>
          <PianoDisplay chord={chordSelected} />
        </div>
      ) : null}

      <br />
    </section>
  );
};

export default ChordBuilderComponent;
