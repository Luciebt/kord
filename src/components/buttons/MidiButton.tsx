import React from "react";
import { GenerateMidi, DownloadMidi } from "../../midi/MidiWriter";
import './Buttons.css';

interface IMidiButtonProps {
  chords_list: string[];
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const MidiButtonComponent = ({
  chords_list,
}: IMidiButtonProps): JSX.Element => {
  const handleClick = (event: any, chords: string[]) => {
    // TODO: handleClick. Use midi writer from Midi.ts.
    const dataUri = GenerateMidi(chords_list);
    DownloadMidi(dataUri);
  };

  return (
    <button
      id="export-midi-btn"
      onClick={(e) => {
        handleClick(e, chords_list);
      }}
    >
      Export progression to MIDI
    </button>
  );
};

export default MidiButtonComponent;
