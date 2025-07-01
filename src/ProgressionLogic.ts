import { ProgressionCollectionMap } from "./ProgressionStore";
import { TProgression } from "./types";
import { Progression } from "@tonaljs/tonal";
import { CleanChords } from "./utils/NoteUtils";
import { BuildChordsMap } from "./utils/ProgressionUtils";

export default interface IProgression {
  tonic: string;
  mode: string;
  chordsList: string;
  mood?: string;
  genre?: string;
  DetermineChordsList?: any;
}

//------- Find progressions helpers

function FindProgListFromMode(
  progressionCollectionForMode: Map<string, TProgression>,
  mood?: string
): string[] {
  const results: string[] = [];

  for (const [progressionList, progression] of progressionCollectionForMode) {
    if (!mood || progression.mood === mood) {
      results.push(progressionList);
    }
  }

  return results;
}

function FindProgList(mode: string, mood?: string): string[] {
  switch (mode) {
    case "Major":
    case "M":
      return FindProgListFromMode(ProgressionCollectionMap.Major, mood);
    case "Minor":
    case "m":
      return FindProgListFromMode(ProgressionCollectionMap.Minor, mood);
    default:
      throw new Error("Unknown Mode");
  }
}

function ConvertProgToChords(tonic: string, progArr: string[]): string {
  // Filter and map in a single pass
  const chordsArr: string[] = progArr.reduce((acc, prog) => {
    if (!prog) return acc; // Skip empty elements

    // Convert the progression to actual chords
    const newProg = Progression.fromRomanNumerals(tonic, prog.split(", "));
    const cleanedChords = CleanChords(newProg.join(","));
    
    acc.push(cleanedChords);
    return acc;
  }, [] as string[]);

  // Build the map
  BuildChordsMap(progArr.filter(Boolean), chordsArr); // Ensure only non-empty progArr is passed

  return chordsArr.join(" | ");
}

//------------ Export function for ProgressionComponent.tsx
export function DetermineChordsList(
  tonic: string,
  mode: string,
  mood?: string,
): string {
  if (!tonic || !mode) return "";

  const ProgList = FindProgList(mode, mood);

  return ConvertProgToChords(tonic, ProgList);
}

// Export for testing only
export { FindProgList, FindProgListFromMode, ConvertProgToChords } 