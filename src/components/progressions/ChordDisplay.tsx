import React, { useState, useEffect, useMemo } from "react";
import useKeypress from "react-use-keypress";
import { PlayChord } from "../../Chords";
import PianoDisplay from "../piano/PianoDisplay";
import MidiButton from "../buttons/MidiButton";
import LoopButton from "../buttons/LoopButton";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import { GetRomansForChord } from "../../utils/ProgressionUtils";
import "./Progressions.scss";

export interface IChordDisplayProps {
  tonic: string;
  chord: string;
}

const ChordDisplayComponent = ({
  tonic,
  chord,
}: IChordDisplayProps): JSX.Element => {
  const [chordState, setChordState] = useState<boolean>(false);
  const [chordSelected, setChordSelected] = useState<string | null>(chord);
  const [pressedButtonId, setPressedButtonId] = useState<number | null>(null);

  let chordArr = useMemo(() => chord.split(","), [chord]);
  let romanNumerals = useMemo(() => GetRomansForChord(chordArr), [chordArr]);

  // Move keyboard focus to the chords box when mounted.
  useEffect(() => {
    const chordsSection = document.getElementById(
      "chords-box-id",
    ) as HTMLElement;
    if (chordsSection) {
      chordsSection.focus();
      chordsSection.scrollIntoView();
    }
  }, []);

  const handleClickAndKeyPress = (posId: number, chord?: string, event?: any) => {
    unPressElementsStyleWithoutEvent("chord-btn-pressed");
    setPressedButtonId(posId); // Store the ID of the pressed button
    PlayChord(chord || chordArr[posId - 1]);
    setChordState(true);
    setChordSelected(chord || chordArr[posId - 1]);
  };

  useEffect(() => {
    return () => {
      // cleanups.
      setChordState(false);
      unPressElementsStyleWithoutEvent("chord-btn-pressed");
      chordArr = [];
    };
  }, [chord]);

  const isInputFieldFocused = () => {
    const activeEl = document.activeElement as HTMLElement;
    return (
      activeEl?.id === "bpm-input" || activeEl?.id === "range-number-bpm-input"
    );
  };

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  const keys = useMemo(() => ["1", "2", "3", "4", "5", "6", "7", "8"], []);
  const keys2 = useMemo(() => ["a", "w", "e", "r", "t", "y", "u", "i"], []);
  keys.forEach((key, index) => {
    useKeypress([key, keys2[index]], () => {
      if (!isInputFieldFocused()) handleClickAndKeyPress(index + 1);
    });
  });

  const chordsList = useMemo(() => {
    return chordArr.map((c, i) => (
      <button
        key={i}
        id={"btn-" + (i + 1).toString()}
        onClick={(e) => handleClickAndKeyPress(i + 1, c, e)}
        className={`chord-btn ${pressedButtonId === i + 1 ? "chord-btn-pressed" : ""}`}
      >
        {c}
        <p className="btn-caption">{romanNumerals ? romanNumerals[i] : ""}</p>
      </button>
    ));
  }, [chordArr, romanNumerals, pressedButtonId]);


  return (
    <section id="chords-box-id" className="chords-box">
      <section className="box progression-results-box">
        {chordsList && chordsList}
        <br />
        <div className="prog-settings-box">
          <b>{chordArr ? <LoopButton chordsList={chordArr} /> : null}</b>
          <b>{chordArr ? <MidiButton chordsList={chordArr} /> : null}</b>
        </div>
        {chordState && chordSelected ? (
          <PianoDisplay chord={chordSelected} />
        ) : null}{" "}
      </section>
    </section>
  );
};

export default ChordDisplayComponent;
