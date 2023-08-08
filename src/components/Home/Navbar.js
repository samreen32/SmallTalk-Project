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
            <li className="nav-item dropdown custom-dropdown">
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

    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand d-flex align-items-center" to="/">
    //       <h3 className="my-1 mx-5">
    //         <img
    //           src={logo}
    //           alt="Logo"
    //           width="100%"
    //           height="100%"
    //           className="d-inline-block align-text-top"
    //         />
    //       </h3>
    //     </Link>

    //     <div className="App">
    //       <div className="container-fluid">
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#navbarSupportedContent"
    //           aria-controls="navbarSupportedContent"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <span className="navbar-toggler-icon"></span>
    //         </button>

    //         <div
    //           className="collapse navbar-collapse"
    //           id="navbarSupportedContent"
    //         >
    //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //             <div className="mx-5 my-2">
    //               <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
    //                 {/* Home Item */}
    //                 <li className="nav-item mx-1">
    //                   <Link
    //                     className={`nav-link ${
    //                       location.pathname === "/" ? "active" : ""
    //                     }`}
    //                     aria-current="page"
    //                     to="/"
    //                   >
    //                     <div className="d-flex align-items-center">
    //                       <h6 className="my-3">Home</h6>
    //                     </div>
    //                   </Link>
    //                 </li>
    //                 {/* My Reports Item */}
    //                 <li className="nav-item mx-1">
    //                   <Link
    //                     className={`nav-link ${
    //                       location.pathname === "/MyReports" ? "active" : ""
    //                     }`}
    //                     to="/MyReports"
    //                   >
    //                     <div className="d-flex align-items-center">
    //                       <h6 className="my-3">My Reports</h6>
    //                     </div>
    //                   </Link>
    //                 </li>

    //                 {/* More Item */}
    //                 <>
    //                   <ul className="navbar-nav d-sm-inline-flex justify-content-end">
    //                     <li className="col-4 col-sm-4 nav-item dropdown custom-dropdown">
    //                       <Link
    //                         className={`nav-link ${
    //                           location.pathname === "/" ? "active" : ""
    //                         }`}
    //                         role="button"
    //                         id="dropdownMenuLink"
    //                         data-bs-toggle="dropdown"
    //                         aria-expanded="false"
    //                         onClick={handleDropdownToggle}
    //                       >
    //                         <div>
    //                           <i
    //                             className={`fa ${
    //                               isDropdownOpen ? "fa-user" : "fa-user"
    //                             } fa-xl my-4 mx-5`}
    //                             aria-hidden="true"
    //                           ></i>
    //                         </div>
    //                       </Link>
    //                       <ul
    //                         className={`dropdown-menu ${
    //                           isDropdownOpen ? "show" : ""
    //                         } dropdown-width`}
    //                         aria-labelledby="dropdownMenuLink"
    //                       >
    //                         {/* <li>
    //                           <Link className="dropdown-item" to="/Profile">
    //                             <i className="fa fa-user" aria-hidden="true"></i>
    //                             &nbsp; Profile
    //                           </Link>
    //                         </li> */}
    //                         <li>
    //                           <Link className="dropdown-item" to="/Progress">
    //                             <i
    //                               className="fa fa-pie-chart"
    //                               aria-hidden="true"
    //                             ></i>
    //                             &nbsp; My Progress
    //                           </Link>
    //                         </li>
    //                         <li>
    //                           <Link className="dropdown-item" to="/FAQ">
    //                             <i
    //                               className="fa fa-question-circle"
    //                               aria-hidden="true"
    //                             ></i>
    //                             &nbsp; FAQ's
    //                           </Link>
    //                         </li>
    //                         <li>
    //                           <Link className="dropdown-item" to="/ContactUs">
    //                             <i className="fa-solid fa-address-card"></i>
    //                             &nbsp; Contact Us
    //                           </Link>
    //                         </li>
    //                         <li>
    //                           <Link className="dropdown-item" to="/Logout">
    //                             <i className="fa-solid fa-right-to-bracket"></i>
    //                             &nbsp; Logout
    //                           </Link>
    //                         </li>
    //                       </ul>
    //                     </li>
    //                   </ul>
    //                 </>
    //               </ul>
    //             </div>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}
