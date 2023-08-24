import React, { useEffect } from "react";
import logo from "../../../../assets/img/logo-1.png";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { PiCaretUpBold } from "react-icons/pi";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Navbar = ({ stickyNav, setstickyNav, toTop, settoTop }) => {
  const location = useLocation();
  const name = location.state?.name || "";
  const id = location.state?.id || "";
  console.log("name of user", name);
  console.log("id of user", id);

  const [nav, setNav] = useState(false);
  const onOpen = () => {
    setNav(!nav);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    scrollY > stickyNav ? setstickyNav(true) : setstickyNav(false);
    scrollY > 300 ? settoTop(true) : settoTop(false);
  };

  useEffect(() => {
    const navbar = document.querySelector(nav);
    if (navbar) {
      const rect = navbar.getBoundingClientRect();
      setstickyNav(rect.height);
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Button show when scroll */}
      <button
        type="button"
        className="navigate-up"
        style={{ display: toTop ? "flex" : "none" }}
        onClick={scrollToTop}
      >
        <PiCaretUpBold />
      </button>

      {/* Navbar Menu to show items when screen size smaller */}
      <ul
        className={`navbar-nav mobile-nav d-xl-none d-lg-none d-block ${
          nav && "open-mobile-nav"
        } gap-xl-4 gap-lg-4 gap-0 mt-xl-0 mt-lg-0 mt-4`}
      >
        <div className="d-flex justify-content-end">
          <button type="button" className="close-btn">
            <MdOutlineClose
              className="close-icon"
              onClick={() => setNav(false)}
            />
          </button>
        </div>
        <li className="nav-items">
          <Link href="" className="nav-link">
            My Report
          </Link>
        </li>
        <li className="nav-items">
          <Link href="" className="nav-link">
            FAQs
          </Link>
        </li>
      </ul>

      {/* Navbar Menu to show items when screen size larger */}
      <nav
        className={`navbar py-3 ${
          stickyNav && "fixed-top"
        } px-xl-5 px-lg-5 px-md-3 px-2 navbar-expand-lg navbar-light d-flex justify-content-between`}
      >
        <div className="brand">
          <img
            src={logo}
            alt="CDS Logo"
            width="150%"
            height="150%"
            className="logo"
          />
        </div>
        <ul className="navbar-nav navbar-links d-xl-flex d-lg-flex d-none gap-xl-4 gap-lg-4 gap-0 mt-xl-0 mt-lg-0 mt-4">
          <li className="nav-items">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-items">
            <Link to="/Reports" className="nav-link">
              My Report
            </Link>
          </li>
          <li className="nav-items">
            <Link to="/FAQScreen" className="nav-link">
              FAQs
            </Link>
          </li>
        </ul>
        <div className="dropdown custom-dropdown d-flex gap-2 align-items-center">
          <span className="user-name">Name{name}</span>
          <a
            className="nav-link-home"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-user-circle fa-2xl" aria-hidden="true"></i>
            {/* <img src={navLogo} className="profile" alt="" /> */}
          </a>

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
              <Link className="dropdown-item" to="/Contact">
                Contact Us
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

          <button
            type="button"
            className="toggle-btn d-xl-none d-lg-none d-block"
            onClick={onOpen}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Logout Modal */}
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
};

export default Navbar;
