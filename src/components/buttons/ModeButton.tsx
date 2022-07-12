import React from "react";
import { TMode } from "../../type";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
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
      className="mode-btn"
      onClick={(e) => {
        handleClick(e, mode);
      }}
    >
      {mode}
    </button>
  ));

  return (
    <section arial-label="Choose a mode for your chord progression">
      <h2>Mode</h2>
      {modesList}
    </section>
  );
};

export default ModeButton;
