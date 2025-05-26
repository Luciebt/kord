import React, { useState, useEffect, useCallback } from "react";
import { PlayChord } from "../../Chords";
import KeyButton from "../buttons/KeyButton";
import QualityButton from "../buttons/QualityButton";
import ProgressionGridDisplayComponent from "../progbuilder/ProgressionGridDisplayComponent";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";

const ChordBuilderComponent = (): JSX.Element => {
  const [chordKey, setChordKey] = useState("");
  const [chordQuality, setChordQuality] = useState("");
  const [chordSelected, setChordSelected] = useState("");
  const [shouldPlay, setShouldPlay] = useState(true);

  const updateChordSelected = () => {
    if (chordKey && chordQuality) {
      setChordSelected(chordKey + chordQuality);
    }
  };

  const KeyCallback = useCallback((key: string) => {
    setChordKey(key);
    updateChordSelected();
  }, [chordKey, chordQuality]);

  const ChordQualityCallback = useCallback((quality: string) => {
    setChordQuality(quality);
    updateChordSelected();
  }, [chordKey, chordQuality]);

  const newChordCallback = useCallback((newChord: string) => {
    if (!newChord) return;
    const [key, quality] = ["", ""]

    unPressElementsStyleWithoutEvent("chordbuild-btn-pressed");
    const qualityBtn = document.getElementById(quality);
    qualityBtn?.classList.add("chordbuild-btn-pressed");
    qualityBtn?.click();

    unPressElementsStyleWithoutEvent("key-btn-pressed");
    const keyBtn = document.getElementById(key);
    keyBtn?.classList.add("key-btn-pressed");
    keyBtn?.click();

    PlayChord(key + quality);
    setShouldPlay(false);
  }, [chordKey, chordQuality]);

  useEffect(() => {
    const chordToBuild = chordKey + chordQuality;
    setChordSelected(chordToBuild);
    if (shouldPlay) PlayChord(chordToBuild);
    setShouldPlay(false);
  }, [chordKey, chordQuality, shouldPlay]);

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
