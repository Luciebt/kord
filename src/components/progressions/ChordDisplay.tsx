import React, { useState, useEffect } from "react";
import { PlayChord } from "../../Chords";
import { useKeyPress } from "../hooks/keyPressHook";
import PianoDisplay from "./PianoDisplay";
import MidiButton from "../buttons/MidiButton";
import LoopButton from "../buttons/LoopButton";
import "./Progressions.css";

export interface IChordDisplayProps {
  key?: number;
  chord: string;
}

const ChordDisplayComponent = ({
  key,
  chord,
}: IChordDisplayProps): JSX.Element => {
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");
  let chordArr: string[] = chord.split(",");
  let chordButton: JSX.Element[] = [];

  const handleClick = (chord: string, event?: any) => {
    PlayChord(chord);
    setChordState(true);
    setChordSelected(chord);

    const toUnpress = document.getElementsByClassName("chord-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("chord-btn-pressed");
      });
    }
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
    // const btn = document.getElementById("btn-0");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (SecondNumKey) {
    PlayChord(chordArr[1]);
    // PlayChord(chordArr[1]);
    // const btn = document.getElementById("btn-1");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (ThirdNumKey && chordArr.length > 2) {
    PlayChord(chordArr[2]);
    // const btn = document.getElementById("btn-2");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (FourthNumKey && chordArr.length > 3) {
    PlayChord(chordArr[3]);
    // const btn = document.getElementById("btn-3");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (FifthNumKey && chordArr.length > 4) {
    PlayChord(chordArr[4]);
    // const btn = document.getElementById("btn-4");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (SixthNumKey && chordArr.length > 5) {
    PlayChord(chordArr[5]);
    // const btn = document.getElementById("btn-5");
    // if (btn) {
    //   btn.click();
    // }
  }
  if (SixthNumKey && chordArr.length > 6) {
    PlayChord(chordArr[6]);
    // const btn = document.getElementById("btn-6");
    // if (btn) {
    //   btn.click();
    // }
  }

  if (chordArr) {
    chordArr.forEach((c, i) => {
      chordButton.push(
        <button
          key={i}
          id={"btn-" + i.toString()}
          onClick={(e) => {
            handleClick(c, e);
          }}
          className="chord-btn"
        >
          {c}
        </button>
      );
    });
  }

  useEffect(() => {
    // comp mounts.
    return () => {
      // cleanups.
      setChordState(false);

      const toUnpress = document.getElementsByClassName("chord-btn-pressed");
      if (toUnpress) {
        Array.from(toUnpress).forEach((button) => {
          button.classList.remove("chord-btn-pressed");
        });
      }
      chordArr = [];
    };
  }, [chord]);

  return (
    <div className="chords-box">
      <div className="chord-box">
        {/* TODO: update loop button when changing progressions */}
        <b>{chordArr ? <LoopButton chords_list={chordArr} /> : null}</b>
        <b>{chordButton && chordButton}</b>
        <br />
      </div>

      {/* <p>{chordButton ? "Press number keys to play chords" : ""}</p> */}
      {chordState && chordSelected ? (
        <PianoDisplay chord={chordSelected} />
      ) : null}
      <b>{chordArr ? <MidiButton chords_list={chordArr} /> : null}</b>
    </div>
  );
};

export default ChordDisplayComponent;
