import React, { useEffect, useState } from "react";
import { SetupTempo, GetTempo } from "../../audio/Synth";
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
    };

    useEffect(() => {
        setBpm(GetTempo().toString());
        return () => {
        };
    }, []);

    return (
        <div className="bpm-box">
            <input type="number" min="60" max="200" value={bpm} onChange={handleChange} className="bpm-input" />
        </div>
    );
};

export default BpmRange;
