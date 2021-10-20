import { BuildChordNotes } from "./IChords";
import { Note } from "@tonaljs/tonal";

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

const fromFlatToSharp = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
};

export function AddOctaveToNoteIfNeeded(
  notesArr: string[],
  forMidi: boolean = false
): void {
  // This solution doesn't work with inverted chords. TODO: Make it work with inversions!
  const firstNote = notesArr[0];
  const firstNum = noteNumForKeys[firstNote];
  notesArr.forEach((note, i) => {
    // Regex helper to dynamically change the notesArr.
    const re = new RegExp(note, "g");
    const numForKey = noteNumForKeys[note];
    if (numForKey < firstNum) {
      if (forMidi) {
        notesArr[i] = notesArr[i].replace(re, (note += "4"));
      } else {
        notesArr[i] = notesArr[i].replace(re, (note += "2"));
      }
    } else {
      if (forMidi) {
        notesArr[i] = notesArr[i].replace(re, (note += "3"));
      }
    }
  });
}

export function ShowChord(chord: string, forMidi: boolean = false): string[] {
  let notesArr: string[] = BuildChordNotes(chord);

  AddOctaveToNoteIfNeeded(notesArr, forMidi);

  console.log("notesArr______" + notesArr);

  return notesArr;
}
