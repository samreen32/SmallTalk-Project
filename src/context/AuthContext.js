import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { AUTH_API_URL } from "../Auth_API";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [stickyNav, setstickyNav] = useState(false);
  const [toTop, settoTop] = useState(false);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [interviewName, setInterviewName] = useState("");

  /***** Functions to format timer for interview ******/
  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimerValue((prevValue) => {
          if (prevValue >= 3360) {
            setIsTimerRunning(false);
            return 3360;
          }
          return prevValue + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return `${formattedMins}:${formattedSecs}`;
  };

  /***** Validation Checks ******/
  const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
  };

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 2500);
  };

  /***** Showing Toast/Alert ******/
  const showToast = (message) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleErrorClose = () => {
    setIsErrorOpen(false);
  };

  /***** Get and Store CSRF Token ******/
  async function getCSRFToken() {
    try {
      const response = await axios.get(`${AUTH_API_URL}/get-csrf-token/`);
      console.log("token in csrf", response.data.csrfToken);
      return response.data.csrfToken;
    } catch (error) {
      console.error("Failed to get CSRF token:", error);
    }
  }

  const storedToken = localStorage.getItem("csrfToken");
  const [token, setToken] = useState(storedToken);

  const storedUserData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(
    storedUserData ? JSON.parse(storedUserData) : {}
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("csrfToken", token);
    } else {
      localStorage.removeItem("csrfToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        getCSRFToken: getCSRFToken,
        userData,
        setUserData,
        token,
        setToken,
        isValidObjField,
        updateError,
        showToast,
        error,
        setError,
        setIsErrorOpen,
        isLoading,
        setIsLoading,
        showPassword,
        setShowPassword,
        stickyNav,
        setstickyNav,
        toTop,
        settoTop,
        active,
        setActive,
        interviewName,
        setInterviewName,
        reportData,
        setReportData,
        timerValue,
        setTimerValue,
        isTimerRunning,
        setIsTimerRunning,
        formatTimer,
      }}
    >
      {children}
      {/* Success Toast Component */}
      <Snackbar
        open={isToastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleToastClose}>
          {toastMessage}
        </Alert>
      </Snackbar>
      {/* Error Toast Component */}
      <Snackbar
        open={isErrorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleErrorClose}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
