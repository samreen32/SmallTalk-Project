import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import interview from "../../assets/img/interview.png";
import circle from "../../assets/img/HalfCircle.png";
import rectangle from "../../assets/img/rectangles.png";

export default function InterviewHome() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // maxWidth: "1000px",
          // width: "80%",
          // height: "90%",
        }}
      >
        <Paper
          elevation={3}
          style={{
            // width: "100%",
            height: "100%",
            padding: "20px",
            borderRadius: "20px",
            position: "relative",
          }}
        > */}
      {/* <img src={circle} alt="circle" className="circle-image" /> */}

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          className="card"
          style={{
            width: "60%",
            margin: "0 auto",
            borderRadius: "15px",
          }}
        >
          <div className="card-body">
            <img src={interview} alt="..." className="my-3" />
            <h3 className="card-title">
              <b>Interview with CDS</b>
            </h3>
            <p className="card-text">For Leadership Potential.</p>

            <p className="card-text my-4">
              This interview is for the role of Translation Interview.
              <br />
              This interview will consist of 10 questions and take approximately
              56 minutes. You will be prompted to answer questions and write
              notes. You may always go back and edit answers.
              <div
                className="my-3"
                style={{ border: "dotted", color: "gray" }}
              ></div>
              <TextField
                label="Enter Your Name"
                variant="outlined"
                name="name"
                // value={name}
                // onChange={onChange}
                margin="normal"
                sx={{ width: "100%" }}
                required
              />
              <Link
                to="/Interview_1"
                className="btn my-2"
                style={{ backgroundColor: "#5cb3cf", color: "floralwhite" }}
              >
                View questions
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <img
        src={rectangle}
        alt="rectangle"
        style={{
          position: "absolute",
          top: "45%",
          right: "15%",
          width: "40%",
          maxWidth: "350px",
          height: "auto",
          opacity: 0.3,
        
        }}
      /> */}
      {/* </Paper>
      </Box> */}
    </div>
  );
}
