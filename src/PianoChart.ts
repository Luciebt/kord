import { BuildChordNotes } from "./Chords";

interface noteId {
  [key: string]: number;
}

// Access to key id using noteNumForKeys["C#"];
const noteNumForKeys: noteId = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};

// const fromFlatToSharp = {
//   Db: "C#",
//   Eb: "D#",
//   Gb: "F#",
//   Ab: "G#",
//   Bb: "A#",
// };


export function ShowChord(chord: string): string[] {
  if (!chord) return [];

  return BuildChordNotes(chord);
}
