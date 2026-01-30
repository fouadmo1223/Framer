import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const StaggerText = () => {
  const container = useRef(null);
  const firstTitle = useRef(null);
  const secondTitle = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        firstTitle.current,
        {
          y: -100,
        },
        {
          y: 150,
          repeat: -1,
          yoyo: true,
          duration: 1,
          stagger: 0.5,
        },
      );
      gsap.fromTo(
        secondTitle.current,
        {
          y: -100,
          opacity: 0.7,
        },
        {
          y: 150,
          repeat: -1,
          opacity: 0.3,
          yoyo: true,
          duration: 1,
          stagger: 0.5,
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className=" w-full h-[90%] text-white text-[180px] pt-10 flex flex-col items-center justify-center  "
    >
      <div className="w-[90%] relative border-b border-b-white   h-[50%] overflow-hidden flex justify-center">
        <div className="absolute bottom-0 translate-y-1/2">
          {/* // don't make animation on element have css styles for x and y */}
          <h2 ref={firstTitle}>GSAP</h2>
        </div>
      </div>
      <div className="w-[90%] relative   h-[50%] overflow-hidden flex justify-center">
        <div className="absolute top-0 -translate-y-1/2">
          {/* // don't make animation on element have css styles for x and y */}

          <h2 ref={secondTitle}>GSAP</h2>
        </div>
      </div>
    </div>
  );
};

export default StaggerText;
