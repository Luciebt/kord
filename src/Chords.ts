import { Note, Chord } from "@tonaljs/tonal";
import { detect } from "@tonaljs/chord-detect";
import { PlaySynthChords, polySynth } from "./audio/Synth";
// import { SetupPiano, PlayPianoChords } from "./audio/Piano";
import { CleanChords, SimplifiedChordNotationConverter } from "./NoteUtils";

// TODO: test accuracy of chords / their notes using chord-detect: https://github.com/tonaljs/tonal/tree/main/packages/chord-detect

enum InstrumentType {
  Piano,
  Synth,
}

// TODO: only setup piano if Piano instrument is chosen from the settings panel.
// let PianoInSettings: boolean = false;

// if (PianoInSettings) {
//   SetupPiano();
// }

function PlayMidiNotes(
  chordNotes: string[],
  instrumentType: InstrumentType
): void {
  switch (instrumentType) {
    case InstrumentType.Synth:
      PlaySynthChords(chordNotes);
      break;
    case InstrumentType.Piano:
      const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);
      // PlayPianoChords(midiChordNotes);
      break;
    default:
      break;
  }
}

export function PlayChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);
  if (chordNotes) PlayMidiNotes(chordNotes, InstrumentType.Synth);
}

// To use only for grand piano sound.
function BuildMidiChordNotes(chordNotes: string[]): string[] {
  return chordNotes.map((note) => {
    const NoteFound: any = Note.midi(note);
    if (NoteFound) {
      return NoteFound.toString();
    }
  });
}

export function GetSimplifiedChordFromFullChord(
  fullChord: string,
  octave?: number
): string[] {
  let [homeNote, chordMode] = SimplifiedChordNotationConverter(fullChord, true);

  if (octave) return [chordMode, (homeNote += octave)];
  return [chordMode, homeNote];
}

export function BuildChordNotes(chord: string, octave: number = 3): string[] {
  const [chordMode, homeNote]: string[] = GetSimplifiedChordFromFullChord(
    chord,
    octave
  );
  let chordNotesArr = Chord.getChord(chordMode, homeNote).notes;

  return chordNotesArr.map((chord) => Note.simplify(chord));
}
