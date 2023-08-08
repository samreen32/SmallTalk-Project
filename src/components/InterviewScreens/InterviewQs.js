import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import interview from "../../assets/img/interview.png";
import timer from "../../assets/img/TimeCircle.png";
import question from "../../assets/img/questions.png";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import "../../App.css";
import axios from "axios";
import audioBufferToWav from "audiobuffer-to-wav";

export default function InterviewQs() {
  /* States for Smaller Screens */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isScreenSmall = windowWidth <= 370;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Interview Qs States */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  /* Timer States */
  const {
    formatTimer,
    timerValue,
    setIsTimerRunning,
    setTimerValue,
    responseData,
    setResponseData,
  } = UserLogin();

  /* Function to handle finish interview state */
  const handleFinishInterview = () => {
    setIsTimerRunning(false);
    setTimerValue(0);
    const newWindow = window.open("_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };

  /* Recording States */
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  /* Functions for Managing Recording  */
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        setRecordedAudio(URL.createObjectURL(audioBlob));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleStopRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  /* Functions to Convert audio from Blob to WAV format */
  const blobToWav = async (blob) => {
    const audioContext = new AudioContext();
    const audioBuffer = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        audioContext.decodeAudioData(event.target.result, resolve, reject);
      };
      fileReader.readAsArrayBuffer(blob);
    });

    const wavBuffer = audioBufferToWav(audioBuffer);
    const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });
    return wavBlob;
  };

  const fetchBlobFromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  /* Function to handle the audio and send it to server */
  const handleAudio = async () => {
    try {
      // const response = await axios.get(
      //   "http://192.168.18.74:8000/user/get-csrf-token/"
      // );
      // console.log("dhsf");
      // if (!recordedAudio) {
      //   console.error("No audio recorded.");
      //   return;
      // }
      // console.log("end");

      // const blob = await fetchBlobFromUrl(recordedAudio);
      // const wavBlob = await blobToWav(blob);
      // console.log("converted audio to WAV:", wavBlob);

      // const formData = new FormData();
      // formData.append("file", wavBlob);
      // console.log("recorded audio getting ", wavBlob);

      // // Set the X-CSRF token in the request headers
      // axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken;
      // console.log("getting token", response.data.csrfToken);

      // const result = await axios.post(
      //   "http://192.168.18.74:8000/test/english/get-answer/",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      const result = {
        context:
          " Please call Stela. Ask her about to bring a big toy frog for the kids. She can scoop these things into three red bags and we will go meet her Wednesday at the train station.",
        similarity_score: [75.15367269515991],
        vocabulary_proficiency: {
          "Most Common Words:": [
            ["please", 1],
            ["call", 1],
            ["stela", 1],
            ["ask", 1],
            ["bring", 1],
            ["big", 1],
            ["toy", 1],
            ["frog", 1],
            ["kids", 1],
            ["scoop", 1],
          ],
          "Total Words:": 38,
          "Total Unique Words:": 19,
          "Lexical Diversity:": 0.5,
          level_words: {
            beginner: [
              "toy",
              "station",
              "big",
              "kids",
              "stela",
              "wednesday",
              "please",
              "bring",
              "red",
              "meet",
            ],
            elementary: [
              "bags",
              "ask",
              "three",
              "train",
              "go",
              "frog",
              "scoop",
              "things",
            ],
            intermediate: ["call"],
            "upper-intermediate": [""],
            advanced: [""],
          },
          level_words_percentage: {
            beginner: 52.63157894736842,
            elementary: 42.10526315789473,
            intermediate: 5.263157894736842,
            "upper-intermediate": 0.0,
            advanced: 0.0,
          },
        },
        word_per_minute: 43,
        duration: "0 Min 48 Sec",
        grammar_mistakes: [
          {
            context:
              " Please call Stela. Ask her about to bring a big toy frog ...",
            issue: "misspelling",
            start: 13,
            end: 18,
            suggestion: ["Steal", "Stella", "Estela"],
          },
          {
            context:
              "...n scoop these things into three red bags and we will go meet her Wednesday at the tr...",
            issue: "typographical",
            start: 118,
            end: 122,
            suggestion: [", and"],
          },
        ],
      };

      setResponseData((prevData) => [...prevData, result]);
      console.log("Getting Response:", result);
      // localStorage.setItem(
      //   "responseData",
      //   JSON.stringify([...responseData, result])
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEndInterview = () => {
    handleAudio();
    console.log("Interview Ended!");
  };

  /*Functions to handle Interview Qs */
  const interviewQuestions = [
    "Do you have any experience in a call center?",
    "Why do you want to work for us as a customer service agent?",
    "Do you enjoy communicating with people?",
    "How would you deal with an irate customer on the phone?",
    "How would you tell a customer something that they will not like?",
    "How do you feel about meeting goals and targets?",
    "How do you make sure you meet your targets?",
    "Are you able to cope well under pressure?",
    "Can you multi-task? typing while talking, for example?",
    "Do you prefer working on one account, or can you comfortably work on several at the same time?",
  ];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
          {/* Navbar */}
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
                  <li className="nav-item">
                    <Link
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{
                        backgroundColor: "#5cb3cf",
                        color: "floralwhite",
                      }}
                    >
                      <i
                        className="fa fa-stop-circle mx-1"
                        aria-hidden="true"
                      ></i>
                      Finish Interview
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Interview Qs */}
          <div
            className="container my-5"
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
                textAlign: "center",
              }}
            >
              <div className="card-body" style={{ padding: "20px" }}>
                <img
                  src={interview}
                  alt="interview"
                  className="my-3"
                  style={{
                    maxWidth: "100%",
                  }}
                />
                <p className="card-text my-4">
                  <b>{interviewQuestions[currentQuestionIndex]}</b>
                </p>
              </div>
            </div>
          </div>

          {/* Pause Resume Start Record Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            {isRecording ? (
              <div>
                {isPaused ? (
                  <>
                    {/* Resume Button */}
                    {isScreenSmall ? (
                      <Link
                        className="btn mx-2"
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#5cb3cf",
                          color: "floralwhite",
                        }}
                        onClick={handleResumeRecording}
                      >
                        <i className="fa fa-play" aria-hidden="true"></i>
                      </Link>
                    ) : (
                      <Link
                        className="btn mx-2"
                        style={{
                          marginTop: "12px",
                          fontSize: "14px",
                          padding: "10px 10px",
                          backgroundColor: "#5cb3cf",
                          color: "floralwhite",
                        }}
                        onClick={handleResumeRecording}
                      >
                        <i className="fa fa-play mx-1" aria-hidden="true"></i>
                        Resume
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {/* Pause button */}
                    {isScreenSmall ? (
                      <Link
                        className="btn mx-2"
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#5cb3cf",
                          color: "floralwhite",
                        }}
                        onClick={handlePauseRecording}
                      >
                        <i
                          className="fa fa-pause-circle"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    ) : (
                      <Link
                        className="btn mx-2"
                        style={{
                          marginTop: "12px",
                          fontSize: "14px",
                          padding: "10px 10px",
                          backgroundColor: "#5cb3cf",
                          color: "floralwhite",
                        }}
                        onClick={handlePauseRecording}
                      >
                        <i
                          className="fa fa-pause-circle mx-1"
                          aria-hidden="true"
                        ></i>
                        Pause
                      </Link>
                    )}
                  </>
                )}

                {/* Stop Button */}
                {isScreenSmall ? (
                  <Link
                    className="btn mx-2"
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#5cb3cf",
                      color: "floralwhite",
                    }}
                    onClick={handleStopRecording}
                  >
                    <i class="fa fa-stop mx-1" aria-hidden="true"></i>
                  </Link>
                ) : (
                  <Link
                    className="btn"
                    style={{
                      marginTop: "12px",
                      fontSize: "14px",
                      padding: "10px 12px",
                      backgroundColor: "#5cb3cf",
                      color: "floralwhite",
                    }}
                    onClick={handleStopRecording}
                  >
                    <i class="fa fa-stop mx-1" aria-hidden="true"></i> Stop
                  </Link>
                )}
              </div>
            ) : (
              /*** Record Button ****/
              <Link
                className="btn"
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  padding: "10px 10px",
                  backgroundColor: "#5cb3cf",
                  color: "floralwhite",
                }}
                onClick={handleStartRecording}
              >
                <i className="fa fa-microphone mx-1" aria-hidden="true"></i>
                Record
              </Link>
            )}

            {/* Next and Submit Button */}
            {currentQuestionIndex < interviewQuestions.length - 1 ? (
              <Link
                className="btn"
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  padding: "10px 10px",
                  backgroundColor: "#5cb3cf",
                  color: "floralwhite",
                }}
                onClick={handleNextQuestion}
              >
                Next
                <i
                  className="fa fa-angle-double-right mx-1"
                  aria-hidden="true"
                ></i>
              </Link>
            ) : (
              <Link
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  padding: "10px 10px",
                  backgroundColor: "#5cb3cf",
                  color: "floralwhite",
                }}
                onClick={handleEndInterview}
              >
                Submit
                <i class="fa fa-location-arrow mx-1" aria-hidden="true"></i>
              </Link>
            )}
          </div>
        </Paper>
      </Box>

      {recordedAudio && (
        <audio controls style={{ marginTop: "20px", width: "70%" }}>
          <source src={recordedAudio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Modal Finish Interview.. navbar*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>
                <b>Finish interview</b>
              </h5>
              <p>
                Are you sure you want to finish?
                <p style={{ color: "red" }}>
                  You will no longer be able to edit this interview.
                </p>
              </p>
              <p>
                <img src={question} alt="questions" />
                &nbsp; 6/6 questions answered
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "gray", color: "floralwhite" }}
              >
                Cancel
              </button>

              <Link
                to="/"
                className="btn"
                style={{ backgroundColor: "#5cb3cf", color: "floralwhite" }}
                onClick={handleFinishInterview}
              >
                Finish Interview
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Submit Interview.. bottom*/}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <h5>
                <b>Submit Interview</b>
              </h5>
              <p>Your response has been saved.</p>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: "#5cb3cf",
                  color: "floralwhite",
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
