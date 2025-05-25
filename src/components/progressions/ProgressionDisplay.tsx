import React, { useState, useCallback, useMemo } from "react";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import ChordDisplay from "./ChordDisplay";
import "./Progressions.scss";

export interface IProgressionDisplayProps {
  tonic: string;
  mode: string;
  mood?: string;
  chordsList: string;
}

const ProgressionDisplayComponent = ({
  tonic,
  mode,
  mood,
  chordsList,
}: IProgressionDisplayProps): JSX.Element => {
  const [chordsState, setChordsState] = useState(false);
  const [chordSelected, setChordSelected] = useState("");
  
  const chordsArr = useMemo(() => chordsList ? chordsList.split(" | ") : [], [chordsList]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, chords: string) => {
      setChordsState(true);
      setChordSelected(chords);

      unPressElementsStyleWithoutEvent("prog-btn-pressed");
      event.currentTarget.classList.add("prog-btn-pressed");
    },
    [],
  );

  // Reset chord selection when progression list changes
  useDidUpdate(() => {
    setChordsState(false);
  }, [chordsList]);

  return (
    <section>
      <h3>...</h3>
      <h3>Progressions</h3>
      <section
        aria-label="Progressions found for your criteria"
        className="prog-btn-box"
      >
        <div className="prog-grid-results">
          {chordsArr.map((chords, i) => (
            <button
              key={i}
              onClick={(e) => handleClick(e, chords)}
              className="prog-btn"
            >
              {chords}
            </button>
          ))}
        </div>
      </section>
      {/* Chords buttons display */}
      {chordsState && chordSelected && (
        <ChordDisplay tonic={tonic} chord={chordSelected} />
      )}
    </section>
  );
};

export default ProgressionDisplayComponent;
