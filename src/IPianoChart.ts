import { BuildChordNotes } from "./IChords";

interface noteId {
  [key: string]: number;
}

// Access to key id using noteNumForKeys["C#"];
let noteNumForKeys: noteId = {
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

function ReturnSharpFromFlatNotes(chord: string): string {
  // Not sure why this happens, but I sometimes get E#m and that is NOT okay.
  if (chord.includes("E#")) {
    chord = chord.replace(/E/g, "F");
  }

  if (chord.includes("b")) {
    chord = chord.replace(/Db/g, "C#");
    chord = chord.replace(/Eb/g, "D#");
    chord = chord.replace(/Gb/g, "F#");
    chord = chord.replace(/Ab/g, "G#");
    chord = chord.replace(/Bb/g, "A#");
  }

  return chord;
}

export function ShowChord(chord: string): string[] {
  const chordsWithoutFlats = ReturnSharpFromFlatNotes(chord);
  console.log("ShowChord: chordsWithoutFlats_____" + chordsWithoutFlats);

  let notesArr: string[] = BuildChordNotes(chordsWithoutFlats);

  // This solution doesn't work with inverted chords. TODO: Make it work with inversions!
  const firstNote = notesArr[0];
  const firstNum = noteNumForKeys[firstNote];

  // TODO: document this before I forget.
  notesArr.forEach((note, i) => {
    const numForKey = noteNumForKeys[note];
    if (numForKey < firstNum) {
      // Regex helper to dynamically change the notesArr.
      const re = new RegExp(note, "g");
      notesArr[i] = notesArr[i].replace(re, (note += "2"));
      // console.log("notesArr[i]______" + notesArr[i]);
    }
  });
  console.log("notesArr______" + notesArr);

  return notesArr;
}
