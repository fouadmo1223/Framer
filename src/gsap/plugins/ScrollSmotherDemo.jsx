import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const ScrollSmotherDemo = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      content: "#smooth-content",
      smooth: 2,
      effects: false,
    });

    return () => smoother.kill();
  }, []);

  return (
   
      <div
        id="smooth-content"
        className="min-h-screen flex flex-col items-center gap-[120px] py-[200px]"
      >
        <div className="w-20 h-20 bg-blue-500 rounded-md"></div>
        <div className="w-20 h-20 bg-blue-200 rounded-md"></div>
        <div className="w-20 h-20 bg-blue-700 rounded-md"></div>
      
    </div>
  );
};

export default ScrollSmotherDemo;
