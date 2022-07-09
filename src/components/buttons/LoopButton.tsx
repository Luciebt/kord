import React, { useEffect, useState } from "react";
import { PlayLoop, polySynth } from "../../audio/Synth";
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
  const [loopState, setLoopState] = useState(false);
  const [bpm, setBpm] = useState(120);

  const BpmCallback = (bpm: number) => {
    setBpm(bpm);
  };

  // FIXME: returns true despite not having a loop running (separate channel?)
  const isTransportRunning = () => {
    return Transport.state !== "started";
  };

  // FIXME: the selection CSS is broken sometimes here. Restore CSS on the basis of the tone transport instead of the other way around.
  const handleClick = (event: any) => {
    if (!SoundOn) return;

    if (isTransportRunning()) {
      setLoopState(!loopState);
      PlayLoop(chordsList);
      Transport.start();
    } else {
      setLoopState(!loopState);
      // Transport.cancel();
      Transport.stop();
    }
  };

  // Restore the initial state of the loop button and stop transport when clicking on another progression button.
  useEffect(() => {
    return () => {
      // TODO: maybe use synth.releaseAll instead of Transport.cancel()?
      Transport.cancel();
      // Transport.stop();
      const btn = document.getElementById("loop");
      if (btn) {
        btn.classList.remove("loop-btn-pressed");
        btn.classList.add("loop-btn");
        btn.innerText = "▶";
      }
    };
  }, [chordsList, bpm]); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="loop-box">
      <button
        aria-label="Play the chord progression in a loop"
        id="loop"
        onClick={(e) => {
          handleClick(e);
        }}
        className={
          SoundOn
            ? loopState
              ? "loop-btn-pressed"
              : "loop-btn"
            : "loop-btn-disabled"
        }
      >
        {loopState ? "■" : "▶"}
      </button>
      {SoundOn ? <BpmRange onBpmRange={BpmCallback} /> : null}
    </div>
  );
};

export default LoopButton;
