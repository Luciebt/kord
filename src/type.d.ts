export type TMode = "Major" | "Minor";

export type TMood =
  | "All"
  | "Jazzy"
  | "Melancholic"
  | "Energised"
  | "Happy"
  | "Sad"
  | "Dark"
  | "Hopeful"
  | "Weird"
  | "Todo";

export type TChords =
  | "maj"
  | "min"
  | "Augmented"
  | "Diminished"
  | "Dominant 7"
  | "Minor 7"
  | "Diminished 7"
  | "Half Diminished";

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
  | "Bb"
  | "B";

type TProgression = {
  mood?: TMood;
  progression_list: string;
};
