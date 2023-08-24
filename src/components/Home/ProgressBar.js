import React from "react";
import { useState } from "react";
import Circle from "./Circle";

const ProgressBar = ({ active, setActive }) => {
  const [width, setWidth] = useState(0);
  const [circle] = useState(3);
  const arr = [];
  const barStatus = ["Start Interview", "Start Predictive Index", "Complete"];

  for (let i = 0; i < circle; i++) {
    arr.push(
      <div className="circle-container" key={i}>
        <Circle className={i < active ? "circle active" : "circle"} key={i}>
          {i + 1}
        </Circle>
        <p className="caption-bar">{barStatus[i]}</p>
      </div>
    );
  }

  // const handleNextClick = () => {
  //     if (active < circle) {
  //         setActive(active + 1);
  //     }
  // };

  return (
    <>
      <div className="container-bar mb-5">
        <div className="bar-content">
          <div className="bar-progress">
            <div className="progres" style={{ width: width + "%" }}></div>
            {arr}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
