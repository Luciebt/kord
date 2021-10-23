import React, { useState } from "react";
import { TMode } from "../../type";
import './Buttons.css';

interface IModeButton {
  parentCallback?: any;
}

const ModeButton: React.FC<IModeButton> = ({ parentCallback }) => {
  const [theMode, setMode] = useState("");

  const modes: TMode[] = ["Major", "Minor", "Mixed"];
  const modesButtons: JSX.Element[] = [];

  const handleClick = (event: any, mode: string) => {
    setMode(mode);
    parentCallback(mode);

    const toUnpress = document.getElementsByClassName("mode-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("mode-btn-pressed");
      });
    }
    event.target.classList.add("mode-btn-pressed");
  };

  modes.forEach((mode, i) => {
    modesButtons.push(
      <button
        key={i}
        onClick={(e) => {
          handleClick(e, mode);
        }}
      >
        {mode}
      </button>
    );
  });

  return (
    <div className="">
      <h3>Mode</h3>
      {modesButtons}
    </div>
  );
};

export default ModeButton;
