import React, { useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import "./ProgressionGridDisplay.css";
import MidiButtonComponent from "../buttons/MidiButton";
import PianoDisplay from "./PianoDisplay";
import LoopButton from "../buttons/LoopButton";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { PlayChord } from "../../Chords";
import { SoundOnContext } from "../../App";
import { polySynth } from "../../audio/Synth";

export interface IProgressionGridDisplayProps {
  tonic?: string;
  chordToAdd?: string;
  onPressChord: any;
}

// TODO: Add roman numeral:       <p className="btn-caption">{romanNumerals ? romanNumerals[i] : ""}</p>

const ProgressionGridDisplayComponent = ({
  tonic,
  chordToAdd,
  onPressChord,
}: IProgressionGridDisplayProps): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [gridSize, setGridSize] = useState(4);
  const [selectedPos, setSelectedPos] = useState(1);
  const [selectedChord, setSelectedChord] = useState("");
  const [progressionMap, setProgressionMap] = useState(
    new Map<number, string>()
  );

  const Play = (chordIndex: number) => {
    // if (!SoundOn) return;
    // polySynth.releaseAll();
    // const chordToPlay = progressionMap.get(chordIndex);
    // if (chordToPlay) PlayChord(chordToPlay, true);
  };

  const onGridSizeChange = (event: any) => {
    // Convert to number, and increase/decrease grid divs.
    setGridSize(event.target.value);
  };

  const handlePositionClick = (event?: any) => {
    unPressElementsStyleWithoutEvent("selected-position");

    if (event.target.id[0] == "g") {
      // Add class to the parent div if the inner one is selected
      event.target.parentNode.classList.add("selected-position");
    } else if (event.target.id[0] == "p") {
      // We're at the parent div already
      event.target.classList.add("selected-position");
    }

    const newPos: number = +event.target.id[4];
    const newChord = progressionMap.get(newPos);

    if (newPos) setSelectedPos(newPos);
    if (newChord) setSelectedChord(newChord);
    if (newChord) onPressChord(newChord);
  };

  // TODO: clicking/key on the grid when loop is playing: advance transport to clicked chord with `Transport.position` -> The Transport's position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.

  const handleKeyPress = (id: number) => {
    // Using the keyboard to select the grid div, with the id = gridDiv position ("pos-1 to -8");
    // We need a valid ID.
    if (!id || id <= 0 || id > 8) return;

    // Handle css to apply the selection color
    unPressElementsStyleWithoutEvent("selected-position");
    const gridDiv = document.getElementById("pos-" + id);
    if (!gridDiv) return;
    gridDiv.classList.add("selected-position");

    const newPos: number = +id;
    const newChord = progressionMap.get(newPos);

    if (newPos) setSelectedPos(newPos);
    if (newChord) setSelectedChord(newChord);
    if (newChord) onPressChord(newChord);
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
      newDiv.tabIndex = 0;
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

      setProgressionMap(progressionMap.set(selectedPos, chordToAdd));
      setSelectedChord(chordToAdd);
    }

    // console.log(Array.from(progressionMap.values()));

    return () => {};
  }, [chordToAdd]);

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  useKeypress(["1", "a", "q"], () => {
    handleKeyPress(1);
  });
  useKeypress(["2", "w", "z"], () => {
    handleKeyPress(2);
  });
  useKeypress(["3", "e"], () => {
    handleKeyPress(3);
  });
  useKeypress(["4", "r"], () => {
    handleKeyPress(4);
  });
  useKeypress(["5", "t"], () => {
    handleKeyPress(5);
  });
  useKeypress(["6", "y"], () => {
    handleKeyPress(6);
  });
  useKeypress(["7", "u"], () => {
    handleKeyPress(7);
  });
  useKeypress(["8", "i"], () => {
    handleKeyPress(8);
  });

  return (
    <div>
      <section className="chord-box">
        <h2>Progression Builder</h2>
        {progressionMap ? (
          <LoopButton chordsList={Array.from(progressionMap.values())} />
        ) : null}
        <section id="prog-grid" className="prog-grid-container">
          <div
            tabIndex={0}
            id="pos-1"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            tabIndex={0}
            id="pos-2"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            tabIndex={0}
            id="pos-3"
            onClick={(e) => {
              handlePositionClick(e);
            }}
          ></div>
          <div
            tabIndex={0}
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
          {/* TODO: Update piano on LOOP */}
          <PianoDisplay chord={selectedChord as string} />
        </div>
      ) : null}
    </div>
  );
};

export default ProgressionGridDisplayComponent;
