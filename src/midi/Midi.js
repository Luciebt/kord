const MidiWriter = require("midi-writer-js");
import { ShowChord, AddOctaveToNoteIfNeeded } from "../IPianoChart";

let track = undefined;

export function DownloadMidi(dataurl, filename = "MyProgression.mid") {
  const link = document.createElement("a");
  link.href = dataurl;
  link.download = filename;
  link.click();
}

export function GenerateMidi(chords_list) {
  track = new MidiWriter.Track();

  // TODO: Ugly. Refactor this.
  const firstChord = ShowChord(chords_list[0], true);
  const secondChord = ShowChord(chords_list[1], true);
  const thirdChord = ShowChord(chords_list[2], true);
  let fourthChord = null;
  let fifthChord = null;
  if (chords_list[3]) {
    fourthChord = ShowChord(chords_list[3], true);
  }
  if (chords_list[4]) {
    fifthChord = ShowChord(chords_list[4], true);
  }

  console.log("firstChord____________" + firstChord);

  if (track && chords_list) {
    track.addEvent(
      [
        // One NoteEvent per chord.
        new MidiWriter.NoteEvent({ pitch: firstChord, duration: "1" }),
        new MidiWriter.NoteEvent({ pitch: secondChord, duration: "1" }),
        new MidiWriter.NoteEvent({ pitch: thirdChord, duration: "1" }),
      ],
      function (event, index) {
        return { velocity: 90 };
      }
    );

    if (fourthChord) {
      track.addEvent(
        [new MidiWriter.NoteEvent({ pitch: fourthChord, duration: "1" })],
        function (event, index) {
          return { velocity: 90 };
        }
      );
    }
    if (fifthChord) {
      track.addEvent(
        [new MidiWriter.NoteEvent({ pitch: fifthChord, duration: "1" })],
        function (event, index) {
          return { velocity: 90 };
        }
      );
    }

    const write = new MidiWriter.Writer(track);
    console.log(write.dataUri());
    return write.dataUri();
  }
}
