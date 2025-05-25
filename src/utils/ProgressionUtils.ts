let progMap = new Map<string, string>();

export function BuildChordsMap(progArr: string[], chordsArr: string[]): void {
  progMap.clear();
  for (let i = 0; i < progArr.length; i++) {
    progMap.set(chordsArr[i], progArr[i]);
  }
}

export function GetRomansForChord(chordsArr: string[]): string[] {
  const chordKey = chordsArr.join(",");
  const romansNumeralFound: string | undefined = progMap.get(chordKey);
  return romansNumeralFound ? romansNumeralFound.split(",") : [];
}
