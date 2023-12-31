import React from "react";

const Info = () => {
  return (
    <div id="info" className="container-fluid">
      <div className="px-2 info-bg">
        <h1 className="cant-find text-center">
          Can't find what you are looking for
        </h1>
        <p className="email text-center">
          Email your query to{" "}
          <a href="" className="email-link">
            info@caribglobaldataservices.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Info;
