import React from "react";
import Navbar from "./HomeSections/Section1/Navbar";
import Hero from "./HomeSections/Section3/Hero";
import Faqs from "./HomeSections/Section4/Faqs";
import Footer from "./HomeSections/Section5/Footer";
import Info from "./HomeSections/Section5/Info";

function Main() {
  return (
    <>
      <Navbar />
      <Hero />
      <Faqs />
      <Info />
      <Footer />
    </>
  );
}

export default Main;
