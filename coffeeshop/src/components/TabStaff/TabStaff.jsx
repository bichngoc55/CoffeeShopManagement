"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import "./TabStaff.css";
const TabStaff = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const firstBtnRef = useRef();
  useEffect(() => {
    firstBtnRef.current.focus();
  }, []);
  return (
    <div>
      <div className="header">
        {items.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            className={selectedTab === index ? "buttonSelected" : "buttonTab"}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="contentContainer">
        {items.map((item, index) => (
          <div className={`${selectedTab === index ? "" : "hidden"}`}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabStaff;
