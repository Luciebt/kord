import React from "react";
import ProgressionComponent from "../ProgressionComponent";
import IProgression from "../../IProgression";

export default class ProgressionDisplayComponent extends React.Component<
  IProgression,
  {}
> {
  constructor(props: IProgression) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>My Progression</h3>
        key <b>{this.props.tonality}</b>
        <br />
        quality <b>{this.props.quality}</b>
        <br />
        chords_list <b>{this.props.chords_list}</b>
      </div>
    );
  }
}
