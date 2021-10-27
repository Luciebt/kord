import React from "react";
import { TMode } from "../../type";
import "./Buttons.css";

interface IModeButton {
  onPressMode?: any;
}

const ModeButton = ({ onPressMode }: IModeButton): JSX.Element => {
  const modes: TMode[] = ["Major", "Minor", "Mixed"];

  const handleClick = (event: any, mode: string) => {
    onPressMode(mode);

    const toUnpress = document.getElementsByClassName("mode-btn-pressed");
    if (toUnpress) {
      Array.from(toUnpress).forEach((button) => {
        button.classList.remove("mode-btn-pressed");
      });
    }
    event.target.classList.add("mode-btn-pressed");
  };

  const modesList: JSX.Element[] = modes.map((mode, i) => (
    <button
      key={i}
      onClick={(e) => {
        handleClick(e, mode);
      }}
    >
      {mode}
    </button>
  ));

  return (
    <div className="">
      <h3>Mode</h3>
      {modesList}
    </div>
  );
};

export default ModeButton;
