import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { MdNotifications } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import DashboardLogo from "../../../assets/img/dashLogo.png";

const Sidebar = ({ setToggle, setsideToggle }) => {
  const onClose = () => {
    setsideToggle(false);
  };

  return (
    <div
      className={`sidebar ${setToggle ? "open-sidebar" : ""}`}
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="close-div ">
        <GrFormClose onClick={onClose} />
      </div>
      <div className="side-title text-center">
        <img src={DashboardLogo} alt="CDS" />
      </div>
      <div className="side-content mt-4 d-flex flex-column justify-content-sm-between">
        <ul className="navbar-nav">
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <NavLink to="/" className="nav-items-2 nav-link py-0">
              <BiSolidDashboard /> Dashboard
            </NavLink>
          </li>
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <NavLink to="" className="nav-items-2 py-0 nav-link">
              <TbArrowsDoubleNeSw /> Predictive Index
            </NavLink>
          </li>
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <NavLink to="" className="nav-items-2 nav-link py-0">
              <MdNotifications /> Notification
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav" style={{ fontWeight: "normal" }}>
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <FaUserPlus /> Profile
          </li>
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <IoMdSettings /> Setting
          </li>

          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <BiSupport /> Support
          </li>
          <li className="nav-items-2 py-3 px-3 mx-3 align-items-center">
            <RiLogoutBoxRFill /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;