import React from "react";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Topnav = ({ title, onOpen }) => {
  return (
    <div className="top-nav d-flex align-items-center justify-content-between">
      <div className="title-top">
        <h1 className="title m-0">{title}</h1>
      </div>
      <div className="dropdown">
        <span className="admin-name">Angelo</span>
        <button className="btn btn-user" type="button">
          <FaUser />
        </button>
        <button className="btn btn-toggle" type="button" onClick={onOpen}>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Topnav;