import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Home/HomeSections/Section1/Navbar";

function Contact() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "7% 10%" }}>
        <div class="card">
          <div class="card-body" style={{ color: "gray" }}>
            <h2 class="card-title">
              <b>Contact Us</b>
            </h2>
            <p class="card-text my-2">
              If you have any questions, please reach out to
              <Link> support@cdn.me.</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;