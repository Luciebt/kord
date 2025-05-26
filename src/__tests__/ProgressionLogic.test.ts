import { DetermineChordsList, FindProgList, FindProgListFromMode, ConvertProgToChords } from '../ProgressionLogic';
import { ProgressionCollectionMap } from '../ProgressionStore';
import { TProgression, TMode, TMood } from '../types';

jest.mock('../ProgressionStore', () => {
    return {
        ProgressionCollectionMap: {
            Major: new Map<string, TProgression>([
                ['I, IV, V', { progression_list: 'I, IV, V', mood: "Happy 🌻" }],
                ['I, II, IIIm, V6', { progression_list: 'I, II, IIIm, V6', mood: "Happy 🌻" }],
                ['IIm7, V7, I7', { progression_list: 'IIm7, V7, I7', mood: "Suspenseful 🎭" }],
            ]),
            Minor: new Map<string, TProgression>([
                ['VI, IVm, Im, Vm', { progression_list: 'VI, IVm, Im, Vm', mood: "Sad 🌧️" }],
                ['Im, VII, IV, IV', { progression_list: 'Im, VII, IV, IV', mood: "Hopeful 🌈" }],
                ['IIm7, Vm9, Im7', { progression_list: 'IIm7, Vm9, Im7', mood: "Suspenseful 🎭" }],
            ]),
        },
    };
});


describe('ProgressionLogic', () => {

    it('should return an empty string if tonic or mode is missing', () => {
        expect(DetermineChordsList('', 'Major')).toBe('');
        expect(DetermineChordsList('C', '')).toBe('');
    });

    it('should find a list of progressions for a mode without a mood', () => {
        const result = FindProgList('Major');
        expect(result).toEqual(["I, IV, V", "I, II, IIIm, V6", "IIm7, V7, I7"]);
    });

    it('should find a list of progressions for a mode with a mood', () => {
        const result = FindProgList('Major', "Happy 🌻");
        expect(result).toEqual(["I, IV, V", "I, II, IIIm, V6"]);
    });


    it('should find one progression for a mode with a mood', () => {
        const result = FindProgList('Minor', "Sad 🌧️");
        expect(result).toEqual(["VI, IVm, Im, Vm"]);
    });

    it('should find convert progressions to actual chords', () => {
        const result = ConvertProgToChords('C#', ["I, IV, V", "I, II, IIIm, V6"]);
        expect(result).toEqual("C#,F#,G# | C#,D#,Fm,G#6");
        expect(DetermineChordsList('C#', "Major", "Happy 🌻")).toEqual(result);
    });

    it('should find convert progressions to actual chords, with seventh', () => {
        const result = ConvertProgToChords('C#', ["I, IV, V", "I, II, IIIm, V6"]);
        expect(result).toEqual("C#,F#,G# | C#,D#,Fm,G#6");
        expect(DetermineChordsList('C#', "Major", "Happy 🌻")).toEqual(result);
    });

    it('FindProgListFromMode should return progressions for a mode without a mood', () => {
        const result = FindProgListFromMode(ProgressionCollectionMap.Major);
        expect(result).toEqual(['I, IV, V', "I, II, IIIm, V6",
            "IIm7, V7, I7"]);
    });

    it('ConvertProgToChords should handle empty progression arrays', () => {
        const result = ConvertProgToChords('C', []);
        expect(result).toBe('');
    });
});