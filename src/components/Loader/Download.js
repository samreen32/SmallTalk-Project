import React from "react";
import Lottie from "lottie-react";

const Download = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "70px",
        height: "70px",
        // marginLeft: "20px",
        // marginTop: "-110px",
      }}
    >
      <Lottie
        animationData={require("../../assets/animation/download-btn.json")}
        loop
        autoplay
      />
    </div>
  );
};

export default Download;
