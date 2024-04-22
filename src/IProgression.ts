import { ProgressionCollection } from "./ProgressionStore";
import { TProgression } from "./type.d";
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
  progressionCollectionForMode: TProgression[]
): string[] {
  let ProgressionsFound: string[] = [];
  for (const v of Object.values(progressionCollectionForMode)) {
    const ProgList: string = v["progression_list"];
    if (ProgList) {
      ProgressionsFound.push(ProgList);
    }
  }

  return ProgressionsFound;
}

function FindProgListWithoutMood(mode: string): string[] {
  switch (mode) {
    case "Major":
    case "M":
      return FindProgListFromMode(ProgressionCollection.Major);
    case "Minor":
    case "m":
      return FindProgListFromMode(ProgressionCollection.Minor);
    default:
      throw new Error("Unknown Mode");
  }
}

function FindProgListWithMood(mode: string, mood: string): string[] {
  let Progressions: TProgression[] | undefined = undefined;
  let Results: string[] = [];

  switch (mode) {
    case "Major":
      Progressions = ProgressionCollection.Major;
      break;
    case "Minor":
      Progressions = ProgressionCollection.Minor;
      break;
  }

  if (Progressions) {
    for (const v of Object.values(Progressions)) {
      if (v["mood"] == mood) {
        Results.push(v["progression_list"]);
      }
    }
  }

  return Results;
}

function ConvertProgToChords(tonic: string, progArr: string[]): string {
  // Filter progression array from empty elements
  progArr = progArr.filter((e) => e);

  const chordsArr: string[] = progArr.map((prog) => {
    // Build an array with progression nums, separated by commas for tonals js.
    const newList: string[] = prog.split(", ");
    // Convert the progression to actual chords.
    const newProg: string[] = Progression.fromRomanNumerals(tonic, newList);
    return CleanChords(newProg.toString());
  });

  // Build the map
  BuildChordsMap(progArr, chordsArr);

  return chordsArr.join(" | ");
}

//------------ Export function for ProgressionComponent.tsx
export function DetermineChordsList(
  tonic: string,
  mode: string,
  mood?: string
): string {
  if (!tonic || !mode) return "";

  let ProgList: string[] | string | undefined = undefined;

  if (mood == "All" || !mood) {
    ProgList = FindProgListWithoutMood(mode);
  } else if (mood) {
    ProgList = FindProgListWithMood(mode, mood);
  } else {
    return "";
  }

  return ConvertProgToChords(tonic, ProgList);
}
