import React, { useState, useEffect } from "react";
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
    if (SoundOn) {
      PlayChord(chord);
    }
    setChordState(true);
    setChordSelected(chord);

    const style: string = "chord-btn-pressed";
    unPressElementsStyleWithoutEvent(style);

    let chordBtn = document.getElementById(`btn-${index}`);
    if (chordBtn) {
      chordBtn.classList.add("chord-btn-pressed");
    }
  };

  useEffect(() => {
    // comp mounts.
    return () => {
      // cleanups.
      setChordState(false);

      const style: string = "chord-btn-pressed";
      unPressElementsStyleWithoutEvent(style);

      chordArr = [];
    };
  }, [chord]);

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
