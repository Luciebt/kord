let progMap = new Map();

export function BuildChordsMap(progArr: string[], chordsArr: string[]): void {
  progMap.clear();
  for (let i = 0; i < progArr.length; i++) {
    progMap.set(chordsArr[i], progArr[i]);
  }
}

export function GetRomansForChord(chordsArr: string[]): string[] {
  //   for (let value of mp.values()) {
  //     console.log(value);
  //   }

  const romansNumeralFound: string = progMap.get(chordsArr.join(","));
  if (romansNumeralFound) {
    return romansNumeralFound.split(",");
  } else {
    return [];
  }
}

export function PrintMap(mp: Map<string, string> = progMap): void {
  // entry[0] = keys / roman nums
  // entry[1] = values / chords
  for (let entry of mp.entries()) {
    console.log(entry[0], entry[1]); //"Lokesh" 37 "Raj" 35 "John" 40
  }
}
