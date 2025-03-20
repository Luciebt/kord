import React, { useState, useEffect, useContext } from "react";
import { PlayChord } from "../../Chords";
import KeyButton from "../buttons/KeyButton";
import QualityButton from "../buttons/QualityButton";
import ProgressionGridDisplayComponent from "../progbuilder/ProgressionGridDisplayComponent";
import { SoundOnContext } from "../../App";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import { FullChordStringToArray } from "../../utils/NoteUtils";

const ChordBuilderComponent = (): JSX.Element => {
  const SoundOn = useContext(SoundOnContext);
  const [chordKey, setChordKey] = useState("");
  const [chordQuality, setChordQuality] = useState("");
  const [chordSelected, setChordSelected] = useState("");
  const [shouldPlay, setShouldPlay] = useState(true);

  const updateChordSelected = () => {
    if (chordKey && chordQuality) {
      setChordSelected(chordKey + chordQuality);
    }
  };

  const KeyCallback = (key: string) => {
    setChordKey(key);
    updateChordSelected();
  };

  const ChordQualityCallback = (quality: string) => {
    setChordQuality(quality);
    updateChordSelected();
  };

  const newChordCallback = (newChord: string) => {
    if (!newChord) return;
    const [key, quality] = FullChordStringToArray(newChord);

    unPressElementsStyleWithoutEvent("chordbuild-btn-pressed");
    const qualityBtn = document.getElementById(quality);
    qualityBtn?.classList.add("chordbuild-btn-pressed");
    qualityBtn?.click();

    unPressElementsStyleWithoutEvent("key-btn-pressed");
    const keyBtn = document.getElementById(key);
    keyBtn?.classList.add("key-btn-pressed");
    keyBtn?.click();

    if (SoundOn) PlayChord(key + quality);
    setShouldPlay(false);
  };

  useEffect(() => {
    const chordToBuild = chordKey + chordQuality;
    setChordSelected(chordToBuild);
    if (SoundOn && shouldPlay) PlayChord(chordToBuild);
    setShouldPlay(false);
  }, [chordKey, chordQuality, SoundOn, shouldPlay]);

  return (
    <section className="centered-box">
      <div>
        <KeyButton onPressKey={KeyCallback} />
        <QualityButton onPressKey={ChordQualityCallback} />
      </div>

      <ProgressionGridDisplayComponent
        chordToAdd={chordSelected}
        onPressChord={newChordCallback}
      />
    </section>
  );
};

export default ChordBuilderComponent;

