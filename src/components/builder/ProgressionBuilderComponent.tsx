import React, { useState, useCallback, useMemo, useEffect } from "react";
import KeyButton from "../buttons/KeyButton";
import ModeButton from "../buttons/ModeButton";
import ProgressionSettingsComponent from "../progressions/ProgressionSettings";
import "./Builder.scss";
import { chordPatterns, keys, modes } from "./ProgressionBuilder";
import { TKey, TMode } from "../../types";
import { PlayChord } from "../../Chords";

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
        console.log("Selected Key:", tonic);
        setSelectedKey(tonic);
    }, [selectedKey, selectedMode]);

    const ModeCallback = useCallback((mode: string) => {
        console.log("Selected Mode:", mode);
        setSelectedMode(mode);
    }, [selectedKey, selectedMode]);

    useEffect(() => {
        if (selectedKey && selectedMode) {
            generateChords();
        }
    }, [selectedKey, selectedMode]);

    const generateChords = useCallback(() => {
        if (!selectedKey || !selectedMode) return [];
        const pattern = chordPatterns[selectedMode.toLowerCase()];
        if (!pattern) return [];

        const newChords = pattern.map((romanNumeral, index) => {
            let quality = '';
            if (romanNumeral.includes('°')) quality = 'dim';
            else if (romanNumeral === romanNumeral.toLowerCase()) quality = 'm';

            return {
                id: `${selectedKey}${quality}-${index}`,
                name: `${selectedKey}${quality}`,
                romanNumeral,
                root: selectedKey,
                quality,
                degree: index + 1
            };
        });

        setAvailableChords(newChords);
        console.log("Available Chords:", newChords);

        return availableChords;

    }, [selectedKey, selectedMode]);

    const groupedChords = (availableChords ?? []).reduce((acc, chord) => {
        if (!acc[chord.name]) {
            acc[chord.name] = [];
        }
        acc[chord.name].push(chord);
        return acc;
    }, {} as Record<string, Chord[]>);

    // const updateSelectedChord = useCallback(() => {
    //     const newChord = `${selectedKey}${selectedMode}`
    //     console.log("New Chord:", newChord);
    //     setSelectedChord(newChord);
    // }, [selectedKey, selectedMode]);

    const currentProgression = useMemo(() => {
        return progression.map(chord => chord.name);
    }, [progression]);


    const addChordToProgression = useCallback((chord: Chord) => {
        console.log("Adding Chord to Progression:", chord);
        setProgression((prev) => [...prev, chord]);
    }, [progression]);

    const playChord = useCallback((chord: Chord) => {
        console.log("Playing Chord:", chord);
        console.log("Chord Name:", chord.name);
        PlayChord(chord.name);
    }, []);




    return (
        <div>
            <h3>Available Chords</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                <KeyButton onPressKey={KeyCallback} />
                <ModeButton onPressMode={ModeCallback} fullModes={true} />
            </div>

            <div>
                {Object.entries(groupedChords).map(([chordName, chords]) => (
                    <div key={chordName} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {chords.map((chord) => (
                            <button
                                key={chord.id}
                                className="chord-btn"
                                onClick={() => playChord(chord)} // Play chord on click
                            >
                                {chord.name}
                                <p className="btn-caption">{chord.romanNumeral}</p>
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <h3>Your Progression</h3>
            <div className="results-container">
                {progression.length > 0 ? (
                    currentProgression.map((chord, index) => (
                        <div key={index} className="chord-item">
                            <span>{chord}</span>
                        </div>
                    ))
                ) : null}
            </div>

            <ProgressionSettingsComponent chords={currentProgression} loopId="prog-builder" />
        </div>
    );
}

export default ProgressionBuilderComponent;