import { TProgression, TMode } from "./type.d";
import { TMood } from "./type.d";

const MoodLabels: Record<string, TMood> = {
  happy: "Happy 🌻",
  jazzy: "Jazzy 🎷",
  hopeful: "Hopeful 🌈",
  dark: "Dark 👻",
  sad: "Sad 🌧️",
  weird: "Weird 👾",
  suspenseful: "Suspenseful 🎭",
};

export const ProgressionCollection: Record<TMode, TProgression[]> = {
  Major: [
    { progression_list: "I, I, IV, V", mood: MoodLabels.happy },
    { progression_list: "IV, I, V, VIm", mood: MoodLabels.happy },
    { progression_list: "I, IV, VIm, V", mood: MoodLabels.happy },
    { progression_list: "I, Vm, Vm, IIm", mood: MoodLabels.happy },
    { progression_list: "I, bIII, bVII, IV", mood: MoodLabels.happy },
    { progression_list: "I, IV, V", mood: MoodLabels.happy },
    { progression_list: "I, II, IIIm, V6", mood: MoodLabels.happy },
    { progression_list: "I, IV, bVII, IV", mood: MoodLabels.happy },
    { progression_list: "V, IV, I, V", mood: MoodLabels.jazzy },
    { progression_list: "IIm7, V7, I7", mood: MoodLabels.jazzy },
    { progression_list: "I, V, IV, IVm", mood: MoodLabels.jazzy },
    { progression_list: "I, bVI, V, V", mood: MoodLabels.hopeful },
    { progression_list: "IV, V, VIm, I", mood: MoodLabels.hopeful },
    { progression_list: "I, bIII, bVI, bVII", mood: MoodLabels.hopeful },
    { progression_list: "I, VIm, IIm, V", mood: MoodLabels.hopeful },
    { progression_list: "VIm, V, IV, V", mood: MoodLabels.hopeful },
    { progression_list: "I, VIm, IV, V", mood: MoodLabels.sad },
    { progression_list: "IIm7, V9, I7, I7", mood: MoodLabels.sad },
    { progression_list: "I, I, IV, IIIm", mood: MoodLabels.sad },
    { progression_list: "I, VIm, V, V", mood: MoodLabels.weird },
    { progression_list: "IV, IVm, I, I", mood: MoodLabels.weird },
    { progression_list: "I, bII, bIII, bII", mood: MoodLabels.weird }, // Chromatic movement creates an unsettling, avant-garde feel.
    { progression_list: "I, bII, I, IIIm", mood: MoodLabels.suspenseful }, // Darker movement; bII adds tension.
    { progression_list: "I, bVII, bVI, bII", mood: MoodLabels.dark }, // Very modal, descending motion often found in minor progressions.
    { progression_list: "I, bVII, IV, I", mood: MoodLabels.hopeful }, // Classic rock progression; strong resolution to I.
    { progression_list: "I, bVI, I, bII", mood: MoodLabels.weird }, // Unusual chromatic shifts, similar to classical or jazz tension.
    { progression_list: "I, IIIm, IV, VIm", mood: MoodLabels.hopeful }, // Uplifting progression with a bittersweet resolution.
    { progression_list: "I, IV, V, bVII", mood: MoodLabels.jazzy }, // IV-V-I is standard, but bVII adds a modal, sophisticated sound.
    { progression_list: "I, IV, V, V", mood: MoodLabels.happy }, // Purely diatonic, major-key classic pop/folk progression.
    { progression_list: "I, V, bVII, IV", mood: MoodLabels.rock }, // Very common in classic rock; Mixolydian influence.
    { progression_list: "I, V, I, IV", mood: MoodLabels.happy }, // Simple, bright resolution; common in pop.
  ],
  Minor: [
    { progression_list: "Im, IV, VI, Vm", mood: MoodLabels.happy },
    { progression_list: "IIm, V, I, I", mood: MoodLabels.jazzy },
    { progression_list: "Im, VII, IV, IV", mood: MoodLabels.jazzy },
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
    { progression_list: "Im, IVm, Vm, IVm", mood: MoodLabels.dark }, // Descending motion with IVm feels melancholic.
    { progression_list: "Im, IVm, Vm, Vm", mood: MoodLabels.dark }, // Similar to above, reinforcing a somber feel.
    { progression_list: "Im, IVm, VII, Im", mood: MoodLabels.suspenseful }, // VII creates tension, feels cinematic.
    { progression_list: "Im, Vm, IVm, VII", mood: MoodLabels.suspenseful }, // Vm-IVm-VII cycle has a haunting character.
    { progression_list: "Im, VI, bIm, Vm", mood: MoodLabels.weird }, // bIm is unusual, possibly experimental.
    { progression_list: "Im, VI, III, VII", mood: MoodLabels.hopeful }, // III and VII brighten the minor tonality.
    { progression_list: "Im, VI, IVm, IIm", mood: MoodLabels.dark }, // IVm-IIm makes it feel unresolved and moody.
    { progression_list: "Im, VI, IVm, III", mood: MoodLabels.hopeful }, // III brings an uplifting element.
    { progression_list: "Im, VII, Im, Vm", mood: MoodLabels.suspenseful }, // Repetitive motion with VII builds tension.
    { progression_list: "Im, VII, VI, III", mood: MoodLabels.hopeful }, // III at the end makes it feel optimistic.
    { progression_list: "IIm, Vm, Im, Im", mood: MoodLabels.dark }, // Minor ii-V-I creates a deep, dramatic feel.
    { progression_list: "IIm, Vm, Im, IVm", mood: MoodLabels.sad }, // ii-V-I is common in jazz, IVm adds melancholy.
    { progression_list: "IIm7, Vm9, Im7", mood: MoodLabels.jazzy }, // Classic jazz minor ii-V-I progression.
    { progression_list: "IVm, Im, Vm, VI", mood: MoodLabels.hopeful }, // VI at the end gives a sense of resolution.
    { progression_list: "Vm, Im, IVm, VII", mood: MoodLabels.suspenseful }, // VII creates an unresolved, eerie feeling.
    { progression_list: "VI, Im, Vm, Vm", mood: MoodLabels.dark }, // VI-Im-Vm motion feels mysterious.
    { progression_list: "VI, IVm, Im, Vm", mood: MoodLabels.sad }, // IVm-Im gives a melancholic movement.
    { progression_list: "VI, VI, Im, VII", mood: MoodLabels.suspenseful }, // VII at the end leaves it unresolved.
    { progression_list: "VI, VII, Im, III", mood: MoodLabels.hopeful }, // III makes the minor tonality feel brighter.
  ],
};
