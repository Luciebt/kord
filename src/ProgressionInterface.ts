// This  defines a simple Progression interface, which will be passed in as props into a new component.
export default interface ProgressionInterface {
  tonality: string;
  quality: string;
  chords_list: string;
  mood?: string;
  genre?: string;
}
