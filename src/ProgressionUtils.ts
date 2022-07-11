let progMap = new Map();

export function BuildChordsMap(progArr: string[], chordsArr: string[]): void {
  progMap.clear();
  for (let i = 0; i < progArr.length; i++) {
    progMap.set(chordsArr[i], progArr[i]);
  }
}

export function GetRomansForChord(chordsArr: string[]): string[] {
  const romansNumeralFound: string = progMap.get(chordsArr.join(","));
  if (romansNumeralFound) {
    return romansNumeralFound.split(",");
  } else {
    return [];
  }
}
