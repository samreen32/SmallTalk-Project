import React from "react";
import { Link } from "react-router-dom";

function PILastScreen() {
  return (
    <div style={{ padding: "50px 150px 0 150px" }}>
      <h2>
        <b>The Predictive Index®</b>
      </h2>
      <label for="exampleInputEmail1" className="form-label my-5">
        <div style={{ color: "gray", fontWeight: "bold" }}>Thank you! You're all set.</div>
      </label>
      <div>
        <p>
        
            Thank you for completing The Predictive Index® Behavioral
            Assessment. Your responses have been submitted.
          
        </p>
      </div>
      <div>
        <p>
          Please note that due to data privacy laws, it is up to the company
          that administered the assessment to share your results with you. The
          Predictive Index cannot share your results with you directly.
        </p>
      </div>
    </div>
  );
}

export default PILastScreen;
