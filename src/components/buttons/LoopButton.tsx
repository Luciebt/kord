import React from "react";
import { StartLoop, StopLoop, PlayLoop } from "../../audio/Synth";
import { useToggle } from "../hooks/useToggle";
import { Transport } from "tone";
import './Buttons.css';

interface ILoopButton {
  parentCallback?: any;
  chords_list: string[];
}

const LoopButton: React.FC<ILoopButton> = ({ parentCallback, chords_list }) => {
  const [loopState, setLoopState] = useToggle(false);

  const handleClick = (event: any) => {
    setLoopState(!loopState);

    if (Transport.state !== 'started' && chords_list) {
      PlayLoop(chords_list);
      Transport.start();
    } else {
      Transport.stop();
    }
  };

  return (
    <div className="">
      <button
        key="loop"
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
