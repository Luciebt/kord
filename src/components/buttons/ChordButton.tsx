import React, { memo } from "react";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import GenericButton from "./GenericButton";
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
    children?: React.ReactNode;
};


const ChordButton: React.FC<IChordButtonProps> = memo(
    ({
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

        return (
            <GenericButton
                id={"btn-" + btnId.toString()}
                className={`chord-btn ${isPressed ? "chord-btn-pressed" : ""} ${className}`}
                onClick={handleClick}
            >
                <span className="icon" title="Play">
                    🔊
                </span>
                <br />

                <span>{chordname}</span>
                <p className="btn-caption">{romanNumeral}</p>

                {showAdd && <AddButton onAdd={() => onAdd?.(chordname)} />}

                {showRemove && <RemoveButton onRemove={() => onRemove?.(chordname)} />}
            </GenericButton>
        );
    },
);

export default ChordButton;

