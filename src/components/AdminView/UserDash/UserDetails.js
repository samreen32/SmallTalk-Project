import React, { useState } from "react";
import Dashboard from "../Dashboard/Layout/dashboard";
import { Link, useLocation } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Lottie from "lottie-react";
import Download from "../../Loader/Download";
import polygon from "../../../assets/img/Group 1.svg";
import { UserLogin } from "../../../context/AuthContext";

function UserDetails() {
  const { capitalizeFirst, levelDescriptions } = UserLogin();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reportScore = searchParams.get("reportScore");
  const oral = searchParams.get("oral");

  if (reportScore && oral) {
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }

  console.log("reportScore", reportScore);
  console.log("oral", oral);

  return (
    <Dashboard title="Dashboard">
      <div className="background">
        {/* CV Info */}
        <div className="test-section-container px-5 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0 mb-2">
          <div className="user-dash-div px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <div className="row">
                <div className="col-md-10">
                  <h1 className="test-title" style={{ fontSize: "32px" }}>
                    Name
                  </h1>
                  <p
                    className="content mt-4"
                    style={{ fontSize: "16px", marginBottom: "35px" }}
                  >
                    <p className=" mt-4">
                      {" "}
                      <b>Nationality:</b> Pakistani
                    </p>

                    <p className=" mt-4">
                      <b>Work experience:</b> 6 Years
                    </p>

                    <p className=" mt-4">
                      <b>Account: </b>Account: Free account
                    </p>

                    <p className=" mt-4">
                      {" "}
                      <b>Email:</b> nauman@demo.com
                    </p>

                    <p className=" mt-4">
                      {" "}
                      <b>Phone:</b> 123456789
                    </p>
                  </p>
                </div>
                <div className="col-md-2">
                  <div className="d-flex flex-column align-items-center">
                    <BsFillPersonFill className="user-dash-img" />
                    <Link
                      to=""
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "black",
                        textDecoration: "none",
                        justifyContent: "center",
                      }}
                    >
                      Download CV{" "}
                      <div
                        style={{ marginRight: "40px", marginBottom: "90px" }}
                      >
                        <Download />
                      </div>
                      {/* <span style={{ marginRight: "10px" }}>
                      </span> */}
                    </Link>

                    {/* <Link
                      to=""
                      className="test-start"
                      style={{
                        marginBottom: "30px",
                        // width: "85%",
                        // display: "flex",
                        // flexDirection: "column",
                        // textAlign: "center",
                        // justifyContent: "center",
                      }}
                    >
                      Download CV <Download/>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oral Report */}
        <div className="test-section-container px-5 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0 mb-2">
          <div className="user-dash-div px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <div className="row">
                <div className="col-md-8">
                  <div style={{ padding: "25px 0" }}>
                    <h1
                      className="test-title"
                      style={{ fontWeight: "bold", fontSize: "32px" }}
                    >
                      Oral Proficiency Report
                    </h1>
                    <h2 className="test-title my-4">
                      {reportScore ? capitalizeFirst(reportScore) : ""}
                    </h2>
                    <p className="card-text">
                      {reportScore
                        ? levelDescriptions[reportScore.toLowerCase()]
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row img-container">
                    <div
                      className="mt-neg d-flex justify-content-center align-items-center"
                      style={{
                        width: "100%",
                        height: "360px",
                        position: "relative",
                        padding: "0 0 0 25%",
                      }}
                    >
                      <img
                        src={polygon}
                        className="report_polygon img-fluid"
                        alt="polygon level"
                      />
                      <p
                        className="level-text position-absolute text-center m-0 "
                        style={{
                          color: "#2e68ff",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        {oral}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Index Test */}
        <div className="test-section-container px-5 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0 mb-2">
          <div className="user-dash-div px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <div className="row">
                <div className="col-md-8">
                  <div style={{ padding: "25px 0" }}>
                    <h1
                      className="test-title"
                      style={{ fontWeight: "bold", fontSize: "32px" }}
                    >
                      Predictive Index Test
                    </h1>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row img-container">
                    <div
                      className="mt-neg d-flex justify-content-center align-items-center"
                      style={{
                        width: "100%",
                        height: "360px",
                        position: "relative",
                        padding: "0 0 0 25%",
                      }}
                    >
                      <p
                        className="level-text position-absolute text-center m-0 "
                        style={{
                          color: "#2e68ff",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        In Progress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Short Audio Samples */}
        <div className="test-section-container px-5 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0 mb-2">
          <div className="user-dash-div px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <div className="row">
                <div className="col-md-12">
                  <div style={{ padding: "25px 0" }}>
                    <h1
                      className="test-title"
                      style={{ fontWeight: "bold", fontSize: "32px" }}
                    >
                      Short Audio Samples
                    </h1>

                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default UserDetails;
