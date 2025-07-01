import { TProgression, TMode, TChord } from "../types";

export type PrefixMap = Record<string, Record<string, number>>;

export function BuildGlobalPrefixToNextChordMap(
    collectionMap: Record<TMode, Map<string, TProgression>>
): Record<string, Record<string, number>> {
    const prefixToNext: Record<string, Record<string, number>> = {};

    for (const mode in collectionMap) {
        const progressionMap = collectionMap[mode as TMode];

        progressionMap.forEach((prog) => {
            const chords = prog.progression_list.split(",").map(c => c.trim());

            for (let i = 0; i < chords.length - 1; i++) {
                const prefix = chords.slice(0, i + 1).join(", ");
                const next = chords[i + 1];

                if (!prefixToNext[prefix]) {
                    prefixToNext[prefix] = {};
                }

                if (!prefixToNext[prefix][next]) {
                    prefixToNext[prefix][next] = 1;
                } else {
                    prefixToNext[prefix][next]++;
                }
            }
        });
    }

    return prefixToNext;
}


export function BuildPrefixToNextChordMap(
    progressionMap: Map<string, TProgression>
): Record<string, Record<string, number>> {
    const prefixToNext: Record<string, Record<string, number>> = {};

    progressionMap.forEach((prog) => {
        const chords = prog.progression_list.split(",").map(c => c.trim());

        for (let i = 0; i < chords.length - 1; i++) {
            const prefix = chords.slice(0, i + 1).join(", ");
            const next = chords[i + 1];

            if (!prefixToNext[prefix]) {
                prefixToNext[prefix] = {};
            }

            if (!prefixToNext[prefix][next]) {
                prefixToNext[prefix][next] = 1;
            } else {
                prefixToNext[prefix][next]++;
            }
        }
    });

    return prefixToNext;
}


export function SuggestNextChordsFromProgression(
    currentProgression: TChord[],
    availableChords: TChord[] | undefined,
    prefixMap: Record<string, Record<string, number>>
): TChord[] {
    if (!availableChords) return [];

    const romanNumerals = currentProgression.map(chord => chord.romanNumeral);

    for (let i = romanNumerals.length; i > 0; i--) {
        const prefix = romanNumerals.slice(-i).join(", ");
        const options = prefixMap[prefix];

        if (options) {
            const sortedRomanNumerals = Object.entries(options)
                .sort((a, b) => b[1] - a[1])
                .map(([roman]) => roman);

            const suggestions = sortedRomanNumerals
                .map(roman =>
                    availableChords.find(c => c.romanNumeral === roman)
                )
                .filter((c): c is TChord => !!c);

            return suggestions;
        }
    }

    return [];
}



