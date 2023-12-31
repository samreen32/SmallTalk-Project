import React, { useState } from "react";
import rocket from "../assets/img/rocket.png";
import registerLogo from "../assets/img/register-logo.png";
import "../App.css";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { UserLogin } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LoginSmallTalk from "./LoginSmallTalk";
import AppLoader from "./Loader/AppLoader";
import { AUTH_API_URL } from "../Auth_API";

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
    getCSRFToken,
    isLoading,
    setIsLoading,
    setUserData,
    isValidObjField,
    updateError,
    error,
    setError,
    showPassword,
    setShowPassword,
    showToast,
    setIsErrorOpen,
  } = UserLogin();

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
      setIsLoading(true);
      const csrfToken = await getCSRFToken();

      const headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      };

      const response = await axios.post(
        `${AUTH_API_URL}/add-user/`,
        credentials,
        { headers }
      );
      if (response.data.id) {
        localStorage.setItem("csrfToken", csrfToken);
        localStorage.setItem("userData", JSON.stringify(response.data));
        console.log("token in localstorage", csrfToken);

        setIsRegistrationScreen(false);
        setIsLoginScreenVisible(false);
        setUserData(response.data);
        showToast("You have been Register successfully!");
        navigation("/Main", {
          state: { name: response.data.name, id: response.data.id },
          replace: true,
        });
        console.log("User register successfully:", response.data);
        setIsLoading(false);
      } else {
        console.error("User with these credentials already present", error);
        showToast("Failed to register. User already present.");
        setIsErrorOpen(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      showToast("Failed to register. Please check your credentials.");
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
      {isRegistrationScreen ? (
        <>
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
                  marginBottom: "-45px",
                }}
              >
                <img
                  src={registerLogo}
                  width="40%"
                  height="40%"
                  alt="CDS logo"
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
                  <div className="image-container">
                    <img
                      className="card-title"
                      src={rocket}
                      alt="img"
                      height={150}
                      width={150}
                    />
                  </div>
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

              {isLoading ? <AppLoader /> : null}
            </div>
          </div>
        </>
      ) : (
        <>
          <>{isLoginScreenVisible && <LoginSmallTalk />}</>
        </>
      )}
    </>
  );
}
