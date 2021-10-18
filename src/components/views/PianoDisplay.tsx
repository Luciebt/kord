import React, { useState, useEffect } from "react";
import { ShowChord } from "../../IPianoChart";

export interface IPianoDisplayProps {
  key?: number;
  chord: string;
}

const PianoDisplayComponent = ({
  key,
  chord,
}: IPianoDisplayProps): JSX.Element => {
  const [chordsToShow, setChordsToShow] = useState([""]);
  let chordsArray: string[] = ShowChord(chord);

  useEffect(() => {
    // setChordsToShow(chordsArray);
    if (chordsArray) {
      chordsArray.forEach((note) => {
        const noteFound = document.getElementById(note);
        if (noteFound) {
          console.log(noteFound);
          noteFound.classList.add("pressed");
        }
      });
    }

    return () => {
      // Anything in here is fired on component unmount.
      const toUnpress = document.getElementsByClassName("pressed");
      if (toUnpress) {
        Array.from(toUnpress).forEach((key) => {
          key.classList.remove("pressed");
        });
      }

      chordsArray = [""];
    };
  }, [chord]);

  // TODO: Play chords w keys a - l.
  return (
    <div className="">
      <h3>Piano display</h3>
      <p>{chord}</p>
      <ul id="keyboard">
        <li id="C" className="white">
          C
        </li>
        <li id="C#" className="black">
          C#
        </li>
        <li id="D" className="white offset">
          D
        </li>
        <li id="D#" className="black">
          D#
        </li>
        <li id="E" className="white offset">
          E
        </li>
        <li id="F" className="white">
          F
        </li>
        <li id="F#" className="black">
          F#
        </li>
        <li id="G" className="white offset">
          G
        </li>
        <li id="G#" className="black">
          G#
        </li>
        <li id="A" className="white offset">
          A
        </li>
        <li id="A#" className="black">
          A#
        </li>
        <li id="B" className="white offset">
          B
        </li>
        <li id="C2" className="white">
          C
        </li>
        <li id="C#2" className="black">
          C#
        </li>
        <li id="D2" className="white offset">
          D
        </li>
        <li id="D#2" className="black">
          D#
        </li>
        <li id="E2" className="white offset">
          E
        </li>
        <li id="F2" className="white">
          F
        </li>
        <li id="F#2" className="black">
          F#
        </li>
        <li id="G2" className="white offset">
          G
        </li>
        <li id="G#2" className="black">
          G#
        </li>
        <li id="A2" className="white offset">
          A
        </li>
        <li id="A#2" className="black">
          A#
        </li>
        <li id="B2" className="white offset">
          B
        </li>
      </ul>
    </div>
  );
};

export default PianoDisplayComponent;
