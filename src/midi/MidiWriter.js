const MidiWriter = require("midi-writer-js");
import { ShowChord } from "../PianoChart";

let track = undefined;

export function DownloadMidi(dataUrl, filename = "MyProgression.mid") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

// FIXME: doesn't work with normal progressions anymore
export function GenerateMidi(chordsList) {
  if (!chordsList) return;

  track = new MidiWriter.Track();

  let chordsToExport = {
    // chordNum: chordContent
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
  };

  for (let [i, [chordNum, chordContent]] of Object.entries(
    Object.entries(chordsToExport)
  )) {
    if (chordsList[i]) {
      chordsToExport[chordNum] = ShowChord(chordsList[i]);
    } else {
      // Remove key/value pair if we're passing less than 8 chords in chordsList
      delete chordsToExport[chordNum];
    }
  }

  // Add the track event for each note of each chord.
  // One NoteEvent per chord.
  if (track) {
    for (const chord of Object.values(chordsToExport)) {
      track.addEvent(
        new MidiWriter.NoteEvent({ pitch: chord, duration: "1" }),
        function (event, index) {
          return { velocity: 90 };
        }
      );
    }

    const writer = new MidiWriter.Writer(track);
    return writer.dataUri();
  }
}
