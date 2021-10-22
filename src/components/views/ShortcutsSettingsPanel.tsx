import React from "react";

interface IShortcutsProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

// TODO: Handle click outside.
const ShortcutsPanel: React.FC<IShortcutsProps> = ({}) => {
  return <div className="settings-panel">Coming soon...</div>;
};

export default ShortcutsPanel;
