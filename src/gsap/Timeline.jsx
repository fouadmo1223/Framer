import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Timeline = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from("h2", {
        opacity: 0,
        y: -30,
        duration: 0.6,
      })
        .from(
          "p",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          "button",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
          },
          "-=0.2"
        );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="flex flex-col gap-10 justify-center items-center"
    >
      <h2 className="text-4xl">Hello to my Website</h2>
      <p>We can help you</p>
      <button className="rounded bg-gray-500 px-6 py-2 text-white">
        Visit
      </button>
    </div>
  );
};

export default Timeline;
