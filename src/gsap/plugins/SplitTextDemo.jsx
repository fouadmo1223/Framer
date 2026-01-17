import React from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const SplitTextDemo = () => {
  useGSAP(() => {
    const split = SplitText.create("span", {
      type: "lines",
      linesClass: "line++", // each line take diff class
    });

    // in js 
    // document.fonts.ready  to wait fonts to be loadded
  }, []);

  return (
    <div
      id="smooth-content"
      className="px-6 h-full w-full flex justify-center items-center"
    >
      <span className="text-6xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam odit
        laudantium hic nobis amet! Vitae, nihil, neque quisquam fugit nobis sed
        consequuntur voluptatem mollitia excepturi cupiditate odit alias facere
        expedita?
      </span>
    </div>
  );
};

export default SplitTextDemo;
