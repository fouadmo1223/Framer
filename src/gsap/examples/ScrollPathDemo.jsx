import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollPathDemo = () => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // helper: center of element relative to container
      const getCenterPoint = (el) => {
        const point = MotionPathPlugin.convertCoordinates(
          el,
          containerRef.current,
          {
            x: el.offsetWidth / 2,
            y: el.offsetHeight / 2,
          },
        );

        return {
          x: point.x - targetRef.current.offsetWidth / 2,
          y: point.y - targetRef.current.offsetHeight / 2,
        };
      };

      const p1 = getCenterPoint(box1Ref.current);
      const p2 = getCenterPoint(box2Ref.current);
      const p3 = getCenterPoint(box3Ref.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,

          anticipatePin: 1,
        },
      });

      tl.to(targetRef.current, { x: p1.x, y: p1.y })
        .to(targetRef.current, { x: p2.x, y: p2.y })
        .to(targetRef.current, { x: p3.x, y: p3.y });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-slate-900 p-10"
    >
      {/* Floating Number */}
      <div
        ref={targetRef}
        className="absolute top-0 left-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        1
      </div>

      {/* Target Zones */}
      <div className="flex flex-col gap-[60vh] mt-20">
        <div
          ref={box1Ref}
          className="w-32 h-32 border-2 border-dashed border-white/30 flex items-center justify-center text-white self-start"
        >
          Zone A
        </div>

        <div
          ref={box2Ref}
          className="w-32 h-32 border-2 border-dashed border-white/30 flex items-center justify-center text-white self-center"
        >
          Zone B
        </div>

        <div
          ref={box3Ref}
          className="w-32 h-32 border-2 border-dashed border-white/30 flex items-center justify-center text-white self-end"
        >
          Zone C
        </div>
      </div>
    </div>
  );
};

export default ScrollPathDemo;
