import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useProgressionStore } from "../../ProgressionStore";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import ProgressionSettingsComponent from "../progressions/ProgressionSettings";
import "./Builder.scss";
import { PlayChord } from "../../Chords";
import { getRecommendedChordsForMode } from "../../utils/ChordUtils";
import { getSimplifiedChordLabel } from "../../utils/TextUtils";
import ChordButton from "../buttons/ChordButton";
import PianoDisplay from "../piano/PianoDisplay";
import "../progressions/Progressions.scss";

const ProgressionBuilderComponent: React.FC<{}> = ({ }) => {
    const {
        key,
        mode,
        progression,
        setKey,
        setMode,
        addChord,
        removeChord,
    } = useProgressionStore();
    const [availableChords, setAvailableChords] = useState<any[]>([]);
    const [chordSelected, setChordSelected] = useState<string | null>();

    useEffect(() => {
        if (key && mode) {
            generateChords();
        }
    }, [key, mode]);

    const generateChords = useCallback(() => {
        if (!key || !mode) return [];
        const chords = getRecommendedChordsForMode(key, mode.toLocaleLowerCase()).map(chord => ({
            ...chord,
            name: getSimplifiedChordLabel(chord)
        }));
        setAvailableChords(chords);

    }, [key, mode]);

    const groupedChords = (availableChords ?? []).reduce((acc: Record<string, any[]>, chord: any) => {
        if (!acc[chord.name]) {
            acc[chord.name] = [];
        }
        acc[chord.name].push(chord);
        return acc;
    }, {});

    const currentProgression = useMemo(() => {
        return progression.map(chord => chord.name);
    }, [progression]);

    const playChord = useCallback((chord: any) => {
        PlayChord(chord.name);
    }, []);

    return (
        <div className="centered-box">
            <h3>Pick chords</h3>
            <div className="buttons-container">
                <h4>Key</h4>
                <KeyButton onPressKey={setKey} />
                <h4>Mode</h4>
                <ModeButton onPressMode={setMode} fullModes={true} />

                <h4>Chords</h4>
                <div className="centered-box suggested-chords-container">
                    {Object.entries(groupedChords).map(([chordName, chords]) => (
                        <div key={chordName} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            {chords.map((chord) => (
                                <ChordButton
                                    key={chord.id}
                                    chordname={chord.name}
                                    onClick={() => playChord(chord)}
                                    romanNumeral={chord.romanNumeral}
                                    onAdd={() => addChord(chord)}
                                    showAdd
                                    className="prog-build-btn prog-builder-chord-btn"
                                />
                            ))}
                        </div>
                    ))}
                </div>

            </div>

            <h3>Your progression</h3>
            <div className="">
                <section className="box chords-box results-container progression-results-box">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {progression.length > 0 ? (
                            progression.map((chord, index) => (
                                <ChordButton
                                    key={index}
                                    chordname={chord.name}
                                    btnId={index + 1}
                                    romanNumeral=""
                                    onClick={() => {
                                        playChord(chord);
                                        setChordSelected(chord.name);
                                    }}
                                    onRemove={() => removeChord(index)}
                                    showRemove
                                    className="prog-build-btn prog-builder-chord-btn-added"
                                />
                            ))
                        ) : null}
                    </div>
                    <br />
                </section>
                <ProgressionSettingsComponent chords={currentProgression} loopId="prog-builder" />
                {chordSelected && (
                    <PianoDisplay chord={chordSelected} builderKeyboard={true} />
                )}
            </div></div>
    );
}

export default ProgressionBuilderComponent;