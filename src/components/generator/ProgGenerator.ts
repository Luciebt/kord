import { DetermineChordsList } from "../../IProgression";
import { FullChordStringToArray } from "../../utils/NoteUtils";

export function GenerateProg(selectedChord: string, progLength: number) {

    const isSeventhChord = selectedChord.includes("7");
    let [tonic, mode] = FullChordStringToArray(selectedChord);
    if (isSeventhChord) mode = mode.slice(0, -1);

    const newProgList = DetermineChordsList(tonic, mode);
    const newProgArr = newProgList.split("|").filter((prog: string) => {
        return prog.split(",").length == progLength;
    });
}