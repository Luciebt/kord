import React, { useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import "./ProgressionGridDisplay.css";
import MidiButtonComponent from "../buttons/MidiButton";
import PianoDisplay from "./PianoDisplay";
import LoopButton from "../buttons/LoopButton";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import { SoundOnContext } from "../../App";

export interface IProgressionGridDisplayProps {
  tonic?: string;
  chordToAdd?: string;
  onPressChord: any;
}

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
    // if (chordToPlay) PlayChord(chordToPlay);
  };

  const onGridSizeChange = (event: any) => {
    // Convert to number, and increase/decrease grid divs.
    setGridSize(event.target.value);
  };

  // TODO: clicking/key on the grid when loop is playing: advance transport to clicked chord with `Transport.position` -> The Transport's position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.
  const handlePositionClickAndKeyPress = (posId: number, event?: any) => {
    if (!posId || posId <= 0 || posId > 8) return;

    // Handle css to apply the selection color
    unPressElementsStyleWithoutEvent("selected-position");
    const gridDiv = document.getElementById("pos-" + posId);
    if (gridDiv) gridDiv.classList.add("selected-position");

    const newPos: number = Number(posId);
    const newChord = progressionMap.get(newPos);

    // console.log("newChord__", newChord);

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
        handlePositionClickAndKeyPress(newDivId, event);
      });
      // Add div at the end of the list
      if (parentNode) parentNode.appendChild(newDiv);
    }

    return () => {};
  }, [gridSize]);

  useEffect(() => {
    if (!chordToAdd) return;

    const selectedGridDiv = document.getElementById("pos-" + selectedPos);
    if (!selectedGridDiv) return;
    selectedGridDiv.innerHTML = `<div id="gri-${selectedPos}">▶ <br>${chordToAdd}</div>`;

    setProgressionMap(progressionMap.set(selectedPos, chordToAdd));
    setSelectedChord(chordToAdd);

    return () => {};
  }, [chordToAdd]);

  const isInputFieldFocused = () => {
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl)
      return (
        activeEl.id === "bpm-input" || activeEl.id === "range-number-bpm-input"
      );
  };

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  useKeypress(["1", "a", "q"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(1);
  });
  useKeypress(["2", "w", "z"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(2);
  });
  useKeypress(["3", "e"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(3);
  });
  useKeypress(["4", "r"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(4);
  });
  useKeypress(["5", "t"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(5);
  });
  useKeypress(["6", "y"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(6);
  });
  useKeypress(["7", "u"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(7);
  });
  useKeypress(["8", "i"], () => {
    if (!isInputFieldFocused()) handlePositionClickAndKeyPress(8);
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
              handlePositionClickAndKeyPress(1, e);
            }}
          ></div>
          <div
            tabIndex={0}
            id="pos-2"
            onClick={(e) => {
              handlePositionClickAndKeyPress(2, e);
            }}
          ></div>
          <div
            tabIndex={0}
            id="pos-3"
            onClick={(e) => {
              handlePositionClickAndKeyPress(3, e);
            }}
          ></div>
          <div
            tabIndex={0}
            id="pos-4"
            onClick={(e) => {
              handlePositionClickAndKeyPress(4, e);
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
          {selectedChord ? <PianoDisplay chord={selectedChord} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProgressionGridDisplayComponent;
