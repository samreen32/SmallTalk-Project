import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import interview from "../../assets/img/interview.png";
import timer from "../../assets/img/TimeCircle.png";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";

export default function InterviewWarmUp() {
  const { timerValue, setIsTimerRunning, formatTimer } = UserLogin();

  return (
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
                    Smile: Start with a positive note, ask about the candidate’s
                    day and help them relax. Thank them for meeting with you.
                  </p>
                  <p className="card-text">
                    Introductions: Tell about (a) yourself, (b) the company, (c)
                    the open role. Let the candidate introduce themselves.{" "}
                  </p>
                  <p className="card-text">
                    Set the stage: Explain how the interview will be conducted.
                    What topics will be discussed? How long will it take?
                  </p>
                </>
                <Link
                  to="/InterviewQs"
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
  );
}
