import { create } from 'zustand';

interface ProgressionState {
  key: string;
  mode: string;
  mood: string;
  progression: any[];
  setKey: (key: string) => void;
  setMode: (mode: string) => void;
  setMood: (mood: string) => void;
  addChord: (chord: any) => void;
  removeChord: (index: number) => void;
}

export const useProgressionStore = create<ProgressionState>((set) => ({
  key: 'C',
  mode: 'Major',
  mood: '',
  progression: [],
  setKey: (key) => set({ key }),
  setMode: (mode) => set({ mode }),
  setMood: (mood) => set({ mood }),
  addChord: (chord) => set((state) => ({ progression: [...state.progression, chord] })),
  removeChord: (index) =>
    set((state) => ({ progression: state.progression.filter((_, i) => i !== index) })),
}));
