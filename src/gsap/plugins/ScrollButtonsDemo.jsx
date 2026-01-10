import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin);

const ScrollButtonsDemo = () => {
  useGSAP(() => {}, []);

  const scrollToBottom = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "max" },
      ease: "power2.out",
    });
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-[200vh] flex flex-col items-center gap-[120px] py-[100px]">
      {/* TOP BUTTON */}
      <button
        onClick={scrollToBottom}
        className="px-6 py-3 bg-black text-white rounded-md"
      >
        Go to Bottom ↓
      </button>

      {/* CONTENT */}
      <div className="w-24 h-24 bg-blue-500 rounded-md"></div>
      <div className="w-24 h-24 bg-blue-200 rounded-md"></div>
      <div className="w-24 h-24 bg-blue-700 rounded-md"></div>
      <div className="w-24 h-24 bg-green-500 rounded-md"></div>
      <div className="w-24 h-24 bg-purple-500 rounded-md"></div>

      {/* BOTTOM BUTTON */}
      <button
        onClick={scrollToTop}
        className="px-6 py-3 bg-red-600 text-white rounded-md"
      >
        Back to Top ↑
      </button>
    </div>
  );
};

export default ScrollButtonsDemo;
