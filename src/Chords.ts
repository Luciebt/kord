import { Note, Chord } from "@tonaljs/tonal";
import { PlaySynthChords } from "./audio/Synth";
import { SetupPiano, PlayPianoChords } from "./audio/Piano";
import { CleanChords } from "./IProgression";

enum Instrument {
  Piano,
  Synth,
}

// TODO: only setup piano if Piano instrument is chosen from the settings panel.
let PianoInSettings: boolean = false;

if (PianoInSettings) {
  SetupPiano();
}

function PlayMidiNotes(chordNotes: string[], instrumentType: Instrument): void {
  // TODO: create a choice between synth and piano sounds.
  // TODO: create audio sampler to give piano keys mp3.
  // TODO: allow not to play sound. Use React context for preference for audio sounds and on/off.


  if (instrumentType == Instrument.Synth) {
    PlaySynthChords(chordNotes);
  } else if (instrumentType == Instrument.Piano) {
    const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);
    PlayPianoChords(midiChordNotes);
  }
}

/////// Flow:
// PlayChord
// BuildChordNotes
// ChordsArrayGenerator --> [chordMode, homeNote]
// Chord.getChord(chordMode, homeNote).notes --> string[]
// PlayMidiNotes
// BuildMidiChordNotes(chordNotes)

// TODO: pass the enum instrument in PlayChord from the react component.
export function PlayChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);

  PlayMidiNotes(chordNotes, Instrument.Synth);
}

// To use only for grand piano sound.
function BuildMidiChordNotes(chordNotes: string[]): string[] {
  let Results: string[] = [];

  chordNotes.forEach((note) => {
    const NoteFound: any = Note.midi(note);
    if (NoteFound) {
      Results.push(NoteFound.toString());
    }
  });

  return Results;
}

// TODO: improve this function
function ChordsArrayGenerator(chord: string): string[] {
  // From D#m I want: ["m", "D#"]
  // From D# I want: ["M", "D#"]
  // From D I want: ["M", "D"]

  // home note = D, D# or Db
  // mode = m, M, 7, m7, sus...
  let homeNote: string = chord[0];
  let chordMode: string = "";

  switch (chord[1]) {
    case "b":
      homeNote += "b";
      break;
    case "#":
      homeNote += "#";
      break;
    default:
      break;
  }

  // Add octave
  homeNote += "3";

  // TODO: Add diminished and augmented chords. Incl. 7.
  // FIXME: this is ugly AF.
  if (chord.includes("m")) {
    chordMode = "m";
    if (chord.includes("7")) {
      chordMode = "m7";
    }
  } else if (chord.includes("7")) {
    chordMode = "7";
  } else if (chord.includes("sus")) {
    chordMode = "sus";
  } else if (chord.includes("d")) {
    chordMode = "d";
  } else if (chord.includes("dim7")) {
    chordMode = "dim7";
  } else {
    chordMode = "M";
  }

  return [chordMode, homeNote];
}

export function BuildChordNotes(chord: string): string[] {
  const [chordMode, homeNote]: string[] = ChordsArrayGenerator(chord);

  let chordArr: string[] = Chord.getChord(chordMode, homeNote).notes;

  // Use Simplify helper to avoid F## notations, which we cannot read to display chords visually using the piano chart.
  chordArr.forEach((chord, i) => {
    chordArr[i] = Note.simplify(chord);
  });

  chordArr = CleanChords(chordArr.join(",")).split(",");

  return chordArr;
}
