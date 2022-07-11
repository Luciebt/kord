//--------- NOTE UTILS

export function FullChordStringToArray(fullChord: string): string[] {
  let key: string = fullChord[0];
  let quality: string = "";
  let chordArr: string[] = fullChord.split("#");

  if (chordArr.length == 2) {
    key += "#";
    quality = chordArr[1];
  } else {
    quality = chordArr[0].slice(1);
  }

  return [key, quality];
}

export function SimplifiedChordNotationConverter(
  fullChord: string,
  toSimpleNotation: boolean
): string[] {
  let cleanChord = CleanChords(fullChord);

  if (toSimpleNotation) {
    let homeNote: string = cleanChord[0];
    let chordMode: string = cleanChord.slice(1);
    const isSeventh: boolean = cleanChord.slice(-1) == "7";
    const isNinth: boolean = cleanChord.slice(-1) == "9";

    if (cleanChord[1] == "#") {
      homeNote += "#";
      chordMode = cleanChord.slice(2);
    }

    if (chordMode.includes("Minor")) {
      chordMode = chordMode.includes("Minor7Flat5") ? "m7b5" : "m";
    } else if (chordMode.includes("Major")) {
      chordMode = "";
    } else if (chordMode.includes("Diminished")) {
      chordMode = "dim";
    }

    if (isSeventh && !chordMode.includes("7")) {
      chordMode += "7";
    } else if (isNinth && !chordMode.includes("9")) {
      chordMode += "9";
    }

    return [homeNote, chordMode];
  } else {
    return [];
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

  chordStr = ReturnSharpFromFlatNotes(chordStr);

  return chordStr;
}
