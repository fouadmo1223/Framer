import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, SplitText);

const ObserverPractice = () => {
  useGSAP(() => {
    Observer.create({
      target: ".selected",
      onClick: () => console.log("clicked"),
    });
  });

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="w-18 h-18 selected rounded-full mt-20 mx-auto bg-green-500"></div>
    </div>
  );
};

export default ObserverPractice;
