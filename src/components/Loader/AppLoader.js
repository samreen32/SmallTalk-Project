import React from "react";
import Lottie from "lottie-react";

const AppLoader = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <Lottie
        animationData={require("../../assets/animation/loader_3.json")}
        loop
        autoplay
       className="empty-report"
      />
    </div>
  );
};

export default AppLoader;
