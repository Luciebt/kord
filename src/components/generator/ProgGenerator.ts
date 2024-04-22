import { DetermineChordsList } from "../../IProgression";
import { SimplifiedChordNotationConverter } from "../../utils/NoteUtils";

export function GenerateProg(selectedChord: string, progLength: number = 4): string[] {
  // TODO: doesn't work for 7th, diminished and 7flat5
  console.log("generateProg --->>> selectedChord", selectedChord);

  const isSeventhChord = selectedChord.includes("7");
  let [tonic, mode] = SimplifiedChordNotationConverter(selectedChord, true);
  const firstNote = tonic + mode
  if (isSeventhChord) mode = mode.slice(0, -1);

  // If "mode" is empty, it means we're in major
  mode = mode == "" ? "M" : mode;

  console.log("generateProg --->>> tonic, mode", tonic + mode);
  const newProgList = DetermineChordsList(tonic, mode);
  let newProgArr = newProgList.split("|").filter((prog: string) => {
    return prog.split(",").length == progLength;
  });

  // Take a random progression from the list, starting with the first entered note.
  newProgArr = newProgArr.map(str => str.replace(/\s/g, "")).filter(str => str.startsWith(firstNote));
  const randomProg = newProgArr[Math.floor(Math.random() * newProgArr.length)];

  console.log("generateProg --->>> randomProg ", randomProg);

  return randomProg.split(',');
}
