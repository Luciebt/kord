import React, { useState, useEffect } from "react";
import { PlayChord } from "../Chords";
import KeyButton from "./buttons/KeyButton";
import QualityButton from "./buttons/QualityButton";
import ProgressionGridDisplayComponent from "./progressions/ProgressionGridDisplayComponent";
import { SoundOnContext } from "../App";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { FullChordStringToArray } from "../NoteUtils";

const ChordBuilderComponent = (): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [chordKey, setChordKey] = useState("");
  const [chordQuality, setChordQuality] = useState("");
  const [chordSelected, setChordSelected] = useState("");
  const [shouldPlay, setShouldPlay] = useState(true);

  const KeyCallback = (key: string) => {
    setChordKey(key);
    if (chordKey && chordQuality) {
      setChordSelected(chordKey + chordQuality);
    }
  };

  const ChordQualityCallback = (quality: string) => {
    setChordQuality(quality);
    if (chordKey && chordQuality) {
      setChordSelected(chordKey + chordQuality);
    }
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

    // Triggers sound from keyboard (and also the previous one??)
    if (SoundOn) PlayChord(key + quality);
    setShouldPlay(false);
  };

  useEffect(() => {
    const chordToBuild = chordKey + chordQuality;
    setChordSelected(chordToBuild);
    // Triggers sound on click.
    if (SoundOn && shouldPlay) PlayChord(chordToBuild);
    setShouldPlay(false);
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
