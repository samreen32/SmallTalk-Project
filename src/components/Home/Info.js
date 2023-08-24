import React from "react";

const Info = () => {
  return (
    <div id="info" className="container-fluid">
      <div className="px-2 info-bg">
        <div className="">
          <h2 className="cant-find text-center">
            Can't find what you are looking for
          </h2>
          <p className="email text-center">
            Email your query to{" "}
            <a href="" className="email-link">
              info@caribglobaldataservices.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
