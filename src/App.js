import React, { useState } from "react";
import Login from "./components/LoginSmallTalk";
import Register from "./components/RegisterSmallTalk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider, { UserLogin } from "./context/AuthContext";
import InterviewHome from "./components/InterviewScreens/InterviewHome";
import InterviewWarmUp from "./components/InterviewScreens/InterviewWarmUp";
import InterviewQs from "./components/InterviewScreens/InterviewQs";
import Reports from "./components/MyReports/Reports";
import SelectedReport from "./components/MyReports/SelectedReport";
import PIHome from "./components/PredictiveIndex/PIHome";
import PISecondScreen from "./components/PredictiveIndex/PISecondScreen";
import PIThirdScreen from "./components/PredictiveIndex/PIThirdScreen";
import PIFourthScreen from "./components/PredictiveIndex/PIFourthScreen";
import PIFivthScreen from "./components/PredictiveIndex/PIFivthScreen";
import PILastScreen from "./components/PredictiveIndex/PILastScreen";
import Contact from "./components/ContactUs/Contact";
import FAQScreen from "./components/FAQ/FAQScreen";
import Main from "./components/Home/Main";

function App() {
  // const {isLogIn} = UserLogin();

  return (
    <AuthProvider>
      <div style={{ fontFamily: "Roboto, sans-serif" }}>
        <Router>
          {/* <Main /> */}
          <Register />
          {/* <InterviewWarmUp /> */}

          {/* <Register />
          <Login /> */}

          <Routes>
            {/* {isLogIn ? (
              <> */}
            <Route exact path="/Main" element={<Main />}></Route>
            <Route
              exact
              path="/InterviewHome"
              element={<InterviewHome />}
            ></Route>
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
            <Route
              exact
              path="/PIFourthScreen"
              element={<PIFourthScreen />}
            ></Route>
            <Route
              exact
              path="/PIFivthScreen"
              element={<PIFivthScreen />}
            ></Route>
            <Route
              exact
              path="/PILastScreen"
              element={<PILastScreen />}
            ></Route>
            <Route exact path="/Contact" element={<Contact />}></Route>
            <Route exact path="/FAQScreen" element={<FAQScreen />}></Route>
            {/* </>
            ) : (
              <> */}
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Register" element={<Register />}></Route>

            {/* </>
            )} */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
