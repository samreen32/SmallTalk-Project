import React, { useEffect } from "react";
import logo from "../../../../assets/img/logo-1.png";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { PiCaretUpBold } from "react-icons/pi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../../../context/AuthContext";
import logout from "../../../../assets/img/logout.png";
import { elements } from "chart.js";

const Navbar = () => {
  let navigation = useNavigate();
  const {
    userData,
    token,
    setToken,
    stickyNav,
    setstickyNav,
    toTop,
    settoTop,
  } = UserLogin();
  const { name } = userData || {};

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

  /* Logout Modal */
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  /* Logout Function to remove token */
  const handleLogout = async () => {
    const element = document.querySelectorAll(".modal-backdrop");
    element.forEach((item) => {
      item.style.display = "none";
    });
    localStorage.removeItem("csrfToken");
    navigation("/", {
      replace: true,
    });
  };

  /* Function to remove token after 1 min if user does not interact with page */
  useEffect(() => {
    let idleTimer;
    // const resetTimer = () => {
    //   clearTimeout(idleTimer);
    //   idleTimer = setTimeout(() => {
    //     localStorage.removeItem("csrfToken");
    //     localStorage.removeItem("userData");
    //     console.log("Token removed");
    //     navigation("/", { replace: true });
    //     setToken(null);
    //   }, 60000);
    // };

    // const handleUserInteraction = () => {
    //   resetTimer();
    // };

    // window.addEventListener("mousemove", handleUserInteraction);
    // window.addEventListener("keydown", handleUserInteraction);
    // resetTimer();
    // return () => {
    //   window.removeEventListener("mousemove", handleUserInteraction);
    //   window.removeEventListener("keydown", handleUserInteraction);
    //   clearTimeout(idleTimer);
    // };
  }, []);

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

      {/* Navbar Menu to show items when screen size larger */}
      <nav
        className={`navbar py-3 ${
          stickyNav && "fixed-top"
        } px-xl-5 px-lg-5 px-md-3 px-2 navbar-expand-lg navbar-light d-flex justify-content-between`}
      >
        <div className="brand">
          <Link to="/Main">
            <img
              src={logo}
              alt="CDS Logo"
              width="150%"
              height="150%"
              className="logo"
            />
          </Link>
        </div>
        <ul className="navbar-nav navbar-links d-xl-flex d-lg-flex d-none gap-xl-4 gap-lg-4 gap-0 mt-xl-0 mt-lg-0 mt-4">
          <li className="nav-items">
            <Link to="/Main" className="nav-link">
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
          <span className="user-name">
            {typeof name === "string" && name.length > 0
              ? name.charAt(0).toUpperCase() + name.slice(1)
              : "User"}
          </span>
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
              <Link className="dropdown-item" to="/Dashboard">
                My Progress
              </Link>
              &nbsp;
            </li>
            <li>
              <Link className="dropdown-item" to="/InterviewHome">
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
                data-bs-target="#exampleModal2"
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
      <div
        className={`modal fade ${modalOpen ? "show" : ""}`}
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!modalOpen}
        style={{
          display: modalOpen ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ textAlign: "center" }}>
              <div className="" style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <h5 className="my-3">
                <img src={logout} width={50} height={50} />{" "}
              </h5>
              <p>Want to logout?</p>
              <br />
              <div className="logout-buttons">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "20px", width: "100px" }}
                >
                  Not now
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  class="btn"
                  style={{
                    backgroundColor: "#5cb3cf",
                    color: "white",
                    borderRadius: "20px",
                    width: "100px",
                  }}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
