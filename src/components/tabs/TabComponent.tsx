import React, { useState, useEffect } from "react";
import ProgressionBuilderTab from "../tabs/ProgressionBuilderTab";
import ChordBuilderTab from "../tabs/ChordBuilderTab";
import "./Tab.css";

const TabComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = (event: any) => {
    const tab1 = document.getElementById("id-1");
    if (tab1) tab1.classList.add("active-tab");

    const tab2 = document.getElementById("id-2");
    if (tab2) tab2.classList.remove("active-tab");

    setActiveTab("tab1");
  };

  const handleTab2 = (event: any) => {
    const tab2 = document.getElementById("id-2");
    if (tab2) tab2.classList.add("active-tab");

    const tab1 = document.getElementById("id-1");
    if (tab1) tab1.classList.remove("active-tab");

    setActiveTab("tab2");
  };

  useEffect(() => {
    const tab1 = document.getElementById("id-1");
    if (tab1) tab1.classList.add("active-tab");
    const tab2 = document.getElementById("id-2");
    if (tab2) tab2.classList.remove("active-tab");
    return () => {};
  }, []);

  return (
    <div className="tabs">
      <ul className="tab-nav">
        <button id="id-1" onClick={(e) => handleTab1(e)}>
          Progression Builder
        </button>
        <button id="id-2" onClick={(e) => handleTab2(e)}>
          Chord Builder
        </button>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? <ProgressionBuilderTab /> : <ChordBuilderTab />}
      </div>
    </div>
  );
};

export default TabComponent;
