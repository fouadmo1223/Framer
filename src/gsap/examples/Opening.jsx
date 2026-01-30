import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const OverLay = ({ timeline }) => {
  const overlay = useRef(null);

  useGSAP(
    () => {
      timeline &&
        gsap.to("div", {
          xPercent: gsap.utils.wrap([-100, 100]),
          duration: 2,
          ease: "power2.inOut",
        });
    },
    { scope: overlay, dependencies: [timeline] },
  );

  return (
    <>
      {/* Intro Overlay */}
      <div
        ref={overlay}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="bg-red-500 w-full grow" />
        <div className="bg-red-500 w-full grow" />
        <div className="bg-red-500 w-full grow" />
        <div className="bg-red-500 w-full grow" />
      </div>
    </>
  );
};

const Opening = () => {
  const container = useRef(null);
  const timeline = gsap.timeline();

  useGSAP(() => {}, { scope: container });

  return (
    <>
      <OverLay timeline={timeline} />
      <div
        ref={container}
        className=" w-full h-[90%] text-white text-[180px] pt-10 flex flex-col items-center justify-center  "
      >
        <div className="w-[90%] relative   h-full overflow-hidden flex items-center justify-center">
          <div className="">
            {/* // don't make animation on element have css styles for x and y */}
            <h2>GSAP</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Opening;
