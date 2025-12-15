import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerDemo = () => {
  const circle = useRef(null);

  useGSAP(() => {
    gsap.to(circle.current, {
      x: 600,
      y: 250,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: document.body, // whole page scroll
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  return (
    <>
      {/* Fixed Circle */}
      <div
        ref={circle}
        className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-600 z-50"
      />

      {/* Scroll Content */}
      <div className="h-[200vh] bg-gray-100 flex items-center justify-center">
        <h1 className="text-5xl font-bold">Scroll Down 👇</h1>
      </div>
    </>
  );
};

export default ScrollTriggerDemo;
