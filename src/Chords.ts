import { Note, Chord } from "@tonaljs/tonal";
import { detect } from "@tonaljs/chord-detect";
import { PlaySynthChords } from "./audio/Synth";
import { SetupPiano, PlayPianoChords } from "./audio/Piano";
import { CleanChords } from "./NoteUtils";

// TODO: test accuracy of chords / their notes using chord-detect: https://github.com/tonaljs/tonal/tree/main/packages/chord-detect

enum InstrumentType {
  Piano,
  Synth,
}

// TODO: only setup piano if Piano instrument is chosen from the settings panel.
let PianoInSettings: boolean = false;

if (PianoInSettings) {
  SetupPiano();
}

function PlayMidiNotes(chordNotes: string[], instrumentType: InstrumentType): void {
  switch (instrumentType) {
    case InstrumentType.Synth:
      PlaySynthChords(chordNotes);
      break;
    case InstrumentType.Piano:
      const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);
      PlayPianoChords(midiChordNotes);
      break;
    default:
      break;
  }
}

export function PlayChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);

  PlayMidiNotes(chordNotes, InstrumentType.Synth);
}

// To use only for grand piano sound.
function BuildMidiChordNotes(chordNotes: string[]): string[] {
  return chordNotes.map((note) => {
    const NoteFound: any = Note.midi(note);
    if (NoteFound) {
      return NoteFound.toString();
    }
  });
}

// TODO: improve this function
function ChordsArrayBuilder(chord: string, octave: number): string[] {
  let homeNote: string = chord[0];
  // Let major be the default mode.
  let chordMode: string = "M";

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
  homeNote += octave;

  if (chord.includes("m", 1)) {
    chordMode = "m";
  } else if (chord.includes("dim", 1) || chord.includes("d", 1)) {
    chordMode = "dim";
  } else if (chord.includes("sus", 1)) {
    chordMode = "sus";
  } else if (chord.includes("aug", 1)) {
    chordMode = "aug";
  }

  // Seventh chords.
  if (chord.includes("7", 1)) {
    if (chord.includes("sus", 1)) {
      chordMode = "7sus";
    } else {
      chordMode += "7";
    }
  }

  return [chordMode, homeNote];
}

// FIXME: Add octave, otherwise lots of progressions are broken.
export function BuildChordNotes(chord: string, octave: number = 3): string[] {
  const [chordMode, homeNote]: string[] = ChordsArrayBuilder(chord, octave);

  let chordArr: string[] = Chord.getChord(chordMode, homeNote).notes;


  // Use Simplify helper to avoid F## notations, which we cannot read to display chords visually using the piano chart. Why do they exist btw?
  chordArr.forEach((chord, i) => {
    chordArr[i] = Note.simplify(chord);
  });

  chordArr = CleanChords(chordArr.join(",")).split(",");

  return chordArr;
}
