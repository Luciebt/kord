import React, { useState, useEffect } from "react";

interface IKeyButton {
  parentCallback?: any;
}

const KeyButton: React.FC<IKeyButton> = ({ parentCallback }) => {
  const [theKey, setKey] = useState("");

  useEffect(() => {
    // nothing for now.
  });

  // TODO: declare this as a global var to access to it easily.
  const notes: string[] = ["C", "D", "E", "F", "G", "A", "B"];

  return (
    <div className="">
      <h3>Set the key: {theKey}</h3>

      <button
        onClick={() => {
          const newKey = "C";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        C
      </button>
      <button
        onClick={() => {
          const newKey = "D";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        D
      </button>
      <button
        onClick={() => {
          const newKey = "E";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        E
      </button>
      <button
        onClick={() => {
          const newKey = "F";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        F
      </button>
      <button
        onClick={() => {
          const newKey = "G";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        G
      </button>
      <button
        onClick={() => {
          const newKey = "A";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        A
      </button>
      <button
        onClick={() => {
          const newKey = "B";
          setKey(newKey);
          parentCallback(newKey);
        }}
      >
        B
      </button>
    </div>
  );
};

export default KeyButton;
