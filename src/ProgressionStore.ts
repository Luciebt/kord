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
  ],
};
