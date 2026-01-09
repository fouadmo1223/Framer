import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SecondScrollTrigger = () => {
  const box1 = useRef();
  const box2 = useRef();
  useGSAP(() => {
    gsap.to(box1.current, {
      rotate: 180,
      scrollTrigger: {
        trigger: box1.current,
        start: "bottom center", // top of choosed elem and center of view port
        scrub: true,
        end: "+=800px",
        markers: true,
        once: true,
        // onEnter: () => console.log("enterd"),
        // toggleAction: "play pause pause pause ", // enter leave enterback leaveback
      },
    });
  });

  useGSAP(() => {
    gsap.to(box2.current, {
      rotate: -180,
    });
  });

  return (
    <>
      <div className="overflow-x-hidden pt-120 p-6 min-h-[500vh] bg-amber-100">
        <div
          ref={box1}
          className=" bg-white text-black w-fit p-10  rounded-md "
        >
          Box1
        </div>
        <div
          ref={box2}
          className=" bg-black text-white w-fit p-10  rounded-md "
        >
          Box2
        </div>
      </div>
    </>
  );
};

export default SecondScrollTrigger;
