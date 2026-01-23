import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AirplaneScroll = () => {
  const planeRef = useRef(null);
  const scrollCTARef = useRef(null);
  const lineRefs = useRef({ length: null, wingspan: null, phalange: null });

  useEffect(() => {
    const plane = planeRef.current;
    const scrollCTA = scrollCTARef.current;
    const { length, wingspan, phalange } = lineRefs.current;

    // Initial setup
    gsap.set(plane, { x: 80, y: -32, z: 0, rotation: 0 });
    gsap.set([length, wingspan, phalange], { autoAlpha: 0 });

    // Fade in plane
    gsap.fromTo(
      plane,
      { autoAlpha: 0, x: "50%" },
      { autoAlpha: 1, x: "0%", duration: 1 }
    );
    gsap.to(scrollCTA, { autoAlpha: 1, delay: 0.5 });

    // Scroll-triggered plane movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(scrollCTA, { autoAlpha: 0, duration: 0.25 })
      .to(plane, { x: -10, duration: 1 })
      .to(plane, { rotation: 15, x: -40, y: 0, duration: 1 })
      .to(plane, { rotation: -10, x: 40, duration: 1 })
      .to(plane, { rotation: 5, x: -40, z: 30, duration: 1 })
      .to(plane, { rotation: 0, x: 0, y: -10, z: 50, duration: 1 })
      .to(plane, { rotation: 45, y: 50, z: 0, x: 30, duration: 1 })
      .to(plane, { rotation: 60, y: 85, z: 20, x: 20, z: 100, duration: 1 });

    // SVG animations
    gsap.to(length, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: ".length",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    gsap.to(wingspan, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: ".wingspan",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    gsap.to(phalange, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: ".phalange",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="content" style={{ position: "relative" }}>
      {/* Plane Image */}
      <img
        ref={planeRef}
     src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
        alt="Plane"
        style={{
          position: "fixed",
          width: "200px",
          top: "30%",
          left: "50%",
          x: 0,
          y: 0,
          zIndex: 10,
          transformOrigin: "center",
        }}
      />

      {/* Sections */}
      <div className="section" style={{ height: "100vh" }}>
        <h1>Airplanes.</h1>
        <h3>The beginners guide.</h3>
        <div ref={scrollCTARef} className="scroll-cta">
          Scroll
        </div>
      </div>

      <div className="section" style={{ height: "100vh" }}>
        <h2>They're kinda like buses...</h2>
      </div>

      <div className="section" style={{ height: "100vh" }}>
        <h2>..except they leave the ground.</h2>
      </div>

      <div className="section length" style={{ height: "100vh" }}>
        <h2>Length</h2>
        <svg width="100%" height="100">
          <line
            ref={(el) => (lineRefs.current.length = el)}
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="black"
            strokeWidth="2"
            opacity="0"
          />
        </svg>
      </div>

      <div className="section wingspan" style={{ height: "100vh" }}>
        <h2>Wingspan</h2>
        <svg width="100%" height="100">
          <line
            ref={(el) => (lineRefs.current.wingspan = el)}
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="black"
            strokeWidth="2"
            opacity="0"
          />
        </svg>
      </div>

      <div className="section phalange" style={{ height: "100vh" }}>
        <h2>Left Phalange</h2>
        <svg width="100%" height="100">
          <circle
            ref={(el) => (lineRefs.current.phalange = el)}
            cx="50"
            cy="50"
            r="20"
            stroke="black"
            fill="transparent"
            strokeWidth="2"
            opacity="0"
          />
        </svg>
      </div>

      <div className="section end" style={{ height: "100vh" }}>
        <h2>Fin.</h2>
      </div>
    </div>
  );
};

export default AirplaneScroll;
