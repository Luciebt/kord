import React from "react";
import "../buttons/Buttons.scss";

type IChordButtonProps = {
    chordname: string;
    btnId?: number;
    romanNumeral?: string;
    isPressed?: boolean;
    showAdd?: boolean;
    showRemove?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, chord: any) => void;
    onAdd?: (chord: string) => void;
    onRemove?: (chord: string) => void;
    className?: string;
};


const ChordButton: React.FC<IChordButtonProps> = ({
    chordname,
    btnId = 0,
    romanNumeral = "",
    isPressed = false,
    showAdd = false,
    showRemove = false,
    onClick,
    onAdd,
    onRemove,
    className = "",
}) => {
    const handleClick = (event) => {
        onClick?.(event, chordname);
    };

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAdd?.(chordname);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.(chordname);
    };

    return (
        <button
            id={"btn-" + (btnId).toString()}
            className={`chord-btn ${isPressed ? "chord-btn-pressed" : ""} ${className}`}
            onClick={handleClick}
        >
            <span className="icon" title="Play">
                🔊
            </span>
            <br />

            <span>{chordname}</span>
            <p className="btn-caption">{romanNumeral}</p>

            {showAdd && (
                <span className="add-chord-btn" onClick={handleAdd}>
                    +
                </span>
            )}

            {showRemove && (
                <span className="delete-btn" onClick={handleRemove}>
                    x
                </span>
            )}
        </button>
    );
};

export default ChordButton;

