import React, { useState } from "react";
import ProgressionDictionnaryTab from "../tabs/ProgressionDictionnaryTab";
import ProgressionBuilderTab from "../tabs/ProgressionBuilderTab";
import { unPressElementsStyleWithoutEvent } from "../../hooks/unPressElementStyle";
import "./Tab.scss";

const TabComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("tab-id-1");

  const handleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    unPressElementsStyleWithoutEvent("active-tab");
    event.currentTarget.classList.add("active-tab");
    const tabId = event.currentTarget.id;
    setActiveTab("tab-" + tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab-id-1":
        return <ProgressionDictionnaryTab />;
      case "tab-id-2":
        return <ProgressionBuilderTab />;
      default:
        return null;
    }
  };

  return (
    <div className="content">
      <ul arial-label="tabs" className="box tab-nav">
        <button id="id-1" onClick={handleTab} className="active-tab">
          Progressions List
        </button>
        <button id="id-2" onClick={handleTab}>
          Progressions Builder
        </button>
      </ul>
      <div className="outlet">{renderTabContent()}</div>
    </div>
  );
};

export default TabComponent;
