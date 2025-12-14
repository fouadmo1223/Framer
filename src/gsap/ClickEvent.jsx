import React, { useRef } from "react";
import gsap from "gsap";

const ClickEvent = () => {
  const text = useRef(null);

  const handleClick = () => {
    gsap.to(text.current, {
      x: 100,
      duration: 0.6,
      ease: "back.out(1.7)", // spring effect
      onComplete: () => {
        gsap.to(text.current, {
          x: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      },
    });
  };

  return (
    <div>
      <p ref={text} onClick={handleClick} style={{ cursor: "pointer" }}>
        Hello World
      </p>
    </div>
  );
};

export default ClickEvent;
