import React, { useEffect } from "react";
import { PlayLoop, StopLoop, SetupSynth } from "../../audio/Synth";
import { useToggle } from "../hooks/useToggle";
import { Transport } from "tone";
import "./Buttons.css";

interface ILoopButton {
  parentCallback?: any;
  chords_list: string[];
}

const LoopButton: React.FC<ILoopButton> = ({ parentCallback, chords_list }) => {
  const [loopState, setLoopState] = useToggle(false);

  const handleClick = (event: any) => {
    if (Transport.state !== "started") {
      PlayLoop(chords_list);
      Transport.start();
    } else {
      Transport.stop();
      StopLoop();
    }
    setLoopState(!loopState);
  };

  // Restore the initial state of the loop button and stop transport when clicking on another progression button.
  useEffect(() => {
    SetupSynth();
    return () => {
      // StopLoop();
      Transport.stop();
      const btn = document.getElementById("loop");
      if (btn) {
        btn.classList.remove("loop-btn-pressed");
        btn.classList.add("loop-btn");
        btn.innerText = "▶";
      }
    };
  }, [chords_list]); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="">
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
