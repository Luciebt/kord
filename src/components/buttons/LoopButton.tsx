import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import { useToggle } from "../hooks/useToggle";
import { PlayLoop } from "../../audio/Play";
import { Transport } from "tone";
import "./Buttons.css";
import { SoundOnContext } from "../../App";
import BpmRange from "../bpm/bpm";

interface ILoopButton {
  onPressLoop?: any;
  chordsList: string[];
}

const LoopButton = ({ onPressLoop, chordsList }: ILoopButton): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [bpm, setBpm] = useState(120);
  const [toggleLoop, setToggleLoop] = useToggle(false);

  const BpmCallback = (bpm: number) => {
    setBpm(bpm);
  };

  useKeypress([" ", "Spacebar"], () => {
    setToggleLoop();
  });

  // Toggle the loop
  useEffect(() => {
    if (toggleLoop) {
      // Play the chord
      PlayLoop(chordsList);
      Transport.start();
      // Apply CSS
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (btn) {
        btn.classList.add("loop-btn-pressed");
        btn.classList.remove("loop-btn");
        btn.innerText = "■";
      }
    }
    if (!toggleLoop) {
      // Stop playing
      Transport.stop();
      Transport.cancel();

      // Apply CSS
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (btn) {
        btn.classList.remove("loop-btn-pressed");
        btn.classList.add("loop-btn");
        btn.innerText = "▶";
      }
    }
    return () => {};
  }, [toggleLoop]);

  // Restore the initial state of the loop button and cancel transport events when clicking on another progression button.
  useEffect(() => {
    return () => {
      Transport.cancel();
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (btn) {
        btn.classList.remove("loop-btn-pressed");
        btn.classList.add("loop-btn");
        btn.innerText = "▶";
      }
    };
  }, [chordsList]);

  useEffect(() => {
    // Set the loop button disabled if the sound is not on...(for now)
    if (!SoundOn) {
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (!btn) return;
      btn.disabled = true;
    } else if (SoundOn) {
      const btn = document.getElementById("loop") as HTMLButtonElement;
      if (!btn) return;
      btn.disabled = false;
    }
    return () => {};
  }, [SoundOn]);

  return (
    <span className="loop-box">
      <button
        aria-label="Play the chord progression in a loop"
        title="Play the chord progression in a loop"
        id="loop"
        onClick={() => setToggleLoop(true)}
        className={SoundOn ? "loop-btn" : "loop-btn-disabled"}
      >
        ▶
      </button>
      {SoundOn ? <BpmRange onBpmRange={BpmCallback} /> : null}
    </span>
  );
};

export default LoopButton;
