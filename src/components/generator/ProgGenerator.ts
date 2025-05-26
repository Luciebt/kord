import { DetermineChordsList } from "../../ProgressionLogic";
import { SimplifiedChordNotationConverter } from "../../utils/NoteUtils";

export function GenerateProg(
  selectedChord: string,
  progLength: number = 4,
): string[] {
  // FIXME: doesn't work for 7th, diminished and 7flat5

  const isSeventhChord = selectedChord.includes("7");
  let [tonic, mode] = SimplifiedChordNotationConverter(selectedChord, true);
  const firstNote = tonic + mode;
  if (isSeventhChord) mode = mode.slice(0, -1);

  mode = mode == "" ? "M" : mode;

  const formattedMode = mode === "M" ? "Major" : "Minor";
  const newProgList = DetermineChordsList(tonic, formattedMode);
  let newProgArr = newProgList.split("|").filter((prog: string) => {
    return prog.split(",").length == progLength;
  });

  // Take a random progression from the list, starting with the first entered note.
  newProgArr = newProgArr
    .map((str) => str.replace(/\s/g, ""))
    .filter((str) => str.startsWith(firstNote));
  const randomProg = newProgArr[Math.floor(Math.random() * newProgArr.length)];

  return randomProg.split(",");
}
