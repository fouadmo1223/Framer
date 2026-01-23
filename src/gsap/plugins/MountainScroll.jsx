import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MountainScroll = () => {
  const snowboardRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (!snowboardRef.current || !trailRef.current) return;

    gsap.to(snowboardRef.current, {
      scrollTrigger: {
        trigger: "#Boarder-Scroll",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      duration: 1,
      motionPath: {
        path: trailRef.current,
        align: trailRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    });
  }, []);

  return (
    <div id="content">
      {/* Mountain SVG */}
      <svg
        id="Mountain-Scroll"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidyMin"
      >
        <defs>
          <style>{`
            .mountain-1 { fill: #98e2f6; }
            .mountain-2 { fill: #2992c8; }
            .mountain-3, .mountain-6 { fill: #fff; }
            .mountain-4 { opacity: 0.5; }
            .mountain-5 { fill: #1aace5; }
            .mountain-6 { stroke: #fff; stroke-miterlimit: 10; }
            .mountain-7 { fill: #d6d6d6; }
          `}</style>
        </defs>

        <g id="Sky">
          <rect className="mountain-1" width="1000" height="447" />
        </g>

        <g id="Mountain-Top">
          {/* Top Mountains */}
          <polygon
            className="mountain-2"
            points="1000 261.5 903.9 140.5 813 229.5 614.2 49.5 470.4 237.5 280.6 168.5 251.7 245.5 143.8 152.5 0 305.5 0 714.5 1000 715.6 1000 261.5"
          />
          <polygon className="mountain-3" points="0 297.6 0 714.1 60.2 715 60.2 415.4 95.8 360.9 115.7 242.8 119.9 206.5 144 152 0 297.6" />
          {/* Add other mountain layers here as needed */}
        </g>
      </svg>

      {/* Trail & Snowboarder */}
      <svg
        id="Boarder-Scroll"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 7600"
      >
        <rect id="background" width="1000" height="7600" fill="#fff" />
        {/* Trail path */}
        <path
          id="trail"
          ref={trailRef}
          d="M609.9,164.5C409.6,442.1,358.6,821.2,478.4,1141.8c63.2,169.2,172,330.8,164.4,511.2
          -10.9,256.6-255.6,464.7-246.1,721.3,8.9,239.3,238.1,431.3,235.1,670.7-2.1,170.6-121.8,315.4-169.7,479
          " 
          fill="none"
          stroke="transparent"
        />

        {/* Snowboarder */}
        <circle
          ref={snowboardRef}
          cx="0"
          cy="0"
          r="15"
          fill="red"
        />
      </svg>
    </div>
  );
};

export default MountainScroll;
