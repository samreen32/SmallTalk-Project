import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import interview from "../../assets/img/interview.png";
import timer from "../../assets/img/TimeCircle.png";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import Navbar from "../Home/HomeSections/Section1/Navbar";

export default function InterviewWarmUp() {
  const { timerValue, setIsTimerRunning, formatTimer } = UserLogin();

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1000px",
            width: "80%",
            height: "90%",
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: "100%",
              height: "100%",
              padding: "20px",
              borderRadius: "20px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Interview with CDS
                </a>
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
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item my-2">
                      <img src={timer} alt="timer" />
                    </li>
                    <li className="nav-item mx-2 my-2">
                      <div>{formatTimer(timerValue)} / 56:00</div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                className="card"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body" style={{ padding: "20px" }}>
                  <img
                    src={interview}
                    alt="..."
                    className="my-3"
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                  <h3 className="card-title">
                    <b>Warmup</b>
                  </h3>
                  <>
                    <p className="card-text my-4">
                      Before you begin the test, let's warm up your speaking
                      skills and get you ready for a successful assessment.
                    </p>
                    <p className="card-text">
                      This warm-up session will help you feel more comfortable
                      and confident in your verbal communication abilities.
                      Follow the prompts, engage in short conversations, and
                      focus on clear pronunciation and coherent expression.
                    </p>
                    <p className="card-text">
                      This practice will ensure that you're fully prepared to
                      showcase your language proficiency during the assessment.
                      Let's get started!
                    </p>
                  </>
                  <Link
                    to={`/InterviewQs`}
                    className="btn"
                    style={{
                      marginTop: "12px",
                      fontSize: "14px",
                      padding: "6px 12px",
                      backgroundColor: "#5cb3cf",
                      color: "floralwhite",
                    }}
                    onClick={() => setIsTimerRunning(true)}
                  >
                    Go to Questions
                  </Link>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </>
  );
}
