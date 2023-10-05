import * as Tone from "tone";
import { ShowChord } from "../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";

//------ Global variables

const synthSounds = {
  cuteSinePartials: [7, 6, 0.2],
  imperatricePartials: [0, 2, 3, 4],
};

export let polySynth: Tone.PolySynth;
export let chordEvent: Tone.ToneEvent;

//------ Tone.Transport functions

export function SetupTempo(bpm: number = 120): void {
  Tone.Transport.bpm.value = bpm;
}

export function GetTempo(): number {
  return Tone.Transport.bpm.value;
}

export function SetTempo(newValue: number): void {
  Tone.Transport.bpm.rampTo(newValue, 1);
}

//------ Metronome functions

// const player = new Player(
//   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1506195/keyboard-key.mp3"
// ).toDestination();

// Tone.Transport.scheduleRepeat((time) => {
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
  polySynth = new Tone.PolySynth(Tone.Synth, {
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
  });

  // See https://github.com/Tonejs/Tone.js/wiki/Performance#contextlatencyhint
  // Tone.setContext(new Tone.Context({ latencyHint: "balanced" }));

  const gain = new Tone.Gain(0.6).toDestination();
  polySynth.connect(gain);
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

export function PlaySynthChords(chordNotes: string[]): void {
  if (!chordNotes || !polySynth) return;

  // Tone.Transport.stop();
  Tone.start().then(() => {
    polySynth.releaseAll();
    polySynth.triggerAttackRelease(chordNotes, "+0.1", 1);
  });
  Tone.Transport.start();
}

//------ Loop chord progression.

function AddGridHighlight(posId: number): any {
  unPressElementsStyleWithoutEvent("highlight-chord-div");
  unPressElementsStyleWithoutEvent("chord-btn-pressed");
  unPressElementsStyleWithoutEvent("selected-position");
  unPressElementsStyleWithoutEvent("selected-position-without-chord");

  let currentChord = document.getElementById(`btn-${posId}`);
  currentChord?.classList.add("highlight-chord-div");

  currentChord = document.getElementById(`pos-${posId}`);
  currentChord?.classList.add("selected-position");
}

function PlayChordLoopEvent(
  chordArr: string[],
  progressionLength: number,
  noteStart: string = "0:0:0"
): void {
  chordEvent = new Tone.ToneEvent((time) => {
    polySynth.triggerAttackRelease(chordArr, "1n", time);

    // Draw the grid highlight - need Draw to sync visuals with Tone.transport
    Tone.Draw.schedule(() => {
      const posId: number = parseInt(noteStart.split(":")[0]) + 1;
      AddGridHighlight(posId);
    }, time);
  }, "+0.1");
  // start the chord at the beginning of the Tone.transport timeline
  chordEvent.start(noteStart);
  // loop it every measure, depending on the number of chords to play.
  const measuresToPlay: string = progressionLength.toString() + "m";
  // Loop the progression forever and set its length.
  chordEvent.loop = true;
  chordEvent.loopEnd = measuresToPlay;
}

function PlayChordSequence(
  chordArr: string[],
  progressionLength: number,
  noteStart: string,
  id: number
): void {
  // let chordSeqEvent = new Tone.ToneEvent((time) => {
  let seq = new Tone.Sequence(
    (time, note) => {
      polySynth.triggerAttackRelease(note, "16n", time);
    },
    chordArr,
    "+0.1"
  );
  // }, "+0.1");

  console.log(id);

  seq.start(noteStart);
  seq.loop = chordArr.length * 2;
}

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

  // Build the chord arrays in simplified notation
  for (let i = 0; i <= 8; i++) {
    if (chordArr[i]) {
      chordsToLoop[i] = ShowChord(chordArr[i]);
    } else {
      // Remove key/value pair if no need
      delete chordsToLoop[i];
    }
  }

  console.log(chordsToLoop);

  // Schedule the loop events
  const progressionLength: number = chordArr.length;
  for (let i = 0; i < progressionLength; i++) {
    const noteStart = i.toString() + ":0:0";
    PlayChordLoopEvent(chordsToLoop[i], progressionLength, noteStart);
    // PlayChordSequence(chordsToLoop[i], progressionLength, noteStart, i);
  }
}
