import React, { useState, useEffect } from "react";
import ProgressionDictionnaryTab from "../tabs/ProgressionDictionnaryTab";
import ChordBuilderTab from "../tabs/ChordBuilderTab";
import ProgressionBuilderTab from "../tabs/ProgressionBuilderTab";
import { unPressElementsStyleWithoutEvent } from "../hooks/unPressElementStyle";
import "./Tab.css";

const TabComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("tab-id-1");

  const handleTab = (event: any) => {
    unPressElementsStyleWithoutEvent("active-tab");
    const tabId = event.target.id;
    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add("active-tab");

    setActiveTab("tab-" + tabId);
  };

  useEffect(() => {
    const tab1 = document.getElementById("id-1");
    if (tab1) tab1.classList.add("active-tab");
    return () => {};
  }, []);

  return (
    <div className="tabs">
      <ul className="tab-nav">
        <button id="id-1" onClick={(e) => handleTab(e)}>
          Progressions
        </button>
        <button id="id-2" onClick={(e) => handleTab(e)}>
          Chords
        </button>
        <button id="id-3" onClick={(e) => handleTab(e)}>
          Builder
        </button>
      </ul>
      <div className="outlet">
        {activeTab === "tab-id-1" ? (
          <ProgressionDictionnaryTab />
        ) : activeTab === "tab-id-2" ? (
          <ChordBuilderTab />
        ) : (
          <ProgressionBuilderTab />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
