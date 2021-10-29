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

function PlayChordLoopEvent(
  chordArr: string[],
  progressionLength: number,
  noteDuration: number,
  noteStart: number = 0
): void {
  chordEvent = new ToneEvent((time) => {
    polySynth.triggerAttackRelease(chordArr, noteDuration, time);
    console.log(chordArr, noteDuration, time);
  });
  // start the chord at the beginning of the transport timeline
  chordEvent.start(noteStart);
  // loop it every measure, depending on the number of chords to play.
  let measuresToPlay: string = progressionLength.toString();
  // console.log("measuresToPlay___" + measuresToPlay);

  chordEvent.loop = true;
  chordEvent.loopEnd = measuresToPlay += "m";

  // TODO: option to repeat chord every bar: the noteDuration should be shortened for this to work.
  // chordEvent.loopEnd = measuresToPlay += "n";
}

// TODO: Refactor this.
export function PlayLoop(chordArr: string[]): void {
  // TODO: allow to set a different tempo.
  Transport.bpm.value = 120;

  let Chords = {
    firstChord: ShowChord(chordArr[0]),
    secondChord: ShowChord(chordArr[1]),
    thirdChord: ShowChord(chordArr[2]),
    fourthChord: ShowChord(chordArr[3]),
  };

  const progressionLength: number = chordArr.length;

  PlayChordLoopEvent(Chords.firstChord, progressionLength, 2, 0);
  PlayChordLoopEvent(Chords.secondChord, progressionLength, 2, 2);
  if (progressionLength > 2) {
    PlayChordLoopEvent(Chords.thirdChord, progressionLength, 2, 4);
  }
  if (progressionLength > 3) {
    PlayChordLoopEvent(Chords.fourthChord, progressionLength, 2, 6);
  }
}
