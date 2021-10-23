import { ProgressionCollection } from "./ProgressionStore";
import { TProgression, TMode, TMood } from "./type.d";
import { Progression } from "@tonaljs/tonal";

export default interface IProgression {
  tonic: string;
  mode: string;
  chords_list: string;
  mood?: string;
  genre?: string;
  DetermineChordsList?: any;
}

//--------- NOTE UTILS

function ReturnSharpFromFlatNotes(chord: string): string {
  if (chord.includes("b")) {
    chord = chord.replaceAll(/Db/g, "C#");
    chord = chord.replaceAll(/Eb/g, "D#");
    chord = chord.replaceAll(/Gb/g, "F#");
    chord = chord.replaceAll(/Ab/g, "G#");
    chord = chord.replaceAll(/Bb/g, "A#");
  }

  return chord;
}

export function CleanChords(chordStr: string): string {
  if (chordStr.includes("E#")) {
    chordStr = chordStr.replaceAll("E#", "F");
  }

  if (chordStr.includes("B#")) {
    chordStr = chordStr.replaceAll("B#", "C");
  }

  if (chordStr.includes("##")) {
    chordStr = chordStr.replaceAll("C##", "D");
    chordStr = chordStr.replaceAll("D##", "E");
    chordStr = chordStr.replaceAll("F##", "G");
    chordStr = chordStr.replaceAll("G##", "A");
    chordStr = chordStr.replaceAll("A##", "B");
  }

  chordStr = ReturnSharpFromFlatNotes(chordStr);

  return chordStr;
}

//------- Find progressions helpers

function FindProgListFromMode(
  progressionCollectionForMode: TProgression[]
): string[] {
  let Results: string[] = [""];

  for (const v of Object.values(progressionCollectionForMode)) {
    const ProgList: string = v["progression_list"];
    if (ProgList != "") {
      Results.push(v["progression_list"]);
    }
  }

  return Results;
}

function FindProgListWithoutMood(mode: string): string[] {
  let Results: string[] = [];

  switch (mode) {
    case "Major":
      return FindProgListFromMode(ProgressionCollection.Major);
      break;
    case "Minor":
      return FindProgListFromMode(ProgressionCollection.Minor);
      break;
    case "Mixed":
      return FindProgListFromMode(ProgressionCollection.Mixed);
      break;
    default:
      // TODO: Error handling
      return ["Oops"];
      break;
  }
  return Results;
}

function FindProgListWithMood(mode: string, mood: string): string[] {
  if (mood == "All") {
    return FindProgListWithoutMood(mode);
  }

  let Progressions: TProgression[] | undefined = undefined;
  let Results: string[] = [];

  switch (mode) {
    case "Major":
      Progressions = ProgressionCollection.Major;
      break;
    case "Minor":
      Progressions = ProgressionCollection.Minor;
      break;
    case "Mixed":
      Progressions = ProgressionCollection.Mixed;
      break;
  }

  // TODO: find a better way to deal with mood filtering.
  if (Progressions) {
    for (const v of Object.values(Progressions)) {
      if (v["mood"] == mood) {
        Results.push(v["progression_list"]);
      }
    }
  }

  return Results;
}

function ConvertProgToChords(tonic: string, progArr: string[]): string[] {
  let Results: string[] = [];

  // Filter progression array from empty elements
  progArr = progArr.filter((e) => e);

  progArr.forEach((prog) => {
    // Build an array with progression nums, separated by commas for tonals js.
    const newList: string[] = prog.split(", ");
    // Convert the progression to actual chords.
    const newProg: string[] = Progression.fromRomanNumerals(tonic, newList);
    Results.push(newProg.toString());
  });
  return Results;
}

//------------ Export function for ProgressionComponent.tsx
export function DetermineChordsList(
  tonic: string,
  mode: string,
  mood?: string
): string {
  if (!tonic || !mode) return "";

  let ProgList: string[] | string | undefined = undefined;

  if (!mood) {
    ProgList = FindProgListWithoutMood(mode);
  } else if (mood) {
    ProgList = FindProgListWithMood(mode, mood);
  }

  if (!ProgList) {
    return "";
  }

  const ChordsList: string[] = ConvertProgToChords(tonic, ProgList);
  const ChordsStr: string = ChordsList.join(" | ");

  return CleanChords(ChordsStr);
}
