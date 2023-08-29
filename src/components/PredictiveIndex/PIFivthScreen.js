import React from "react";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";
import Navbar from "../Home/HomeSections/Section1/Navbar";

function PIFivthScreen() {
  const { stickyNav, setstickyNav, toTop, settoTop, active, setActive } =
    UserLogin();

  return (
    <>
      <Navbar
        stickyNav={stickyNav}
        setstickyNav={setstickyNav}
        toTop={toTop}
        settoTop={settoTop}
        active={active}
        setActive={setActive}
      />

      <div style={{ padding: "50px 150px 0 150px" }}>
        <h2>
          <b>The Predictive Index®</b>
        </h2>

        <div className="my-5">
          <p>
            Please read the list of words below and check those that you
            yourself believe <b>really describe you as you are.</b>
          </p>
        </div>

        {/* CheckBox Content */}
        <div style={{ padding: "0 10px 0 50px" }}>
          <div className="row">
            <div className="col mx-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label className="form-check-label" for="inlineCheckbox1">
                  Social
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Neat
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="option3"
                />
                <label className="form-check-label" for="inlineCheckbox3">
                  Patient
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox4"
                  value="option4"
                />
                <label className="form-check-label" for="inlineCheckbox4">
                  Reasonable
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox5"
                  value="option5"
                />
                <label className="form-check-label" for="inlineCheckbox5">
                  Content
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox6"
                  value="option6"
                />
                <label className="form-check-label" for="inlineCheckbox6">
                  Persistent
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox7"
                  value="option7"
                />
                <label className="form-check-label" for="inlineCheckbox7">
                  Realistic
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox8"
                  value="option8"
                />
                <label className="form-check-label" for="inlineCheckbox8">
                  Relaxed
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox9"
                  value="option9"
                />
                <label className="form-check-label" for="inlineCheckbox9">
                  Dominant
                </label>
              </div>
            </div>

            <div className="col mx-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label className="form-check-label" for="inlineCheckbox1">
                  Contemplative
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Constant
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="option3"
                />
                <label className="form-check-label" for="inlineCheckbox3">
                  Understanding
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox4"
                  value="option4"
                />
                <label className="form-check-label" for="inlineCheckbox4">
                  Bold
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox5"
                  value="option5"
                />
                <label className="form-check-label" for="inlineCheckbox5">
                  Conventional
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox6"
                  value="option6"
                />
                <label className="form-check-label" for="inlineCheckbox6">
                  Charismatic
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox7"
                  value="option7"
                />
                <label className="form-check-label" for="inlineCheckbox7">
                  Convincing
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox8"
                  value="option8"
                />
                <label className="form-check-label" for="inlineCheckbox8">
                  Polished
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox9"
                  value="option9"
                />
                <label className="form-check-label" for="inlineCheckbox9">
                  Caring
                </label>
              </div>
            </div>

            <div className="col mx-5">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label className="form-check-label" for="inlineCheckbox1">
                  Engaging
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label className="form-check-label" for="inlineCheckbox2">
                  Firm
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="option3"
                />
                <label className="form-check-label" for="inlineCheckbox3">
                  Responsive
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox4"
                  value="option4"
                />
                <label className="form-check-label" for="inlineCheckbox4">
                  Careful
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox5"
                  value="option5"
                />
                <label className="form-check-label" for="inlineCheckbox5">
                  Aware
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox6"
                  value="option6"
                />
                <label className="form-check-label" for="inlineCheckbox6">
                  Relentless
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox7"
                  value="option7"
                />
                <label className="form-check-label" for="inlineCheckbox7">
                  Fascinating
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox8"
                  value="option8"
                />
                <label className="form-check-label" for="inlineCheckbox8">
                  Rational
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox9"
                  value="option9"
                />
                <label className="form-check-label" for="inlineCheckbox9">
                  Gentle
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Link className="btn btn-outline-secondary" to="/PIFourthScreen">
            Back
          </Link>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#5cb3cf",
                color: "floralwhite",
                fontWeight: "bold",
              }}
              to="/PILastScreen"
            >
              Submit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PIFivthScreen;
