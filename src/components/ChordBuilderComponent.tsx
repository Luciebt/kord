import React, { useState, useContext, useEffect } from "react";
import { PlayChord } from "../Chords";
import KeyButton from "./buttons/KeyButton";
import ChordButton from "./buttons/ChordButton";
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
  };

  const ChordQualityCallback = (quality: string) => {
    setChordQuality(quality);
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
    <div className="chord-builder-tab">
      <section className="centered-box">
        <div className="prog-chooser-box">
          {" "}
          <KeyButton onPressKey={KeyCallback} />
          <ChordButton onPressKey={ChordQualityCallback} />
        </div>

        {chordKey && chordQuality ? (
          <div className="prog-box">
            <h2>{chordKey + " " + chordQuality}</h2>
            <PianoDisplay chord={chordSelected} />
          </div>
        ) : null}

        <br />
      </section>
    </div>
  );
};

export default ChordBuilderComponent;
