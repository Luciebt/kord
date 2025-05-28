import { get as getNote, simplify as simplifyNote } from "@tonaljs/note";
import { getChord } from "@tonaljs/chord";
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

const chordCache: Record<string, string[]> = {};

export function PlayChord(chord: string) {
  if (chordCache[chord]) {
    PlayMidiNotes(chordCache[chord], InstrumentType.Synth);
    return;
  }

  const chordNotes = BuildChordNotes(chord);
  chordCache[chord] = chordNotes; // Cache the result
  PlayMidiNotes(chordNotes, InstrumentType.Synth);
}

export function GetSimplifiedChordFromFullChord(
  fullChord: string,
  octave?: number,
): string[] {
  const [homeNote, chordMode] = SimplifiedChordNotationConverter(fullChord, true);
  const noteWithOctave = octave ? `${homeNote}${octave}` : homeNote;
  return [chordMode, noteWithOctave];
}

export function BuildChordNotes(chord: string, octave: number = 3): string[] {
  const [chordMode, homeNote] = GetSimplifiedChordFromFullChord(chord, octave);
  const chordNotesArr = getChord(chordMode, homeNote).notes;

  return chordNotesArr
    .map(chord => CleanChords(simplifyNote(chord)))
    .filter(Boolean); // Filter out any undefined or null values
}
