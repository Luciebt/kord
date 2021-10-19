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

  const handleClick = (event: any, quality: string) => {
    setQuality(quality);
    parentCallback(quality);

    const toUnpress = document.getElementsByClassName("qual-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("qual-btn-pressed");
      });
    }
    event.target.classList.add("qual-btn-pressed");
  };

  qualities.forEach((quality, i) => {
    qualitiesButtons.push(
      <button
        key={i}
        onClick={(e) => {
          handleClick(e, quality);
        }}
      >
        {quality}
      </button>
    );
  });

  return (
    <div className="">
      <h3>Type</h3>
      {qualitiesButtons}
    </div>
  );
};

export default QualityButton;
