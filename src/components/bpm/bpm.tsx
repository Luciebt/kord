import React, { useEffect, useState } from "react";
import { SetupTempo, GetTempo, SetTempo } from "../../audio/Synth";
import "./Bpm.css";

interface IBpmRange {
  onBpmRange?: any;
}

const BpmRange = ({ onBpmRange }: IBpmRange): JSX.Element => {
  const [bpm, setBpm] = useState("120");

  const handleChange = (event: any) => {
    setBpm(event.target.value);
    const newBpm: number = parseInt(event.target.value);
    onBpmRange(newBpm);
    SetupTempo(newBpm);
    SetTempo(newBpm);
  };

  useEffect(() => {
    setBpm(Math.floor(GetTempo()).toString());
    return () => {};
  }, []);

  return (
    <section className="bpm-box">
      <input
        aria-label="Set a bpm for the loop"
        type="range"
        min="60"
        max="200"
        value={bpm}
        onChange={handleChange}
        id="bpm-input"
      />
      <input
        type="number"
        aria-label="Set a bpm for the loop"
        id="range-number-bpm-input"
        min="60"
        max="200"
        value={bpm}
        onChange={handleChange}
      ></input>
    </section>
  );
};

export default BpmRange;
