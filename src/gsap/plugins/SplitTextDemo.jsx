import React from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const SplitTextDemo = () => {
  useGSAP(() => {
    const split = SplitText.create("span", {
      type: "lines,chars",
      linesClass: "line++", // each line take diff class
    });

    // in js
    // document.fonts.ready  to wait fonts to be loadded

    // make animation on splited text
    // gsap.from(split.lines, {
    //   opacity: 0,
    //   y: 100,
    //   stagger: 1,
    //   duration: 1,
    //   ease: "power2.out",
    // });

    // gsap.from(split.chars, {
    //   opacity: 0,
    //   y: 100,
    //   stagger: {
    //     each: "0.01",
    //     from: "random",
    //   },
    //   duration: 1,
    //   ease: "power2.in",
    // });
  }, []);

  return (
    <div
      id="smooth-content"
      className="px-6 h-full w-full flex justify-center items-center"
    >
      <span className="text-4xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam odit
        laudantium hic nobis amet! Vitae, nihil, neque quisquam fugit nobis sed
        consequuntur voluptatem mollitia excepturi cupiditate odit alias facere
        expedita?
      </span>
    </div>
  );
};

export default SplitTextDemo;
