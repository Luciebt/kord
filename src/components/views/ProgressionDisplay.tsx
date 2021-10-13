import React from "react";
import ProgressionComponent from "../ProgressionComponent";
import IProgression from "../../IProgression";

export interface IProgressionDisplayProps {
  tonality: string;
  quality: string;
  mood?: string;
  chords_list: string;
  children?: React.ReactChild | React.ReactChild[];
}

const ProgressionDisplayComponent = ({
  tonality,
  quality,
  mood,
  chords_list,
  children,
}: IProgressionDisplayProps): JSX.Element => {
  return (
    <div className="prog-box">
      <h3>My Progression</h3>
      key <b>{tonality}</b>
      <br />
      quality <b>{quality}</b>
      <br />
      chords_list <b>{chords_list}</b>
    </div>
  );
};

export default ProgressionDisplayComponent;
