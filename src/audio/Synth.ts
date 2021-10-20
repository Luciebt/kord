import * as Tone from "tone";

export function PlaySynthChords(chordNotes: string[]): void {
  const synth1 = new Tone.Synth().toDestination();
  const synth2 = new Tone.Synth().toDestination();
  const synth3 = new Tone.Synth().toDestination();

  synth1.oscillator.type = "fmsine";
  synth2.oscillator.type = "fmsine";
  synth3.oscillator.type = "fmsine";

  synth1.triggerAttackRelease(chordNotes[0], 0.8);
  synth2.triggerAttackRelease(chordNotes[1], 0.8);
  synth3.triggerAttackRelease(chordNotes[2], 0.8);
  if (chordNotes[3]) {
    const synth4 = new Tone.Synth().toDestination();
    synth4.oscillator.type = "fmsine";
    synth4.triggerAttackRelease(chordNotes[3], 0.8);
  }
}
