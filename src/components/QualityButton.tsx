import React, { useState } from "react";

interface IQualityButton {}

const QualityButton: React.FC<IQualityButton> = ({}) => {
  const [theQuality, setQuality] = useState("");

  return (
    <div className="">
      <h3>Set the quality: {theQuality}</h3>
      <button onClick={() => setQuality("Major")}>Major</button>
      <button onClick={() => setQuality("Minor")}>Minor</button>
      <button onClick={() => setQuality("Augmented")}>Augmented</button>
      <button onClick={() => setQuality("Diminished")}>Diminished</button>
    </div>
  );
};

export default QualityButton;
