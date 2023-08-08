import React, { useState } from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { UserLogin } from "../../context/AuthContext";

function PIHome() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showInput, setShowInput] = useState(false);
  const [credentials, setCredentials] = useState({
    fName: "",
    mName: "",
    lName: "",
    email: "",
  });
  const { fName, mName, lName, email } = credentials;
  const {
    isValidObjField,
    updateError,
    error,
    setError,
    showPassword,
    setShowPassword,
    showToast,
    setIsErrorOpen,
  } = UserLogin();

  const handleCheckboxChange = (event) => {
    setShowInput(event.target.checked);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const isValidEmail = (value) => {
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(value);
  };

  return (
    <div style={{ padding: "100px 150px 0 150px" }}>
      <h2 className="md-8">
        <b>
          Liberty Iberoamerica SLU has requested that you complete a Predictive
          Index Behavioral Assessment.
        </b>
      </h2>
      <br />
      <h3>
        <b>Welcome!</b>
      </h3>
      <br />
      <form>
        {/* Languages */}
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            <h8>
              <b>Language *</b>
            </h8>
            <div
              className="my-1"
              style={{
                marginRight: "10rem",
                marginBottom: "2rem",
                display: "block",
                color: "gray",
              }}
            >
              <i>
                Please select the language in which you prefer to complete the
                assessment. Your language selection is not reflected in your
                assessment results.
              </i>
            </div>
          </label>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            variant="outlined"
            className="md-8"
            margin="normal"
            sx={{ width: "50%", color: "gray" }}
            required
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="urdu">Urdu</MenuItem>
            <MenuItem value="french">French</MenuItem>
          </Select>
        </div>

        {/* Purple * Statement */}
        <div className="mx-5 my-5" style={{ color: "purple" }}>
          <b>To continue, complete the required fields (*) as indicated.</b>
        </div>

        {/* First, Middle, Last Name */}
        <div
          className="input-group my-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ textAlign: "left", flex: 1 }}>
            <div>First name *</div>
            <TextField
              variant="outlined"
              name="firstName"
              margin="normal"
              sx={{ width: "90%", marginBottom: "0.5rem" }}
              required
              value={fName}
              onChange={onChange}
              error={error && !isValidEmail(email)}
              helperText={
                error && !isValidEmail(email) && "Enter a valid email!"
              }
            />
          </div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div>Middle name</div>
            <TextField
              variant="outlined"
              name="middleName"
              margin="normal"
              sx={{ width: "90%", marginBottom: "0.5rem" }}
              required
              value={mName}
              onChange={onChange}
              error={error && !isValidEmail(email)}
              helperText={
                error && !isValidEmail(email) && "Enter a valid email!"
              }
            />
          </div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div>Last name *</div>
            <TextField
              variant="outlined"
              name="lastName"
              margin="normal"
              sx={{ width: "90%", marginBottom: "0.5rem" }}
              required
              value={lName}
              onChange={onChange}
              error={error && !isValidEmail(email)}
              helperText={
                error && !isValidEmail(email) && "Enter a valid email!"
              }
            />
          </div>
        </div>

        {/* Email */}
        <div className="my-5">
          <label
            className="form-label"
            style={{ marginBottom: "0.5rem", display: "block" }}
          >
            <h8>
              <b>Email *</b>
            </h8>
          </label>
          <TextField
            variant="outlined"
            name="email"
            margin="normal"
            required
            sx={{ width: "50%", marginRight: "1rem" }}
            value={email}
            onChange={onChange}
            error={error && !isValidEmail(email)}
            helperText={error && !isValidEmail(email) && "Enter a valid email!"}
          />
        </div>

        {/* CheckBoxes */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" for="exampleCheck1">
            I have already taken the PI Behavioral Assessment and would like to
            enter my Behavioral Score ID.
          </label>
          {showInput && (
            <>
              <p className="my-5">
                <b>
                  Please enter your Behavioral Score ID in the following box. We
                  recommend searching your email account for "The Predictive
                  Index" to find your Score ID from your completed assessment.
                </b>
                <TextField
                  variant="outlined"
                  name="scoreId"
                  margin="normal"
                  sx={{ width: "70%" }}
                  label="Behavioral Score ID"
                />
              </p>
            </>
          )}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            I would like to participate in PI research by answering a few
            optional questions.
          </label>
        </div>

        {/* Continue Button */}
        <Link
          type="submit"
          className="btn btn-primary"
          // style={{ backgroundColor: "#00A9FF" }}
          to="/PISecondScreen"
        >
          Continue
        </Link>

        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default PIHome;
