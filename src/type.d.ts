export type IRoman = {
  rootNote?: string;
  chords_list: string[];
};

// TODO: move types to relevant file
export type TQuality = "Major" | "Minor" | "Mixed";

export type TMood = "All" | "Jazzy" | "Melancholic" | "Energised" | "Pop";

export type TChords =
  | "Major"
  | "Minor"
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
