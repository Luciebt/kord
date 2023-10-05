import React, { useState, useEffect, useContext } from "react";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import { PlayChord } from "../../Chords";
import ScalePianoDisplay from "./ScalePianoDisplay";
import "./Scales.css";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import { SoundOnContext } from "../../App";
import { findNotesScales } from "../../Scale";

export interface IChordsScaleDisplayComponent {
  tonic: string;
  mode: string;
  chordsScale: string[];
}

const ChordsScaleDisplayComponent = ({
  tonic,
  mode,
  chordsScale,
}: IChordsScaleDisplayComponent): JSX.Element => {
  const SoundOn = useContext(SoundOnContext);
  const [chordState, setChordState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");

  const style: string = "scale-chord-btn-pressed";

  const handleClick = (chord: string, event?: any) => {
    if (SoundOn) {
      PlayChord(chord);
    }
    setChordState(true);
    setChordSelected(chord);

    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
  };

  const notesOnScale: string = findNotesScales(tonic, mode);

  const chordsScaleList: JSX.Element[] = chordsScale.map((chords, i) => (
    <button
      key={i}
      onClick={(e) => {
        handleClick(chords, e);
      }}
      className="scale-chord-btn"
    >
      {chords}
    </button>
  ));

  useEffect(() => {
    unPressElementsStyleWithoutEvent(style);

    const chordBtns = Array.from(
      document.getElementsByClassName(
        "scale-chord-btn"
      ) as HTMLCollectionOf<HTMLElement>
    );

    if (!tonic && !mode) {
      chordBtns[0].classList.add("invisible");
    }
    if (tonic && mode) {
      if (chordBtns.length > 0) {
        chordBtns.forEach((btn) => {
          btn.classList.remove("invisible");
          btn.classList.add("visible");
        });
      }
    }
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  // Reset chord selected when changing tonality or mode.
  useDidUpdate(() => {
    setChordState(false);
  }, [tonic, mode]);

  return (
    <section
      aria-label="Suggested chords for the key and mode choosen"
      className="box scale-box"
    >
      <h2>
        {chordsScale ? "Chords on Scale " + tonic + " " + mode : ""}{" "}
        {mode == "Minor" ? " (harmonic)" : ""}
      </h2>
      {/* {notesOnScale} <br /> */}
      {chordsScaleList}
      {chordState ? <ScalePianoDisplay chord={chordSelected} /> : null}
    </section>
  );
};

export default ChordsScaleDisplayComponent;
