import React, { useEffect, useMemo } from "react";
import { ShowChord } from "../../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "../progressions/Progressions.scss";
import "./Piano.scss";

export interface IPianoDisplayProps {
  chord: string;
  builderKeyboard?: boolean;
}

const PianoDisplayComponent = ({ chord, builderKeyboard = false }: IPianoDisplayProps): JSX.Element => {
  let chordsArray = useMemo(() => ShowChord(chord), [chord]);

  const pressedClass = builderKeyboard ? "b-pressed" : "pressed";

  useEffect(() => {
    if (chordsArray) {
      chordsArray.forEach((note) => {
        const noteId = `${builderKeyboard ? "b-" : ""}${note}`;
        const noteFound = document.getElementById(noteId);
        noteFound?.classList.add(pressedClass);
      });
    }

    const cleanup = () => {
      unPressElementsStyleWithoutEvent(pressedClass);
      chordsArray = [""];
    };

    return cleanup;
  }, [chord]);

  return (
    <section className="keyboard-box">
      <ul className="keyboard">
        {[
          "C3", "C#3", "D3", "D#3", "E3", "F3",
          "F#3", "G3", "G#3", "A3", "A#3", "B3",
          "C4", "C#4", "D4", "D#4", "E4", "F4",
          "F#4", "G4", "G#4", "A4", "A#4", "B4",
        ].map((note, index) => {
          const isBlack = note.includes("#");
          const needsOffset = [2, 4, 7, 9, 11].includes(index % 12);

          const className = [
            isBlack ? "black" : "white",
            needsOffset ? "offset" : "",
            note.toLowerCase(),
          ].join(" ").trim();

          return (
            <li key={note} id={`${builderKeyboard ? "b-" : ""}${note}`} className={className}>
              {note.replace(/[34]/, "")}
            </li>
          );
        })}
      </ul>

    </section>
  );
};

export default PianoDisplayComponent;
