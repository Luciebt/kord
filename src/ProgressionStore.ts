import { TProgression, TMode } from "./types";
import { TMood } from "./types";

export const MoodLabels: Record<string, TMood> = {
  happy: "Happy 🌻",
  hopeful: "Hopeful 🌈",
  dark: "Dark 👻",
  sad: "Sad 🌧️",
  weird: "Weird 👾",
  suspenseful: "Suspenseful 🎭",
};

const ProgressionCollection: Record<TMode, TProgression[]> = {
  Major: [
    { progression_list: "I, I, IV, V", mood: MoodLabels.happy },
    { progression_list: "IV, I, V, VIm", mood: MoodLabels.happy },
    { progression_list: "I, IV, VIm, V", mood: MoodLabels.happy },
    { progression_list: "I, Vm, Vm, IIm", mood: MoodLabels.happy },
    { progression_list: "I, bIII, bVII, IV", mood: MoodLabels.happy },
    { progression_list: "I, IV, V", mood: MoodLabels.happy },
    { progression_list: "I, II, IIIm, V6", mood: MoodLabels.happy },
    { progression_list: "I, IV, bVII, IV", mood: MoodLabels.happy },
    { progression_list: "V, IV, I, V", mood: MoodLabels.hopeful }, // Strong resolutions, uplifting.
    { progression_list: "IIm7, V7, I7", mood: MoodLabels.suspenseful }, // Classic jazz ii-V-I, creates movement.
    { progression_list: "I, V, IV, IVm", mood: MoodLabels.weird }, // IVm adds an unexpected harmonic twist.
    { progression_list: "I, bVI, V, V", mood: MoodLabels.hopeful },
    { progression_list: "IV, V, VIm, I", mood: MoodLabels.hopeful },
    { progression_list: "I, bIII, bVI, bVII", mood: MoodLabels.hopeful },
    { progression_list: "I, VIm, IIm, V", mood: MoodLabels.hopeful },
    { progression_list: "VIm, V, IV, V", mood: MoodLabels.hopeful },
    { progression_list: "I, VIm, IV, V", mood: MoodLabels.sad },
    { progression_list: "IIm7, V9, I7, I7", mood: MoodLabels.suspenseful },
    { progression_list: "I, I, IV, IIIm", mood: MoodLabels.sad },
    { progression_list: "I, VIm, V, V", mood: MoodLabels.weird },
    { progression_list: "IV, IVm, I, I", mood: MoodLabels.weird },
    { progression_list: "I, bII, bIII, bII", mood: MoodLabels.weird },
    { progression_list: "I, bII, I, IIIm", mood: MoodLabels.suspenseful },
    { progression_list: "I, bVII, bVI, bII", mood: MoodLabels.dark },
    { progression_list: "I, bVII, IV, I", mood: MoodLabels.hopeful },
    { progression_list: "I, bVI, I, bII", mood: MoodLabels.weird },
    { progression_list: "I, IIIm, IV, VIm", mood: MoodLabels.hopeful },
    { progression_list: "I, IV, V, bVII", mood: MoodLabels.suspenseful },
    { progression_list: "I, IV, V, V", mood: MoodLabels.happy },
    { progression_list: "I, V, bVII, IV", mood: MoodLabels.hopeful },
    { progression_list: "I, V, I, IV", mood: MoodLabels.happy },
  ],
  Minor: [
    { progression_list: "Im, IV, VI, Vm", mood: MoodLabels.happy },
    { progression_list: "IIm, V, I, I", mood: MoodLabels.suspenseful }, // Minor ii-V-I creates tension.
    { progression_list: "Im, VII, IV, IV", mood: MoodLabels.hopeful }, // Strong resolutions.
    { progression_list: "Im, III, VII, VI", mood: MoodLabels.hopeful },
    { progression_list: "Im, IVm, III, VI", mood: MoodLabels.hopeful },
    { progression_list: "VIm, IIIm, V, IV", mood: MoodLabels.dark },
    { progression_list: "Im, IVm, VI, Vm", mood: MoodLabels.dark },
    { progression_list: "Im, bVI, Im, Vm", mood: MoodLabels.dark },
    { progression_list: "Im, IIm, Vm, Im", mood: MoodLabels.sad },
    { progression_list: "Im, Vm, IVm, Im", mood: MoodLabels.sad },
    { progression_list: "VIm, IV, I, V", mood: MoodLabels.sad },
    { progression_list: "Im, IVm, V7, Im", mood: MoodLabels.sad },
    { progression_list: "Im, Vm, bVII, IV", mood: MoodLabels.sad },
    { progression_list: "bIII, IIm, bII, I", mood: MoodLabels.weird },
    { progression_list: "Im, III, IVm, VI", mood: MoodLabels.weird },
    { progression_list: "Im, IVm, Vm, IVm", mood: MoodLabels.dark },
    { progression_list: "Im, IVm, Vm, Vm", mood: MoodLabels.dark },
    { progression_list: "Im, IVm, VII, Im", mood: MoodLabels.suspenseful },
    { progression_list: "Im, Vm, IVm, VII", mood: MoodLabels.suspenseful },
    { progression_list: "Im, VI, bIm, Vm", mood: MoodLabels.weird },
    { progression_list: "Im, VI, III, VII", mood: MoodLabels.hopeful },
    { progression_list: "Im, VI, IVm, IIm", mood: MoodLabels.dark },
    { progression_list: "Im, VI, IVm, III", mood: MoodLabels.hopeful },
    { progression_list: "Im, VII, Im, Vm", mood: MoodLabels.suspenseful },
    { progression_list: "Im, VII, VI, III", mood: MoodLabels.hopeful },
    { progression_list: "IIm, Vm, Im, Im", mood: MoodLabels.dark },
    { progression_list: "IIm, Vm, Im, IVm", mood: MoodLabels.sad },
    { progression_list: "IIm7, Vm9, Im7", mood: MoodLabels.suspenseful },
    { progression_list: "IVm, Im, Vm, VI", mood: MoodLabels.hopeful },
    { progression_list: "Vm, Im, IVm, VII", mood: MoodLabels.suspenseful },
    { progression_list: "VI, Im, Vm, Vm", mood: MoodLabels.dark },
    { progression_list: "VI, IVm, Im, Vm", mood: MoodLabels.sad },
    { progression_list: "VI, VI, Im, VII", mood: MoodLabels.suspenseful },
    { progression_list: "VI, VII, Im, III", mood: MoodLabels.hopeful },
  ],
};

// Convert arrays to Maps
const MajorMap = new Map<string, TProgression>(ProgressionCollection.Major.map(prog => [prog.progression_list, prog]));
const MinorMap = new Map<string, TProgression>(ProgressionCollection.Minor.map(prog => [prog.progression_list, prog]));

export const ProgressionCollectionMap: Record<TMode, Map<string, TProgression>> = {
  Major: MajorMap,
  Minor: MinorMap,
};