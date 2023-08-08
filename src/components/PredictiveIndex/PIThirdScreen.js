import React from "react";

function PIThirdScreen() {
  return (
    <div style={{ padding: "50px 150px 0 150px" }}>
      <h2>
        <b>The Predictive Index®</b>
      </h2>
      <label for="exampleInputEmail1" className="form-label my-5">
        <div style={{ color: "gray" }}>
          You're about to begin a two question assessment. We are asking for
          your opinion of your own behavior at work.
        </div>
      </label>
      <div>
        <p>
          <b>A few guidelines to know before you begin:</b>
        </p>
        <ul class="">
          <li className="">
            The assessment is untimed, but typically takes six minutes.
          </li>
          <li className="">
            You may take as long as you'd like, but please finish in one
            sitting.
          </li>
          <li className="">If you don't recognize a word, just skip it.</li>
          <li className="">
            Please follow the directions at the top of each page.
          </li>
          <li className="">There are no right or wrong answers.</li>
        </ul>
      </div>
      <div>
        <p>
          <b>Please note:</b> it is not possible to edit or review your
          responses once they have been submitted.
        </p>
      </div>
    </div>
  );
}

export default PIThirdScreen;
