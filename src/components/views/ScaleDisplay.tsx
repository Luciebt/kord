import React from "react";
import ProgressionComponent from "../ProgressionComponent";

export interface IChordsScaleDisplayComponent {
  tonic: string;
  quality: string;
  chords_scale: any;
}

const ChordsScaleDisplayComponent = ({
  tonic,
  quality,
  chords_scale,
}: IChordsScaleDisplayComponent): JSX.Element => {
  return (
    <div className="">
      <h3>Chords on Scale</h3>
      <b>{tonic}</b>
      <br />
      <b>{quality}</b>
      <br />
      <b>{chords_scale}</b>
      <br />
    </div>
  );
};

export default ChordsScaleDisplayComponent;
