import React, { useEffect, useState } from "react";
import { SetupTempo } from "../../audio/Synth";
import "./Bpm.css";

interface IBpmRange {
    onBpmRange?: any;
}

const BpmRange = ({ onBpmRange }: IBpmRange): JSX.Element => {
    const [bpm, setBpm] = useState("120");

    const handleClick = (event: any) => {
        const newBpm: number = parseInt(bpm);
        onBpmRange(newBpm);
        SetupTempo(newBpm);
    };

    useEffect(() => {
        return () => {
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <div className="bpm-box">
            <input type="number" min="60" max="200" value={bpm} onChange={(event) =>
                setBpm(event.target.value)} onClick={handleClick} className="bpm-input" />
        </div>
    );
};

export default BpmRange;
