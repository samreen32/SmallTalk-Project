import React, { useState } from "react";
import Login from "./components/LoginSmallTalk";
import Register from "./components/RegisterSmallTalk";
import Navbar from "./components/Home/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sections from "./components/Home/Sections";
import TimerDays from "./components/Home/TimerDays";
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
import Hero from "./components/Home/Hero";
import Faqs from "./components/Home/Faqs";
import Info from "./components/Home/Info";
import Footer from "./components/Home/footer";
import Navbar_1 from "./components/Home/Navbar_1";
// import Hero from "./HomePage/src/Components/Hero";

function App() {
  // const {isLogIn} = UserLogin();
  const [stickyNav, setstickyNav] = useState(false);
  const [toTop, settoTop] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <AuthProvider>
      <div style={{ fontFamily: "Roboto, sans-serif" }}>
        <Router>
          {/* <Register /> */}
          {/* <Navbar_1 /> */}
          <Navbar
            stickyNav={stickyNav}
            setstickyNav={setstickyNav}
            toTop={toTop}
            settoTop={settoTop}
            active={active}
            setActive={setActive}
          />
          <Hero
            stickyNav={stickyNav}
            setstickyNav={setstickyNav}
            active={active}
            setActive={setActive}
          />
          <Faqs />
          <Info />
          <Footer />
          {/* <InterviewWarmUp /> */}
        
          {/* <Register />
          <Login /> */}
          {/* <Sections /> */}

          <Routes>
            {/* {isLogIn ? (
              <> */}
            <Route exact path="/Navbar" element={<Navbar />}></Route>
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
            <Route
              exact
              path="/Hero"
              element={
                <Hero
                  stickyNav={stickyNav}
                  setstickyNav={setstickyNav}
                  active={active}
                  setActive={setActive}
                />
              }
            ></Route>
            <Route exact path="/Faqs" element={<Faqs />}></Route>
            <Route exact path="/Info" element={<Info />}></Route>
            <Route exact path="/Footer" element={<Footer />}></Route>

            {/* </>
            )} */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
