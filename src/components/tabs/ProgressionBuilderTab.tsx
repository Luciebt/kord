import React from "react";
import ChordBuilderComponent from "../progressions/ChordBuilderComponent";

const ProgressionBuilderTab = (): JSX.Element => {
  const showComingSoon = true;

  return showComingSoon ? (
    <h2 style={{ textAlign: "center", marginTop: "20px" }}>COMING SOON</h2>
  ) : (
   <div></div> 
    // <ChordBuilderComponent />
  );
};

export default ProgressionBuilderTab;
