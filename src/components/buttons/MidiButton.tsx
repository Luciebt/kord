import React from "react";
import { GenerateMidi, DownloadMidi } from "../../midi/MidiWriter";
import "./Buttons.css";

interface IMidiButtonProps {
  chordsList: string[];
}

const MidiButtonComponent = ({ chordsList }: IMidiButtonProps): JSX.Element => {
  const handleClick = (event: any, chords: string[]) => {
    // TODO: handleClick. Use midi writer from Midi.ts.
    const dataUri = GenerateMidi(chordsList);
    DownloadMidi(dataUri);
  };

  return (
    <button
      id="export-midi-btn"
      onClick={(e) => {
        handleClick(e, chordsList);
      }}
    >
      Export to MIDI
    </button>
  );
};

export default MidiButtonComponent;
