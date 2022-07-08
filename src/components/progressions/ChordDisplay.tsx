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

  const handleClick = (chord: string, index: number, event?: any) => {
    if (!chord) return;

    unPressElementsStyleWithoutEvent("chord-btn-pressed");
    const chordBtn = document.getElementById(`btn-${index}`);
    if (chordBtn) chordBtn.classList.add("chord-btn-pressed");

    if (SoundOn) PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);
  };

  const handleKeyPress = (id: number) => {
    const chord: string = chordArr[id];
    if (!chord) return;

    unPressElementsStyleWithoutEvent("chord-btn-pressed");
    const chordBtn = document.getElementById(`btn-${id}`);
    if (chordBtn) chordBtn.classList.add("chord-btn-pressed");

    if (SoundOn) PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);
  };

  useEffect(() => {
    return () => {
      // cleanups.
      setChordState(false);
      unPressElementsStyleWithoutEvent("chord-btn-pressed");
      chordArr = [];
    };
  }, [chord]);

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  useKeypress(["1", "a", "q"], () => {
    handleKeyPress(0);
  });
  useKeypress(["2", "w", "z"], () => {
    handleKeyPress(1);
  });
  useKeypress(["3", "e"], () => {
    handleKeyPress(2);
  });
  useKeypress(["4", "r"], () => {
    handleKeyPress(3);
  });
  useKeypress(["5", "t"], () => {
    handleKeyPress(4);
  });
  useKeypress(["6", "y"], () => {
    handleKeyPress(5);
  });
  useKeypress(["7", "u"], () => {
    handleKeyPress(6);
  });
  useKeypress(["8", "i"], () => {
    handleKeyPress(7);
  });

  const chordsList: JSX.Element[] = chordArr.map((c, i) => (
    <button
      key={i}
      id={"btn-" + i.toString()}
      onClick={(e) => {
        handleClick(c, i, e);
      }}
      className="chord-btn"
    >
      {c}
      <p className="btn-caption">{romanNumerals ? romanNumerals[i] : ""}</p>
    </button>
  ));

  return (
    <section className="chords-box">
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
