import { Synth, PolySynth, Transport, ToneEvent, Player } from "tone";
import { ShowChord } from "../PianoChart";
// TODO: see https://github.com/Tonejs/Tone.js/wiki/Using-Tone.js-with-React-React-Typescript-or-Vue

//------ Global variables

export let polySynth: PolySynth;
// TODO: use chordEvent.progress to track progress of current loop - progress bar.
// TODO: Also to highlight the correct DIV when playing the loop (in both tabs)
export let chordEvent: ToneEvent;

const synthSounds = {
  cuteSinePartials: [7, 6, 0.2],
  imperatricePartials: [0, 2, 3, 4],
};

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

function CreateSynth(
  newPartials: number[] = synthSounds.cuteSinePartials
): void {
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
  }
}

//------ Init synth and tempo

CreateSynth();
SetupTempo();

//------ Make sounds with the synth!

// TODO: improve synth performance
export function PlaySynthChords(chordNotes: string[]): void {
  if (!chordNotes || !polySynth) return;

  console.log("Playing now______", chordNotes);

  Transport.stop();
  polySynth.releaseAll();
  polySynth.triggerAttackRelease(chordNotes, "+0.05", 1);
  // Tone.start();
  Transport.start();
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
}

// TODO: Refactor this. Add more chords (since prog builder grid goes up to 8 chords)
export function PlayLoop(chordArr: string[]): void {
  polySynth.releaseAll();

  let chordsToLoop = {
    // chordNum: chordContent
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };

  const progressionLength: number = chordArr.length;
  // Build the chord arrays in simplified notation
  for (let i = 0; i <= progressionLength; i++) {
    if (chordArr[i]) {
      chordsToLoop[i] = ShowChord(chordArr[i]);
    } else {
      // Remove key/value pair if no need
      delete chordsToLoop[i];
    }
  }

  // Schedule the loop events
  for (let i = 0; i < progressionLength; i++) {
    const noteStart = i.toString() + ":0:0";
    PlayChordLoopEvent(chordsToLoop[i], progressionLength, noteStart);
  }
}
