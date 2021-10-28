import { PolySynth, Transport, ToneEvent } from "tone";
import * as Tone from "tone";
import { ShowChord } from "../PianoChart";

let polySynth: Tone.PolySynth;
let chordEvent: Tone.ToneEvent;

export function SetupSynth(): void {
  polySynth = new PolySynth(Tone.Synth, {
    volume: -8,
    detune: 0,
    portamento: 0,
    envelope: {
      attack: 0.005,
      attackCurve: "linear",
      decay: 0.1,
      decayCurve: "exponential",
      release: 1,
      releaseCurve: "exponential",
      sustain: 0.3,
    },
    oscillator: {
      partialCount: 0,
      phase: 0,
      type: "sine",
    },
  }).toDestination();
}


export function PlaySynthChords(chordNotes: string[]): void {
  if (polySynth) {
    polySynth.triggerAttackRelease(chordNotes, "+0.00", 1);
  }
}

function DisposeChordSynths(): void {
  if (polySynth) {
    polySynth.dispose();
  }
}


function PlayChordEvent(
  chordArr: string[],
  noteDuration: number,
  noteStart: number = 0
): void {
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

export function PlayLoop(chordArr: string[]): void {
  // Tone.start();
  Transport.bpm.value = 120;

  let Chords = {
    firstChord: ShowChord(chordArr[0]),
    secondChord: ShowChord(chordArr[1]),
    thirdChord: ShowChord(chordArr[2]),
    fourthChord: ShowChord(chordArr[3]),
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
  // Should be handled by the view.
}
