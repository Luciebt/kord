import * as Tone from "tone";
import { ShowChord } from "../PianoChart";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";

//------ Global variables

const synthSounds = {
  cuteSinePartials: [7, 6, 0.2],
  imperatricePartials: [0, 2, 3, 4],
};

export let polySynth: Tone.PolySynth | null = null;
export let chordEvent: Tone.ToneEvent | null = null;
let activeSynthType: string = "cuteSine"; // Track current synth type

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
  newPartials: number[] = synthSounds.cuteSinePartials,
): void {
  // Dispose the existing synth before creating a new one.
  if (polySynth) {
    polySynth.releaseAll();
    polySynth.dispose();
  }

  polySynth = new Tone.PolySynth(Tone.Synth, {
    volume: -9,
    detune: 0,
    portamento: 0,
    envelope: {
      attack: 0.005,
      attackCurve: "linear",
      decay: 0.2,
      decayCurve: "exponential",
      release: 4,
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
  if (synthSound === activeSynthType) return;
  activeSynthType = synthSound;

  switch (synthSound) {
    case "cuteSine":
      CreateSynth(synthSounds.cuteSinePartials);
      break;
    case "imperatrice":
      CreateSynth(synthSounds.imperatricePartials);
      break;
    default:
      console.warn(`Unknown synth sound: ${synthSound}`);
  }
}

//------ Init synth and tempo

CreateSynth();
SetupTempo();

//------ Make sounds with the synth!

export function PlaySynthChords(chordNotes: string[]): void {
  if (!chordNotes || !polySynth) return;

  Tone.context.resume().then(() => {
    polySynth!.triggerAttackRelease(chordNotes, "0.2");
  });
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
  noteStart: string = "0:0:0",
): void {
  if (!polySynth) return;

  Tone.context.resume();

  chordEvent = new Tone.ToneEvent((time) => {
    polySynth!.triggerAttackRelease(chordArr, "1n", time);

    // Sync visuals with Tone.transport
    Tone.Draw.schedule(() => {
      const posId: number = parseInt(noteStart.split(":")[0]) + 1;
      AddGridHighlight(posId);
    }, time);
  });

  chordEvent.start(noteStart);
  chordEvent.loop = true;
  chordEvent.loopEnd = `${progressionLength}m`;
}

//------ Stop playback safely

export function StopPlayback(): void {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  if (chordEvent) {
    chordEvent.cancel();
    chordEvent.dispose();
    chordEvent = null;
  }
}

//------ Play Chord Sequence (Using Tone.Sequence)

let activeSequence: Tone.Sequence | null = null;

function PlayChordSequence(chordArr: string[], noteStart: string): void {
  if (!polySynth) return;

  StopPlayback();

  activeSequence = new Tone.Sequence(
    (time, note) => {
      polySynth!.triggerAttackRelease(note, "16n", time);
    },
    chordArr,
    "4n",
  );

  activeSequence.start(noteStart);
  activeSequence.loop = true;
}

//------ Main Playback Function

export function PlayLoop(chordArr: string[]): void {
  if (!chordArr.length) return;

  StopPlayback();

  let chordsToLoop: { [key: number]: string[] } = {};
  chordArr.forEach((chord, i) => {
    chordsToLoop[i + 1] = ShowChord(chord);
  });

  const progressionLength: number = chordArr.length;
  for (let i = 1; i <= progressionLength; i++) {
    const noteStart = `${i - 1}:0:0`;
    PlayChordLoopEvent(chordsToLoop[i], progressionLength, noteStart);
  }
}
