import React, { useState } from "react";
import rocket from "../assets/img/rocket.png";
import "../App.css";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { UserLogin } from "../context/AuthContext";

export default function LoginSmallTalk() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const {
    // isValidEmail,
    isValidObjField,
    updateError,
    error,
    setError,
    showPassword,
    setShowPassword,
    showToast,
    setIsErrorOpen
  } = UserLogin();

  // Function to login a user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!isValidObjField(credentials)) {
        return updateError("Require all fields!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid email!", setError);
      }
      if (!password.trim() || password.length < 5) {
        return updateError("Password must be 5 character long!", setError);
      }

      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `http://192.168.18.74:8000/user/login/${credentials.email}/${credentials.password}`,
        { headers }
      );
      showToast("You have been Login successfully!");
      console.log("User login successfully:", response.data);
    } catch (error) {
      console.error("Failed to login user:", error);
      showToast("Failed to login. Please check your credentials.");
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
      <div className="container my-5">
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
            <form className="form-container">
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
              <div id="emailHelp" class="form-text">
                <a
                  href="ww.google.com"
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <button
                onClick={handleLogin}
                className="button button--flex my-3"
              >
                Login
              </button>
              <div className="arrow-line">
                <span className="line"></span>
                <p className="my-2">Or Register with</p>
                <span className="line"></span>
              </div>
              <div className="container1">
                <div className="rectangle">
                  <i className="fa fa-google" aria-hidden="true"></i> Google
                </div>
                <div className="rectangle">
                  <i className="fa fa-apple" aria-hidden="true"></i> Apple ID
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
