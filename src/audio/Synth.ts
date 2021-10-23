// import * as Tone from "tone";
// import { Synth, PolySynth, Transport, Sequence, Part, ToneEvent, Loop } from "tone";
import * as Tone from "tone";
import { PlayChord, BuildChordNotes } from "../Chords";

// Better for performance to instantiate all synths before calling PlaySynthChords.
let synth1 = new Tone.Synth().toDestination();
let synth2 = new Tone.Synth().toDestination();
let synth3 = new Tone.Synth().toDestination();
let synth4 = new Tone.Synth().toDestination();


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

  // synth.triggerAttackRelease(chordNotes, "0.05");

  // Using "+0.05" to play a little bit in advance. 
  synth1.triggerAttackRelease(chordNotes[0], "+0.00", 1);
  synth2.triggerAttackRelease(chordNotes[1], "+0.00", 1);
  synth3.triggerAttackRelease(chordNotes[2], "+0.00", 1);
  if (chordNotes[3]) {
    synth4.oscillator.type = "sine";
    synth4.triggerAttackRelease(chordNotes[3], "+0.00", 1);
  }
}

// Start loop
// Need to create one loop per chord. so dynamically?
// Next loop starts when the previous one stops.

export function PlayLoop(chordArr: string[]): void {

  // "note" takes an array of notes to play the chord ['A3', 'C4', 'E4']

  // TODO: go through this: https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
  const Chords = {
    firstChord: BuildChordNotes(chordArr[0]),
    secondChord: BuildChordNotes(chordArr[1]),
    thirdChord: BuildChordNotes(chordArr[2]),
    fourthChord: BuildChordNotes(chordArr[3]),
    fifthChord: BuildChordNotes(chordArr[4])
  }

  console.log(typeof Chords.firstChord);

  const mainChords = [
    { 'time': 0, 'note': Chords.firstChord, 'duration': '1m' },
    { 'time': '1:0', 'note': Chords.secondChord, 'duration': '1m' },
    { 'time': '2:0', 'note': Chords.thirdChord, 'duration': '1m' },
    { 'time': '3:0', 'note': Chords.fifthChord, 'duration': '1m' },
  ]

  const part = new Tone.Part(function (time, note) {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords).start(0);

}

export function StartLoop(chordArr: string[] | undefined): void {
  if (chordArr == undefined) return;


  // PlayChord receives one chord as a string "Em, Am, C#"

  const Chords = {
    firstChord: chordArr[0],
    secondChord: chordArr[1],
    thirdChord: chordArr[2],
    fourthChord: chordArr[3],
    fifthChord: chordArr[4]
  }

  console.log("firstChord___" + Chords.firstChord);

  Tone.Transport.bpm.value = 120;

  // const ChordsOnTone = Tone.Transport = () => {
  //   Tone.Transport.scheduleOnce((time) => {
  //     console.log("PlayChord 1");
  //     PlayChord(Chords.firstChord);
  //   }, "0");

  //   Tone.Transport.scheduleOnce((time) => {
  //     console.log("PlayChord 2");
  //     PlayChord(Chords.secondChord);
  //   }, "2");

  //   Tone.Transport.scheduleOnce((time) => {
  //     console.log("PlayChord 3");
  //     PlayChord(Chords.thirdChord);
  //   }, "4");

  //   Tone.Transport.scheduleOnce((time) => {
  //     console.log("PlayChord 4");
  //     PlayChord(Chords.fourthChord);
  //   }, "6");

  // }

  // Tone.Transport.scheduleRepeat((time) => {
  //   ChordsOnTone.Transport();
  // }, "8");


  Tone.Transport.start();


  // const loopA = new Tone.Loop((time: number) => {
  //   ChordsOnTone.Transport();
  // }, "0").start(0).stop(8);


}

export function StopLoop(): void {
  Tone.Transport.stop();
}
