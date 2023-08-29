import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

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
  const [isLogIn, setIsLogIn] = useState(false);
  const [userData, setUserData] = useState(null);
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

  return (
    <AuthContext.Provider
      value={{
        interviewName,
        setInterviewName,
        stickyNav,
        setstickyNav,
        toTop,
        settoTop,
        active,
        setActive,
        userData,
        setUserData,
        reportData,
        setReportData,
        isLogIn,
        setIsLogIn,
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
