import { Synth, PolySynth, Transport, ToneEvent, Draw, Sequence } from "tone";
import { ShowChord } from "../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../components/hooks/unPressElementStyle";

//------ Global variables

const synthSounds = {
  cuteSinePartials: [7, 6, 0.2],
  imperatricePartials: [0, 2, 3, 4],
};

export let polySynth: PolySynth;
export let chordEvent: ToneEvent;

//------ Transport functions

export function SetupTempo(bpm: number = 120): void {
  Transport.bpm.value = bpm;
}

export function GetTempo(): number {
  return Transport.bpm.value;
}

export function SetTempo(newValue: number): void {
  Transport.bpm.rampTo(newValue, 1);
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

  // const reverb = new Freeverb().toDestination();
  // reverb.wet.value = 0.3;
  // polySynth.connect(reverb);
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

  Transport.stop();
  polySynth.releaseAll();
  polySynth.triggerAttackRelease(chordNotes, "+0.05", 1);
  Transport.start();
}

//------ Loop chord progression.

function AddGridHighlight(posId: number): any {
  unPressElementsStyleWithoutEvent("highlight-chord-div");
  unPressElementsStyleWithoutEvent("chord-btn-pressed");
  unPressElementsStyleWithoutEvent("selected-position");

  let currentChord = document.getElementById(`btn-${posId}`);
  if (currentChord) return currentChord.classList.add("highlight-chord-div");

  currentChord = document.getElementById(`pos-${posId}`);
  if (currentChord) return currentChord.classList.add("selected-position");
}

function PlayChordLoopEvent(
  chordArr: string[],
  progressionLength: number,
  noteStart: string = "0:0:0"
): void {
  chordEvent = new ToneEvent((time) => {
    polySynth.triggerAttackRelease(chordArr, "1n", time);

    // Draw the grid highlight - need Draw to sync visuals with transport
    Draw.schedule(() => {
      const posId: number = parseInt(noteStart.split(":")[0]) + 1;
      AddGridHighlight(posId);
    }, time);
  }, "1n");
  // start the chord at the beginning of the transport timeline
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
  // chordEvent = new ToneEvent((time) => {
  let seq = new Sequence((time, note) => {
    polySynth.triggerAttackRelease(note, "16n", time);
  }, chordArr);
  // }, "1n");

  seq.start(noteStart);
  seq.loop = chordArr.length;
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

  // Build the chord arrays in simplified notation
  for (let i = 0; i <= 8; i++) {
    if (chordArr[i]) {
      chordsToLoop[i] = ShowChord(chordArr[i]);
    } else {
      // Remove key/value pair if no need
      delete chordsToLoop[i];
    }
  }

  // Schedule the loop events
  const progressionLength: number = chordArr.length;
  for (let i = 0; i < progressionLength; i++) {
    const noteStart = i.toString() + ":0:0";
    // console.log("loop loop", chordsToLoop[i], progressionLength, noteStart);
    // PlayChordLoopEvent(chordsToLoop[i], progressionLength, noteStart);
    PlayChordSequence(chordsToLoop[i], progressionLength, noteStart, i);
  }
}
