import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const KeyFrames = () => {
  useGSAP(() => {
    // const tl = gsap
    //   .timeline()
    //   .to("span", {
    //     x: 200,
    //     duration: 1,
    //   })
    //   .to("span", {
    //     y: 200,
    //     duration: 1,
    //   })
    //   .to("span", {
    //     x: 0,
    //     duration: 1,
    //   })
    //   .to("span", {
    //     y: 0,
    //     duration: 1,
    //   });

    // using keyFrames

    gsap.to("span", {
      keyframes: [
        { x: 100 },
        { y: 100 },
        {
          x: 0,
          delay: 2,
          onComplete: () => {
            console.log("third completed");
          },
        },
        { y: 0 },
        { x: 100 },
        
      ],
      rotate:360
    });
  }, {});

  return (
    <div className="  pt-10 ps-8">
      <span className="w-[60px] h-[60px] rounded-md bg-green-700  inline-block "></span>
    </div>
  );
};

export default KeyFrames;
