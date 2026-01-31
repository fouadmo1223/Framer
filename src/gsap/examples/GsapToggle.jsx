import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapToggle = () => {
  const container = useRef(null);
  const knob = useRef(null);

  useGSAP(() => {}, { scope: container });

  const handleToggle = (e) => {
    gsap.to(knob.current, {
      x: e.target.checked ? 32 : 0,
      backgroundColor: e.target.checked ? "#22c55e" : "#ef4444",
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section ref={container} className="relative bg-black pt-10 ms-20">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
        />

        {/* Track */}
        <div className="relative w-16 h-8 bg-white rounded-full ring-2 ring-red-500 peer-checked:ring-green-500 duration-300">
          {/* Knob */}
          <span
            ref={knob}
            className="absolute top-1 left-1 h-6 w-6 rounded-full bg-red-500"
          />
        </div>
      </label>
    </section>
  );
};

export default GsapToggle;
