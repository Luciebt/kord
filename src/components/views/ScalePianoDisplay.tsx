import React, { useState, useEffect } from "react";
import { ShowChord } from "../../IPianoChart";
import ScalePianoDisplay from "./ScalePianoDisplay";

export interface IScalePianoDisplayProps {
  key?: number;
  chord: string;
}

const ScalePianoDisplayComponent = ({
  key,
  chord,
}: IScalePianoDisplayProps): JSX.Element => {
  let chordsArray: string[] = ShowChord(chord);

  useEffect(() => {
    if (chordsArray) {
      chordsArray.forEach((note) => {
        let scaleNoteId = "s-" + note;
        const noteFound = document.getElementById(scaleNoteId);
        if (noteFound) {
          noteFound.classList.add("s-pressed");
        }
      });
    }

    return () => {
      // Anything in here is fired on component unmount.
      const toUnpress = document.getElementsByClassName("s-pressed");
      if (toUnpress) {
        Array.from(toUnpress).forEach((key) => {
          key.classList.remove("s-pressed");
        });
      }

      chordsArray = [""];
    };
  }, [chord]);

  // TODO: Play chords w keys a - l.
  return (
    <div className="keyboard-box">
      <ul id="keyboard">
        <li id="s-C" className="white">
          C
        </li>
        <li id="s-C#" className="black">
          C#
        </li>
        <li id="s-D" className="white offset">
          D
        </li>
        <li id="s-D#" className="black">
          D#
        </li>
        <li id="s-E" className="white offset">
          E
        </li>
        <li id="s-F" className="white">
          F
        </li>
        <li id="s-F#" className="black">
          F#
        </li>
        <li id="s-G" className="white offset">
          G
        </li>
        <li id="s-G#" className="black">
          G#
        </li>
        <li id="s-A" className="white offset">
          A
        </li>
        <li id="s-A#" className="black">
          A#
        </li>
        <li id="s-B" className="white offset">
          B
        </li>
        <li id="s-C2" className="white">
          C
        </li>
        <li id="s-C#2" className="black">
          C#
        </li>
        <li id="s-D2" className="white offset">
          D
        </li>
        <li id="s-D#2" className="black">
          D#
        </li>
        <li id="s-E2" className="white offset">
          E
        </li>
        <li id="s-F2" className="white">
          F
        </li>
        <li id="s-F#2" className="black">
          F#
        </li>
        <li id="s-G2" className="white offset">
          G
        </li>
        <li id="s-G#2" className="black">
          G#
        </li>
        <li id="s-A2" className="white offset">
          A
        </li>
        <li id="s-A#2" className="black">
          A#
        </li>
        <li id="s-B2" className="white offset">
          B
        </li>
      </ul>
    </div>
  );
};

export default ScalePianoDisplayComponent;
