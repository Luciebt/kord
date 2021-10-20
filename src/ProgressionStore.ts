import { TProgression, TQuality, TMood } from "./type.d";

export const ProgressionCollection: Record<TQuality, TProgression[]> = {
  Major: [
    { progression_list: "I, IV, VIm, V", mood: "Pop" },
    { progression_list: "I, Vm, Vm, IIm", mood: "Pop" },
    { progression_list: "V, IV, I, V", mood: "Jazzy" },
    { progression_list: "IIm7, V7, I7", mood: "Jazzy" },
    { progression_list: "I, VIm, IV, V", mood: "Melancholic" },
  ],
  Minor: [
    { progression_list: "Im, Vm, IVm, Im", mood: "Melancholic" },
    { progression_list: "Im, IVm, V7, Im", mood: "Melancholic" },
    { progression_list: "Im, III, VII, VI", mood: "Melancholic" },
    { progression_list: "Im, VII, IV, IV", mood: "Jazzy" },
  ],
  // TODO: set "Mixed" collections. Those are wrong.
  Mixed: [{ progression_list: "I IV VIm V", mood: "Jazzy" }],
};
