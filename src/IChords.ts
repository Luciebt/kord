import { IRoman, TProgression, TQuality, TMood } from "./type.d";
import { Note, Midi, Chord } from "@tonaljs/tonal";
import { Piano } from "@tonejs/piano";

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
  // console.log("chord received in PlayPianoChord__" + chord);
  const chordNotes: string[] = BuildChordNotes(chord);
  // console.log("Chord Notes____" + chordNotes);

  PlayMidiNotes(chordNotes);
}

function BuildMidiChordNotes(chordNotes: string[]): string[] {
  console.log("chordNotes going to BuildMidi__" + chordNotes);
  let Results: string[] = [];
  chordNotes.forEach((note) => {
    const NoteFound: any = Note.midi(note + "3");
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

function ChordsArrayGenerator(chord: string): string[] {
  let chordType: string = "";
  let homeNote: string = chord[0];

  if (chord.includes("m")) {
    chordType = "m";
  } else if (chord.includes("7")) {
    chordType = "7";
  } else if (chord.includes("m7")) {
    chordType = "m7";
  } else if (chord.includes("sus")) {
    chordType = "sus";
  } else if (chord.includes("d")) {
    chordType = "d";
  } else if (chord.includes("dim7")) {
    chordType = "dim7";
  } else {
    chordType = "M";
  }

  switch (chord[1]) {
    case "b":
      homeNote += "b";
      break;
    case "#":
      homeNote += "#";
      break;
    case "##":
      homeNote += "##";
      break;
    default:
      break;
  }

  return [chordType, homeNote];
}

export function BuildChordNotes(chord: string): string[] {
  const [chordType, homeNote]: string[] = ChordsArrayGenerator(chord);
  console.log("chordAfterGenerator___" + chord);

  // const testing = Chord.getChord(chordType, homeNote).notes;
  const testing = Chord.getChord("Dm7", homeNote).notes;
  console.log("Chord.getChord___" + testing);

  return Chord.getChord(chordType, homeNote).notes;
}
