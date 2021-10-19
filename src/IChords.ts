import { IRoman, TProgression, TQuality, TMood } from "./type.d";
import { Note, Midi, Chord } from "@tonaljs/tonal";
import { Piano } from "@tonejs/piano";
import { AddOctaveToNoteIfNeeded } from "./IPianoChart";

const piano = new Piano({
  velocities: 5,
  maxPolyphony: 6,
}).toDestination();

piano.load().then(() => {
  console.log("loaded!");
});

function PlayMidiNotes(chordNotes: string[]): void {
  const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);

  midiChordNotes.forEach((midiNote) => {
    piano.keyDown({ note: midiNote });
    piano.keyUp({ note: midiNote, time: "+1.5" });
    console.log(midiNote);
  });
}

/////// Flow:
// PlayPianoChord
// BuildChordNotes
// ChordsArrayGenerator --> [chordType, homeNote]
// Chord.getChord(chordType, homeNote).notes --> string[]
// PlayMidiNotes
// BuildMidiChordNotes(chordNotes)

export function PlayPianoChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);

  PlayMidiNotes(chordNotes);
}

function BuildMidiChordNotes(chordNotes: string[]): string[] {
  AddOctaveToNoteIfNeeded(chordNotes, true);

  console.log("chordNotes going to BuildMidi__" + chordNotes);
  let Results: string[] = [];
  chordNotes.forEach((note) => {
    const NoteFound: any = Note.midi(note);
    if (NoteFound) {
      Results.push(NoteFound.toString());
    }
  });
  console.log("BuildMidiChordNotes_RESULTS___" + Results);
  return Results;
}

// From D#m I want: ["m", "D#"]
// From D# I want: ["M", "D#"]
// From D I want: ["M", "D"]

// home note = D, D# or Db
// quality = m, M, 7, m7, sus...

// TODO: improve this function
function ChordsArrayGenerator(chord: string): string[] {
  let homeNote: string = chord[0];
  let chordType: string = "";

  switch (chord[1]) {
    case "b":
      homeNote += "b";
      break;
    case "#":
      homeNote += "#";
      break;
    case "##":
      // TODO: Make sure that this works.
      homeNote = Note.transpose(homeNote, "2M");
      break;
    default:
      break;
  }

  // FIXME: this is ugly AF.
  if (chord.includes("m")) {
    chordType = "m";
    if (chord.includes("7")) {
      chordType = "m7";
    }
  } else if (chord.includes("7")) {
    chordType = "7";
  } else if (chord.includes("sus")) {
    chordType = "sus";
  } else if (chord.includes("d")) {
    chordType = "d";
  } else if (chord.includes("dim7")) {
    chordType = "dim7";
  } else {
    chordType = "M";
  }

  return [chordType, homeNote];
}

function ReturnSharpFromFlatNotes(chord: string[]): string[] {
  let notesList = chord.join(",");
  if (notesList.includes("E#")) {
    notesList = notesList.replace(/E#/g, "F");
  }
  if (notesList.includes("b")) {
    notesList = notesList.replace(/Db/g, "C#");
    notesList = notesList.replace(/Eb/g, "D#");
    notesList = notesList.replace(/Gb/g, "F#");
    notesList = notesList.replace(/Ab/g, "G#");
    notesList = notesList.replace(/Bb/g, "A#");
  }

  return notesList.split(",");
}

export function BuildChordNotes(chord: string): string[] {
  const [chordType, homeNote]: string[] = ChordsArrayGenerator(chord);
  // console.log("chordAfterGenerator___" + [chordType, homeNote]);

  let chordArr: string[] = Chord.getChord(chordType, homeNote).notes;

  console.log(chordArr);

  // Use Simplify helper to avoid F## notations, which we cannot read to display chords visually using the piano chart.
  chordArr.forEach((chord, i) => {
    chordArr[i] = Note.simplify(chord);
  });

  // Get rid of flat notes to only keep sharps. A simplification to display chords visually.
  chordArr = ReturnSharpFromFlatNotes(chordArr);
  console.log("chordArr from BuildChordNotes___" + chordArr);

  return chordArr;
}
