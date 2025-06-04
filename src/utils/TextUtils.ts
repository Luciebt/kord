import { Chord } from '../types';

const qualityShorthands: { [key: string]: string } = {
    'Major': '',              // C Major is simply "C"
    'Minor': 'm',             // C Minor is "Cm"
    'Diminished': 'dim',      // C Diminished is "Cdim" or "C°"
    'Augmented': 'aug',       // C Augmented is "Caug" or "C+"

    'Major 7th': 'maj7',      // C Major 7th is "Cmaj7"
    'Minor 7th': 'm7',        // C Minor 7th is "Cm7"
    'Dominant 7th': '7',      // C Dominant 7th is "C7"
    'Half-Diminished 7th': 'm7b5', // C Half-Diminished 7th is "Cm7b5" (or Cø7)
    'Diminished 7th': 'dim7', // C Diminished 7th is "Cdim7" (or C°7)
    'Minor-Major 7th': 'm(maj7)', // C Minor-Major 7th is "Cm(maj7)"
    'Augmented Major 7th': 'maj7#5', // C Augmented Major 7th is "Cmaj7#5"

    'Suspended 2nd': 'sus2',  // C Suspended 2nd is "Csus2"
    'Suspended 4th': 'sus4',  // C Suspended 4th is "Csus4"
    'Dominant 7th Sus4': '7sus4', // C Dominant 7th Sus4 is "C7sus4"

    'Major 9th': 'maj9',      // C Major 9th is "Cmaj9"
    'Minor 9th': 'm9',        // C Minor 9th is "Cm9"
    'Dominant 9th': '9',      // C Dominant 9th is "C9"

    'Major 11th': 'maj11',    // C Major 11th is "Cmaj11"
    'Minor 11th': 'm11',      // C Minor 11th is "Cm11"
    'Dominant 11th': '11',    // C Dominant 11th is "C11"
    'Dominant 7#11': '7#11',  // C Dominant 7#11 is "C7#11"

    'Major 13th': 'maj13',    // C Major 13th is "Cmaj13"
    'Minor 13th': 'm13',      // C Minor 13th is "Cm13"
    'Dominant 13th': '13',    // C Dominant 13th is "C13"

    'Dominant 7b9': '7b9',    // C Dominant 7b9 is "C7b9"
    'Dominant 7#9': '7#9',    // C Dominant 7#9 is "C7#9"
    'Dominant 7b5': '7b5',    // C Dominant 7b5 is "C7b5"
    'Dominant 7#5': '7#5',    // C Dominant 7#5 is "C7#5"
    'Dominant 7 Altered': '7alt', // C Dominant 7 Altered is "C7alt"
};

export function getSimplifiedChordLabel(chord: Chord): string {
    const shorthand = qualityShorthands[chord.quality];

    if (shorthand !== undefined) {
        return `${chord.root}${shorthand}`;
    }

    console.warn(`No simplified shorthand found for quality: "${chord.quality}". Using full quality name.`);
    return `${chord.root}${chord.quality}`;
}
