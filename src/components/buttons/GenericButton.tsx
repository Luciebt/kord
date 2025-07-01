import React, { memo } from "react";
import "./Buttons.scss";

interface IGenericButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
  title?: string;
  value?: string;
}

const GenericButton: React.FC<IGenericButtonProps> = memo(
  ({ onClick, className = "", children, id, ariaLabel, title, value }) => {
    return (
      <button
        id={id}
        className={`generic-btn ${className}`}
        onClick={onClick}
        aria-label={ariaLabel}
        title={title}
        value={value}
      >
        {children}
      </button>
    );
  }
);

export default GenericButton;
