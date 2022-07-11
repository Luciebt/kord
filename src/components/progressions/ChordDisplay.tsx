import React, { useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import { PlayChord } from "../../Chords";
import PianoDisplay from "./PianoDisplay";
import MidiButton from "../buttons/MidiButton";
import LoopButton from "../buttons/LoopButton";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { SoundOnContext } from "../../App";
import { GetRomansForChord } from "../../ProgressionUtils";
import "./Progressions.css";

export interface IChordDisplayProps {
  tonic: string;
  chord: string;
}

const ChordDisplayComponent = ({
  tonic,
  chord,
}: IChordDisplayProps): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");
  let chordArr: string[] = chord.split(",");
  let romanNumerals: string[] = GetRomansForChord(chordArr);

  // Move keyboard focus to the chords box when mounted.
  useEffect(() => {
    const chordsSection = document.getElementById(
      "chords-box-id"
    ) as HTMLElement;
    if (chordsSection) {
      chordsSection.focus();
      chordsSection.scrollIntoView();
    }
  }, []);

  const handleClickAndKeyPress = (
    posId: number,
    chord?: string,
    event?: any
  ) => {
    let chordFound: string | undefined = chord;
    if (!chordFound) chordFound = chordArr[posId - 1];

    unPressElementsStyleWithoutEvent("chord-btn-pressed");
    unPressElementsStyleWithoutEvent("highlight-chord-div");
    const chordBtn = document.getElementById(`btn-${posId}`);
    if (chordBtn) chordBtn.classList.add("chord-btn-pressed");

    if (SoundOn) PlayChord(chordFound);
    setChordState(true);
    setChordSelected(chordFound);
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
    if (activeEl)
      return (
        activeEl.id === "bpm-input" || activeEl.id === "range-number-bpm-input"
      );
  };

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  useKeypress(["1", "a", "q"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(1);
  });
  useKeypress(["2", "w", "z"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(2);
  });
  useKeypress(["3", "e"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(3);
  });
  useKeypress(["4", "r"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(4);
  });
  useKeypress(["5", "t"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(5);
  });
  useKeypress(["6", "y"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(6);
  });
  useKeypress(["7", "u"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(7);
  });
  useKeypress(["8", "i"], () => {
    if (!isInputFieldFocused()) handleClickAndKeyPress(8);
  });

  const chordsList: JSX.Element[] = chordArr.map((c, i) => (
    <button
      key={i}
      id={"btn-" + (i + 1).toString()}
      onClick={(e) => {
        handleClickAndKeyPress(i + 1, c, e);
      }}
      className="chord-btn"
    >
      {c}
      <p className="btn-caption">{romanNumerals ? romanNumerals[i] : ""}</p>
    </button>
  ));

  return (
    <section id="chords-box-id" className="chords-box">
      <section className="chord-box">
        <b>{chordArr ? <LoopButton chordsList={chordArr} /> : null}</b>
        {chordsList && chordsList}
        <br />
      </section>

      {chordState && chordSelected ? (
        <PianoDisplay chord={chordSelected} />
      ) : null}
      <b>{chordArr ? <MidiButton chordsList={chordArr} /> : null}</b>
    </section>
  );
};

export default ChordDisplayComponent;
