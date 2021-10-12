import React from "react";
import { Note, Key, Progression } from "@tonaljs/tonal";
import IProgression from "../IProgression";
import KeyButton from "./KeyButton";
import QualityButton from "./QualityButton";

// The IProgression has been imported and passed down as the props of the ProgressionComponent. In the constructor, we checked that the props passed are of the IProgression type and in the render function, the data will be displayed.

export default class ProgressionComponent extends React.Component<
  IProgression,
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
        <h3>Progression:</h3>
        {this.aProg}
        <br />
        <br />
        <p>testing:</p>
        key <b>{this.props.tonality}</b>
        <br />
        quality <b>{this.props.quality}</b>
        <br />
        chords_list <b>{this.props.chords_list}</b>
      </div>
    );
  }
}
