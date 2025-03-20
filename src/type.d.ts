export type TMode = "Major" | "Minor";

export type TMood =
  | "Happy 🌻"
  | "Hopeful 🌈"
  | "Dark 👻"
  | "Sad 🌧️"
  | "Weird 👾"
  | "Suspenseful 🎭";

export type TChords =
  | "Major"
  | "Minor"
  | "Major7"
  | "Minor7"
  | "Dominant7"
  | "Diminished"
  | "Minor7Flat5";

export const majorChordPattern: TInterval[] = ["1P", "3M", "5P"];
export const major7ChordPattern: TInterval[] = ["1P", "3M", "5P", "7M"];
export const minorChordPattern: TInterval[] = ["1P", "3m", "5P"];
export const minor7ChordPattern: TInterval[] = ["1P", "3m", "5P", "7m"];
export const dominant7ChordPattern: TInterval[] = ["1P", "3M", "5P", "7m"];
export const diminishedChordPattern: TInterval[] = ["1P", "3m", "5d"];
export const minor7flat5ChordPattern: TInterval[] = ["1P", "3m", "5d", "7m"];

export type TKey =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export type TInterval =
  | "1P"
  | "2m"
  | "2M"
  | "3m"
  | "3M"
  | "4P"
  | "4A"
  | "5d"
  | "5P"
  | "6m"
  | "6M"
  | "7m"
  | "7M"
  | "8P";

type TProgression = {
  mood?: TMood;
  progression_list: string;
};
