import React, { useState } from "react";
import "../../App.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo-1.png";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const navItems = [
    { label: "Home", link: "/" },
    { label: "My Reports", link: "/Reports" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary mx-5"
      style={{ fontWeight: "bold" }}
    >
      <div className="container-fluid my-2">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="150%"
            height="150%"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item mx-3 ${
                  activeItem === index ? "active" : ""
                }`}
              >
                <NavLink
                  className="nav-link"
                  to={item.link}
                  activeClassName="active"
                  onClick={() => handleItemClick(index)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown custom-dropdown mx-5">
              <Link
                className="nav-link-home dropdown"
                to=""
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Name &nbsp;
                <i className="fa fa-user-circle fa-2xl" aria-hidden="true"></i>
              </Link>

              {/* Dropdown */}
              <ul className="dropdown-menu dropdown-width my-3">
                <li>
                  <Link className="dropdown-item" to="/InterviewWarmUp">
                    My Progress
                  </Link>
                </li>
                &nbsp;
                <li>
                  <Link className="dropdown-item" to="/PIHome">
                    FAQ's
                  </Link>
                  &nbsp;
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Contact Us
                  </Link>
                  &nbsp;
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/"
                    style={{ color: "red" }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
