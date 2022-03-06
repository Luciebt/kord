//--------- NOTE UTILS

import { Note } from "@tonaljs/tonal";

export function SimplifyNoteToString(note: string | string[]): string {
    if (typeof note === "string") {
        if (!note.includes(",")) {
            console.log("note is string: ", Note.simplify(note));
            return Note.simplify(note);
        }
        else {
            return note.split(',').map(note => Note.simplify(note)).join(",");
        }
    } else {
        console.log("note is arr: ", note.map(note => Note.simplify(note)).join(","));
        return note.map(note => Note.simplify(note)).join(",");
    }
}

function ReturnSharpFromFlatNotes(chord: string): string {
    if (chord.includes("b")) {
        chord = chord.replaceAll(/Db/g, "C#");
        chord = chord.replaceAll(/Eb/g, "D#");
        chord = chord.replaceAll(/Gb/g, "F#");
        chord = chord.replaceAll(/Ab/g, "G#");
        chord = chord.replaceAll(/Bb/g, "A#");
    }

    return chord;
}

export function CleanChords(chordStr: string): string {
    if (chordStr.includes("E#")) {
        chordStr = chordStr.replaceAll("E#", "F");
    }

    if (chordStr.includes("B#")) {
        chordStr = chordStr.replaceAll("B#", "C");
    }

    if (chordStr.includes("##")) {
        chordStr = chordStr.replaceAll("C##", "D");
        chordStr = chordStr.replaceAll("D##", "E");
        chordStr = chordStr.replaceAll("F##", "G");
        chordStr = chordStr.replaceAll("G##", "A");
        chordStr = chordStr.replaceAll("A##", "B");
    }

    return ReturnSharpFromFlatNotes(chordStr);
}