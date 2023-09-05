import React from "react";
import Dashboard from "../Layout/dashboard";
import "../../../index.css";
import { HiDownload } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const transaction = () => {
  const heading = [
    {
      title: "All",
      tag: 349,
    },
    {
      title: "Deposit",
      tag: 114,
    },
    {
      title: "Withdraw",
      tag: 213,
    },
    {
      title: "Trade",
      tag: 22,
    },
  ];

  return (
    <Dashboard title="Transactions">
      <div className="background">
        <div className="export-area d-flex justify-content-end">
          <button type="button" className="btn-deposit">
            <HiDownload />
            Export CSV
          </button>
        </div>
        <div className="table-width">
          <div className="table-border thead-row px-2 d-flex justify-content-between align-items-center">
            <div className="thead-tabs d-flex">
              {heading.map((item, index) => (
                <div
                  key={index}
                  className="table-tab d-flex gap-1 py-3 align-items-center"
                >
                  <span className="category">{item.title}</span>
                  <span className="table-tag">{item.tag}</span>
                </div>
              ))}
            </div>
            <div className="search-field">
              <button className="search-icon">
                <AiOutlineSearch />
              </button>
              <input
                type="text"
                className="search-input"
                placeholder="Search by ID or destination"
              />
            </div>
          </div>
          <div className="table-content d-flex justify-content-between py-3">
            <p className="table-caption">ID</p>
            <p className="table-caption">Date & Time</p>
            <p className="table-caption">Type</p>
            <p className="table-caption">Amount</p>
            <p className="table-caption">Status</p>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default transaction;
