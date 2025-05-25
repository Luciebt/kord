import React, { useEffect, useState, useContext, useCallback } from "react";
import useKeypress from "react-use-keypress";
import { useToggle } from "../../hooks/useToggle";
import { PlayLoop } from "../../audio/Play";
import { Transport } from "tone";
import "./Buttons.scss";
import { BpmValueContext } from "../../App";
import BpmRange from "../bpm/bpm";

interface ILoopButton {
  onPressLoop?: any;
  chordsList: string[];
}

const LoopButton = ({ onPressLoop, chordsList }: ILoopButton): JSX.Element => {
  const { bpm, updateBpm } = useContext(BpmValueContext);

  const [toggleLoop, setToggleLoop] = useToggle(false);

  const BpmCallback = useCallback((newBpm: number) => {
    updateBpm(newBpm);
  }, [updateBpm]);

  useKeypress([" ", "Spacebar"], setToggleLoop);

  // Toggle the loop
  useEffect(() => {
    const btn = document.getElementById("loop") as HTMLButtonElement;
    if (!btn) return;

    if (toggleLoop) {
      // Play the chord
      PlayLoop(chordsList);
      Transport.start();

      btn.classList.replace("loop-btn", "loop-btn-pressed");
      btn.innerText = "■";
    } else {
      // Stop playing
      Transport.stop();
      btn.classList.replace("loop-btn-pressed", "loop-btn");
      btn.innerText = "▶";
    }
  }, [toggleLoop]);

  // Restore the initial state of the loop button and cancel transport events when clicking on another progression button.
  useEffect(() => {
    return () => {
      Transport.cancel();
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (btn) {
        btn.classList.replace("loop-btn-pressed", "loop-btn");
        btn.innerText = "▶";
      }
    };
  }, [chordsList]);

  useEffect(() => {
    // Set the loop button disabled if the sound is not on...(for now)
    const btn = document.getElementById("loop") as HTMLButtonElement;
    if (!btn) return;
  }, []);

  return (
    <span className="loop-box">
      <button
        aria-label="Play the chord progression in a loop"
        title="Play the chord progression in a loop"
        id="loop"
        onClick={() => setToggleLoop(true)}
        className={"loop-btn"}
      >
        ▶
      </button>
      <BpmRange onBpmRange={BpmCallback} />
    </span>
  );
};

export default LoopButton;

