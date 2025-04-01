import React, { useEffect } from "react";
import { ShowChord } from "../../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "../progressions/Progressions.scss";
import "./Piano.scss";

export interface IPianoDisplayProps {
  chord: string;
}

const PianoDisplayComponent = ({ chord }: IPianoDisplayProps): JSX.Element => {
  let chordsArray: string[] = ShowChord(chord);

  useEffect(() => {
    if (chordsArray) {
      chordsArray.forEach((note) => {
        const noteFound = document.getElementById(note);
        noteFound?.classList.add("pressed");
      });
    }

    const cleanup = () => {
      unPressElementsStyleWithoutEvent("pressed");
      chordsArray = [""];
    };

    return cleanup;
  }, [chord]);

  return (
    <section className="keyboard-box">
      <ul id="keyboard">
        {[
          "C3",
          "C#3",
          "D3",
          "D#3",
          "E3",
          "F3",
          "F#3",
          "G3",
          "G#3",
          "A3",
          "A#3",
          "B3",
          "C4",
          "C#4",
          "D4",
          "D#4",
          "E4",
          "F4",
          "F#4",
          "G4",
          "G#4",
          "A4",
          "A#4",
          "B4",
        ].map((note, index) => (
          <li
            id={note}
            className={
              note.includes("#")
                ? "black"
                : "white" +
                  (index % 12 === 2 ||
                  index % 12 === 4 ||
                  index % 12 === 7 ||
                  index % 12 === 9 ||
                  index % 12 === 11
                    ? " offset"
                    : "")
            }
          >
            {note.replace("3", "").replace("4", "")}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PianoDisplayComponent;
