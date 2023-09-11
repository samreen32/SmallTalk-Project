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
  const storedToken = localStorage.getItem("csrfToken");
  const [token, setToken] = useState(storedToken);
  const storedUserData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(
    storedUserData ? JSON.parse(storedUserData) : {}
  );

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

  /* Function to capitalize first letter of name */
  const capitalizeFirst = (str) => {
    if (typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  /* Descripiton for each Levels */
  const levelDescriptions = {
    beginner:
      "At the beginner level, individuals are starting to grasp basic conversational phrases. They can exchange simple greetings and engage in uncomplicated discussions about topics like the weather, daily routines, and personal hobbies. While they may stumble occasionally, they are eager to learn and improve their ability to participate in everyday chit-chat with friends and acquaintances.",

    elementary:
      "Elementary-level practitioners are gaining confidence in their conversational skills. They can comfortably initiate and sustain dialogues on familiar subjects, including personal interests, favorite foods, and leisure activities. While they might occasionally seek help with complex vocabulary, they're well on their way to becoming adept at handling light-hearted exchanges and social interactions.",

    intermediate:
      "Individuals at the intermediate level of exhibit proficiency in engaging discussions. They can confidently express opinions, share experiences, and discuss a broad array of topics, such as travel destinations, recent movies, and upcoming plans. Their ability to navigate conversations fluidly and respond thoughtfully makes them valuable contributors to social gatherings and casual conversations.",

    "upper-intermediate":
      "At the upper-intermediate level, enthusiasts display finesse in steering conversations. They can delve into deeper subjects, such as cultural trends, personal goals, and societal issues, while maintaining a comfortable and engaging atmosphere. Their conversational prowess allows them to connect with others on a meaningful level, making them sought-after conversationalists.",

    advanced:
      "Advanced practitioners are virtuosos in the art of conversation. They effortlessly navigate intricate topics, including philosophy, art, and global affairs, while weaving in personal anecdotes and insightful perspectives. Their eloquence and charm make them captivating interlocutors who can turn any exchange into a memorable and enriching experience.",
  };

  /* Display Highest Level in Polygon */
  const levelCodes = {
    beginner: "A1",
    elementary: "A2",
    intermediate: "B1",
    "upper-intermediate": "B2",
    advanced: "C1",
    proficiency: "C2",
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
        capitalizeFirst,
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
        levelDescriptions,
        levelCodes,
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
