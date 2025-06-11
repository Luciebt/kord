import React, { useState, useCallback, useMemo, useEffect } from "react";
import { TChord } from "../../types";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import ProgressionSettingsComponent from "../progressions/ProgressionSettings";
import "./Builder.scss";
import { PlayChord } from "../../Chords";
import { getRecommendedChordsForMode } from "../../utils/ChordUtils";
import { getSimplifiedChordLabel } from "../../utils/TextUtils";

const ProgressionBuilderComponent: React.FC<{}> = ({ }) => {
    const [selectedKey, setSelectedKey] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const [availableChords, setAvailableChords] = useState<Chord[]>();
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

    const removeChordFromProgression = useCallback((chordToRemove: TChord) => {
        setProgression((prev) => prev.filter((chord) => chord.id !== chordToRemove.id));

        // If TChord might not have a unique ID, or if you want to remove a specific instance
        // when there are duplicates, you might need to pass the index:
        // const removeChordByIndex = useCallback((indexToRemove: number) => {
        //   setProgression((prev) => prev.filter((_, index) => index !== indexToRemove));
        // }, []);

    }, []);

    const playChord = useCallback((chord: TChord) => {
        PlayChord(chord.name);
    }, []);

    return (
        <div>
            <h3>Available Chords</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                <KeyButton onPressKey={KeyCallback} />
                <ModeButton onPressMode={ModeCallback} fullModes={true} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Object.entries(groupedChords).map(([chordName, chords]) => (
                    <div key={chordName} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        {chords.map((chord) => (
                            <ChordButton
                                key={chord.id}
                                chordname={chord.name}
                                romanNumeral={chord.romanNumeral}
                                onClick={() => playChord(chord)}
                                onAdd={() => addChordToProgression(chord)}
                                showAdd
                                className="prog-builder-chord-btn"
                            />

                        ))}
                    </div>
                ))}
            </div>

            <h3>Your Progression</h3>
            <div className="results-container">
                {progression.length > 0 ? (
                    progression.map((chord, index) => (
                        <ChordButton
                            key={index}
                            chordname={chord.name}
                            btnId={index}
                            romanNumeral={chord.romanNumeral}
                            onClick={() => playChord(chord)}
                            onRemove={() => removeChordFromProgression(chord)}
                            showRemove
                            className="prog-builder-chord-btn-added"
                        />
                    ))
                ) : null}
            </div>

            <ProgressionSettingsComponent chords={currentProgression} loopId="prog-builder" />
        </div>
    );
}

export default ProgressionBuilderComponent;