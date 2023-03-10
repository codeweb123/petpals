import React, { useState, useEffect } from "react";

// cleanup function
// second argument
const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    console.log("use effect");
    window.addEventListener("resize", checkSize);
    return () => {
      console.log("cleanup");
      window.removeEventListener("resize", checkSize);
    };
  });
  console.log("render");

  return (
    <React.Fragment>
      <h1>window</h1>
      <h2>{size}</h2>
    </React.Fragment>
  );
};

export default UseEffectCleanup;
