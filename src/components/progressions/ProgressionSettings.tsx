import React from "react";
import MidiButton from "../buttons/MidiButton";
import LoopButton from "../buttons/LoopButton";
import "./Progressions.scss";

export interface IProgressionSettingsProps {
    chords: string[];
    loopId: string;
}

const ProgressionSettingsComponent = ({
    chords,
    loopId
}: IProgressionSettingsProps): JSX.Element => {
    return (
        <div className="prog-settings-box">
            <b>{chords ? <LoopButton chordsList={chords} loopId={loopId} /> : null}</b>
            <b>{chords ? <MidiButton chordsList={chords} /> : null}</b>
        </div>
    );
};

export default ProgressionSettingsComponent;