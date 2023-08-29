import React from "react";
import CDS from "../../../../assets/img/CDS_Logo_Footer.png";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  return (
    <div id="footer" className="container-fluid">
      <div className="bg-cds py-5" style={{ backgroundColor: "#f2f2f5" }}>
        <div className="footer-grid">
          {/* CDS Logo */}
          <div className="px-3 px-sm-3 px-md-0 px-lg-0 text-xl-center text-lg-center text-md-center text-start">
            <img
              src={CDS}
              className="footer-logo"
              alt="CDF"
              title="CDS"
              width="50%"
              height="50%"
            />
          </div>

          {/* We Offer Section */}
          <div className="mt-md-0 offer ">
            <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>WE OFFER</h3>
            <ul
              className="navbar-nav"
              style={{ fontSize: "16px", fontWeight: "normal" }}
            >
              <li className="nav-items">Customer Center Services</li>
              <li className="nav-items">Data Collection & Analysis</li>
              <li className="nav-items">Back Ofice Support</li>
              <li className="nav-items">Brand Experience Services</li>
              <li className="nav-items">Training Delivery</li>
            </ul>
          </div>

          {/* Contact us Section */}
          <div className="foot-contact">
            <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>CONTACT US</h3>
            <ul
              className="navbar-nav"
              style={{ fontWeight: "normal", fontSize: "16px" }}
            >
              <li className="nav-items">
                Curaçao: <br /> +(5999) 738 4986
              </li>
              <li className="nav-items mt-4">
                Email: <br /> Training Delivery
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-footer d-flex flex-column gap-3 align-items-center justify-content-center">
        <div className="social-media d-flex gap-3 justify-content-center">
          <a
            href="https://www.facebook.com/caribglobaldataservices"
            target="_blank"
          >
            <FaFacebookF className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/caribglobal-data-services-b.v./"
            target="_blank"
          >
            <BiLogoLinkedin className="social-icon" />
          </a>
        </div>
        <div className="copy-right">©2023 by Caribglobal Data Services</div>
      </div>
    </div>
  );
};

export default Footer;
