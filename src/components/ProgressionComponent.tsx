import React from "react";
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

export default class ProgressionComponent extends React.Component<
  IProgressionComponent,
  {}
> {
  QualityCallback = (quality: string) => {
    console.log(quality);
  };

  KeyCallback = (tonality: string) => {
    console.log(tonality);
  };

  constructor(props: IProgression) {
    super(props);
  }

  aProg: string[] = Progression.fromRomanNumerals("C", ["I", "V", "VIm", "IV"]);

  render() {
    return (
      <div>
        <KeyButton parentCallback={this.KeyCallback} />
        <QualityButton parentCallback={this.QualityCallback} />
        {/* {this.aProg} */}
        <ProgressionDisplayComponent
          tonality="C"
          quality="major"
          chords_list="I-V-vi-IV"
        />
        <br />
      </div>
    );
  }
}

function DetermineChordProg(tonality: string, quality: string) {}
