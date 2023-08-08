import React, { useRef } from "react";
import "../../App.css";
import robot from "../../assets/img/robot.png";
import microphone from "../../assets/img/microphone.png";
import cloud from "../../assets/img/cloud.png";
import polygone from "../../assets/img/polygon.png";

export default function Sections() {
  const fileInputRef = useRef(null);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-1">    {/* Reducing gap using g-4 to g-3 */}
        {/* Div 1 */}
        <div className="col px-2">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title my-3">
                <b>Speaking Level Test</b>
              </h5>
              <p className="card-text">
                Find out your English level and get level up recommendations.
              </p>
              <div className="col">
                <div className="row">
                  <button className="homeBtn mx-2">Start</button>
                </div>
                <div className="row img-container my-3">
                  <img src={polygone} alt="robot"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Div 2 */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title my-3">
                <b>AI-Powered Vocabulary Booster</b>
              </h5>
              <p className="card-text">
                Learn new words that our AI thinks fit your interests and
                English level.
              </p>
              <div className="col">
                <div className="row">
                  <button className="homeBtn mx-2">Start Practice</button>
                </div>
                <div className="row img-container">
                  <img src={robot} alt="robot" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Div 3 */}
        <div className="col px-2">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title my-3">
                <b>Speech Analyzer</b>
              </h5>
              <p className="card-text">
                Record your pitch or upload an audio to receive feedback on your
                grammar, vocabulary, and fluency ✌️
              </p>
              <div style={{ display: "flex", textAlign: "center" }}>
                {/* First Row */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <img
                    src={microphone}
                    alt="microphone"
                    style={{ maxWidth: "100px", marginBottom: "10px" }}
                  />
                  <div>
                    <p>
                      <b>Start Recording</b>
                    </p>
                  </div>
                </div>
                {/* Second Row */}
                <label
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "10px",
                    border: "dotted",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={cloud}
                    alt="cloud"
                    style={{ maxWidth: "100px", marginBottom: "10px" }}
                  />
                  <div>
                    <p>
                      <b>Drop or Browse an audio file</b>
                    </p>
                  </div>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
