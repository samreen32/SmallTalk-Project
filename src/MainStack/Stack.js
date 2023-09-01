import React from "react";
import Login from "../components/LoginSmallTalk";
import Register from "../components/RegisterSmallTalk";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserLogin } from "../context/AuthContext";
import InterviewHome from "../components/InterviewScreens/InterviewHome";
import InterviewWarmUp from "../components/InterviewScreens/InterviewWarmUp";
import InterviewQs from "../components/InterviewScreens/InterviewQs";
import Reports from "../components/MyReports/Reports";
import SelectedReport from "../components/MyReports/SelectedReport";
import PIHome from "../components/PredictiveIndex/PIHome";
import PISecondScreen from "../components/PredictiveIndex/PISecondScreen";
import PIThirdScreen from "../components/PredictiveIndex/PIThirdScreen";
import PIFourthScreen from "../components/PredictiveIndex/PIFourthScreen";
import PIFivthScreen from "../components/PredictiveIndex/PIFivthScreen";
import PILastScreen from "../components/PredictiveIndex/PILastScreen";
import Contact from "../components/ContactUs/Contact";
import FAQScreen from "../components/FAQ/FAQScreen";
import Main from "../components/Home/Main";

function Stack() {
  const { token } = UserLogin();

  return (
    <div style={{ fontFamily: "Roboto, sans-serif" }}>
      <Router>
        <Routes>
          <Route path="/" element={token ? <Main /> : <Register />} />
          <Route exact path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route exact path="/InterviewHome" element={<InterviewHome />} />
          <Route exact path="/InterviewWarmUp" element={<InterviewWarmUp />} />
          <Route exact path="/InterviewQs" element={<InterviewQs />} />
          <Route exact path="/Reports" element={<Reports />} />
          <Route exact path="/PIHome" element={<PIHome />} />
          <Route exact path="/SelectedReport" element={<SelectedReport />} />
          <Route exact path="/PISecondScreen" element={<PISecondScreen />} />
          <Route exact path="/PIThirdScreen" element={<PIThirdScreen />} />
          <Route exact path="/PIFourthScreen" element={<PIFourthScreen />} />
          <Route exact path="/PIFivthScreen" element={<PIFivthScreen />} />
          <Route exact path="/PILastScreen" element={<PILastScreen />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/FAQScreen" element={<FAQScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Stack;

//   returcn (
//     <>
//       <Router>
//         <Routes>
//           {isLogIn ? (
//             <Route exact path="/Register" element={<Register />}></Route>
//           ) : (
//             <Route exact path="/Login" element={<Login />}></Route>
//           )}
//         </Routes>
//       </Router>
//     </>
//   );
