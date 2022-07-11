import React, { useState, useEffect } from "react";
import { PlayChord } from "../Chords";
import KeyButton from "./buttons/KeyButton";
import QualityButton from "./buttons/QualityButton";
import ProgressionGridDisplayComponent from "./progressions/ProgressionGridDisplayComponent";
import { SoundOnContext } from "../App";
import { polySynth } from "../audio/Play";
import { unPressElementsStyleWithoutEvent } from "./hooks/unPressElementStyle";
import { FullChordStringToArray } from "../NoteUtils";

const ChordBuilderComponent = (): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [chordKey, setChordKey] = useState("");
  const [chordQuality, setChordQuality] = useState("");
  const [chordSelected, setChordSelected] = useState("");
  // const [progressionLength, setProgressionLength] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(true);

  const KeyCallback = (key: string) => {
    // if (key == chordKey) return;
    setChordKey(key);
  };

  const ChordQualityCallback = (quality: string) => {
    // if (quality == chordQuality) return;
    setChordQuality(quality);
  };

  const newChordCallback = (newChord: string) => {
    if (!newChord) return;
    const [key, quality] = FullChordStringToArray(newChord);

    unPressElementsStyleWithoutEvent("chordbuild-btn-pressed");
    const qualityBtn = document.getElementById(quality);
    if (!qualityBtn) return;
    qualityBtn.classList.add("chordbuild-btn-pressed");
    qualityBtn.click();

    unPressElementsStyleWithoutEvent("key-btn-pressed");
    const keyBtn = document.getElementById(key);
    if (!keyBtn) return;
    keyBtn.classList.add("key-btn-pressed");
    keyBtn.click();

    if (SoundOn) PlayChord(key + quality);
    setShouldPlay(false);
  };

  useEffect(() => {
    const chordToBuild = chordKey + chordQuality;
    setChordSelected(chordToBuild);
    if (SoundOn && shouldPlay) PlayChord(chordToBuild);
    setShouldPlay(true);
  }, [chordKey, chordQuality]);

  return (
    <section className="centered-box">
      <div className="prog-chooser-box">
        {" "}
        <KeyButton onPressKey={KeyCallback} />
        <QualityButton onPressKey={ChordQualityCallback} />
      </div>

      <ProgressionGridDisplayComponent
        chordToAdd={chordSelected}
        onPressChord={newChordCallback}
      />

      <br />
    </section>
  );
};

export default ChordBuilderComponent;
