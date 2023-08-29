import React, { useState } from "react";
import rocket from "../assets/img/rocket.png";
import "../App.css";
import registerLogo from "../assets/img/register-logo.png";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { UserLogin } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import RegisterSmallTalk from "./RegisterSmallTalk";
import AppLoader from "./Loader/AppLoader";
import { AUTH_API_URL } from "../Auth_API";

export default function LoginSmallTalk() {
  let navigation = useNavigate();
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [isRegistrationScreenVisible, setIsRegistrationScreenVisible] =
    useState(true);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const {
    isLoading,
    setIsLoading,
    setUserData,
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
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${AUTH_API_URL}/login/${credentials.email}/${credentials.password}`,
        { headers }
      );

      if (response.data.id) {
        showToast("You have been Login successfully!");
        localStorage.setItem("authToken", response.data.token);
        console.log("token", response.data.token);
        // localStorage.setItem('userData', JSON.stringify(response.data));
        setIsLoginScreen(false);
        setIsRegistrationScreenVisible(false);
        setUserData(response.data);
        navigation("/Main", {
          state: { name: response.data.name, id: response.data.id },
        });
        console.log("User login successfully:", response.data);
        setIsLoading(false);
      } else {
        console.error("No such user present", error);
        showToast("Failed to login. Please check your credentials.");
        setIsErrorOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to login user:", error);
      showToast("Failed to login. Please check your credentials.");
      setIsErrorOpen(true);
      setIsLoading(false);
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
      {isLoginScreen ? (
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
            {/* CDS logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "-90px",
              }}
            >
              <img src={registerLogo} width="40%" height="40%" alt="CDS logo" />
            </div>

            {/* Part before the login form */}
            <>
              <div
                className="container1 my-3"
                style={{ padding: "60px 0 0 0" }}
              >
                <div className="rectangle">
                  <i className="fa fa-google" aria-hidden="true"></i> Google
                </div>
                <div className="rectangle">
                  <i className="fa fa-apple" aria-hidden="true"></i> Apple ID
                </div>
              </div>
              <div
                className="arrow-line"
                style={{ padding: "15px 40px 0 40px" }}
              >
                <span className="line"></span>
                <p className="my-2">Or</p>
                <span className="line"></span>
              </div>
            </>

            <div className="card-body" style={{ marginTop: "-28px" }}>
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
                <div className="image-container" style={{ top: "33%" }}>
                  <img
                    className="card-title"
                    src={rocket}
                    alt="img"
                    height={150}
                    width={150}
                  />
                </div>
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
                <div id="emailHelp" className="form-text">
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
                <div style={{ textAlign: "center" }}>
                  <p>
                    Don't have an account?{" "}
                    <Link
                      // to="/Register"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        border: "none",
                      }}
                      onClick={() => setIsLoginScreen(false)}
                    >
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <AppLoader />
            {isLoading ? <AppLoader /> : null}
          </div>
        </div>
      ) : (
        <>{isRegistrationScreenVisible && <RegisterSmallTalk />}</>
      )}
    </>
  );
}
