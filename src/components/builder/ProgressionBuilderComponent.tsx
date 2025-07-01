import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TChord } from "../../types";
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
    const [selectedKey, setSelectedKey] = useState("D#");
    const [selectedMode, setSelectedMode] = useState("Minor");
    const [availableChords, setAvailableChords] = useState<Chord[]>();
    const [chordSelected, setChordSelected] = useState<string | null>();

    type Chord = {
        id: string;
        name: string;
        romanNumeral: string;
        root: string;
        quality: string;
        degree: number;
        progressionId?: number;
    };
    const [progression, setProgression] = useState<Chord[]>([]);

    const KeyCallback = useCallback((tonic: string) => {
        setSelectedKey(tonic);
    }, [selectedKey, selectedMode]);

    const ModeCallback = useCallback((mode: string) => {
        setSelectedMode(mode);
    }, [selectedKey, selectedMode]);

    useEffect(() => {
        if (selectedKey && selectedMode) {
            generateChords();
        }
    }, [selectedKey, selectedMode]);

    const generateChords = useCallback(() => {
        if (!selectedKey || !selectedMode) return [];
        const chords = getRecommendedChordsForMode(selectedKey, selectedMode.toLocaleLowerCase()).map(chord => ({
            ...chord,
            name: getSimplifiedChordLabel(chord)
        }));
        console.log("Recommended Chords:", chords);
        setAvailableChords(chords);

    }, [selectedKey, selectedMode]);

    const groupedChords: Record<string, TChord[]> = (availableChords ?? []).reduce((acc: Record<string, TChord[]>, chord: TChord) => {
        if (!acc[chord.name]) {
            acc[chord.name] = [];
        }
        acc[chord.name].push(chord);
        return acc;
    }, {});

    const currentProgression = useMemo(() => {
        return progression.map(chord => chord.name);
    }, [progression]);

    const addChordToProgression = useCallback((chord: TChord) => {
        setProgression((prev) => [...prev, chord]);
    }, [progression]);

    const removeChordFromProgression = useCallback((indexToRemove: number) => {
        setProgression((prev) => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    const playChord = useCallback((chord: TChord) => {
        PlayChord(chord.name);
    }, []);

    const suggestNextChord = useCallback(() => {
        if (progression.length === 0) return;
        console.log("Suggesting next chord based on current progression:", progression);
    }, [progression]);

    return (
        <div className="centered-box">
            <h3>Pick chords</h3>
            <div className="buttons-container">
                <h4>Key</h4>
                <KeyButton onPressKey={KeyCallback} />
                <h4>Mode</h4>
                <ModeButton onPressMode={ModeCallback} fullModes={true} />

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
                                    onAdd={() => addChordToProgression(chord)}
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
                                    onRemove={() => removeChordFromProgression(index)}
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