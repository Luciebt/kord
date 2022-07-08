import React, { useState, useEffect } from "react";
import "./ProgressionGridDisplay.css";
import MidiButtonComponent from "../buttons/MidiButton";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import {
  PlayChord,
  GetSimplifiedChordFromFullChord,
  BuildChordNotes,
} from "../../Chords";
import { SoundOnContext } from "../../App";
import PianoDisplay from "./PianoDisplay";
import { polySynth } from "../../audio/Synth";

export interface IProgressionGridDisplayProps {
  tonic?: string;
  chordToAdd?: string;
}

const ProgressionGridDisplayComponent = ({
  tonic,
  chordToAdd,
}: IProgressionGridDisplayProps): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [gridSize, setGridSize] = useState(4);
  const [selectedPos, setSelectedPos] = useState(1);
  const [selectedChord, setSelectedChord] = useState("");
  const [progressionMap, setProgressionMap] = useState(
    new Map<number, string>()
  );

  const Play = (chordIndex: number) => {
    if (!SoundOn) return;
    polySynth.releaseAll();
    const chordToPlay = progressionMap.get(chordIndex);
    if (chordToPlay) PlayChord(chordToPlay, true);
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
    setSelectedPos(newPos);

    if (newChord) setSelectedChord(newChord);
    Play(newPos);
  };

  const handleClearClick = (event: any) => {
    // Clear the cached chords and map
    progressionMap.clear();
    setSelectedChord("");
    // Remove the inner content of each grid div (clear)
    const parentSection = document.getElementById("prog-grid");
    if (!parentSection) return;
    const childNodes = parentSection.childNodes as any;
    for (let gridDiv of childNodes as HTMLCollection) {
      gridDiv.innerHTML = "";
    }
  };

  useEffect(() => {
    // Select by default the first grid div when component is created.
    unPressElementsStyleWithoutEvent("selected-position");
    const grid1 = document.getElementById("pos-1");
    if (grid1) grid1.classList.add("selected-position");

    return () => {};
  }, []);

  // Grid sizing
  useEffect(() => {
    const grid = document.getElementById("prog-grid");
    if (!grid) return;

    const gridDivs = grid.childNodes;
    const actualGridSize = gridDivs.length;
    let difference = actualGridSize - gridSize;

    if (difference == 0) return;

    const last = gridDivs[gridDivs.length - 1];
    const lastId = Number((last as HTMLElement).id.slice(-1));
    const parentNode = last.parentNode;

    if (difference == 1) {
      // Remove the last div.
      if (parentNode) parentNode.removeChild(last);
      return;
    }

    if (difference == -1) {
      // Create new div
      let newDiv = document.createElement("div");
      // Set attributes and click listener
      const newDivId = lastId + 1;
      newDiv.id = "pos-" + newDivId;
      newDiv.addEventListener("click", function (event: any) {
        handlePositionClick(event);
      });
      // Add div at the end of the list
      if (parentNode) parentNode.appendChild(newDiv);
    }

    return () => {};
  }, [gridSize]);

  useEffect(() => {
    if (chordToAdd) {
      const selectedGridDiv = document.getElementById("pos-" + selectedPos);
      if (selectedGridDiv)
        selectedGridDiv.innerHTML = `<div id="gri-${selectedPos}">▶ <br>${chordToAdd}</div>`;

      progressionMap.set(selectedPos, chordToAdd as string);
      setSelectedChord(chordToAdd as string);

      // console.log(Array.from(progressionMap.values()));
    }

    return () => {};
  }, [chordToAdd]);

  return (
    <div>
      <section className="chord-box">
        <h2>Progression Builder</h2>
        <section id="prog-grid" className="prog-grid-container">
          <div
            id="pos-1"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            id="pos-2"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            id="pos-3"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            id="pos-4"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
        </section>
        <div className="prog-settings">
          <input
            type="number"
            min="2"
            max="8"
            className="prog-gridsize-input"
            value={gridSize}
            onChange={onGridSizeChange}
          ></input>

          <button
            className="mini-btn"
            onClick={(e) => {
              handleClearClick(e);
            }}
          >
            Clear ❌
          </button>
        </div>
        <br />
        <MidiButtonComponent chordsList={Array.from(progressionMap.values())} />
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
