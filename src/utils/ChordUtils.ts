import { TChord, TMode, TKey } from "../types";

export const keys: TKey[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

const noteToIndex: { [key: string]: number } = Object.fromEntries(
    keys.map((note, index) => [note, index])
);

export const modes: TMode[] = [
    "Major",
    "Minor",
    "Dorian",
    "Mixolydian",
    "Phrygian",
    "Lydian",
    "Locrian",
];

// Define intervallic patterns for each mode in semitones
const modeIntervals: { [key: string]: number[] } = {
    major: [2, 2, 1, 2, 2, 2, 1],
    dorian: [2, 1, 2, 2, 2, 1, 2],
    phrygian: [1, 2, 2, 2, 1, 2, 2],
    lydian: [2, 2, 2, 1, 2, 2, 1],
    mixolydian: [2, 2, 1, 2, 2, 1, 2],
    minor: [2, 1, 2, 2, 1, 2, 2],
    locrian: [1, 2, 2, 1, 2, 2, 2],
};

// Your chord quality patterns (as defined before)
export const chordPatterns = {
    major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    dorian: ['i', 'ii', 'III', 'IV', 'v', 'vi°', 'VII'],
    phrygian: ['i', 'II', 'iii', 'iv', 'v°', 'VI', 'vii'],
    lydian: ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'],
    mixolydian: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'VII'],
    minor: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    locrian: ['i°', 'II', 'iii', 'iv°', 'V', 'VI', 'vii'],
};

// Your `ChordFormula` and `chordFormulas` (expanded)
type ChordFormula = {
    displayName: string;
    intervals: number[];
    commonOmissions?: string[];
};

type ChordFormulas = {
    [key: string]: ChordFormula;
};

export const chordFormulas: ChordFormulas = {
    // --- Triads ---
    'major': { displayName: 'Major', intervals: [0, 4, 7] }, // Root, Major 3rd, Perfect 5th (R, M3, P5)
    'minor': { displayName: 'Minor', intervals: [0, 3, 7] }, // Root, Minor 3rd, Perfect 5th (R, m3, P5)
    'diminished': { displayName: 'Diminished', intervals: [0, 3, 6] }, // Root, Minor 3rd, Diminished 5th (R, m3, d5)
    'augmented': { displayName: 'Augmented', intervals: [0, 4, 8] }, // Root, Major 3rd, Augmented 5th (R, M3, A5)

    // --- 7th Chords ---
    'major7': { displayName: 'Major 7th', intervals: [0, 4, 7, 11] }, // R, M3, P5, M7
    'minor7': { displayName: 'Minor 7th', intervals: [0, 3, 7, 10] }, // R, m3, P5, m7
    'dominant7': { displayName: 'Dominant 7th', intervals: [0, 4, 7, 10] }, // R, M3, P5, m7
    'halfDiminished7': { displayName: 'Half-Diminished 7th', intervals: [0, 3, 6, 10] }, // R, m3, d5, m7 (aka m7b5)
    'diminished7': { displayName: 'Diminished 7th', intervals: [0, 3, 6, 9] }, // R, m3, d5, d7 (double flat 7th)
    'minorMajor7': { displayName: 'Minor-Major 7th', intervals: [0, 3, 7, 11] }, // R, m3, P5, M7 (e.g., Cm(maj7))
    'augmentedMajor7': { displayName: 'Augmented Major 7th', intervals: [0, 4, 8, 11] }, // R, M3, A5, M7 (e.g., C+(maj7))

    // --- Suspended Chords ---
    'sus2': { displayName: 'Suspended 2nd', intervals: [0, 2, 7] }, // R, M2, P5 (no 3rd)
    'sus4': { displayName: 'Suspended 4th', intervals: [0, 5, 7] }, // R, P4, P5 (no 3rd)
    '7sus4': { displayName: 'Dominant 7th Sus4', intervals: [0, 5, 7, 10] }, // R, P4, P5, m7 (no 3rd)

    // --- 9th Chords ---
    'major9': { displayName: 'Major 9th', intervals: [0, 4, 7, 11, 14] }, // R, M3, P5, M7, M9
    'minor9': { displayName: 'Minor 9th', intervals: [0, 3, 7, 10, 14] }, // R, m3, P5, m7, M9
    'dominant9': { displayName: 'Dominant 9th', intervals: [0, 4, 7, 10, 14] }, // R, M3, P5, m7, M9

    // --- 11th Chords ---
    'major11': {
        displayName: 'Major 11th',
        intervals: [0, 4, 7, 11, 14, 17], // R, M3, P5, M7, M9, P11
        commonOmissions: ['P5'] // Often omits the 5th to avoid muddiness with the 11th
    },
    'minor11': {
        displayName: 'Minor 11th',
        intervals: [0, 3, 7, 10, 14, 17], // R, m3, P5, m7, M9, P11
        commonOmissions: ['P5'] // Often omits the 5th
    },
    'dominant11': {
        displayName: 'Dominant 11th',
        intervals: [0, 4, 7, 10, 14, 17], // R, M3, P5, m7, M9, P11
        commonOmissions: ['P5'] // Often omits the 5th
    },
    'dominant7sharp11': { // Often referred to as Lydian Dominant
        displayName: 'Dominant 7#11',
        intervals: [0, 4, 7, 10, 14, 18], // R, M3, P5, m7, M9, A11 (#11) - includes 9th for common usage
        commonOmissions: ['P5']
    },

    // --- 13th Chords ---
    'major13': {
        displayName: 'Major 13th',
        intervals: [0, 4, 7, 11, 14, 17, 21], // R, M3, P5, M7, M9, P11, M13
        commonOmissions: ['P5', 'P11'] // Often omits 5th and 11th
    },
    'minor13': {
        displayName: 'Minor 13th',
        intervals: [0, 3, 7, 10, 14, 17, 21], // R, m3, P5, m7, M9, P11, M13
        commonOmissions: ['P5', 'P11']
    },
    'dominant13': {
        displayName: 'Dominant 13th',
        intervals: [0, 4, 7, 10, 14, 17, 21], // R, M3, P5, m7, M9, P11, M13
        commonOmissions: ['P5', 'P11']
    },

    // --- Altered Dominant Chords ---
    // These often omit the P5 as it can conflict with alterations
    'dominant7b9': { displayName: 'Dominant 7b9', intervals: [0, 4, 7, 10, 13] }, // R, M3, P5, m7, m9 (b9)
    'dominant7sharp9': { displayName: 'Dominant 7#9', intervals: [0, 4, 7, 10, 15] }, // R, M3, P5, m7, A9 (#9)
    'dominant7b5': { displayName: 'Dominant 7b5', intervals: [0, 4, 6, 10] }, // R, M3, d5, m7
    'dominant7sharp5': { displayName: 'Dominant 7#5', intervals: [0, 4, 8, 10] }, // R, M3, A5, m7 (aka 7aug)
    'dominant7alt': { // Often used as a shorthand for V7 with multiple altered extensions (b9, #9, b5, #5)
        displayName: 'Dominant 7 Altered',
        // A common practical voicing might include: R, M3, m7, b9, #9, b13 (#5)
        intervals: [0, 4, 10, 13, 15, 20], // R, M3, m7, m9 (b9), A9 (#9), m13 (b13)
        commonOmissions: ['P5'] // The P5 is typically omitted in altered chords
    },
};

type ModeChords = {
    [modeName: string]: {
        romanNumerals: string[]; // Roman numerals for the recommended diatonic chords
        commonTriads?: string[]; // Simplified common triad patterns (using getChordTypeFromRoman)
        common7ths?: string[]; // Simplified common 7th chord patterns (using getChordTypeFromRoman or specific types)
        description: string; // A brief note about the mode's sound
    };
};

export const recommendedModeChords: ModeChords = {
    /**
     * Ionian Mode (Major Scale)
     * Bright, happy, stable.
     */
    major: {
        romanNumerals: ['I', 'IV', 'V', 'ii', 'vi'], // Most common and functional triads
        commonTriads: ['major', 'major', 'major', 'minor', 'minor'], // Corresponding qualities for I, IV, V, ii, vi
        common7ths: ['major7', 'major7', 'dominant7', 'minor7', 'minor7'], // Corresponding 7th chord qualities
        description: 'The standard major sound. I, IV, V provide strong major harmony. ii and vi offer common minor variations.',
    },

    /**
     * Aeolian Mode (Natural Minor Scale)
     * Sad, melancholic, serious.
     */
    minor: {
        romanNumerals: ['i', 'iv', 'v', 'III', 'VI', 'VII'], // v (minor) is diatonic dominant
        commonTriads: ['minor', 'minor', 'minor', 'major', 'major', 'major'],
        common7ths: ['minor7', 'minor7', 'minor7', 'major7', 'major7', 'dominant7'], // VII can often be a dominant 7th substitute
        description: 'The natural minor sound. Often borrows V (major/dominant7) from Harmonic Minor for stronger resolution.',
    },

    /**
     * Dorian Mode
     * Jazzy, bluesy, reflective, slightly melancholic with a hint of brightness.
     */
    dorian: {
        romanNumerals: ['i', 'ii', 'IV', 'v', 'VII'], // Characteristic IV (Major) and VII (Major)
        commonTriads: ['minor', 'minor', 'major', 'minor', 'major'],
        common7ths: ['minor7', 'minor7', 'major7', 'minor7', 'dominant7'], // VII as a dominant 7th is common
        description: 'A versatile minor mode with a unique bright IV and VII (Major). Great for jazzy or melancholic feels.',
    },

    /**
     * Phrygian Mode
     * Dark, exotic, Spanish/Middle Eastern, tense.
     */
    phrygian: {
        romanNumerals: ['i', 'II', 'iv', 'v°', 'VI'], // Characteristic II (Major on b2)
        commonTriads: ['minor', 'major', 'minor', 'diminished', 'major'],
        common7ths: ['minor7', 'major7', 'minor7', 'halfDiminished7', 'major7'],
        description: 'Very dark and exotic due to the bII. The II (bII) chord is highly characteristic. Use v° for tension.',
    },

    /**
     * Lydian Mode
     * Dreamy, ethereal, majestic, expansive.
     */
    lydian: {
        romanNumerals: ['I', 'II', 'V', 'iii', 'vi'], // Characteristic II (Major)
        commonTriads: ['major', 'major', 'major', 'minor', 'minor'],
        common7ths: ['major7', 'major7', 'dominant7', 'minor7', 'minor7'],
        description: 'Bright and airy. The II (Major) chord is its most defining characteristic, avoiding the dissonance of the IV chord.',
    },

    /**
     * Mixolydian Mode
     * Bluesy, folky, rock, dominant sound.
     */
    mixolydian: {
        romanNumerals: ['I', 'IV', 'v', 'VII', 'ii'], // Characteristic VII (Major) and v (minor)
        commonTriads: ['major', 'major', 'minor', 'major', 'minor'],
        common7ths: ['dominant7', 'major7', 'minor7', 'dominant7', 'minor7'], // I and VII as dominant 7ths are common
        description: 'The dominant mode. The I chord is often a dominant 7th. The bVII chord is very prominent, often used in rock/blues.',
    },

    /**
     * Locrian Mode
     * Very dissonant, unstable, generally avoided for stable progressions.
     */
    locrian: {
        romanNumerals: ['i°', 'II', 'iv°'], // Emphasizing its inherent tension
        commonTriads: ['diminished', 'major', 'diminished'],
        common7ths: ['halfDiminished7', 'major7', 'halfDiminished7'],
        description: 'Highly dissonant due to its diminished tonic. Best used for creating tension or specific dramatic effects, rather than traditional "good-sounding" progressions.',
    },
};

function getModeNotes(tonic: string, modeName: keyof typeof chordPatterns): string[] {
    const modePattern = modeIntervals[modeName];
    let currentNoteIndex = noteToIndex[tonic.toUpperCase()];

    if (currentNoteIndex === undefined || !modePattern) {
        // console.warn(`Invalid tonic or mode name: ${tonic}, ${modeName}`);
        return [];
    }

    const scaleNotes: string[] = [tonic];
    for (const interval of modePattern.slice(0, 6)) { // Get 7 notes from 6 intervals
        currentNoteIndex = (currentNoteIndex + interval) % 12;
        scaleNotes.push(keys[currentNoteIndex]);
    }
    return scaleNotes;
}

function getChordTypeFromRoman(roman: string): string {
    if (roman.includes('°')) {
        return 'diminished'; // For now, assume diminished triad from '°'
    }
    if (roman.includes('maj7')) return 'major7'; // Example: if your romanNumeral was 'Imaj7'
    if (roman.includes('min7')) return 'minor7'; // Example: if your romanNumeral was 'iimin7'

    if (roman.toUpperCase() === roman) {
        return 'major';
    }
    return 'minor';
}

function createChord(rootNote: string, chordTypeName: string): string[] {
    const rootIndex = noteToIndex[rootNote.toUpperCase()];
    if (rootIndex === undefined) return [];

    const formula = chordFormulas[chordTypeName];
    if (!formula) return [];

    const chordNotes: string[] = [];
    for (const interval of formula.intervals) {
        const noteIndex = (rootIndex + interval) % 12;
        chordNotes.push(keys[noteIndex]);
    }
    return chordNotes;
}

// --- Modified getRecommendedChordsForMode function ---
/**
 * Generates a set of "good sounding" chords for a given tonic and mode,
 * formatted as an array of the `Chord` type.
 * @param tonic The root note of the scale (e.g., 'C', 'A').
 * @param modeName The name of the mode (e.g., 'ionian', 'dorian').
 * @param chordTypePreference 'triads' for 3-note chords, '7ths' for 4-note chords.
 * @returns An array of `Chord` objects.
 */
export function getRecommendedChordsForMode(
    tonic: string,
    modeName: keyof typeof recommendedModeChords,
    chordTypePreference: 'triads' | '7ths' = 'triads'
): TChord[] {
    const recommended = recommendedModeChords[modeName];
    if (!recommended) {
        console.warn(`No recommendations for mode: ${modeName}`);
        return [];
    }

    const scaleNotes = getModeNotes(tonic, modeName as keyof typeof chordPatterns);
    if (scaleNotes.length === 0) {
        console.warn(`Could not get scale notes for ${tonic} ${modeName}`);
        return [];
    }

    const generatedChords: TChord[] = [];

    console.log("recommended.romanNumerals:", recommended.romanNumerals);
    console.log("scaleNotes:", scaleNotes);
    console.log("chordTypePreference:", chordTypePreference);
    console.log("recommended.commonTriads:", recommended.commonTriads);

    recommended.romanNumerals.forEach((romanNumeral, index) => {
        const degreeIndex = index; // 0-indexed degree
        const rootNote = scaleNotes[degreeIndex];
        let chordTypeName: string | undefined;

        if (chordTypePreference === 'triads') {
            chordTypeName = recommended.commonTriads?.[index]; // Use explicit commonTriads
            if (!chordTypeName) { // Fallback if commonTriads not explicitly set for this index
                chordTypeName = getChordTypeFromRoman(romanNumeral);
            }
        } else { // '7ths' preference
            chordTypeName = recommended.common7ths?.[index]; // Use explicit common7ths
            if (!chordTypeName) { // Fallback if common7ths not explicitly set for this index
                // You might want a more sophisticated fallback for 7ths if not explicitly defined
                // For now, we'll try to deduce a 7th chord type based on the triad type
                const triadType = getChordTypeFromRoman(romanNumeral);
                if (triadType === 'major') chordTypeName = 'dominant7'; // Common default
                else if (triadType === 'minor') chordTypeName = 'minor7';
                else if (triadType === 'diminished') chordTypeName = 'halfDiminished7'; // Or 'diminished7'
            }
        }

        if (chordTypeName) {
            const notes = createChord(rootNote, chordTypeName);
            const formula = chordFormulas[chordTypeName];

            if (notes.length > 0 && formula) {
                // Construct the Chord object matching your type
                generatedChords.push({
                    id: `${rootNote}-${formula.displayName.replace(/\s/g, '')}-${degreeIndex + 1}`, // Unique ID
                    name: `${rootNote}${formula.displayName.replace(/\s/g, '')}`, // e.g., "Cmaj7"
                    romanNumeral: romanNumeral,
                    root: rootNote,
                    quality: formula.displayName, // e.g., "Major", "Minor 7th"
                    degree: degreeIndex + 1, // Convert 0-indexed to 1-indexed degree
                    // progressionId is optional, so it's omitted here unless provided
                });
            }
        }
    });

    return generatedChords;
}
