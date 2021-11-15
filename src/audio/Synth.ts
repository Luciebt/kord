import { Synth, PolySynth, Transport, ToneEvent, Player } from "tone";
import * as Tone from "tone";
import { ShowChord } from "../PianoChart";
// TODO: see https://github.com/Tonejs/Tone.js/wiki/Using-Tone.js-with-React-React-Typescript-or-Vue

//------ Global variables

let polySynth: PolySynth;
let chordEvent: ToneEvent;

const synthSounds = {
  cuteSinePartials: [7, 6, 0.2],
  imperatricePartials: [0, 2, 3, 4],
  churchPartials: [3, 5, 7, 9, 11],
}

//------ Transport functions

export function SetupTempo(bpm: number = 120): void {
  Transport.bpm.value = bpm;
}

export function GetTempo(): number {
  return Transport.bpm.value;
}

//------ Metronome functions

// const player = new Player(
//   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1506195/keyboard-key.mp3"
// ).toDestination();

// Transport.scheduleRepeat((time) => {
//   player.start(time).stop(time + 0.1);
// }, "4n");

//------ Synth utils

function CreateSynth(newPartials: number[] = synthSounds.cuteSinePartials): void {
  // Dispose the existing synth if it exists.
  if (polySynth) {
    polySynth.releaseAll();
    polySynth.dispose();
  }
  // Create a new synth with new partials, cuteSine being the defaults.
  polySynth = new PolySynth(Synth, {
    volume: -9,
    detune: 0,
    portamento: 0,
    envelope: {
      attack: 0.005,
      attackCurve: "linear",
      decay: 0.2,
      decayCurve: "exponential",
      release: 1,
      releaseCurve: "exponential",
      sustain: 0.3,
    },
    oscillator: {
      partials: newPartials,
      phase: 0,
      type: "custom",
    },

  }).toDestination();
}

export function SetSynthSound(synthSound: string): void {
  switch (synthSound) {
    case "cuteSine":
      CreateSynth(synthSounds.cuteSinePartials);
    case "imperatrice":
      CreateSynth(synthSounds.imperatricePartials);
    case "inDaChurch":
      CreateSynth(synthSounds.churchPartials);
  }
}

//------ Init synth and tempo

CreateSynth();
SetupTempo();

//------ Make sounds with the synth!

export function PlaySynthChords(chordNotes: string[]): void {
  if (polySynth) {
    polySynth.releaseAll();
    polySynth.triggerAttackRelease(chordNotes, "+0.05", 1);
    Tone.start();
  }
}

//------ Loop chord progression.

function PlayChordLoopEvent(
  chordArr: string[],
  progressionLength: number,
  noteStart: string = "0:0:0"
): void {
  chordEvent = new ToneEvent((time) => {
    polySynth.triggerAttackRelease(chordArr, "1n", time);
    console.log(chordArr, "1n", time);
  });
  // start the chord at the beginning of the transport timeline
  chordEvent.start(noteStart);
  // loop it every measure, depending on the number of chords to play.
  let measuresToPlay: string = progressionLength.toString();
  // Loop the progression forever and set its length.
  chordEvent.loop = true;
  chordEvent.loopEnd = measuresToPlay += "m";

  // TODO: option to repeat chord every bar: the noteDuration should be shortened for this to work.
  // chordEvent.loopEnd = measuresToPlay += "n";
}

function SelectChordsDisplayEvent(
  chordIndex: number,
  progressionLength: number,
  noteStart: string = "0:0:0"
): void {
  chordEvent = new ToneEvent((time) => {
    console.log(chordIndex, "1n", time);
  });
  chordEvent.start(noteStart);
  let measuresToPlay: string = progressionLength.toString();
  chordEvent.loop = true;
  chordEvent.loopEnd = measuresToPlay += "m";
}

// TODO: Refactor this.
export function PlayLoop(chordArr: string[]): void {
  polySynth.releaseAll();

  let Chords = {
    firstChord: ShowChord(chordArr[0]),
    secondChord: ShowChord(chordArr[1]),
    thirdChord: ShowChord(chordArr[2]),
    fourthChord: ShowChord(chordArr[3]),
  };

  const progressionLength: number = chordArr.length;

  PlayChordLoopEvent(Chords.firstChord, progressionLength, "0:0:0");
  SelectChordsDisplayEvent(0, progressionLength, "0:0:0");
  PlayChordLoopEvent(Chords.secondChord, progressionLength, "1:0:0");
  SelectChordsDisplayEvent(1, progressionLength, "1:0:0");
  if (progressionLength > 2) {
    PlayChordLoopEvent(Chords.thirdChord, progressionLength, "2:0:0");
  }
  if (progressionLength > 3) {
    PlayChordLoopEvent(Chords.fourthChord, progressionLength, "3:0:0");
  }
  if (progressionLength > 4) {
    PlayChordLoopEvent(Chords.fourthChord, progressionLength, "4:0:0");
  }
}
