import * as Tone from "tone";
import { PlayChord } from "../IChords";

// Better for performance to instantiate all synths before calling PlaySynthChords.
let synth1 = new Tone.Synth().toDestination();
let synth2 = new Tone.Synth().toDestination();
let synth3 = new Tone.Synth().toDestination();
let synth4 = new Tone.Synth().toDestination();

export function PlaySynthChords(chordNotes: string[]): void {
  synth1.oscillator.type = "sine";
  synth2.oscillator.type = "sine";
  synth3.oscillator.type = "sine";

  synth1.triggerAttackRelease(chordNotes[0], "+0.05", 1);
  synth2.triggerAttackRelease(chordNotes[1], "+0.05", 1);
  synth3.triggerAttackRelease(chordNotes[2], "+0.05", 1);
  if (chordNotes[3]) {
    synth4.oscillator.type = "sine";
    synth4.triggerAttackRelease(chordNotes[3], "+0.05", 1);
  }
}

// Start loop
// Need to create one loop per chord. so dynamically?
// Next loop starts when the previous one stops.

export function StartLoop(chordArr: string[] | undefined): void {
  if (chordArr == undefined) return;

  // const firstArr = chordArr[0];

  // //play a note every quarter-note
  // const loopA = new Tone.Loop((time) => {
  //   // PlaySynthChords(firstArr);
  //   synth1.triggerAttackRelease("C3", "1", time);
  //   synth2.triggerAttackRelease("E3", "1", time);
  //   synth3.triggerAttackRelease("A#3", "1", time);
  // }, "2")
  //   .start(0)
  //   .stop("1");
  // //play another note every off quarter-note, by starting it "8n"
  // const loopB = new Tone.Loop((time) => {
  //   synth1.triggerAttackRelease("C4", "1", time);
  //   synth2.triggerAttackRelease("A4", "1", time);
  // }, "1")
  //   .start("2")
  //   .stop("3");
  // // the loops start when the Transport is started
  // Tone.Transport.start();
}

export function StopLoop(): void {
  Tone.Transport.stop();
}
