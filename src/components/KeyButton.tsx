import React, { useState, useEffect } from "react";

interface IKeyButton {}

const KeyButton: React.FC<IKeyButton> = ({}) => {
  const [theKey, setKey] = useState("");

  useEffect(() => {
    document.title = `You clicked ${theKey} times`;
  });

  return (
    <div className="">
      <h3>Set the key: {theKey}</h3>
      <button onClick={() => setKey("C")}>C</button>
      <button onClick={() => setKey("D")}>D</button>
      <button onClick={() => setKey("E")}>E</button>
      <button onClick={() => setKey("F")}>F</button>
      <button onClick={() => setKey("G")}>G</button>
      <button onClick={() => setKey("A")}>A</button>
      <button onClick={() => setKey("B")}>B</button>
    </div>
  );
};

export default KeyButton;
