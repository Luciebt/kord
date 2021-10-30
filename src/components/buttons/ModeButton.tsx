import React from "react";
import { TMode } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Buttons.css";

interface IModeButton {
  onPressMode?: any;
}

const ModeButton = ({ onPressMode }: IModeButton): JSX.Element => {
  const modes: TMode[] = ["Major", "Minor"];

  const handleClick = (event: any, mode: string) => {
    onPressMode(mode);

    const style: string = "mode-btn-pressed";
    unPressElementsStyleWithoutEvent(style);
    event.target.classList.add(style);
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
