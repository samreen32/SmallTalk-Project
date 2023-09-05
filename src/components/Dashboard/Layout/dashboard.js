import React from "react";
import Sidebar from "./sidebar";
import Topnav from "./topnav";
import CustomHook from "../Configure/customHook";

const dashboard = ({ children, title }) => {
  const [setToggle, setsideToggle, onOpen] = CustomHook();

  return (
    <div className="d-flex flex-row" style={{ overflowY: "hidden" }}>
      <Sidebar setToggle={setToggle} setsideToggle={setsideToggle} />
      <div className="flex-grow-1" style={{ minWidth: "0" }}>
        <Topnav
          title={title}
          setToggle={setToggle}
          setsideToggle={setsideToggle}
          onOpen={onOpen}
        />
        {children}
      </div>
    </div>
  );
};

export default dashboard;