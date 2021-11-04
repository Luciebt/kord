import { TProgression, TMode } from "./type.d";

export const ProgressionCollection: Record<TMode, TProgression[]> = {
  Major: [
    { progression_list: "IV, V, VIm, I", mood: "Hopeful" },
    { progression_list: "I, IV, VIm, V", mood: "Happy" },
    { progression_list: "I, Vm, Vm, IIm", mood: "Happy" },
    { progression_list: "I, IV, V", mood: "Happy" },
    { progression_list: "V, IV, I, V", mood: "Jazzy" },
    { progression_list: "IIm7, V7, I7", mood: "Jazzy" },
    { progression_list: "I, VIm, IV, V", mood: "Melancholic" },
    { progression_list: "I, VIm, V, V", mood: "Weird" },
  ],
  Minor: [
    { progression_list: "Im, IV, VI, Vm", mood: "Happy" },
    { progression_list: "Im, Vm, IVm, Im", mood: "Sad" },
    { progression_list: "VIm, IV, I, V", mood: "Sad" },
    { progression_list: "Im, IVm, V7, Im", mood: "Sad" },
    { progression_list: "Im, III, VII, VI", mood: "Sad" },
    { progression_list: "VIm, IIIm, V, IV", mood: "Dark" },
    { progression_list: "Im, VII, IV, IV", mood: "Jazzy" },
    { progression_list: "Im, IIm, Vm, Im", mood: "Todo" },
    { progression_list: "Im, III, IVm, VI", mood: "Todo" },
    { progression_list: "Im, III, VII, VI", mood: "Todo" },
    { progression_list: "Im, IVm, III, VI", mood: "Todo" },
    { progression_list: "Im, IVm, Vm, IVm", mood: "Todo" },
    { progression_list: "Im, IVm, Vm, Vm", mood: "Todo" },
    { progression_list: "Im, IVm, VI, Vm", mood: "Todo" },
    { progression_list: "Im, IVm, VII, Im", mood: "Todo" },
    { progression_list: "Im, Vm, IVm, VII", mood: "Todo" },
    { progression_list: "Im, VI, bIm, Vm", mood: "Todo" },
    { progression_list: "Im, VI, III, bIIm", mood: "Todo" },
    { progression_list: "Im, VI, III, VII", mood: "Todo" },
    { progression_list: "Im, VI, IVm, IIm", mood: "Todo" },
    { progression_list: "Im, VI, IVm, III", mood: "Todo" },
    { progression_list: "Im, VI, IVm, Vm", mood: "Todo" },
    { progression_list: "Im, VI, VII, Vm", mood: "Todo" },
    { progression_list: "Im, VI, VII, VII", mood: "Todo" },
    { progression_list: "Im, VII, Im, Vm", mood: "Todo" },
    { progression_list: "Im, VII, VI, III", mood: "Todo" },
    { progression_list: "Im, VII, VI, VII", mood: "Todo" },
    { progression_list: "IIm, Vm, Im, Im", mood: "Todo" },
    { progression_list: "IIm, Vm, Im, IVm", mood: "Todo" },
    { progression_list: "IIm, VI, Im, IVm", mood: "Todo" },
    { progression_list: "IIm7, Vm9, Im7", mood: "Todo" },
    { progression_list: "IVm, Im, Vm, VI", mood: "Todo" },
    { progression_list: "IVm, III, VII, Im", mood: "Todo" },
    { progression_list: "IVm, Vm, VI, VII", mood: "Todo" },
    { progression_list: "IVm, VI, VII, Im", mood: "Todo" },
    { progression_list: "Vm, Im, IVm, VII", mood: "Todo" },
    { progression_list: "Vm, IVm, Im, Im", mood: "Todo" },
    { progression_list: "Vm, VI, III, Im", mood: "Todo" },
    { progression_list: "Vm, VI, Vm, Im", mood: "Todo" },
    { progression_list: "VI, bVI, Im, VII", mood: "Todo" },
    { progression_list: "VI, Im, Vm, III", mood: "Todo" },
    { progression_list: "VI, Im, Vm, Vm", mood: "Todo" },
    { progression_list: "VI, IVm, Im, Vm", mood: "Todo" },
    { progression_list: "VI, VI, Im, VII", mood: "Todo" },
    { progression_list: "VI, VII, Im, III", mood: "Todo" },
    { progression_list: "VI, VII, Vm, III", mood: "Todo" },
    { progression_list: "VI, VIm, Im, VII", mood: "Todo" },
    { progression_list: "VII, IVm, Vm, Im", mood: "Todo" },
    { progression_list: "VII, IVm, VII, Im", mood: "Todo" },
  ],
};

// TODO: add these major progressions.
const samplesProg = [
  ['bIIIM', 'ii', 'bIIM', 'I'],
  ['I', 'bIIIM', 'bVIIM', 'IV'],
  ['I', 'bIIIM', 'bVIM', 'bVIIM'],
  ['I', 'bIIM', 'bIIIM', 'bIIM'],
  ['I', 'bIIM', 'I', 'iii'],
  ['I', 'bVIIM', 'bVIM', 'bIIM'],
  ['I', 'bVIIM', 'IV', 'I'],
  ['I', 'bVIM', 'I', 'bIIM'],
  ['I', 'I', 'IV', 'iii'],
  ['I', 'iii', 'IV', 'vi'],
  ['I', 'iii', 'vi', 'Isus4'],
  ['I', 'iii', 'vi', 'IV'],
  ['I', 'IIM', 'iii', 'V6'],
  ['I', 'IV', 'bIIIM', 'bVIM'],
  ['I', 'IV', 'bVIIM', 'IV'],
  ['I', 'IV', 'ii', 'V'],
  ['I', 'IV', 'Isus2', 'IV'],
  ['I', 'IV', 'V', 'bVIIM'],
  ['I', 'IV', 'V', 'V'],
  ['I', 'IV', 'vi', 'V'],
  ['I', 'V', 'bVIIM', 'IV'],
  ['I', 'V', 'I', 'IV'],
  ['I', 'V', 'IV', 'vi'],
  ['I', 'V', 'vi', 'ii'],
  ['I', 'V', 'vi', 'iii', 'IV'],
  ['I', 'V', 'vi', 'IV'],
  ['I', 'V', 'vi', 'V'],
  ['I', 'vi', 'I', 'IV'],
  ['I', 'vi', 'ii', 'IV'],
  ['I', 'vi', 'ii', 'V'],
  ['I', 'vi', 'IV', 'iii'],
  ['I', 'vi', 'IV', 'V'],
  ['ii', 'bIIM', 'I', 'bVIIM'],
  ['ii', 'bVIIM7', 'I'],
  ['ii', 'IV', 'V', 'V'],
  ['ii', 'V', 'I', 'I'],
  ['ii', 'V', 'I', 'IV'],
  ['ii7', 'V9', 'I7', 'I7'],
  ['iii', 'vi', 'IV', 'I'],
  ['IV', 'I', 'ii', 'vi'],
  ['IV', 'I', 'iii', 'IV'],
  ['IV', 'I', 'V', 'vi'],
  ['IV', 'IV', 'I', 'V'],
  ['IV', 'vi', 'iii', 'I'],
  ['V', 'I', 'vi', 'V'],
  ['V', 'IV', 'vi', 'I'],
  ['V', 'vi', 'IV', 'I'],
  ['vi', 'bVIM', 'bVIIM', 'I'],
  ['vi', 'IV', 'I', 'V'],
  ['vi', 'V', 'IV', 'V'],
]

function convertProgForTonal(samples: string[][]): string[] {
  let results: string[] = [];

  samples.forEach((sample, index) => {
    let progression = sample.toString();
    progression = progression.replace(/i/g, "Im");
    progression = progression.replace(/ii/g, "IIm");
    progression = progression.replace(/iii/g, "IIIm");
    progression = progression.replace(/iv/g, "IVm");
    progression = progression.replace(/v/g, "Vm");
    progression = progression.replace(/vi/g, "VIm");
    progression = progression.replace(/vii/g, "VIIm");
    results.push(progression);
  });

  // console.log(results);

  return results;
}

convertProgForTonal(samplesProg);