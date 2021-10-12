import * as React from "react";
import ProgressionInterface from "../ProgressionInterface";
import KeyButton from "./KeyButton";
import QualityButton from "./QualityButton";

// The ProgressionInterface has been imported and passed down as the props of the ProgressionComponent. In the constructor, we checked that the props passed are of the ProgressionInterface type and in the render function, the data will be displayed.

// export default interface ProgressionState {
//   tonality: string;
//   quality: string;
//   chords_list: string;
//   mood?: string;
//   genre?: string;
// }

export default class ProgressionComponent extends React.Component<
  ProgressionInterface,
  {}
> {
  constructor(props: ProgressionInterface) {
    super(props);
    this.state = {
      tonality: "F",
      quality: "major",
      chords_list: "V VI III",
    };
  }

  render() {
    let children = this.props.children;
    return (
      <div>
        <KeyButton />
        <QualityButton />
        {console.log(children)}
        <h3>Progression Component</h3>
        key <b>{this.props.tonality}</b>
        <br />
        quality <b>{this.props.quality}</b>
        <br />
        chords_list <b>{this.props.chords_list}</b>
      </div>
    );
  }
}
