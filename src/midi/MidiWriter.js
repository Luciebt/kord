const MidiWriter = require("midi-writer-js");
const { ShowChord } = require("../PianoChart");

/**
 * Triggers a download of the generated MIDI file.
 * @param {string} dataUrl - The MIDI file encoded as a data URI.
 * @param {string} [filename="MyProgression.mid"] - The filename for the downloaded MIDI file.
 */
function DownloadMidi(dataUrl, filename = "MyProgression.mid") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link); // Improves compatibility
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates a MIDI file from a list of chords.
 * @param {string[]} chordsList - An array of chord names.
 * @returns {string | undefined} - A MIDI data URI if successful, otherwise undefined.
 */
function GenerateMidi(chordsList) {
  if (!Array.isArray(chordsList) || chordsList.length === 0) return;

  const track = new MidiWriter.Track();

  // Convert chord names to their corresponding MIDI notes
  const chordsToExport = chordsList.map(ShowChord).filter(Boolean);

  if (chordsToExport.length === 0) return;

  // Add each chord as a MIDI note event
  chordsToExport.forEach((chord) => {
    track.addEvent(
      new MidiWriter.NoteEvent({ pitch: chord, duration: "1", velocity: 90 }),
    );
  });

  const writer = new MidiWriter.Writer(track);
  return writer.dataUri();
}

module.exports = { DownloadMidi, GenerateMidi };
