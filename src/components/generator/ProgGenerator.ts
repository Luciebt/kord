import { DetermineChordsList } from "../../IProgression";
import { FullChordStringToArray } from "../../NoteUtils";

export function GenerateProg(selectedChord: string, progLength: number) {

    const isSeventhChord = selectedChord.includes("7");
    let [tonic, mode] = FullChordStringToArray(selectedChord);
    if (isSeventhChord) mode = mode.slice(0, -1);

    const newProgList = DetermineChordsList(tonic, mode);
    const newProgArr = newProgList.split("|").filter((prog: string) => {
        return prog.split(",").length == progLength;
    });

    // console.log("Generate prog, key__mode__length", selectedChord, length);
    // console.log("Generate prog, newProgList", newProgList);
    console.log("Generate prog, newProgArr", newProgArr);
}