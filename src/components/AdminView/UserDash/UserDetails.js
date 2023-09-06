import React from "react";
import Dashboard from "../Dashboard/Layout/dashboard";
import robot from "../../../assets/img/robot.png";
import { Link } from "react-router-dom";

function UserDetails() {
  return (
    <Dashboard title="Dashboard">
      <div className="background">
        <div className="test-section-container px-5 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0">
          <div className="user-dash-div px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <div className="row">
                <div className="col-md-10">
                  <h1 className="test-title" style={{ fontSize: "32px" }}>
                    Name
                  </h1>
                  <p
                    className="content mt-5"
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
                    <img src={robot} className="user-dash-img" alt="" />

                    <Link
                      to="/"
                      className="test-start"
                      style={{ marginBottom: "30px" }}
                    >
                      Download CV
                    </Link>
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
