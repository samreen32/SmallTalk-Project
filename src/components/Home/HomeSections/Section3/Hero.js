import React from "react";
import polygon from "../../../../assets/graph1.png";
import robot from "../../../../assets/robo.png";
import ProgressBar from "../Section2/ProgressBar";
import { Link } from "react-router-dom";

const Hero = ({ stickyNav, active, setActive }) => {
  return (
    <div
      id="hero"
      className="container-fluid"
      style={{ marginTop: stickyNav && "6rem" }}
    >
      <ProgressBar active={active} setActive={setActive} />

      <div className="test-section row gap-3 px-3 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0">
        {/* Speaking Level Test Div */}
        <div className="speak-test px-xl-3 px-lg-3 px-md-3 px-2">
          <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
            <h2 className="test-title">Speaking Level Test</h2>
            <p className="content mt-3">
              Find out your English level and get level up recommendations{" "}
              <br /> Free plan allows one attempt,{" "}
              <span>
                <a href="" className="plan">
                  Pro plan
                </a>
              </span>{" "}
              allows unlimited attempts
            </p>
            <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex  d-block justify-content-between">
              <div>
                <Link to="/InterviewWarmUp" className="test-start">
                  Start
                </Link>
              </div>
              <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center">
                <img src={polygon} className="polygon" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Index Div */}
        <div className="predictive px-xl-3 px-lg-3 px-md-3 px-2">
          <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
            <h2 className="test-title">Predictive Index</h2>
            <p className="content mt-3">
              Please select the language in which you prefer to complete the
              assessment. Your language selection is not reflected in your
              assessment results.
            </p>
            <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex  d-block justify-content-between">
              <div>
                <Link to="/PIHome" className="test-start">
                  Start
                </Link>
              </div>
              <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center">
                <img src={robot} className="robot" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
