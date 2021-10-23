import { Synth, PolySynth, Transport, ToneEvent } from "tone";
import * as Tone from "tone";
import { PlayChord, BuildChordNotes } from "../Chords";
import { ShowChord } from "../PianoChart";

let synth1 = new Synth().toDestination();
let synth2 = new Synth().toDestination();
let synth3 = new Synth().toDestination();
let synth4 = new Synth().toDestination();
// let polySynth;

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

export function PlayLoop(chordArr: string[]): void {
  // polySynth.toDestination();

  Tone.start();

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

  // Transport.stop();
}

export function StopLoop(): void {
  if (polySynth) {
    polySynth.disconnect();
  }

  // FIXME: why chords are repeated every time the loop is stopped and started?
  if (chordEvent) {
    console.log(chordEvent.state);
    chordEvent.stop();
  }
}
