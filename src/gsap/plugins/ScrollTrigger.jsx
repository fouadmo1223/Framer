import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriger = () => {
  const circle = useRef(null);

  useGSAP(() => {
    gsap.to(circle.current, {
      rotate: 180,
      ease: "none",
      //   duration: 3,
      //   when animation starts
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        scrub: true, // to concent with the scroll itself
        end: "+=800",
      },
    });
  });

  return (
    <>
      {/* Scroll Content */}
      <div
        ref={circle}
        className="fixed flex justify-center items-center top-20 left-20 w-24 h-24 rounded-full bg-blue-600 z-50"
      >
        Fouad
      </div>
      <div className="h-[200vh] container bg-gray-100 flex items-center justify-center">
        <h1 className="text-5xl font-bold">Scroll Down 👇</h1>
        {/* Fixed Circle */}
      </div>
    </>
  );
};

export default ScrollTriger;
