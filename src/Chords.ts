import { Note, Chord } from "@tonaljs/tonal";
import { detect } from "@tonaljs/chord-detect";
import { PlaySynthChords, polySynth } from "./audio/Synth";
// import { SetupPiano, PlayPianoChords } from "./audio/Piano";
import { CleanChords } from "./NoteUtils";

// TODO: test accuracy of chords / their notes using chord-detect: https://github.com/tonaljs/tonal/tree/main/packages/chord-detect

enum InstrumentType {
  Piano,
  Synth,
}

// TODO: only setup piano if Piano instrument is chosen from the settings panel.
// let PianoInSettings: boolean = false;

// if (PianoInSettings) {
//   SetupPiano();
// }

function PlayMidiNotes(
  chordNotes: string[],
  instrumentType: InstrumentType
): void {
  switch (instrumentType) {
    case InstrumentType.Synth:
      PlaySynthChords(chordNotes);
      break;
    case InstrumentType.Piano:
      const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);
      // PlayPianoChords(midiChordNotes);
      break;
    default:
      break;
  }
}

export function PlayChord(chord: string, isFullChord: boolean = true) {
  // polySynth.releaseAll();

  const chordNotes: string[] = BuildChordNotes(chord, isFullChord, 3);

  if (chordNotes.length) PlayMidiNotes(chordNotes, InstrumentType.Synth);
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
  // If there's more than 6 chars, it means we have the full quality.

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

export function GetSimplifiedChordFromFullChord(
  fullChord: string,
  octave?: number
): string[] {
  let cleanChord = CleanChords(fullChord);
  let homeNote: string = cleanChord[0];
  let chordMode: string = cleanChord.slice(1);

  const isSeventh: boolean = cleanChord.slice(-1) == "7";
  const isNinth: boolean = cleanChord.slice(-1) == "9";

  if (cleanChord[1] == "#") {
    homeNote += "#";
    chordMode = cleanChord.slice(2);
  }

  if (chordMode.includes("Minor")) {
    chordMode = chordMode.includes("Minor7Flat5") ? "m7b5" : "m";
  } else if (chordMode.includes("Major")) {
    chordMode = "";
  } else if (chordMode.includes("Diminished")) {
    chordMode = "dim";
  }

  if (isSeventh && !chordMode.includes("7")) {
    chordMode += "7";
  } else if (isNinth && !chordMode.includes("9")) {
    chordMode += "9";
  }

  return [chordMode, (homeNote += octave)];
}

// TODO: cleanups
export function BuildChordNotes(
  chord: string,
  isFullChord: boolean = true,
  octave: number = 3
): string[] {
  let chordArr: string[] = [];

  if (!isFullChord) {
    const [chordMode, homeNote]: string[] = ChordsArrayBuilder(chord, octave);
    chordArr = Chord.getChord(chordMode, homeNote).notes;
  } else {
    const [chordMode, homeNote]: string[] = GetSimplifiedChordFromFullChord(
      chord,
      octave
    );
    chordArr = Chord.getChord(chordMode, homeNote).notes;
  }

  // Use Simplify helper to avoid F## notations, which we cannot read to display chords visually using the piano chart.
  chordArr.forEach((chord, i) => {
    chordArr[i] = Note.simplify(chord);
  });

  chordArr = CleanChords(chordArr.join(",")).split(",");
  return chordArr;
}
