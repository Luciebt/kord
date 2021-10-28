import React, { useEffect } from "react";
import { ShowChord } from "../../PianoChart";
import '../progressions/Piano.css';

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
        <li id="s-C3" className="white">
          C
        </li>
        <li id="s-C#3" className="black">
          C#
        </li>
        <li id="s-D3" className="white offset">
          D
        </li>
        <li id="s-D#3" className="black">
          D#
        </li>
        <li id="s-E3" className="white offset">
          E
        </li>
        <li id="s-F3" className="white">
          F
        </li>
        <li id="s-F#3" className="black">
          F#
        </li>
        <li id="s-G3" className="white offset">
          G
        </li>
        <li id="s-G#3" className="black">
          G#
        </li>
        <li id="s-A3" className="white offset">
          A
        </li>
        <li id="s-A#3" className="black">
          A#
        </li>
        <li id="s-B3" className="white offset">
          B
        </li>
        <li id="s-C4" className="white">
          C
        </li>
        <li id="s-C#4" className="black">
          C#
        </li>
        <li id="s-D4" className="white offset">
          D
        </li>
        <li id="s-D#4" className="black">
          D#
        </li>
        <li id="s-E4" className="white offset">
          E
        </li>
        <li id="s-F4" className="white">
          F
        </li>
        <li id="s-F#4" className="black">
          F#
        </li>
        <li id="s-G4" className="white offset">
          G
        </li>
        <li id="s-G#4" className="black">
          G#
        </li>
        <li id="s-A4" className="white offset">
          A
        </li>
        <li id="s-A#4" className="black">
          A#
        </li>
        <li id="s-B4" className="white offset">
          B
        </li>
      </ul>
    </div>
  );
};

export default ScalePianoDisplayComponent;
