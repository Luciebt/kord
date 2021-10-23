import { Key } from "@tonaljs/tonal";
import { CleanChords } from "./IProgression";

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
      // TODO: not only natural scales.
      const minorChords: string = Key.minorKey(tonic).natural.chords.toString();
      Results.push(CleanChords(minorChords));
      break;
    default:
      return [];
      break;
  }

  return Results.toString().split(",");
}
