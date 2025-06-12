import React from "react";
import { GenerateMidi, DownloadMidi } from "../../midi/MidiWriter";
import "./Buttons.scss";

interface IMidiButtonProps {
  chordsList: string[];
}

const MidiButtonComponent = ({ chordsList }: IMidiButtonProps): JSX.Element => {
  const handleClick = () => {
    const dataUri = GenerateMidi(chordsList);
    DownloadMidi(dataUri);
  };

  return (
    <button
      id="export-midi-btn"
      onClick={handleClick}
    >
      💾 Export MIDI
    </button>
  );
};

export default MidiButtonComponent;
