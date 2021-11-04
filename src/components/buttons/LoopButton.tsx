import React, { useEffect } from "react";
import { PlayLoop } from "../../audio/Synth";
import { useToggle } from "../hooks/useToggle";
import { Transport } from "tone";
import "./Buttons.css";

interface ILoopButton {
  onPressLoop?: any;
  chordsList: string[];
}

const LoopButton = ({ onPressLoop, chordsList }: ILoopButton): JSX.Element => {
  const [loopState, setLoopState] = useToggle(false);

  const handleClick = (event: any) => {
    if (Transport.state !== "started") {
      setLoopState(!loopState);
      PlayLoop(chordsList);
      Transport.start();
    } else {
      setLoopState(!loopState);
      Transport.cancel();
      Transport.stop();
    }
  };

  // Restore the initial state of the loop button and stop transport when clicking on another progression button.
  useEffect(() => {
    return () => {
      Transport.cancel();
      // Transport.stop();
      const btn = document.getElementById("loop");
      if (btn) {
        btn.classList.remove("loop-btn-pressed");
        btn.classList.add("loop-btn");
        btn.innerText = "▶";
      }
    };
  }, [chordsList]); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="loop-box">
      <button
        id="loop"
        onClick={(e) => {
          handleClick(e);
        }}
        className={loopState ? "loop-btn-pressed" : "loop-btn"}
      >
        {loopState ? "■" : "▶"}
      </button>
    </div>
  );
};

export default LoopButton;
