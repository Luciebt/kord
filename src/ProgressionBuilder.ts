import { transpose } from "@tonaljs/note";
import { fromSemitones } from "@tonaljs/interval";

type TProbability = number | string;
export type TChord = string;

export type TChordBuilder = {
  referenceKey?: string;
  genre?: string;
  index: number;
  interval?: number;
  quality: string;
};

// TODO: Extract data from: http://isophonics.net/content/big-chord-data-extraction-and-mining

const BluesProgs: TChordBuilder[] = [
  { index: 1, quality: "maj" },
  { index: 2, quality: "maj", interval: 5 },
  { index: 3, quality: "maj", interval: 7 },
  { index: 4, quality: "maj", interval: 5 },
];

const FolkProgs: TChordBuilder[] = [
  { index: 1, quality: "maj" },
  { index: 2, quality: "maj", interval: 7 },
  { index: 3, quality: "maj", interval: 5 },
  { index: 4, quality: "maj", interval: 7 },
];

// Define a key/value structure for chord collections
const Collection: Record<TProbability, TChordBuilder[][]> = {
  100: [BluesProgs, FolkProgs],
};

// TODO: introduce probability score. For now, we keep it at 100.

export const FindNextChords = (
  referenceKey: string,
  quality: string,
): string | null => {
  const isMajor = quality === "Major";
  const isMinor = quality === "Minor";

  if (!isMajor && !isMinor) {
    console.warn(`Invalid chord quality: ${quality}`);
    return null;
  }

  // Filter collection to find progressions matching reference chord
  const qualifiedCollections = Collection[100];

  if (!qualifiedCollections || qualifiedCollections.length === 0) {
    console.warn("No chord progressions found.");
    return null;
  }

  // Select a random progression
  const randomIndex = Math.floor(Math.random() * qualifiedCollections.length);
  const selectedProgression = qualifiedCollections[randomIndex];

  if (!selectedProgression || selectedProgression.length < 2) {
    console.warn("Invalid chord progression.");
    return null;
  }

  // Find the next chord in the progression
  const nextChord = selectedProgression[1];
  if (!nextChord.interval) {
    console.warn("Next chord has no defined interval.");
    return null;
  }

  const interval = fromSemitones(nextChord.interval);
  const newNote = transpose(referenceKey, interval);

  return newNote + nextChord.quality;
};

/**
 * Suggests a next chord by transposing from the given reference key.
 */
export const SuggestNextChords = (
  referenceKey: string,
  semitones: number,
  quality: string,
): string => {
  const interval = fromSemitones(semitones);
  const newNote = transpose(referenceKey, interval);
  return newNote + quality;
};
