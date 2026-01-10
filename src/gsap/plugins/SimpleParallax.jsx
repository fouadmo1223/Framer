import React from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SimpleParallax = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true, // enables speed
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="px-6">
        {/* CONTENT ABOVE */}
        <p className="py-[200px] text-center text-xl">Content before image</p>

        {/* IMAGE IN MIDDLE */}
        <div className="flex justify-center h-100 overflow-hidden my-[200px]">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="parallax"
            data-speed="auto"
            className="w-[500px] rounded-lg h-[150%]"
          />
        </div>

        {/* CONTENT BELOW */}
        <p className="py-[200px] text-center text-xl">Content after image</p>
      </div>
    </div>
  );
};

export default SimpleParallax;
