import React, { useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import "..//progressions/ProgressionGridDisplay.scss";
import MidiButtonComponent from "../buttons/MidiButton";
import PianoDisplay from "../piano/PianoDisplay";
import LoopButton from "../buttons/LoopButton";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import GenerateProgBuilderComponent from "../generator/GenerateProgBuilderComponent";

export interface IProgressionGridDisplayProps {
  chordToAdd?: string;
  onPressChord: any;
}

const ProgressionGridDisplayComponent = ({
  chordToAdd,
  onPressChord,
}: IProgressionGridDisplayProps): JSX.Element => {
  const [gridSize, setGridSize] = useState(4);
  const [selectedPos, setSelectedPos] = useState(1);
  const [selectedChord, setSelectedChord] = useState("");
  const [progressionMap, setProgressionMap] = useState(
    new Map<number, string>(),
  );

  const handlePositionClickAndKeyPress = (posId: number) => {
    if (!posId || posId <= 0 || posId > 8) return;

    const newChord = progressionMap.get(posId);

    // Handle.scss to apply the selection color
    unPressElementsStyleWithoutEvent("selected-position");
    unPressElementsStyleWithoutEvent("selected-position-without-chord");
    const gridDiv = document.getElementById("pos-" + posId);

    if (newChord) {
      gridDiv?.classList.add("selected-position");
    } else {
      gridDiv?.classList.add("selected-position-without-chord");
    }

    setSelectedPos(posId);
    if (newChord) onPressChord(newChord);
  };

  const handleClearClick = () => {
    progressionMap.clear();
    setSelectedChord("");
    const parentSection = document.getElementById("prog-grid");
    if (!parentSection) return;
    Array.from(parentSection.children).forEach((gridDiv) => {
      gridDiv.innerHTML = "";
    });

    // TODO: focus the first grid div
  };

  // TODO: random progression generation
  const progGenCallback = (newProg: string[]) => {
    // console.log("progGenCallback", newProg);

    const newProgressionMap = new Map(
      newProg.map((str, index) => [index + 1, str]),
    );
    // console.log(newProgressionMap);
    progressionMap.clear();
    setProgressionMap(newProgressionMap);
    setSelectedChord(newProg[0]);
  };

  useEffect(() => {
    // Select by default the first grid div when component is created.
    unPressElementsStyleWithoutEvent("selected-position");
    const grid1 = document.getElementById("pos-1");
    grid1?.classList.add("selected-position-without-chord");
  }, []);

  // Grid sizing
  const onGridSizeChange = (event: any) => {
    setGridSize(Number(event.target.value));
  };

  useEffect(() => {
    const grid = document.getElementById("prog-grid");
    if (!grid) return;

    const gridDivs = grid.children;
    const actualGridSize = gridDivs.length;
    const last = gridDivs[actualGridSize - 1] as HTMLElement;

    if (actualGridSize === gridSize) return;

    if (actualGridSize < gridSize) {
      // Create new div
      const newDivId = actualGridSize + 1;
      const newDiv = document.createElement("div");
      newDiv.id = `pos-${newDivId}`;
      newDiv.tabIndex = 0;
      newDiv.classList.add("box");
      newDiv.addEventListener("click", () => {
        handlePositionClickAndKeyPress(newDivId);
      });
      grid.appendChild(newDiv);
    } else {
      // Remove the last div.
      last && last.remove();
    }
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
    return (
      activeEl?.id === "bpm-input" || activeEl?.id === "range-number-bpm-input"
    );
  };

  // KEYBOARD SUPPORT [1-8 and q/a w/z ertyui] for grid chords
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const keys2 = ["a", "w", "e", "r", "t", "y", "u", "i"];
  keys.forEach((key, index) => {
    useKeypress([key, keys2[index]], () => {
      if (!isInputFieldFocused()) handlePositionClickAndKeyPress(index + 1);
    });
  });

  return (
    <div>
      <section className="box progression-results-box">
        <h2>Progression Builder</h2>
        <div className="top-chord-box">
          {progressionMap ? (
            <LoopButton chordsList={Array.from(progressionMap.values())} />
          ) : null}
        </div>
        <div className="prog-settings">
          <GenerateProgBuilderComponent
            selectedChord={selectedChord}
            progLength={gridSize}
            onGenerateProg={progGenCallback}
          />{" "}
          <br />
          <input
            title="Set the grid size"
            type="number"
            min="2"
            max="12"
            className="prog-gridsize-input"
            value={gridSize}
            onChange={onGridSizeChange}
          ></input>
          <button
            title="Clear progression"
            className="mini-btn"
            onClick={handleClearClick}
          >
            ❌
          </button>
        </div>
        <br />
        <section id="prog-grid" className="prog-grid-container">
          {Array.from({ length: gridSize }).map((_, index) => (
            <div
              key={`pos-${index + 1}`}
              className="box"
              tabIndex={0}
              id={`pos-${index + 1}`}
              onClick={() => {
                handlePositionClickAndKeyPress(index + 1);
              }}
            ></div>
          ))}
        </section>

        <MidiButtonComponent chordsList={Array.from(progressionMap.values())} />
      </section>
      {selectedChord ? (
        <div className="box piano-box">
          {/* TODO: Update piano on LOOP */}
          {selectedChord ? <PianoDisplay chord={selectedChord} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProgressionGridDisplayComponent;
