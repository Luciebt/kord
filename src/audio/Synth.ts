import { Synth, PolySynth, Transport, ToneEvent } from "tone";
import * as Tone from "tone";
import { PlayChord, BuildChordNotes } from "../Chords";
import { ShowChord } from "../PianoChart";

let synth1 = new Synth().toDestination();
let synth2 = new Synth().toDestination();
let synth3 = new Synth().toDestination();
let synth4 = new Synth().toDestination();
// let polySynth;


//a polysynth composed of 6 Voices of Synth
var synth = new Tone.PolySynth(Tone.Synth).toDestination();
//set the attributes using the set interface
//play a chord
synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");

Tone.Transport.bpm.value = 150

// TODO: Use Tone.PolySynth instead of 4 instances of Synth.
// const synth = new Tone.PolySynth(Synth, {
//   volume: 6,
//   detune: 0,
//   portamento: 0,
//   envelope: {
//     attack: 0.05,
//     attackCurve: "exponential",
//     decay: 0.2,
//     decayCurve: "exponential",
//     release: 2.5,
//     releaseCurve: "exponential",
//     sustain: 0.2
//   },
// }).toDestination();

export function PlaySynthChords(chordNotes: string[]): void {
  synth1.oscillator.type = "sine";
  synth2.oscillator.type = "sine";
  synth3.oscillator.type = "sine";

  synth1.triggerAttackRelease(chordNotes[0], "+0.00", 1);
  synth2.triggerAttackRelease(chordNotes[1], "+0.00", 1);
  synth3.triggerAttackRelease(chordNotes[2], "+0.00", 1);
  if (chordNotes[3]) {
    synth4.oscillator.type = "sine";
    synth4.triggerAttackRelease(chordNotes[3], "+0.00", 1);
  }
}

export function DisposeChordSynths(): void {
  synth1.dispose();
  synth2.dispose();
  synth3.dispose();
  if (synth4) {
    synth4.dispose();
  }
}

const polySynth = new PolySynth(Tone.FMSynth, {
  volume: -6,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.05,
    decay: 0.05,
    sustain: 0.5,
  },
}).toDestination();

// polySynth.set({
//   filter: {
//     type: "highpass",
//   },
// });

let chordEvent;

function PlayChordEvent(
  chordArr: string[],
  noteDuration: number,
  noteStart: number = 0
): void {
  // console.log("chordArr from PlayChordEvent__________" + chordArr);

  chordEvent = new ToneEvent((time) => {
    // polySynth.triggerAttackRelease(chordArr, noteDuration, time);
    polySynth.triggerAttackRelease(chordArr, noteDuration, time);
    console.log(chordArr, noteDuration, time);
  });
  // start the chord at the beginning of the transport timeline
  chordEvent.start(noteStart);
  // loop it every measure for 80 measures
  chordEvent.loop = true;
  chordEvent.loopEnd = "4m";

  // console.log(chordEvent.progress);
}

// function PlayPartEvent(
//   chordArr: string[],
//   noteDuration: number,
//   noteStart: number = 0
// ): void {
//   const chordToPlay = [
//     {
//       time: noteStart,
//       note: chordArr,
//       velocity: 0.5,
//     },
//   ];
//   const part = new Tone.Part((time, chord) => {
//     // the chord is an object which contains both the note and the velocity
//     polySynth.triggerAttackRelease(chord.note, "8n", time, chord.velocity);
//     console.log(chord.note, "8n", time, chord.velocity);
//   }, chordToPlay).start(0);
//   Tone.Transport.start();
// }

export function PlayLoop(chordArr: string[]): void {
  // Tone.start();
  Transport.bpm.value = 120;

  let Chords = {
    firstChord: ShowChord(chordArr[0], true),
    secondChord: ShowChord(chordArr[1], true),
    thirdChord: ShowChord(chordArr[2], true),
    fourthChord: ShowChord(chordArr[3], true),
  };

  // console.log("PlayLoop___ 1____" + Chords.firstChord);
  // console.log("PlayLoop___ 2____" + Chords.secondChord);
  // console.log("PlayLoop___ 3____" + Chords.thirdChord);
  // console.log("PlayLoop___ 4____" + Chords.fourthChord);

  PlayChordEvent(Chords.firstChord, 2, 0);
  PlayChordEvent(Chords.secondChord, 2, 2);
  PlayChordEvent(Chords.thirdChord, 2, 4);
  PlayChordEvent(Chords.fourthChord, 2, 6);
}

export function StopLoop(): void {
  if (polySynth && !polySynth.disposed) {
    console.log("Disposing polySynth");
    polySynth.dispose();
  }

  // FIXME: why chords are repeated every time the loop is stopped and started?
  if (chordEvent) {
    console.log(chordEvent.state);
    chordEvent.stop();
  }
}
