import React, { useState } from "react";
import Navbar from "./HomeSections/Section1/Navbar";
import Hero from "./HomeSections/Section3/Hero";
import Faqs from "./HomeSections/Section4/Faqs";
import Footer from "./HomeSections/Section5/Footer";
import Info from "./HomeSections/Section5/Info";

function Main() {
  const [stickyNav, setstickyNav] = useState(false);
  const [toTop, settoTop] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
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
    </>
  );
}

export default Main;
