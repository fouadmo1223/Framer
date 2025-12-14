import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Starter = () => {
  const head = useRef(null);

  useGSAP(() => {
    // gsap.from(".head", {

    gsap.from(head.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  return (
    <div className="">
      <h2 className="head" ref={head}>
        Hello
      </h2>
    </div>
  );
};

export default Starter;
