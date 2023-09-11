import React, { useState } from "react";
import polygon from "../../../../assets/graph1.png";
import robot from "../../../../assets/robo.png";
import cvImg from "../../../../assets/img/cv-upload.png";
import ProgressBar from "../Section2/ProgressBar";
import { Link } from "react-router-dom";
import { UserLogin } from "../../../../context/AuthContext";

const Hero = () => {
  const { stickyNav, active, setActive } = UserLogin();

  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState(null);

  function handleFileUpload(selectedFiles) {
    if (selectedFiles.length > 0) {
      setFileSelected(true);
      setFile(selectedFiles[0]); // Store the selected file in state
    } else {
      console.log("No file selected.");
    }
  }

  function uploadFileToServer() {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://192.168.18.122:8000/upload_pdf/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("cv data", data);
          // Handle the server's response here if needed
        })
        .catch((error) => {
          console.error("Error uploading CV:", error);
        });
    } else {
      console.log("No file to upload.");
    }
  }

  return (
    <div
      id="hero"
      className="container-fluid"
      style={{ marginTop: stickyNav && "6rem" }}
    >
      <ProgressBar active={active} setActive={setActive} />

      <div className="test-section-container row gap-3 px-3 justify-content-center pt-xl-4 pt-lg-4 pt-md-3 pt-0">
        <>
          {/* CV Div */}
          <div className="speak-test px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <h2 className="test-title">Upload CV</h2>
              <p className="content mt-3" style={{ fontSize: "16px" }}>
                CV typically refers to a "Curriculum Vitae," which is a document
                used to showcase an individual's educational and professional
                background. A CV provides a detailed summary of a person's
                qualifications, work experience, skills, and achievements.{" "}
              </p>
              <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex  d-block justify-content-between">
                {!fileSelected ? (
                  <label htmlFor="fileInput" className="test-start">
                    <span>Select File</span>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </label>
                ) : (
                  <button onClick={""} className="test-start">
                    Upload CV
                  </button>
                )}
                <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center">
                  <img src={cvImg} className="cvUpload" alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Speaking Level Test Div */}
          <div className="speak-test px-xl-3 px-lg-3 px-md-3 px-2">
            <div className="px-xl-4 px-lg-4 px-md-4 px-sm-2 px-1 pt-md-5 pt-3">
              <h2 className="test-title">Oral Proficiency Assessment</h2>
              <p className="content mt-3" style={{ fontSize: "16px" }}>
                An assessment measuring language fluency through spoken
                communication. <br />
                It involves tasks like conversations and presentations to
                evaluate fluency pronunciation, vocabulary, and overall
                proficiency{" "}
              </p>
              <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex  d-block justify-content-between">
                <div>
                  <Link
                    to="/InterviewHome"
                    className="test-start"
                    // onClick={() => setActive(2)}
                  >
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
              <p className="content mt-3" style={{ fontSize: "16px" }}>
                Predictive Index test is a behavioral assessment tool that
                analyze responses to series of questions and predict the
                behaviors and job performance of candidate
              </p>
              <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex  d-block justify-content-between">
                <div>
                  <Link
                    to="/PIHome"
                    // onClick={() => setActive(3)}
                    className="test-start"
                  >
                    Start
                  </Link>
                </div>
                <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center">
                  <img src={robot} className="robot" alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Hero;
