import { TProgression, TQuality, TMood } from "./type.d";
import { Note, Midi, Chord } from "@tonaljs/tonal";
import { AddOctaveToNoteIfNeeded } from "./IPianoChart";
import { PlaySynthChords } from "./audio/Synth";
import { SetupPiano, PlayPianoChords } from "./audio/Piano";

function PlayMidiNotes(chordNotes: string[]): void {
  // TODO: create a choice between synth and piano sounds.
  // TODO: create audio sampler to give piano keys mp3.
  // TODO: allow not to play sound. Use React context for preference for audio sounds and on/off?

  // SYNTH SOUND
  AddOctaveToNoteIfNeeded(chordNotes, true);
  PlaySynthChords(chordNotes);

  // PIANO SOUND. Needs MIDI
  // const midiChordNotes: string[] = BuildMidiChordNotes(chordNotes);
  // SetupPiano();
  // PlayPianoChords(midiChordNotes);
}

/////// Flow:
// PlayChord
// BuildChordNotes
// ChordsArrayGenerator --> [chordType, homeNote]
// Chord.getChord(chordType, homeNote).notes --> string[]
// PlayMidiNotes
// BuildMidiChordNotes(chordNotes)

export function PlayChord(chord: string) {
  const chordNotes: string[] = BuildChordNotes(chord);

  PlayMidiNotes(chordNotes);
}

function BuildMidiChordNotes(chordNotes: string[]): string[] {
  AddOctaveToNoteIfNeeded(chordNotes, true);

  // console.log("chordNotes going to BuildMidi__" + chordNotes);
  let Results: string[] = [];
  chordNotes.forEach((note) => {
    const NoteFound: any = Note.midi(note);
    if (NoteFound) {
      Results.push(NoteFound.toString());
    }
  });
  console.log("BuildMidiChordNotes_RESULTS___" + Results);
  return Results;
}

// From D#m I want: ["m", "D#"]
// From D# I want: ["M", "D#"]
// From D I want: ["M", "D"]

// home note = D, D# or Db
// quality = m, M, 7, m7, sus...

// TODO: improve this function
function ChordsArrayGenerator(chord: string): string[] {
  let homeNote: string = chord[0];
  let chordType: string = "";

  switch (chord[1]) {
    case "b":
      homeNote += "b";
      break;
    case "#":
      homeNote += "#";
      break;
    default:
      break;
  }

  // FIXME: This doesn't work. Need to replace then the ##. But this should be done before in IProgression.ts which has the responsibility of cleaning chords now.
  // const newChord = Note.transpose(chord, "2M").replace("##", "");
  // if (chord[1] == "#" && chord[2] == "#") {
  //   homeNote = Note.transpose(homeNote, "2M");
  // }

  // TODO: Add diminished and augmented chords. Incl. 7.
  // FIXME: this is ugly AF.
  if (chord.includes("m")) {
    chordType = "m";
    if (chord.includes("7")) {
      chordType = "m7";
    }
  } else if (chord.includes("7")) {
    chordType = "7";
  } else if (chord.includes("sus")) {
    chordType = "sus";
  } else if (chord.includes("d")) {
    chordType = "d";
  } else if (chord.includes("dim7")) {
    chordType = "dim7";
  } else {
    chordType = "M";
  }

  return [chordType, homeNote];
}

function ReturnSharpFromFlatNotes(chord: string[]): string[] {
  let notesList = chord.join(",");
  if (notesList.includes("E#")) {
    notesList = notesList.replace(/E#/g, "F");
  }
  if (notesList.includes("b")) {
    notesList = notesList.replace(/Db/g, "C#");
    notesList = notesList.replace(/Eb/g, "D#");
    notesList = notesList.replace(/Gb/g, "F#");
    notesList = notesList.replace(/Ab/g, "G#");
    notesList = notesList.replace(/Bb/g, "A#");
  }

  return notesList.split(",");
}

export function BuildChordNotes(chord: string): string[] {
  const [chordType, homeNote]: string[] = ChordsArrayGenerator(chord);
  // console.log("chordAfterGenerator___" + [chordType, homeNote]);

  let chordArr: string[] = Chord.getChord(chordType, homeNote).notes;

  // Use Simplify helper to avoid F## notations, which we cannot read to display chords visually using the piano chart.
  chordArr.forEach((chord, i) => {
    chordArr[i] = Note.simplify(chord);
  });

  console.log(chordArr);
  // Get rid of flat notes to only keep sharps. A simplification to display chords visually.
  chordArr = ReturnSharpFromFlatNotes(chordArr);

  return chordArr;
}
