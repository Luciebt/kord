export type TQuality = "Major" | "Minor" | "Mixed";

export type TMood =
  | "All"
  | "Jazzy"
  | "Melancholic"
  | "Energised"
  | "Happy"
  | "Sad"
  | "Dark"
  | "Hopeful"
  | "Weird";

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

export type TProgression = {
  mood?: TMood;
  progression_list: string;
};
