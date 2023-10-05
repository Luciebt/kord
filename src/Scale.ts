import { Key } from "@tonaljs/tonal";
import { CleanChords } from "./utils/NoteUtils";

// TODO: finish Scale feature. Move this somewhere else.
// NOTE: Why not using key scales?
export function findChordsScale(tonic: string, mode: string): string[] {
  let Results: string[] = [];
  switch (mode) {
    case "Major":
      const majorChords: string = Key.majorKey(tonic).chords.toString();
      Results.push(CleanChords(majorChords));
      break;
    case "Minor":
      const minorChords: string =
        Key.minorKey(tonic).harmonic.chords.toString();
      Results.push(CleanChords(minorChords));
      break;
    default:
      return [];
      break;
  }

  return Results.toString().split(",");
}

export function findNotesScales(tonic: string, mode: string): string {
  switch (mode) {
    case "Major":
      return Key.majorKey(tonic).scale.toString();
      break;
    case "Minor":
      return Key.minorKey(tonic).harmonic.scale.toString();
      break;
    default:
      return "";
      break;
  }
}
