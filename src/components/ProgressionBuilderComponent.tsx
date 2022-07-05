import React, { useState, useContext, useEffect } from "react";
import { SoundOnContext } from "../App";
import KeyButton from "./buttons/KeyButton";

const ProgressionBuilderComponent = (): JSX.Element => {
  const SoundOn = React.useContext(SoundOnContext);
  const [chordKey, setChordKey] = useState("");

  const KeyCallback = (key: string) => {
    setChordKey(key);
  };

  useEffect(() => {}, []);

  return (
    <section className="centered-box">
      <div className="prog-chooser-box">
        <KeyButton onPressKey={KeyCallback} />
      </div>
    </section>
  );
};

export default ProgressionBuilderComponent;
