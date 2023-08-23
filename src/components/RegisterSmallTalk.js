import React, { useState } from "react";
import rocket from "../assets/img/rocket.png";
import "../App.css";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { UserLogin } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LoginSmallTalk from "./LoginSmallTalk";

export default function RegisterSmallTalk() {
  let navigation = useNavigate();
  const [isRegistrationScreen, setIsRegistrationScreen] = useState(true);
  const [isLoginScreenVisible, setIsLoginScreenVisible] = useState(true);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = credentials;
  const {
    // isValidEmail,
    isValidObjField,
    updateError,
    error,
    setError,
    showPassword,
    setShowPassword,
    showToast,
    setIsErrorOpen,
  } = UserLogin();

  // Function to get the CSRF token
  async function getCSRFToken() {
    try {
      const response = await axios.get(
        "http://192.168.18.74:8000/user/get-csrf-token/"
      );
      return response.data.csrftoken;
    } catch (error) {
      console.error("Failed to get CSRF token:", error);
    }
  }

  // Function to create a user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!isValidObjField(credentials)) {
        return updateError("Require all fields!", setError);
      }
      if (!name.trim() || name.length < 3) {
        return updateError("Enter a valid name!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid email!", setError);
      }
      if (!password.trim() || password.length < 5) {
        return updateError("Password must be 5 character long!", setError);
      }

      const csrfToken = await getCSRFToken();
      const headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      };
      const response = await axios.post(
        "http://192.168.18.74:8000/user/add-user/",
        credentials,
        { headers }
      );
      if (response.data.id) {
        showToast("You have been Register successfully!");
        setIsRegistrationScreen(false);
        setIsLoginScreenVisible(false);
        navigation("/Navbar", { state: { name: response.data.name } });
        console.log("User created successfully:", response.data);
        // console.log("name ", response.data.name);
      } else {
        console.error("User with these credentials already present", error);
        showToast("Failed to register. User already present.");
        setIsErrorOpen(true);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      showToast("Failed to register. Please check your credentials.");
      setIsErrorOpen(true);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const isValidEmail = (value) => {
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(value);
  };

  return (
    <>
      {isRegistrationScreen ? (
        <div
          className="my-5"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
          }}
        >
          <div className="card" style={{ width: "28rem" }}>
            <div className="image-container">
              <img
                className="card-title"
                src={rocket}
                alt="img"
                height={150}
                width={150}
              />
            </div>

            <div className="card-body">
              <div style={{ textAlign: "center" }}>
                <h3>
                  <b>Sign up</b>
                </h3>
                <p>Let’s get started with your 30 days free trail</p>
              </div>

              <form className="form-container">
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={onChange}
                  margin="normal"
                  sx={{ width: "100%" }}
                  required
                  error={error && (!name.trim() || name.length < 3)}
                  helperText={
                    error &&
                    (!name.trim() || name.length < 3) &&
                    "Name must be at least 3 characters long!"
                  }
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={onChange}
                  margin="normal"
                  sx={{ width: "100%" }}
                  required
                  error={error && !isValidEmail(email)}
                  helperText={
                    error && !isValidEmail(email) && "Enter a valid email!"
                  }
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  margin="normal"
                  sx={{ width: "100%" }}
                  required
                  error={error && (!password.trim() || password.length < 5)}
                  helperText={
                    error &&
                    (!password.trim() || password.length < 5) &&
                    "Password must be at least 5 characters long!"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {/* Eye icon */}
                          {showPassword ? (
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                              style={{ fontSize: "16px" }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                              style={{ fontSize: "16px" }}
                            ></i>
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Link
                  // to="Navbar"
                  onClick={handleRegister}
                  className="button button--flex my-3"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
                <div style={{ textAlign: "center" }}>
                  <p>
                    Already have account ?{" "}
                    <Link
                      // to="/Login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        border: "none",
                      }}
                      onClick={() => setIsRegistrationScreen(false)}
                    >
                      <b>Log in</b>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <>{isLoginScreenVisible && <LoginSmallTalk />}</>
        </>
      )}
    </>
  );
}
