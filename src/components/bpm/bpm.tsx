import React, { useEffect, useState } from "react";
import { SetupTempo, GetTempo } from "../../audio/Synth";
import "./Bpm.css";

interface IBpmRange {
  onBpmRange?: any;
}

// TODO: when changing tempo bpm value, RAMP UP TO new value with transport instead of stopping the loop.
// USE Tone.getTransport().bpm.rampTo(60, 30);
const BpmRange = ({ onBpmRange }: IBpmRange): JSX.Element => {
  const [bpm, setBpm] = useState("120");

  const handleChange = (event: any) => {
    setBpm(event.target.value);
    const newBpm: number = parseInt(event.target.value);
    onBpmRange(newBpm);
    SetupTempo(newBpm);
  };

  useEffect(() => {
    setBpm(GetTempo().toString());
    return () => {};
  }, []);

  return (
    <section className="bpm-box">
      <input
        aria-label="Set a bpm for the loop"
        type="number"
        min="60"
        max="200"
        value={bpm}
        onChange={handleChange}
        className="bpm-input"
      />{" "}
      BPM
    </section>
  );
};

export default BpmRange;
