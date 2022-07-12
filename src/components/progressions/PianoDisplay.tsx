import React, { useEffect } from "react";
import { ShowChord } from "../../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Progressions.css";

export interface IPianoDisplayProps {
  key?: number;
  chord: string;
}

const PianoDisplayComponent = ({
  key,
  chord,
}: IPianoDisplayProps): JSX.Element => {
  let chordsArray: string[] = ShowChord(chord);

  useEffect(() => {
    if (chordsArray) {
      chordsArray.forEach((note) => {
        const noteFound = document.getElementById(note);
        if (noteFound) {
          noteFound.classList.add("pressed");
        }
      });
    }

    return () => {
      const style: string = "pressed";
      unPressElementsStyleWithoutEvent(style);

      chordsArray = [""];
    };
  }, [chord]);

  return (
    <section className="keyboard-box">
      <ul id="keyboard">
        <li id="C3" className="white">
          C
        </li>
        <li id="C#3" className="black">
          C#
        </li>
        <li id="D3" className="white offset">
          D
        </li>
        <li id="D#3" className="black">
          D#
        </li>
        <li id="E3" className="white offset">
          E
        </li>
        <li id="F3" className="white">
          F
        </li>
        <li id="F#3" className="black">
          F#
        </li>
        <li id="G3" className="white offset">
          G
        </li>
        <li id="G#3" className="black">
          G#
        </li>
        <li id="A3" className="white offset">
          A
        </li>
        <li id="A#3" className="black">
          A#
        </li>
        <li id="B3" className="white offset">
          B
        </li>
        <li id="C4" className="white">
          C
        </li>
        <li id="C#4" className="black">
          C#
        </li>
        <li id="D4" className="white offset">
          D
        </li>
        <li id="D#4" className="black">
          D#
        </li>
        <li id="E4" className="white offset">
          E
        </li>
        <li id="F4" className="white">
          F
        </li>
        <li id="F#4" className="black">
          F#
        </li>
        <li id="G4" className="white offset">
          G
        </li>
        <li id="G#4" className="black">
          G#
        </li>
        <li id="A4" className="white offset">
          A
        </li>
        <li id="A#4" className="black">
          A#
        </li>
        <li id="B4" className="white offset">
          B
        </li>
      </ul>
    </section>
  );
};

export default PianoDisplayComponent;
