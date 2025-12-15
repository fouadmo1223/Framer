import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CharAnimation = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("span", {
        opacity: 0,
        y: 20,
        rotate: -10,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
      });
    },
    { scope: container } // 👈 مهم جدًا
  );

  return (
    <div ref={container} className="[&_span]:text-3xl [&_span]:inline-block">
      <span>h</span>
      <span>e</span>
      <span>l</span>
      <span>l</span>
      <span>o</span>
    </div>
  );
};

export default CharAnimation;
