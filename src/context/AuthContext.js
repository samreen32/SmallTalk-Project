import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [responseData, setResponseData] = useState([]);

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
        responseData, 
        setResponseData
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
