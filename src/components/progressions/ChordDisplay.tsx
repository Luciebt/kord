import React, { useState, useEffect } from "react";
import { PlayChord } from "../../Chords";
import { useKeyPress } from "../hooks/KeyPressHook";
import PianoDisplay from "./PianoDisplay";
import MidiButton from "../buttons/MidiButton";
import LoopButton from "../buttons/LoopButton";
import "./Progressions.css";
import { SetupSynth } from "../../audio/Synth";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { Progression } from "@tonaljs/tonal";

export interface IChordDisplayProps {
  tonic: string;
  chord: string;
}

const ChordDisplayComponent = ({
  tonic,
  chord,
}: IChordDisplayProps): JSX.Element => {
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");
  let chordArr: string[] = chord.split(",");

  const romanNumerals = Progression.toRomanNumerals(tonic.toString(), chordArr);

  const handleClick = (chord: string, event?: any) => {
    PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);

    const style: string = "chord-btn-pressed";
    unPressElementsStyleWithoutEvent(style);

    event.target.classList.add("chord-btn-pressed");
  };

  // Use numerical keys to play chords of one progression.
  const FirstNumKey = useKeyPress("1");
  const SecondNumKey = useKeyPress("2");
  const ThirdNumKey = useKeyPress("3");
  const FourthNumKey = useKeyPress("4");
  const FifthNumKey = useKeyPress("5");
  const SixthNumKey = useKeyPress("6");

  // TODO: not only play chords, but also show the piano display.
  if (FirstNumKey) {
    PlayChord(chordArr[0]);
  }
  if (SecondNumKey) {
    PlayChord(chordArr[1]);
  }
  if (ThirdNumKey && chordArr.length > 2) {
    PlayChord(chordArr[2]);
  }
  if (FourthNumKey && chordArr.length > 3) {
    PlayChord(chordArr[3]);
  }
  if (FifthNumKey && chordArr.length > 4) {
    PlayChord(chordArr[4]);
  }
  if (SixthNumKey && chordArr.length > 5) {
    PlayChord(chordArr[5]);
  }
  if (SixthNumKey && chordArr.length > 6) {
    PlayChord(chordArr[6]);
  }

  useEffect(() => {
    // comp mounts.
    SetupSynth();
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
        handleClick(c, e);
      }}
      className="chord-btn"
    >
      {c}
      <p className="btn-caption">({romanNumerals[i]})</p>
    </button>
  ));

  return (
    <div className="chords-box">
      <div className="chord-box">
        <b>{chordArr ? <LoopButton chordsList={chordArr} /> : null}</b>
        <b>{chordsList && chordsList}</b>
        <br />
      </div>

      {chordState && chordSelected ? (
        <PianoDisplay chord={chordSelected} />
      ) : null}
      <b>{chordArr ? <MidiButton chordsList={chordArr} /> : null}</b>
    </div>
  );
};

export default ChordDisplayComponent;
