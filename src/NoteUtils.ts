//--------- NOTE UTILS

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

    chordStr = ReturnSharpFromFlatNotes(chordStr);

    return chordStr;
}