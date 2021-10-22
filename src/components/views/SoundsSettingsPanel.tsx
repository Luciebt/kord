import React from "react";

interface ISoundsSettingsProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

// TODO: Handle click outside.
const SoundsSettingsPanel: React.FC<ISoundsSettingsProps> = ({}) => {
  return <div className="settings-panel">Sounds types. Coming soon...</div>;
};

export default SoundsSettingsPanel;
