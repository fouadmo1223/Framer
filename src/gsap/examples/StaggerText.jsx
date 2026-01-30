import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
gsap.registerPlugin(SplitText);

const StaggerText = () => {
  const container = useRef(null);
  const firstTitle = useRef(null);
  const secondTitle = useRef(null);

  useGSAP(
    () => {
      const splitFirst = new SplitText(firstTitle.current, {
        type: "chars",
      });

      const splitSecond = new SplitText(secondTitle.current, {
        type: "chars",
      });

      gsap.defaults({
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        stagger: 0.06,
        ease: "power2.inOut",
      });

      gsap.fromTo(splitFirst.chars, { y: -100 }, { y: 150 });

      gsap.fromTo(
        splitSecond.chars,
        { y: -100, opacity: 0.7 },
        { y: 150, opacity: 0.3 },
      );

      return () => {
        splitFirst.revert();
        splitSecond.revert();
      };
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

          <h2 className="blur" ref={secondTitle}>
            GSAP
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StaggerText;
