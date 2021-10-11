import * as React from "react";
import ProgressionInterface from "../ProgressionInterface";

// The ProgressionInterface has been imported and passed down as the props of the ProgressionComponent. In the constructor, we checked that the props passed are of the ProgressionInterface type and in the render function, the data will be displayed.

export default class ProgressionComponent extends React.Component<
  ProgressionInterface,
  {}
> {
  constructor(props: ProgressionInterface) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Progression Component</h2>
        <button onClick={showAll}>Button</button>
        key: <b>{this.props.tonality}</b>
        <br />
        quality <b>{this.props.quality}</b>
        <br />
        progression_list: <b>{this.props.progression_list}</b>
      </div>
    );
  }
}

function showAll() {
  console.log("button has been pressed");
}
