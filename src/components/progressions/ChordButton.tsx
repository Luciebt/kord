import React from "react";
import "../buttons/Buttons.scss";

type IChordButtonProps = {
    chordname: string;
    btnId?: number;
    romanNumeral?: string;
    isPressed?: boolean;
    showAdd?: boolean;
    showRemove?: boolean;
    onClick?: (chord: string) => void;
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
    const handleClick = () => {
        onClick?.(chordname);
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
            <span>{chordname}</span>
            <p className="btn-caption">{romanNumeral}</p>

            {/* <span className="icon" title="Play">
                🔊
            </span> */}

            {showAdd && (
                <button className="add-chord-btn" onClick={handleAdd}>
                    +
                </button>
            )}

            {showRemove && (
                <button className="delete-btn" onClick={handleRemove}>
                    x
                </button>
            )}
        </button>
    );
};

export default ChordButton;

