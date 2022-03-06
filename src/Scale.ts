import { Key } from "@tonaljs/tonal";
import { CleanChords, SimplifyNoteToString } from "./NoteUtils";
import { TMinorScaleTypes } from "./type";

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
  }

  return Results.toString().split(",");
}

function findNotesOnMajorScale(tonic: string): string {
  return SimplifyNoteToString(Key.majorKey(tonic).scale.toString());
}

function findNotesOnMinorScale(tonic: string, type: TMinorScaleTypes): string {
  switch (type) {
    case "harmonic":
      return SimplifyNoteToString(Key.minorKey(tonic).harmonic.scale.toString());
    case "natural":
      console.log("natural", Key.minorKey(tonic).natural.scale.toString());
      return SimplifyNoteToString(Key.minorKey(tonic).natural.scale.toString());
    case "melodic":
      return SimplifyNoteToString(Key.minorKey(tonic).melodic.scale.toString());
    default:
      console.log("Error: No minor scale type found");
      return "";
  }
}

export function findNotesScales(tonic: string, mode: string, type: TMinorScaleTypes = "natural"): string {
  switch (mode) {
    case "Major":
      return findNotesOnMajorScale(tonic);
    case "Minor":
      return findNotesOnMinorScale(tonic, type);
    default:
      return "";
  }
}
