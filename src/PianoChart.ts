import { BuildChordNotes } from "./Chords";

export function ShowChord(chord: string): string[] {
  if (!chord) return [];

  return BuildChordNotes(chord);
}
