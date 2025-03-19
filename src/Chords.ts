import { Note, Chord } from "@tonaljs/tonal";
import { PlaySynthChords } from "./audio/Play";
import {
  CleanChords,
  SimplifiedChordNotationConverter,
} from "./utils/NoteUtils";

enum InstrumentType {
  Piano,
  Synth,
}

function PlayMidiNotes(
  chordNotes: string[],
  instrumentType: InstrumentType,
): void {
  switch (instrumentType) {
    case InstrumentType.Synth:
      PlaySynthChords(chordNotes);
      break;
    case InstrumentType.Piano:
      break;
    default:
      break;
  }
}

export function PlayChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);
  if (chordNotes) PlayMidiNotes(chordNotes, InstrumentType.Synth);
}

export function GetSimplifiedChordFromFullChord(
  fullChord: string,
  octave?: number,
): string[] {
  let [homeNote, chordMode] = SimplifiedChordNotationConverter(fullChord, true);

  if (octave) return [chordMode, (homeNote += octave)];
  return [chordMode, homeNote];
}

export function BuildChordNotes(chord: string, octave: number = 3): string[] {
  const [chordMode, homeNote]: string[] = GetSimplifiedChordFromFullChord(
    chord,
    octave,
  );
  let chordNotesArr = Chord.getChord(chordMode, homeNote).notes;

  return chordNotesArr.map(
    (chord) => Note.simplify(chord) && CleanChords(chord),
  );
}
