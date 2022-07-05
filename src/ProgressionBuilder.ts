import { Note, Interval } from "@tonaljs/tonal";
import { Piano } from "@tonejs/piano";

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
  {
    index: 1,
    quality: "maj",
  },
  {
    index: 2,
    quality: "maj",
    interval: 5,
  },
  {
    index: 3,
    quality: "maj",
    interval: 7,
  },
  {
    index: 4,
    quality: "maj",
    interval: 5,
  },
];

const FolkProgs: TChordBuilder[] = [
  {
    index: 1,
    quality: "maj",
  },
  {
    index: 2,
    quality: "maj",
    interval: 7,
  },
  {
    index: 3,
    quality: "maj",
    interval: 5,
  },
  {
    index: 4,
    quality: "maj",
    interval: 7,
  },
];

// This is a key/value structure, TProbability is the key.
const Collection: Record<TProbability, TChordBuilder[][]> = {
  100: [BluesProgs, FolkProgs],
};

// const NextChordResults: Record<TChord, TChordBuilder[]> = {};

// TODO: introduce probability score. For now, we keep 100.
// returned value should look like: NextChordResults[proba] = chord;
export const FindNextChords = (
  referencekey: string,
  quality: string
): string[] | string => {
  const isMajor: boolean = quality == "Major";
  const isMinor: boolean = quality == "Minor";

  // TODO: filter collection to keep only the reference chord which has the same quality (for now, only maj/min)

  const qualifiedCollections = [Collection[100]][0];

  // Take a random progression with probability 100
  const randomNum = Math.floor(Math.random() * qualifiedCollections.length);
  const highProbaProg = qualifiedCollections[randomNum];

  // find the next chord index 1
  const nextPossibleNote = highProbaProg[1];
  const semitones = nextPossibleNote["interval"] as number;
  const newNoteQuality = nextPossibleNote["quality"] as string;

  // transpose the note
  const interval = Interval.fromSemitones(semitones);
  const newNote = Note.transpose("C", interval);

  // return the new chord
  return newNote + newNoteQuality;
};

const SuggestNextChords = (
  referencekey: string,
  semitones: number,
  quality: string
): string[] | string => {
  const interval: string = Interval.fromSemitones(7);
  const newNote = Note.transpose("C", interval);
  const newChord = newNote + quality;

  return newChord;
};
