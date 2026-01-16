import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// REQUIRED: register the React plugin
gsap.registerPlugin(useGSAP);

const QuickSitter = () => {
  const mover = useRef(null);



  useGSAP(() => {
    // const moveHandler = (e) => {
    //   gsap.to(mover.current, {
    //     x: e.clientX - 5, // center the circle
    //     y: e.clientY - 5,
    //     duration: 0.4,
    //     ease: "power3.out",
    //   });
    // };

    // use quickTo to add animation 
    const xSetter = gsap.quickSetter(mover.current, "x", "px");
    const ySetter = gsap.quickSetter(mover.current, "y", "px");
    

    const moveHandler = (e) => {
      xSetter(e.clientX - 5);
      ySetter(e.clientY - 5);
    };

    // set make it dirictly no latency and duration so its not smooth

    //    gsap.set(mover.current, {
    //     x: e.clientX - 5, // center the circle
    //     y: e.clientY - 5,
    //     duration: 0.4,
    //     ease: "power3.out",
    //   });
    // };

    window.addEventListener("mousemove", moveHandler);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* CONTENT ABOVE */}

      <div
        ref={mover}
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-blue-100 pointer-events-none z-50"
      />
    </div>
  );
};

export default QuickSitter;
