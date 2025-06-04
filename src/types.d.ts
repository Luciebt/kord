export type TMode = "Major" | "Minor" | "Dorian" | "Mixolydian" | "Phrygian" | "Lydian" | "Locrian";

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

export type Chord = {
  id: string; // A unique identifier for the chord
  name: string; // The full name of the chord (e.g., "Cmaj7", "Dm")
  romanNumeral: string; // The Roman numeral for the chord's position in the scale (e.g., "I", "ii")
  root: string; // The root note of the chord (e.g., "C", "D")
  quality: string; // The quality of the chord (e.g., "Major", "Minor 7th", "Diminished")
  degree: number; // The scale degree (1-7)
  progressionId?: number; // Optional: To link to a specific progression later
};

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
