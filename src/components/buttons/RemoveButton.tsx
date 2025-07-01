import React, { memo } from "react";
import GenericButton from "./GenericButton";
import "./Buttons.scss";

interface IRemoveButtonProps {
  onRemove?: () => void;
}

const RemoveButton: React.FC<IRemoveButtonProps> = memo(({ onRemove }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <GenericButton className="delete-btn" onClick={handleRemove}>
      x
    </GenericButton>
  );
});

export default RemoveButton;
