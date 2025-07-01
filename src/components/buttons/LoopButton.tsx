import React, { useEffect, useContext, useCallback } from "react";
import useKeypress from "react-use-keypress";
import { useToggle } from "../../hooks/useToggle";
import { PlayLoop } from "../../audio/Play";
import { Transport } from "tone";
import "./Buttons.scss";
import { BpmValueContext } from "../../App";
import BpmRange from "../bpm/bpm";

interface ILoopButton {
  chordsList: string[];
  loopId: string;
}

const LoopButton = ({ chordsList, loopId }: ILoopButton): JSX.Element => {
  const { updateBpm } = useContext(BpmValueContext);
  const [toggleLoop, setToggleLoop] = useToggle(false);

  const handleLoopPress = useCallback(() => {
    setToggleLoop((prev) => !prev);
  }, [setToggleLoop]);

  useKeypress([" ", "Spacebar"], handleLoopPress);

  useEffect(() => {
    const btn = document.getElementById(loopId) as HTMLButtonElement;
    if (!btn) return;

    if (toggleLoop) {
      PlayLoop(chordsList);
      Transport.start();
      btn.classList.add("loop-btn-pressed");
      btn.classList.remove("loop-btn");
      btn.innerText = "■";
    } else {
      Transport.stop();
      btn.classList.remove("loop-btn-pressed");
      btn.classList.add("loop-btn");
      btn.innerText = "▶";
    }

    return () => {
      Transport.cancel();
      btn.classList.remove("loop-btn-pressed");
      btn.classList.add("loop-btn");
      btn.innerText = "▶";
    };
  }, [toggleLoop, chordsList, loopId]);

  return (
    <span className="loop-box">
      <button
        aria-label="Play the chord progression in a loop"
        title="Play the chord progression in a loop"
        id={loopId}
        onClick={handleLoopPress}
        className="loop-btn"
      >
        ▶
      </button>
      <BpmRange onBpmRange={updateBpm} />
    </span>
  );
};

export default LoopButton;

