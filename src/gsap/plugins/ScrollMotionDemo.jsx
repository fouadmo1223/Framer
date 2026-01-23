import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollMotionDemo = () => {
  const boxRef = useRef(null);
  const sectionsRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".section");

    // Create a timeline that animates as we scroll through sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionsRef.current,
        start: "top top",
        end: `+=${(sections.length - 1) * window.innerHeight}`,
        scrub: 1,
        pin: boxRef.current, // Pin just the box, not the whole container
        anticipatePin: 1,
      },
    });

    // Positions per section - these are viewport-relative positions
    const positions = [
      { x: "50vw", y: "50vh", rotate: 0 },      // Center of first section
      { x: "80vw", y: "30vh", rotate: 90 },     // Top-right of second section
      { x: "20vw", y: "70vh", rotate: 180 },    // Bottom-left of third section
      { x: "70vw", y: "80vh", rotate: 360 },    // Bottom-right of fourth section
    ];

    // Create smooth animation between positions
    sections.forEach((section, i) => {
      if (i > 0) {
        tl.to(
          boxRef.current,
          {
            x: positions[i].x,
            y: positions[i].y,
            rotation: positions[i].rotate,
            ease: "power1.inOut",
            duration: 1
          },
          i - 0.5 // Offset the timing slightly
        );
      }
    });

    // Initial position
    gsap.set(boxRef.current, {
      x: positions[0].x,
      y: positions[0].y,
      rotation: positions[0].rotate,
    });

  }, { scope: sectionsRef });

  return (
    <div className="wrapper">
      {/* Floating Element that follows scroll */}
      <div
        ref={boxRef}
        className="floating-box fixed top-0 left-0 w-20 h-20 bg-blue-500 rounded-xl z-50"
      />

      {/* Sections container */}
      <div ref={sectionsRef}>
        <section className="section h-screen flex items-center justify-center bg-red-100">
          <h1 className="text-5xl">Section 1</h1>
        </section>

        <section className="section h-screen flex items-center justify-center bg-green-100">
          <h1 className="text-5xl">Section 2</h1>
        </section>

        <section className="section h-screen flex items-center justify-center bg-yellow-100">
          <h1 className="text-5xl">Section 3</h1>
        </section>

        <section className="section h-screen flex items-center justify-center bg-purple-100">
          <h1 className="text-5xl">Section 4</h1>
        </section>
      </div>
    </div>
  );
};

export default ScrollMotionDemo;