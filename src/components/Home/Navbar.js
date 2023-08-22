import React, { useState } from "react";
import "../../App.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-1.png";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const name = location.state?.name || "";
  const id = location.state?.id || "";
  console.log("name of user", name);
  console.log("id of user", id);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const navItems = [
    { label: "Home", link: "/" },
    { label: "My Reports", link: "/Reports" },
    { label: "FAQ's", link: "/FAQScreen" },
  ];

  return (
    <>
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
                  {name} &nbsp;
                  <i
                    className="fa fa-user-circle fa-2xl"
                    aria-hidden="true"
                  ></i>
                </Link>

                {/* Dropdown */}
                <ul className="dropdown-menu dropdown-width my-3">
                  &nbsp;
                  <li>
                    <Link className="dropdown-item" to="/">
                      My Progress
                    </Link>
                    &nbsp;
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/InterviewWarmUp">
                      Interview
                    </Link>
                  </li>
                  &nbsp;
                  <li>
                    <Link className="dropdown-item" to="/FAQScreen">
                      FAQ's
                    </Link>
                    &nbsp;
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Contact">
                      Contact Us
                    </Link>
                    &nbsp;
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/PIHome">
                      Predictive Index
                    </Link>
                    &nbsp;
                  </li>
                  <li>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      className="dropdown-item"
                      style={{ color: "red" }}
                    >
                      Logout
                    </Link>
                  </li>
                  &nbsp;
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <>
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h6>Do you want to logout?</h6>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                  Yes
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
