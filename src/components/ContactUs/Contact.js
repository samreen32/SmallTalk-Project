import React from "react";
import Navbar from "../Home/HomeSections/Section1/Navbar";
import contact from "../../assets/img/Image-01.svg";
import cdsLogo from "../../assets/img/CDS_Logo_Footer.png";
import { TextField, MenuItem } from "@mui/material";
import call from "../../assets/img/call.svg";
import email from "../../assets/img/Mail.svg";
import support from "../../assets/img/Icon-help.svg";
import "../../App.css";

function Contact() {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <>
      <Navbar />

      {/* <header className="jumbotron">
          <div class="card text" style={{ maxHeight: "50%" }}>
            <img
              src={contact}
              width="100%"
              height="100%"
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay">
              <div
                class="col-12 col-sm-6 my-5"
                style={{
                  margin: "auto",
                  display: "block",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <h1>Contact Us</h1>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <div
                style={{
                  padding: "7% 10%",
                  backgroundColor: "#FFFFFF",
                  width: "70%",
                  margin: "auto",
                  display: "block",
                  alignItems: "center",
                  color: "black",
                }}
                className="my-5"
              >
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header> */}

      <div style={{ position: "relative" }}>
        {/* Contact Form */}
        <div
          style={{
            padding: "7% 10%",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            width: "70%",
            margin: "auto",
            display: "block",
            alignItems: "center",
            color: "black",
            position: "absolute",
            top: "80%",
            left: "0",
            right: "0",
          }}
        >
          <img
            src={cdsLogo}
            alt="Logo"
            width="25%"
            height="25%"
            style={{
              margin: "auto",
              display: "block",
              textAlign: "center",
              alignItems: "center",
            }}
          />
          <form className="my-5">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Your name*
                </label>
                <div className="mb-3">
                  <TextField required id="name" variant="filled" fullWidth />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="contactEmail" className="form-label">
                  Contact email*
                </label>
                <div className="mb-3">
                  <TextField
                    required
                    id="contactEmail"
                    variant="filled"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Company name*
                </label>
                <div className="mb-3">
                  <TextField required id="name" variant="filled" fullWidth />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="contactEmail" className="form-label">
                  Country*
                </label>
                <div className="mb-3">
                  <TextField
                    id="country"
                    select
                    helperText="Please select your country"
                    variant="filled"
                    style={{ width: "100%" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        {"  "}
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
            <label htmlFor="contactEmail" className="form-label">
              Your message*
            </label>

            <div className="mb-3">
              <textarea
                class="form-control"
                placeholder="Type your message here...."
                id="floatingTextarea"
              ></textarea>
            </div>

            <p style={{ color: "#5A7184" }}>
              {" "}
              By submitting this form you agree to our terms and conditions and
              our Privacy Policy which explains how we may collect, use and
              disclose your personal information including to third parties.
            </p>
            <button
              type="submit"
              className="btn project-button"
              // style={{ width: "20%" }}
            >
              Contact
            </button>
          </form>
        </div>

        {/* Contact Header */}
        <header class="jumbotron">
          <div
            style={{
              margin: "auto",
              display: "block",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <div class="row row-header">
              <div
                class="col-12 col-sm-6"
                style={{
                  margin: "auto",
                  display: "block",
                  textAlign: "center",
                  alignItems: "center",
                  // marginTop: "-100px"
                }}
              >
                <h1 style={{ fontSize: "4vw" }}>
                  <b>Contact Us</b>
                </h1>
                <p className="my-3">
                  If you need our help, have questions about how to use the
                  platform or are experiencing technical difficulties, please do
                  not hesitate to contact us.
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Contact footer */}
      <div className="contentFooter">
        <div class="row">
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={email} className="my-3" />
                </div>
                <h5 class="card-title my-3">Email us</h5>
                <p class="card-text">
                  Email us for general queries, including marketing and
                  partnership opportunities.
                </p>
                <p className="contact-p">cds@helpcenter.com</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={call} className="my-3" />
                </div>
                <h5 class="card-title my-3">Call us</h5>
                <p class="card-text">
                  Call us to speak to a member of our team. We are always happy
                  to help.
                </p>
                <p className="contact-p">+1 (123) 456-7890</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card bg-transparent">
              <div class="card-body">
                <div className="contact-bg">
                  <img src={support} className="my-3" />
                </div>
                <h5 class="card-title my-3">Support</h5>
                <p class="card-text">
                  Check out helpful resources, FAQs and developer tools.
                </p>
                <button className="btn btn-outline-info contact-p">
                  Support Center{" "}
                  <i
                    class="fa fa-arrow-right"
                    color="#5CB3CF"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
