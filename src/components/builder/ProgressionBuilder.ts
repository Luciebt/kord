import { TKey, TMode } from "../../types";

export const modes: TMode[] = [
  "Major",
  "Minor",
  "Dorian",
  "Mixolydian",
  "Phrygian",
  "Lydian",
  "Locrian",
];

export const keys: TKey[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const chordPatterns = {
  major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  minor: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  /**
   * Dorian Mode (Major scale starting on the 2nd degree)
   * Sound/Mood: Jazzy, bluesy, reflective, slightly melancholic with a hint of brightness.
   */
  dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],

  /**
   * Mixolydian Mode (Major scale starting on the 5th degree)
   * Sound/Mood: Bluesy, folky, rock, dominant, resolved but not "final" like major.
   */

  mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],

  /**
   * Ionian Mode (Major Scale)
   * Sound/Mood: Bright, happy, stable, triumphant.
   */
  ionian: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],

  /**
   * Phrygian Mode (Major scale starting on the 3rd degree)
   * Sound/Mood: Dark, exotic, Spanish/Middle Eastern, tense.
   */
  phrygian: ['i', 'II', 'iii', 'iv', 'v°', 'VI', 'vii'],

  /**
   * Lydian Mode (Major scale starting on the 4th degree)
   * Sound/Mood: Dreamy, ethereal, majestic, expansive, sometimes unsettling but beautiful.
   */
  lydian: ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'],

  /**
   * Aeolian Mode (Natural Minor Scale - Major scale starting on the 6th degree)
   * Sound/Mood: Sad, melancholic, serious.
   */
  aeolian: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],

  /**
   * Locrian Mode (Major scale starting on the 7th degree)
   * Sound/Mood: Very dissonant, unstable, tense, often avoided in common harmony.
   */
  locrian: ['i°', 'II', 'iii', 'iv°', 'V', 'VI', 'vii'],
};