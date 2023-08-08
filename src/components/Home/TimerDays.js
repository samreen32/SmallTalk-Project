import React, { useEffect, useState } from "react";
import timer from "../../assets/img/timer.png";
import days from "../../assets/img/days.png";
import "../../App.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Circle = ({ day, isCurrent }) => {
  return <div className={`circle ${isCurrent ? "highlight" : ""}`}>{day}</div>;
};

export default function TimerDays() {
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    setCurrentDay(new Date().getDay());
  }, []);

  return (
    <>
      <div
        className="card my-3 px-2"
        style={{ padding: "10px", margin: "5px" }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col">
              <img src={timer} alt="timer" className="img-fluid mx-3" />
              <div className="mx-5">
                <p style={{ fontSize: "20px" }}>
                  Speaking time
                  <br />
                  <h3>
                    <b>5 min</b>
                  </h3>
                </p>
              </div>
            </div>
            <div
              className="col"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src={days} alt="days" className="img-fluid" />
              <div style={{ marginLeft: "10px" }}>
                <p className="m-0">Streak</p>
                <h3 className="m-0">
                  <b>0 days</b>
                </h3>
              </div>
              <div className="week-container ml-3" style={{ display: "flex" }}>
                {DAYS.map((day, index) => (
                  <div key={index} className="circle-container">
                    <Circle day={day} isCurrent={currentDay === index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
