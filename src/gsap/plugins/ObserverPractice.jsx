import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Observer, SplitText);

const ObserverPractice = () => {
  useGSAP(() => {
    // Observer.create({
    //   target: ".selected",
    //   onClick: () => console.log("clicked"),
    // });

    function rotate(value) {
      gsap.to(".selected", {
        rotation: value,
        duration: 0.5,
        ease: "power2.inOut",
        transformOrigin: "center",
        overwrite: true,
      });
    }

    Observer.create({
      target: "window",
      type: "wheel,touch,scroll,pointer",
      onDown: () => rotate(0),
      onUp: () => rotate(180),
    });
  });

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="w-18 h-18 flex justify-center items-center selected rounded-full  mx-auto bg-green-500 text-2xl">
        F
      </div>
    </div>
  );
};

export default ObserverPractice;
