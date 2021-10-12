import React, { useState } from "react";

interface IQualityButton {
  parentCallback?: any;
}

const QualityButton: React.FC<IQualityButton> = ({ parentCallback }) => {
  const [theQuality, setQuality] = useState("");

  return (
    <div className="">
      <h3>Set the quality: {theQuality}</h3>

      <button
        onClick={() => {
          const newQual = "Major";
          setQuality(newQual);
          parentCallback(newQual);
        }}
      >
        Major
      </button>
      <button
        onClick={() => {
          const newQual = "Minor";
          setQuality(newQual);
          parentCallback(newQual);
        }}
      >
        Minor
      </button>
    </div>
  );
};

export default QualityButton;
