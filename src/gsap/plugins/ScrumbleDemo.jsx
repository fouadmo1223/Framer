import React, { useRef } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin);

const ScrumbleDemo = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      {
        scrambleText: {
          text: "",
        },
      },
      {
        scrambleText: {
          text: "Scramble Text Effect 🚀",
          chars: "upperAndLowerCase",
          speed: 0.4,
          revealDelay: 0.2,
        },
        duration: 2,
        ease: "none",
      },
    );
  });

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <h1
        ref={textRef}
        className="text-4xl font-bold text-white cursor-pointer"
        onMouseEnter={() => {
          gsap.to(textRef.current, {
            scrambleText: {
              text: "Scramble Text Effect 🚀",
              chars: "0123456789!@#$%^&*",
              speed: 0.1,
            },
            duration: 3,
          });
        }}
      >
        Scramble Text Effect 🚀
      </h1>
    </div>
  );
};

export default ScrumbleDemo;
