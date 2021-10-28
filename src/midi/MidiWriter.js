const MidiWriter = require("midi-writer-js");
import { ShowChord } from "../PianoChart";

let track = undefined;

export function DownloadMidi(dataUrl, filename = "MyProgression.mid") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export function GenerateMidi(chordsList) {
  track = new MidiWriter.Track();

  // TODO: Ugly. Refactor this.
  const firstChord = ShowChord(chordsList[0], true);
  const secondChord = ShowChord(chordsList[1], true);
  const thirdChord = ShowChord(chordsList[2], true);
  let fourthChord = null;
  let fifthChord = null;
  if (chordsList[3]) {
    fourthChord = ShowChord(chordsList[3], true);
  }
  if (chordsList[4]) {
    fifthChord = ShowChord(chordsList[4], true);
  }

  if (track && chordsList) {
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
    return write.dataUri();
  }
}
