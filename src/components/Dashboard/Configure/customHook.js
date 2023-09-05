import { useState } from "react";

const CustomHook = () => {
  var [setToggle, setsideToggle] = useState(false);
  const onOpen = () => {
    setsideToggle(!setToggle);
  };

  return [setToggle, setsideToggle, onOpen];
  
};

export default CustomHook;