// import React, { useState, useContext, useEffect } from "react";
// import KeyButton from "./buttons/KeyButton";
// import ModeButton from "./buttons/ModeButton";
// import NextChordBuilderComponent from "./progressions/NextChordBuilderComponent";
// import { FindNextChords } from "../ProgressionBuilder";
// import { PlayChord } from "../Chords";

// const ProgressionBuilderComponent = (): JSX.Element => {
//   const [chordKey, setChordKey] = useState("");
//   const [chordMode, setChordMode] = useState("");
//   const [nextChords, setnextChords] = useState("");

//   const KeyCallback = (key: string) => {
//     setChordKey(key);
//   };

//   const ModeCallback = (mode: string) => {
//     setChordMode(mode);
//   };

//   useEffect(() => {
//     if (chordKey && chordMode) {
//       const next = FindNextChords(chordKey, chordMode) as string;
//       setnextChords(next);
//       console.log(next);
//     }
//   }, [chordKey, chordMode]);

//   return (
//     <section className="centered-box">
//       <div className="prog-chooser-box">
//         <KeyButton onPressKey={KeyCallback} />
//         <ModeButton onPressMode={ModeCallback} />{" "}
//       </div>
//       <NextChordBuilderComponent nextChords={nextChords} />
//     </section>
//   );
// };

// export default ProgressionBuilderComponent;
