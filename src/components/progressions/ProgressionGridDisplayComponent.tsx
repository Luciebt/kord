import React, { useState, useEffect } from "react";
import "./ProgressionGridDisplay.css";
import MidiButtonComponent from "../buttons/MidiButton";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { PlayChord } from "../../Chords";
import { SoundOnContext } from "../../App";
import PianoDisplay from "./PianoDisplay";

export interface IProgressionGridDisplayProps {
  tonic?: string;
  chordToAdd?: string | string[];
}

const ProgressionGridDisplayComponent = ({
  tonic,
  chordToAdd,
}: IProgressionGridDisplayProps): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [gridSize, setGridSize] = useState(4);
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [selectedChord, setSelectedChord] = useState("");
  const [progressionMap, setProgressionMap] = useState(
    new Map<number, string>()
  );

  const Play = (chordIndex: number) => {
    if (!SoundOn) return;
    const chordToPlay = progressionMap.get(chordIndex);
    if (chordToPlay) PlayChord(chordToPlay);
  };

  const onGridSizeChange = (event: any) => {
    // Convert to number, and increase/decrease grid divs.
    setGridSize(event.target.value);
  };

  const handlePositionClick = (event: any) => {
    unPressElementsStyleWithoutEvent("selected-position");
    // Take the parent div if the inner one is selected
    if (event.target.id[0] == "g") {
      event.target.parentNode.classList.add("selected-position");
    } else {
      event.target.classList.add("selected-position");
    }

    const newPos: number = +event.target.id[4];
    const newChord = progressionMap.get(newPos);
    setSelectedPosition(newPos);

    if (newChord) setSelectedChord(newChord as string);
    Play(newPos);
  };

  const handleClearClick = (event: any) => {
    progressionMap.clear();
    setSelectedChord("");
  };

  useEffect(() => {
    unPressElementsStyleWithoutEvent("selected-position");
    const grid1 = document.getElementById("pos-1");
    if (grid1) grid1.classList.add("selected-position");

    return () => {};
  }, []);

  useEffect(() => {
    if (chordToAdd) {
      const selectedGridDiv = document.getElementById(
        "pos-" + selectedPosition
      );
      if (selectedGridDiv)
        selectedGridDiv.innerHTML = `<div id="gri-${selectedPosition}">▶ <br>${chordToAdd}</div>`;

      progressionMap.set(selectedPosition, chordToAdd as string);
      setSelectedChord(chordToAdd as string);
    }

    return () => {};
  }, [chordToAdd]);

  return (
    <div>
      <section className="chord-box">
        <h2>Progression Builder</h2>
        <div className="prog-settings">
          <p>Size of the grid</p>
          <input
            type="number"
            min="2"
            max="8"
            className="prog-gridsize-input"
            value={gridSize}
            onChange={onGridSizeChange}
          ></input>
        </div>
        <section className="prog-grid-container">
          <div
            id="pos-1"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          >
            1
          </div>
          <div
            id="pos-2"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          >
            2
          </div>
          <div
            id="pos-3"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          >
            3
          </div>
          <div
            id="pos-4"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          >
            4
          </div>
        </section>
        <button
          className="mini-btn"
          onClick={(e) => {
            handleClearClick(e);
          }}
        >
          Clear ❌
        </button>{" "}
        <br />
        <MidiButtonComponent chordsList={["Amin", "Gmin"]} />
      </section>
      {(selectedChord as string) ? (
        <div className="prog-box">
          <h2>{selectedChord as string}</h2>
          <PianoDisplay chord={selectedChord as string} />
        </div>
      ) : null}
    </div>
  );
};

export default ProgressionGridDisplayComponent;
