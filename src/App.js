import React from "react";
import Login from "./components/LoginSmallTalk";
import Register from "./components/RegisterSmallTalk";
import Navbar from "./components/Home/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sections from "./components/Home/Sections";
import TimerDays from "./components/Home/TimerDays";
import AuthProvider from "./context/AuthContext";
import InterviewHome from "./components/InterviewScreens/InterviewHome";
import InterviewWarmUp from "./components/InterviewScreens/InterviewWarmUp";
import InterviewQs from "./components/InterviewScreens/InterviewQs";
import Reports from "./components/MyReports/Reports";
import SelectedReport from "./components/MyReports/SelectedReport";
import PIHome from "./components/PredictiveIndex/PIHome";
import PISecondScreen from "./components/PredictiveIndex/PISecondScreen";
import PIThirdScreen from "./components/PredictiveIndex/PIThirdScreen";

function App() {
  return (
    <AuthProvider>
      <div style={{ fontFamily: "Roboto, sans-serif" }}>
        <Router>
          <Navbar />

          {/* <Register /> */}
          {/* <Login />
          <Register />
          <InterviewHome />
          <InterviewWarmUp /> */}
          {/* <Sections /> */}
          {/* <InterviewQs /> */}
          {/* <PIHome/> */}
          <Routes>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Register" element={<Register />}></Route>
            <Route
              exact
              path="/InterviewWarmUp"
              element={<InterviewWarmUp />}
            ></Route>
            <Route exact path="/InterviewQs" element={<InterviewQs />}></Route>
            <Route exact path="/Reports" element={<Reports />}></Route>
            <Route exact path="/PIHome" element={<PIHome />}></Route>
            <Route
              exact
              path="/SelectedReport"
              element={<SelectedReport />}
            ></Route>
            <Route
              exact
              path="/PISecondScreen"
              element={<PISecondScreen />}
            ></Route>
            <Route
              exact
              path="/PIThirdScreen"
              element={<PIThirdScreen />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
