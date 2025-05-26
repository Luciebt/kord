import {
    SimplifiedChordNotationConverter,
    CleanChords,
} from '../NoteUtils'; 

describe('NoteUtils', () => {
    it('should correctly convert a chord to simplified notation', () => {
        expect(SimplifiedChordNotationConverter('C#m7', true)).toEqual(['C#', 'm7']);
        expect(SimplifiedChordNotationConverter('Am', true)).toEqual(['A', 'm']);
        expect(SimplifiedChordNotationConverter('Cmaj7', true)).toEqual(['C', 'maj7']);
    });

    it('should correctly clean chord strings', () => {
        expect(CleanChords('E#')).toBe('F');
        expect(CleanChords('Bb')).toBe('A#');
        expect(CleanChords('C##')).toBe('D');
    });

    it('should handle empty chord strings correctly', () => {
        expect(CleanChords('')).toBe('');
    });
});