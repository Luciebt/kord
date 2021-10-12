import React, { useState } from "react";
import { Note, Key, Progression } from "@tonaljs/tonal";
import IProgression from "../IProgression";
import KeyButton from "./KeyButton";
import QualityButton from "./QualityButton";
import ProgressionDisplayComponent from "./views/ProgressionDisplay";

// The IProgression has been imported and passed down as the props of the ProgressionComponent. In the constructor, we checked that the props passed are of the IProgression type and in the render function, the data will be displayed.

interface IProgressionComponent {
  tonality?: string;
  quality?: string;
}

const ProgressionComponent: React.FC<IProgressionComponent> = ({}) => {
  const [tonality, setTonality] = useState("C");
  const [quality, setQuality] = useState("Major");
  const [chordsList, setChordsList] = useState("V VI");

  // QualityCallback = (quality: string) => {
  //   console.log(quality);
  // };

  // KeyCallback = (tonality: string) => {
  //   setTonality(tonality);
  //   console.log(tonality);
  // };

  const Prog: IProgression = DetermineChordProg(tonality, quality);

  return (
    <div>
      <KeyButton parentCallback={setTonality(tonality)} />
      {/* <QualityButton parentCallback={this.QualityCallback} /> */}
      <ProgressionDisplayComponent
        tonality={this.Prog.tonality}
        quality={this.Prog.quality}
        chords_list={this.Prog.chords_list}
      />
      <br />
    </div>
  );
};

function DetermineChordProg(tonality: string, quality: string): IProgression {
  const arrProg: string[] = ["I", "V", "VIm", "IV"];
  const arrChords: string[] = Progression.fromRomanNumerals(tonality, arrProg);
  const Prog: IProgression = {
    tonality: tonality,
    quality: quality,
    chords_list: arrChords.join(" "),
  };
  return Prog;
}

export default ProgressionComponent;
