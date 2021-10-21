import * as Tone from "tone";
import { PlayChord } from "../IChords";

// Better for performance to instantiate all synths before calling PlaySynthChords.
let synth1 = new Tone.Synth().toDestination();
let synth2 = new Tone.Synth().toDestination();
let synth3 = new Tone.Synth().toDestination();
let synth4 = new Tone.Synth().toDestination();

export function PlaySynthChords(chordNotes: string[]): void {
  synth1.oscillator.type = "pwm";
  synth2.oscillator.type = "pwm";
  synth3.oscillator.type = "pwm";

  synth1.triggerAttackRelease(chordNotes[0], "+0.05", 1);
  synth2.triggerAttackRelease(chordNotes[1], "+0.05", 1);
  synth3.triggerAttackRelease(chordNotes[2], "+0.05", 1);
  if (chordNotes[3]) {
    synth4.oscillator.type = "pwm";
    synth4.triggerAttackRelease(chordNotes[3], "+0.05", 1);
  }
}
