import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HelloDraw = () => {
  const svgRef = useRef(null);

 useGSAP(() => {
   const paths = svgRef.current.querySelectorAll("path");

   paths.forEach((path) => {
     const length = path.getTotalLength();

     path.style.strokeDasharray = length;
     path.style.strokeDashoffset = length;
     path.style.opacity = 1;
     path.style.transformOrigin = "50% 50%";
   });

   gsap.fromTo(
     paths,
     {
       strokeDashoffset: (length) => length,
       y: 100,
       rotate: 50,
       opacity: 0,
     },
     {
       strokeDashoffset: 0,
       y: 0,
       rotate: 0,
       opacity: 1,
       duration: 1.2,
       ease: "power3.out",
       stagger: 0.2,
     }
   );
 });


  return (
    <svg
      ref={svgRef}
      width="400"
      height="120"
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* H */}
      <path
        d="M20 20 V100 M20 60 H60 M60 20 V100"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* e */}
      <path
        d="M110 60 C110 30 160 30 160 60 C160 90 110 90 110 60 H160"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* l */}
      <path
        d="M200 20 V100"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* l */}
      <path
        d="M230 20 V100"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* o */}
      <path
        d="M300 60 C300 30 350 30 350 60 C350 90 300 90 300 60 Z"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default HelloDraw;
