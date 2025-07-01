import React, { memo } from "react";
import GenericButton from "./GenericButton";
import "./Buttons.scss";

interface IAddButtonProps {
  onAdd?: () => void;
}

const AddButton: React.FC<IAddButtonProps> = memo(({ onAdd }) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  return (
    <GenericButton className="add-chord-btn" onClick={handleAdd}>
      +
    </GenericButton>
  );
});

export default AddButton;
