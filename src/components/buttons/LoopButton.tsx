import React, { useState } from "react";
import { StartLoop, StopLoop } from "../../audio/Synth";
import './Buttons.css';

interface ILoopButton {
  parentCallback?: any;
  chords_list?: string[];
}

const LoopButton: React.FC<ILoopButton> = ({ parentCallback, chords_list }) => {
  const [loopState, setLoopState] = useState(false);

  const handleClick = (event: any, chords: string[] | undefined) => {
    setLoopState(!loopState);

    if (loopState) {
      StartLoop(chords_list);
    } else {
      StopLoop();
    }

    // const toUnpress = document.getElementsByClassName("loop-btn-pressed");
    // if (toUnpress) {
    //   Array.from(toUnpress).forEach((button) => {
    //     button.classList.remove("loop-btn-pressed");
    //   });
    // }
    // event.target.classList.add("loop-btn-pressed");
  };

  return (
    <div className="">
      <button
        key="loop"
        onClick={(e) => {
          handleClick(e, chords_list);
        }}
        className="loop-btn"
      >
        ▶
      </button>
    </div>
  );
};

export default LoopButton;
