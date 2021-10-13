import React, { useState, useEffect } from "react";
import IProgression from "../IProgression";
import { TQuality } from "../type.d";

interface IQualityButton {
  parentCallback?: any;
}

const QualityButton: React.FC<IQualityButton> = ({ parentCallback }) => {
  const [theQuality, setQuality] = useState("");

  const qualities: TQuality[] = ["Major", "Minor", "Mixed"];
  const qualitiesButtons: JSX.Element[] = [];

  for (let quality of qualities) {
    qualitiesButtons.push(
      <button
        key={quality}
        onClick={() => {
          setQuality(quality);
          parentCallback(quality);
        }}
      >
        {quality}
      </button>
    );
  }

  return (
    <div className="">
      <h3>Set the type: {theQuality}</h3>
      {qualitiesButtons}
    </div>
  );
};

export default QualityButton;
