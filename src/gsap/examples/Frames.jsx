import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Frames = () => {
  const container = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray(".frame");

      // 1. Stack them correctly: Frame 0 on top (z-3), Frame 1 (z-2), etc.
      frames.forEach((frame, i) => {
        gsap.set(frame, { zIndex: frames.length - i });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${frames.length * 1000}px`,
          scrub: 1,
        },
      });

      // 2. Animate only the top frames to reveal the ones underneath
      // We don't animate the very last frame because there's nothing under it
      frames.forEach((frame, i) => {
        if (i < frames.length - 1) {
          tl.to(frame, {
            clipPath: "inset(0 0 100% 0)", // Swipes up to reveal next
            ease: "none",
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <>
      <section ref={container} className="relative bg-black">
        <div
          id="framesSection"
          ref={sectionRef}
          className="relative h-screen overflow-hidden text-white text-center uppercase text-4xl md:text-8xl"
        >
          {/* Frame 1 */}
          <div className="frame absolute inset-0 size-full flex justify-center items-center">
            <h2 className="absolute z-20 mix-blend-difference">Ephemerality</h2>
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070"
              alt="1"
              className="size-full object-cover"
            />
          </div>

          {/* Frame 2 */}
          <div className="frame absolute inset-0 size-full flex justify-center items-center">
            <h2 className="absolute z-20 mix-blend-difference">Persistence</h2>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071"
              alt="2"
              className="size-full object-cover"
            />
          </div>

          {/* Frame 3 */}
          <div className="frame absolute inset-0 size-full flex justify-center items-center">
            <h2 className="absolute z-20 mix-blend-difference">Convergence</h2>
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
              alt="3"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="min-h-screen flex justify-center items-center text-4xl md:text-9xl bg-gray-900 text-white">
        SCROLL DOWN
      </div>
    </>
  );
};

export default Frames;
