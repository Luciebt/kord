import { IRoman, TProgression, TQuality, TMood } from "./type.d";
import { Note, Key, Progression, Mode } from "@tonaljs/tonal";

// This  defines a simple Progression interface, which will be passed in as props into a new component.
export default interface IProgression {
  tonic: string;
  quality: string;
  chords_list: string;
  mood?: string;
  genre?: string;
  DetermineChordsList?: any;
}

////////////////////////////////////////////

// TODO: Move this to data folder
const ProgressionCollection: Record<TQuality, TProgression[]> = {
  Major: [
    { progression_list: "I, IV, VIm, V", mood: "Pop" },
    { progression_list: "V, IV, I, V", mood: "Jazzy" },
  ],
  Minor: [
    { progression_list: "Im, Vm, IVm, Im", mood: "Melancholic" },
    { progression_list: "Im, IVm, V7, Im", mood: "Melancholic" },
    { progression_list: "Im, III, VII, VI", mood: "Melancholic" },
  ],
  // TODO: set "Mixed" collections. Those are wrong.
  Mixed: [{ progression_list: "I IV VIm V", mood: "Jazzy" }],
};

function FindProgListFromQuality(
  progressionCollectionForQuality: TProgression[]
): string[] {
  let Results: string[] = [""];

  for (const v of Object.values(progressionCollectionForQuality)) {
    const ProgList: string = v["progression_list"];
    if (ProgList != "") {
      Results.push(v["progression_list"]);
    }
  }

  console.log("FindProgList_Results  " + Results);
  return Results;
}

function FindProgListWithoutMood(quality: string): string[] {
  let Results: string[] = [];

  switch (quality) {
    case "Major":
      return FindProgListFromQuality(ProgressionCollection.Major);
      break;
    case "Minor":
      return FindProgListFromQuality(ProgressionCollection.Minor);
      break;
    case "Mixed":
      return FindProgListFromQuality(ProgressionCollection.Mixed);
      break;
    default:
      console.log("ERROR: No PROG LIST FOUND");
      return ["Oops"];
      break;
  }
  return Results;
}

function FindProgListWithMood(quality: string, mood: string): string[] {
  let Progressions: TProgression[] | undefined = undefined;
  let Results: string[] = [];

  switch (quality) {
    case "Major":
      Progressions = ProgressionCollection.Major;
      break;
    case "Minor":
      Progressions = ProgressionCollection.Minor;
      break;
    case "All":
      Progressions = ProgressionCollection.Mixed;
      break;
    case "Mixed":
      Progressions = ProgressionCollection.Mixed;
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

function ConvertProgToChords(tonic: string, progArr: string[]): string[] {
  let Results: string[] = [];

  progArr = progArr.filter((e) => e);

  progArr.forEach((prog) => {
    const newList: string[] = prog.split(", ");
    const newProg: string[] = Progression.fromRomanNumerals(tonic, newList);
    Results.push(newProg.toString());
  });
  return Results;
}

export function DetermineChordsList(
  tonic: string,
  quality: string,
  mood?: string
): string {
  if (!tonic || !quality) return "";

  let ProgList: string[] | string | undefined = undefined;

  if (!mood) {
    ProgList = FindProgListWithoutMood(quality);
  }
  if (mood) {
    ProgList = FindProgListWithMood(quality, mood);
  }

  if (!ProgList) {
    console.log("NO PROG LIST");
    return "";
  }
  const ChordsList: string[] = ConvertProgToChords(tonic, ProgList);
  return ChordsList.join(" | ");
}

export function findChordsScale(tonic: string, quality: string): any {
  switch (quality) {
    case "Mixed":
      return [];
      break;
    case "Major":
      return Key.majorKey(tonic).chords;
      break;
    case "Minor":
      return Key.minorKey(tonic).natural.chords;
      break;
    default:
      return [];
      break;
  }
}
