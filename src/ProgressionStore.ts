import { TProgression, TMode } from "./type.d";

export const ProgressionCollection: Record<TMode, TProgression[]> = {
  Major: [
    { progression_list: "I, I, IV, V", mood: "Happy 🌻" },
    { progression_list: "IV, I, V, VIm", mood: "Happy 🌻" },
    { progression_list: "I, IV, VIm, V", mood: "Happy 🌻" },
    { progression_list: "I, Vm, Vm, IIm", mood: "Happy 🌻" },
    { progression_list: "I, bIII, bVII, IV", mood: "Happy 🌻" },
    { progression_list: "I, IV, V", mood: "Happy 🌻" },
    { progression_list: "I, II, IIIm, V6", mood: "Happy 🌻" },
    { progression_list: "I, IV, bVII, IV", mood: "Happy 🌻" },
    { progression_list: "V, IV, I, V", mood: "Jazzy 🎷" },
    { progression_list: "IIm7, V7, I7", mood: "Jazzy 🎷" },
    { progression_list: "I, V, IV, IVm", mood: "Jazzy 🎷" },
    { progression_list: "I, bVI, V, V", mood: "Hopeful 🌈" },
    { progression_list: "IV, V, VIm, I", mood: "Hopeful 🌈" },
    { progression_list: "I, bIII, bVI, bVII", mood: "Hopeful 🌈" },
    { progression_list: "I, VIm, IIm, V", mood: "Hopeful 🌈" },
    { progression_list: "VIm, V, IV, V", mood: "Hopeful 🌈" },
    { progression_list: "I, VIm, IV, V", mood: "Sad 🌧️" },
    { progression_list: "IIm7, V9, I7, I7", mood: "Sad 🌧️" },
    { progression_list: "I, I, IV, IIIm", mood: "Sad 🌧️" },
    { progression_list: "I, VIm, V, V", mood: "Weird 👾" },
    { progression_list: "IV, IVm, I, I", mood: "Weird 👾" },
    // TODO: Classify those.
    { progression_list: "I, bII, bIII, bII", mood: "Todo" },
    { progression_list: "I, bII, I, IIIm", mood: "Todo" },
    { progression_list: "I, bVII, bVI, bII", mood: "Todo" },
    { progression_list: "I, bVII, IV, I", mood: "Todo" },
    { progression_list: "I, bVI, I, bII", mood: "Todo" },
    { progression_list: "I, IIIm, IV, VIm", mood: "Todo" },
    { progression_list: "I, IIIm, VIm, Isus4", mood: "Todo" },
    { progression_list: "I, IIIm, VIm, IV", mood: "Todo" },
    { progression_list: "I, IV, bIII, bVI", mood: "Todo" },
    { progression_list: "I, IV, IIm, V", mood: "Todo" },
    { progression_list: "I, IV, Isus2, IV", mood: "Todo" },
    { progression_list: "I, IV, V, bVII", mood: "Todo" },
    { progression_list: "I, IV, V, V", mood: "Todo" },
    { progression_list: "I, V, bVII, IV", mood: "Todo" },
    { progression_list: "I, V, I, IV", mood: "Todo" },
    { progression_list: "I, V, IV, VIm", mood: "Todo" },
    { progression_list: "I, V, VIm, IIm", mood: "Todo" },
    { progression_list: "I, V, VIm, IIIm, IV", mood: "Todo" },
    { progression_list: "I, V, VIm, IV", mood: "Todo" },
    { progression_list: "I, V, VIm, V", mood: "Todo" },
    { progression_list: "I, VIm, I, IV", mood: "Todo" },
    { progression_list: "I, VIm, IIm, IV", mood: "Todo" },
    { progression_list: "I, VIm, IV, IIIm", mood: "Todo" },
    { progression_list: "I, VIm, IV, V", mood: "Todo" },
    { progression_list: "IIm, bII, I, bVII", mood: "Todo" },
    { progression_list: "IIm, bVII7, I", mood: "Todo" },
    { progression_list: "IIm, IV, V, V", mood: "Todo" },
    { progression_list: "IIm, V, I, IV", mood: "Todo" },
    { progression_list: "IIIm, VIm, IV, I", mood: "Todo" },
    { progression_list: "IV, I, IIm, VIm", mood: "Todo" },
    { progression_list: "IV, I, IIIm, IV", mood: "Todo" },
    { progression_list: "IV, IV, I, V", mood: "Todo" },
    { progression_list: "IV, VIm, IIIm, I", mood: "Todo" },
    { progression_list: "V, I, VIm, V", mood: "Todo" },
    { progression_list: "V, IV, VIm, I", mood: "Todo" },
    { progression_list: "V, VIm, IV, I", mood: "Todo" },
    { progression_list: "VIm, bVI, bVII, I", mood: "Todo" },
  ],
  Minor: [
    { progression_list: "Im, IV, VI, Vm", mood: "Happy 🌻" },
    { progression_list: "IIm, V, I, I", mood: "Jazzy 🎷" },
    { progression_list: "Im, VII, IV, IV", mood: "Jazzy 🎷" },
    { progression_list: "Im, III, VII, VI", mood: "Hopeful 🌈" },
    { progression_list: "Im, IVm, III, VI", mood: "Hopeful 🌈" },
    { progression_list: "VIm, IIIm, V, IV", mood: "Dark 👻" },
    { progression_list: "Im, IVm, VI, Vm", mood: "Dark 👻" },
    { progression_list: "Im, bVI, Im, Vm", mood: "Dark 👻" },
    { progression_list: "Im, IIm, Vm, Im", mood: "Sad 🌧️" },
    { progression_list: "Im, Vm, IVm, Im", mood: "Sad 🌧️" },
    { progression_list: "VIm, IV, I, V", mood: "Sad 🌧️" },
    { progression_list: "Im, IVm, V7, Im", mood: "Sad 🌧️" },
    { progression_list: "Im, III, VII, VI", mood: "Sad 🌧️" },
    { progression_list: "Im, VI, IVm, Vm", mood: "Sad 🌧️" },
    { progression_list: "VIm, IIIm, V, IV", mood: "Sad 🌧️" },
    { progression_list: "Im, Vm, bVII, IV", mood: "Sad 🌧️" },
    { progression_list: "bIII, IIm, bII, I", mood: "Weird 👾" },
    { progression_list: "Im, III, IVm, VI", mood: "Weird 👾" },
    // TODO: new moods?
    // { progression_list: "Im, VI, III, bII", mood: "Suspensful" },
    // { progression_list: "VII, IVm, VII, Im", mood: "Suspensful" },
    // TODO: Tooooooooodoooooooooooo!
    { progression_list: "Im, IVm, Vm, IVm", mood: "Todo" },
    { progression_list: "Im, IVm, Vm, Vm", mood: "Todo" },
    { progression_list: "Im, IVm, VII, Im", mood: "Todo" },
    { progression_list: "Im, Vm, IVm, VII", mood: "Todo" },
    { progression_list: "Im, VI, bIm, Vm", mood: "Todo" },
    { progression_list: "Im, VI, III, VII", mood: "Todo" },
    { progression_list: "Im, VI, IVm, IIm", mood: "Todo" },
    { progression_list: "Im, VI, IVm, III", mood: "Todo" },
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
  ],
};

const samplesProg = [];

function convertProgForTonal(samples: string[][]): string[] {
  let results: string[] = [];

  samples.forEach((sample) => {
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

  return results;
}
