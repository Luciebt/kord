import { Piano } from "@tonejs/piano";

let piano: any;

export function SetupPiano(): void {
  piano = new Piano({
    velocities: 5,
    maxPolyphony: 6,
  }).toDestination();

  piano.load().then(() => {
    console.log("loaded!");
  });
}

export function PlayPianoChords(midiChordNotes: string[]): void {
  midiChordNotes.forEach((midiNote) => {
    piano.keyDown({ note: midiNote });
    piano.keyUp({ note: midiNote, time: "+1.5" });
  });
}
