import React from "react";
import { useState } from "react";
import UserGraph from "./userGraph";
import ReportGraph from "./reportGraph";

const Graph = () => {
  const cvData = [
    {
      name: "Nauman Ifthikar",
      email: "nauman@demo.com",
      similarity: "96%",
    },
    {
      name: "Samreen Kareem",
      email: "samreen@demo.com",
      similarity: "76%",
    },
    {
      name: "Abdul Sami",
      email: "sami@demo.com",
      similarity: "56%",
    },
  ];

  const sortedCvData = cvData
    .sort((a, b) => parseFloat(b.similarity) - parseFloat(a.similarity))
    .slice(0, 3);

  const [tab, setTab] = useState("tab1");
  const onTabClick = (val) => {
    setTab((prevTab) => {
      if (prevTab !== val) {
        return val;
      }
      return prevTab;
    });
  };

  /* Statistics & User Details Portion */
  return (
    <div className="transactions">
      <div className="price-side">
        <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex justify-content-between">
          <div>
            <p className="caption">Current Statistics</p>
          </div>
          <div className="d-flex my-xl-0 my-lg-0 my-md-0 my-sm-0 my-3 gap-2">
            <button
              className="btn-deposit d-flex align-items-center"
              type="button"
              style={{ width: "90px" }}
              onClick={() => {
                onTabClick("tab1");
              }}
            >
              Users
            </button>
            <button
              className="btn-deposit"
              type="button"
              style={{ width: "90px" }}
              onClick={() => {
                onTabClick("tab2");
              }}
            >
              Reports
            </button>
          </div>
        </div>
        <div className="img-area">
          {tab === "tab1" && <UserGraph />}
          {tab === "tab2" && <ReportGraph />}
        </div>
      </div>
      <div className="trans-side">
        <p className="caption mb-1">Users Detailed Information</p>
        {sortedCvData.map((item, index) => {
          return (
            <div className="mt-md-4 d-flex justify-content-between" key={index}>
              <div className="d-flex gap-3">
                <span className="dollar">{item.name.charAt(0)}</span>
                <div>
                  <p className="caption mb-0">{item.name}</p>
                  <p className="date-time">{item.email}</p>
                </div>
              </div>
              <span className="trans-price">{item.similarity}</span>
            </div>
          );
        })}
        <button type="button" className="mt-md-4 btn btn-block">
          View All
        </button>
      </div>
    </div>
  );
};

export default Graph;
