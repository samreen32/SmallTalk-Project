import React from "react";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { UserLogin } from "../../../../context/AuthContext";

const Topnav = ({ title, onOpen }) => {
  const { userData } = UserLogin();
  const { name } = userData || {};

  return (
    <div className="top-nav d-flex align-items-center justify-content-between">
      <div className="title-top">
        <h1 className="title m-0">{title}</h1>
      </div>
      <div className="dropdown">
        <span className="admin-name">
          {typeof name === "string" && name.length > 0
            ? name.charAt(0).toUpperCase() + name.slice(1)
            : "User"}
        </span>
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
