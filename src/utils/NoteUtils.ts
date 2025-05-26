//--------- NOTE UTILS
export function SimplifiedChordNotationConverter(
  fullChord: string,
  toSimpleNotation: boolean
): string[] {
  if (!toSimpleNotation) return []; // TODO 

  let cleanChord = CleanChords(fullChord);
  let [homeNote, chordMode] = [cleanChord[0], cleanChord.slice(1)];
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
}

export function CleanChords(chordStr: string): string {
  if (!chordStr) return "";

  const replacements: Record<string, string> = {
    // Replace double sharps
    "E#": "F",
    "B#": "C",
    "C##": "D",
    "D##": "E",
    "F##": "G",
    "G##": "A",
    "A##": "B",
    // Replace flats to sharp
    "Db": "C#",
    "Eb": "D#",
    "Gb": "F#",
    "Ab": "G#",
    "Bb": "A#",
  };

  chordStr = chordStr.replace(/E#|B#|C##|D##|F##|G##|A##|Db|Eb|Gb|Ab|Bb/g, (match) => replacements[match]);

  return chordStr;
}


