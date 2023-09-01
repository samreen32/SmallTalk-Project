import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import interview from "../../assets/img/interview.png";
import timer from "../../assets/img/TimeCircle.png";
import question from "../../assets/img/questions.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import "../../App.css";
import axios from "axios";
import audioBufferToWav from "audiobuffer-to-wav";
import Navbar from "../Home/HomeSections/Section1/Navbar";
import { TextField } from "@mui/material";
import { AUDIO_API_URL, AUTH_API_URL, INTERVIEW_API_URL } from "../../Auth_API";
import AppLoader from "../Loader/AppLoader";

export default function InterviewQs() {
  let navigation = useNavigate();
  /* States for Smaller Screens */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isScreenSmall = windowWidth <= 396;
  const isSmallXScreen = windowWidth <= 257;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Context States */
  const {
    interviewName,
    setInterviewName,
    isLoading,
    setIsLoading,
    updateError,
    error,
    setError,
    stickyNav,
    setstickyNav,
    toTop,
    settoTop,
    active,
    setActive,
    userData,
    formatTimer,
    timerValue,
    setIsTimerRunning,
    setTimerValue,
  } = UserLogin();

  /* Get user id state */
  const [responseData, setResponseData] = useState([]);
  const { id } = userData || {};

  /* Store Report Name State */
  const [credentials, setCredentials] = useState({
    reportName: "",
  });
  const { reportName } = credentials;
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
      if (!reportName.trim() || reportName.length < 3) {
        return updateError("Enter a valid report name!", setError);
      }

      setIsLoading(true);
      const response = await axios.get(`${AUTH_API_URL}/get-csrf-token/`);
      if (!recordedAudio) {
        console.error("No audio recorded.");
        return;
      }

      const blob = await fetchBlobFromUrl(recordedAudio);
      const wavBlob = await blobToWav(blob);

      const formData = new FormData();
      formData.append("file", wavBlob);
      formData.append("user_id", id);
      formData.append("user_name", interviewName);
      formData.append("report_name", reportName);

      // Set the X-CSRF token in the request headers
      axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken;
      console.log("getting token", response.data.csrfToken);

      const result = await axios.post(
        `${AUDIO_API_URL}/get-answer/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponseData((prevData) => [...prevData, result.data]);
      setIsLoading(false);
      navigation("/Reports", {
        replace: true,
      });
      setInterviewName("");
      setActive(2);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleEndInterview = () => {
    setIsTimerRunning(false);
    setTimerValue(0);
    setCurrentQuestionIndex(0);
    handleAudio();
  };

  /* Interview Qs States */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  /* Interview Qs fetch from backend */
  useEffect(() => {
    const fetchInterviewQuestions = async () => {
      try {
        const response = await fetch(`${INTERVIEW_API_URL}/get-question/`);
        if (response.ok) {
          const data = await response.json();
          setInterviewQuestions(data);
        } else {
          throw new Error("Failed to fetch interview questions");
        }
      } catch (error) {
        console.error("Error fetching interview questions:", error);
      }
    };
    fetchInterviewQuestions();
  }, []);

  // const interviewQuestions = [
  //   "Do you have any experience in a call center?",
  //   "Why do you want to work for us as a customer service agent?",
  //   "Do you enjoy communicating with people?",
  //   "How would you deal with an irate customer on the phone?",
  //   "How would you tell a customer something that they will not like?",
  //   "How do you feel about meeting goals and targets?",
  //   "How do you make sure you meet your targets?",
  //   "Are you able to cope well under pressure?",
  //   "Can you multi-task? typing while talking, for example?",
  //   "Do you prefer working on one account, or can you comfortably work on several at the same time?",
  // ];

  /* Function to handle finish interview state */
  const handleFinishInterview = () => {
    setIsTimerRunning(false);
    setTimerValue(0);
    setCurrentQuestionIndex(0);
  };

  /* Interview Qs Modal to Restrict Timer */
  const [timeSpentOnCurrentQuestion, setTimeSpentOnCurrentQuestion] =
    useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  /* Handle Next Qs */
  const handleNextQuestion = () => {
    if (timeSpentOnCurrentQuestion >= 1) {
      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      toggleModal();
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeSpentOnCurrentQuestion((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      setTimeSpentOnCurrentQuestion(0);
    };
  }, [currentQuestionIndex]);

  /* Lenght of Interview Questions */
  const totalQuestions = interviewQuestions.length;

  return (
    <>
      <Navbar />
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
                    <li className="nav-item my-2 question-center">
                      {currentQuestionIndex + 1}/{totalQuestions} Questions
                    </li>
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
                }}
              >
                <div className="card-body" style={{ padding: "20px" }}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={interview}
                      alt="interview"
                      className="my-3"
                      style={{
                        maxWidth: "100%",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <br />
                    {interviewQuestions.length > 0 && (
                      <p className="card-text">
                        <b>
                          {interviewQuestions[currentQuestionIndex].type ===
                            "image" &&
                            interviewQuestions[currentQuestionIndex]
                              .instruction}
                        </b>
                      </p>
                    )}
                  </div>

                  {interviewQuestions.length > 0 && (
                    <div className="card-text my-4">
                      <p>
                        <b>
                          {interviewQuestions[currentQuestionIndex].type ===
                            "text" &&
                            interviewQuestions[currentQuestionIndex]
                              .instruction}
                        </b>
                      </p>
                      <br />

                      <div
                        style={{
                          display: "flex",
                          flexDirection:
                            interviewQuestions[currentQuestionIndex].type ===
                            "text"
                              ? "column"
                              : "row",
                          alignItems:
                            interviewQuestions[currentQuestionIndex].type ===
                            "text"
                              ? "flex-start"
                              : "center",
                        }}
                      >
                        {interviewQuestions[currentQuestionIndex].type ===
                        "text" ? (
                          <>
                            <p className="my-4" style={{ margin: "0 auto" }}>
                              {interviewQuestions[currentQuestionIndex].details}
                            </p>
                          </>
                        ) : (
                          <img
                            src={`${INTERVIEW_API_URL}/get-question-image/${interviewQuestions[currentQuestionIndex].details}`}
                            alt="img question"
                            style={{
                              maxWidth: "40%",
                              height: "auto",
                              margin: "0 auto",
                              display: "block",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
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
                      <i className="fa fa-stop mx-1" aria-hidden="true"></i>
                    </Link>
                  ) : (
                    <Link
                      className="btn"
                      style={{
                        marginTop: "12px",
                        fontSize: "14px",
                        padding: "10px 10px",
                        backgroundColor: "#5cb3cf",
                        color: "floralwhite",
                      }}
                      onClick={handleStopRecording}
                    >
                      <i className="fa fa-stop mx-1" aria-hidden="true"></i>{" "}
                      Stop
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
                  className={`btn ${
                    isScreenSmall ? "btn-small-screen" : "btn-large-screen"
                  }`}
                  style={{ backgroundColor: "#5cb3cf", color: "floralwhite" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                >
                  {isScreenSmall ? (
                    <i
                      className="fa fa-location-arrow mx-1"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <>
                      <span>Submit</span>
                      <i
                        className="fa fa-location-arrow mx-1"
                        aria-hidden="true"
                      ></i>
                    </>
                  )}
                </Link>
              )}
            </div>

            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AppLoader />
                  <a href="/Reports" style={{ marginTop: "-100px" }}>
                    You can check your report at MyReport section
                  </a>
                </div>
              </div>
            ) : null}
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
                  &nbsp; {currentQuestionIndex + 1}/{totalQuestions} questions
                  answered
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
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "#5cb3cf", color: "floralwhite" }}
                  onClick={handleFinishInterview}
                >
                  Finish Interview
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Report Name and Submit.. bottom*/}
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
                  <b>Provide a Name to Report</b>
                </h5>
                <TextField
                  label="Report Name"
                  variant="outlined"
                  name="reportName"
                  value={reportName}
                  onChange={onChange}
                  margin="normal"
                  sx={{ width: "100%" }}
                  required
                  error={error && (!reportName.trim() || reportName.length < 3)}
                  helperText={
                    error &&
                    (!reportName.trim() || reportName.length < 3) &&
                    "Report name must be at least 3 characters long!"
                  }
                />
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
                  onClick={handleEndInterview}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Timer for Interview Questions.. bottom*/}
        <div
          className={`modal fade ${modalOpen ? "show" : ""}`}
          id="exampleModal3"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!modalOpen}
          style={{
            display: modalOpen ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            style={{ maxWidth: "300px", borderRadius: "10px" }}
          >
            <div className="modal-content">
              <div className="modal-body" style={{ textAlign: "center" }}>
                <div className="" style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleModal}
                  ></button>
                </div>
                <h5 className="my-3">
                  <i
                    class="fa fa-info-circle fa-2xl my-3"
                    style={{ color: "#61dafb" }}
                    aria-hidden="true"
                  ></i>{" "}
                </h5>
                <br />
                <p>
                  You have to provide the answer <br />
                  in minimum of 30 seconds.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
