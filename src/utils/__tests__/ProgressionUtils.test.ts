import { BuildChordsMap, GetRomansForChord } from '../ProgressionUtils';

describe('ProgressionUtils', () => {
    let progMap: Map<string, string>; // Declare progMap here for use in multiple tests

    beforeEach(() => {
        // Reset the map before each test to ensure isolation
        progMap = new Map<string, string>();
    });

    it('should handle empty arrays correctly', () => {
        BuildChordsMap([], []);
        expect(progMap.size).toBe(0);
    });

    it('should return an empty array if the chord is not found', () => {
        const progArr = ['I', 'IV', 'V'];
        const chordsArr = ['C', 'F', 'G'];
        BuildChordsMap(progArr, chordsArr);

        const romans = GetRomansForChord(['Ab']);
        expect(romans).toEqual([]);
    });

    it('should handle chords with commas in the key correctly', () => {
        const progArr = ['I', 'II', 'IV', 'V'];
        const chordsArr = ['C', 'F', 'G'];
        BuildChordsMap(progArr, chordsArr);

        const romans = GetRomansForChord(['C']);
        expect(romans).toEqual(['I']);
    });
});