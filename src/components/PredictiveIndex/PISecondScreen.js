import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function PISecondScreen() {
  return (
    <div style={{ padding: "50px 110px 0 110px" }}>
      <label for="exampleInputEmail1" className="form-label">
        <div className="form-text">
          Thank you for participating in PI research! Please answer the
          questions below. Your answers are entirely confidential and are not
          disclosed to employers. If you do not wish to answer a question,
          simply select "I do not wish to disclose".
        </div>
      </label>
      <form>
        {/* Age */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>Age *</b>
            </h8>
          </label>
          <Select
            variant="outlined"
            className="md-8"
            margin="normal"
            sx={{ width: "100%", color: "gray" }}
            required
          >
            <MenuItem value="1">17 or younger</MenuItem>
            <MenuItem value="2">18-29</MenuItem>
            <MenuItem value="3">30-39</MenuItem>
            <MenuItem value="4">40-49</MenuItem>
            <MenuItem value="5">50-59</MenuItem>
            <MenuItem value="6">60-69</MenuItem>
            <MenuItem value="7">70 or older</MenuItem>
            <MenuItem value="8">I do not wish to disclose.</MenuItem>
          </Select>
        </div>

        {/* Gender */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>Gender *</b>
            </h8>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Other
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              I do not wish to disclose.
            </label>
          </div>
        </div>

        {/* Race */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>Race/Ethnicity</b>
            </h8>
          </label>
          <Select
            variant="outlined"
            className="md-8"
            margin="normal"
            sx={{ width: "100%", color: "gray" }}
            required
          >
            <MenuItem value="1">17 or younger</MenuItem>
            <MenuItem value="2">18-29</MenuItem>
            <MenuItem value="3">30-39</MenuItem>
            <MenuItem value="4">40-49</MenuItem>
            <MenuItem value="5">50-59</MenuItem>
            <MenuItem value="6">60-69</MenuItem>
            <MenuItem value="7">70 or older</MenuItem>
            <MenuItem value="8">I do not wish to disclose.</MenuItem>
          </Select>
        </div>

        {/* Education */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>Education *</b>
            </h8>
          </label>
          <TextField
            variant="outlined"
            className="mb-3"
            name="education"
            margin="normal"
            required
            sx={{ width: "100%", marginRight: "1rem" }}
          />
        </div>

        {/* I appreciate when my manager provides feedback that is… * */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>I appreciate when my manager provides feedback that is… *</b>
            </h8>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault4"
              checked
            />
            <label className="form-check-label" for="flexRadioDefault4">
              Based on data or metrics and completely free of personal opinion.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault5"
            />
            <label className="form-check-label" for="flexRadioDefault5">
              Based on facts or data and mostly free of personal opinion.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault6"
            />
            <label className="form-check-label" for="flexRadioDefault6">
              Based on both data and opinion.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault7"
            />
            <label className="form-check-label" for="flexRadioDefault7">
              Based on personal experience or opinion and mostly free of data or
              metrics.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault8"
            />
            <label className="form-check-label" for="flexRadioDefault8">
              Based on personal experience or opinion and completely free of
              data or metrics.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault9"
            />
            <label className="form-check-label" for="flexRadioDefault9">
              I do not wish to disclose
            </label>
          </div>
        </div>

        {/* Your company is considering a big change in strategic direction… * */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>
                Your company is considering a big change in strategic direction.
                Senior leaders ask you for your opinion. Which of the following
                are you most likely to do when providing feedback? *
              </b>
            </h8>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault10"
              checked
            />
            <label className="form-check-label" for="flexRadioDefault10">
              Rely only on data and facts.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault11"
            />
            <label className="form-check-label" for="flexRadioDefault11">
              Rely mostly on data and facts.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault12"
            />
            <label className="form-check-label" for="flexRadioDefault12">
              Rely equally on data and your intuition.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault13"
            />
            <label className="form-check-label" for="flexRadioDefault13">
              Rely mostly on your intuition.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault14"
            />
            <label className="form-check-label" for="flexRadioDefault14">
              Rely only on your intuition.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault15"
            />
            <label className="form-check-label" for="flexRadioDefault15">
              I do not wish to disclose
            </label>
          </div>
        </div>

        {/* You have been tasked with organizing the company holiday party… * */}
        <div className="mb-3 my-5">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>
                You have been tasked with organizing the company holiday party.
                In choosing a location, which of the following are you most
                likely to do? *
              </b>
            </h8>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault16"
              checked
            />
            <label className="form-check-label" for="flexRadioDefault16">
              Select a geographically central location.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault17"
            />
            <label className="form-check-label" for="flexRadioDefault17">
              Send out a survey asking for colleagues' preferences.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault18"
            />
            <label className="form-check-label" for="flexRadioDefault18">
              Bounce around some of your ideas with a few colleagues.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault19"
            />
            <label className="form-check-label" for="flexRadioDefault19">
              Consider venues that you believe will be fun.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault20"
            />
            <label className="form-check-label" for="flexRadioDefault20">
              None of the above.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault21"
            />
            <label className="form-check-label" for="flexRadioDefault21">
              I do not wish to disclose
            </label>
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
          <Link className="btn btn-outline-secondary" to="/PIHome">
            Back
          </Link>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link
              type="submit"
              className="btn"
              style={{ backgroundColor: "#5cb3cf", color: "floralwhite" }}
              to="/PIThirdScreen"
            >
              Continue
            </Link>
          </div>
        </div>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
}

export default PISecondScreen;
