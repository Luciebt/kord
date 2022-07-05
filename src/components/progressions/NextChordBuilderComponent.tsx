// import React, { useState, useEffect } from "react";
// import { SoundOnContext } from "../../App";
// import { polySynth } from "../../audio/Synth";
// import { PlayChord } from "../../Chords";
// import ProgressionGridDisplayComponent from "./ProgressionGridDisplayComponent";

// export interface INextChordDisplayProps {
//   tonic?: string;
//   nextChords: string;
// }

// const NextChordBuilderComponent = ({
//   tonic,
//   nextChords,
// }: INextChordDisplayProps): JSX.Element => {
//   const SoundOn = React.useContext(SoundOnContext);

//   const Play = () => {
//     if (SoundOn && nextChords) {
//       polySynth.releaseAll();
//       PlayChord(nextChords);
//     }
//   };

//   // useEffect(() => {
//   //   return () => {};
//   // }, []);

//   return (
//     <section className="prog-box">
//       <h2>Suggested next chords</h2>
//       <h3>
//         {nextChords ? <button className="chord-btn">{nextChords}</button> : ""}
//       </h3>
//       <ProgressionGridDisplayComponent nextChords={nextChords} />
//     </section>
//   );
// };

// export default NextChordBuilderComponent;
