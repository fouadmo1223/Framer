import React, { useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

const DragDemo = () => {
  const boxRef = useRef(null);
  const dropZoneRef = useRef(null);

  useGSAP(() => {
    Draggable.create(boxRef.current, {
      type: "x,y",
      inertia: true,
      bounds: window,
      onRelease() {
        const box = boxRef.current.getBoundingClientRect();
        const dropZone = dropZoneRef.current.getBoundingClientRect();

        const isInside =
          box.left > dropZone.left &&
          box.right < dropZone.right &&
          box.top > dropZone.top &&
          box.bottom < dropZone.bottom;

        if (isInside) {
          gsap.to(boxRef.current, {
            scale: 0.8,
            backgroundColor: "#22c55e",
            duration: 0.3,
          });
        } else {
          gsap.to(boxRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },
    });
  });

  return (
    <div className="w-full h-screen flex justify-center items-center gap-20">
      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        className="w-40 h-40 border-4 border-dashed border-gray-400 flex items-center justify-center"
      >
        Drop Here
      </div>

      {/* Draggable Box */}
      <div
        ref={boxRef}
        className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded cursor-grab"
      >
        Drag
      </div>
    </div>
  );
};

export default DragDemo;
