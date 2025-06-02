import { GetSimplifiedChordFromFullChord } from '../Chords';

// Mock the PlaySynthChords function
jest.mock('../audio/Play', () => ({
  PlaySynthChords: jest.fn(),
}));

describe('ChordPlayer', () => {

  it('should return simplified chord notation correctly', () => {
    const result = GetSimplifiedChordFromFullChord('C#m7');
    expect(result).toEqual(['m7', 'C#']);
  });

  it('should return simplified chord notation with octave', () => {
    const result = GetSimplifiedChordFromFullChord('Cmaj');
    expect(result).toEqual(['maj', 'C']);
  });
});