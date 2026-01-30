import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Always register plugins (do it once, outside components is even better)
gsap.registerPlugin(ScrollTrigger);

const ParallaxEffect = () => {
  const container = useRef(null);
  const horizontalSection = useRef(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".slide");

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none", // important for scrub feeling
        scrollTrigger: {
          trigger: horizontalSection.current,
          pin: true,
          start: "top top",
          scrub: 1,
          // This is usually the correct end for full horizontal travel
          end: () => `+=${horizontalSection.current?.scrollWidth - innerWidth}`,
          // Alternative (often more stable):
          // end: () => "+=" + horizontalSection.current.offsetWidth,
          invalidateOnRefresh: true, // good practice
          // markers: true,          // uncomment to debug
        },
      });
    },
    { scope: container },
  );

  return (
    <>
      <section ref={container} className="relative w-full overflow-hidden">
        <div
          ref={horizontalSection}
          className="flex w-fit flex-nowrap text-white text-9xl"
          // ^^^ very important: flex + nowrap + w-fit (or inline-flex)
        >
          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-red-900/70">
            DIV ONE
          </div>

          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-blue-900/70">
            DIV TWO
          </div>

          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-green-900/70">
            DIV THREE
          </div>

          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-purple-900/70">
            DIV FOUR
          </div>

          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-yellow-900/70">
            DIV FIVE
          </div>

          <div className="slide w-screen h-screen flex justify-center items-center p-20 text-center bg-pink-900/70">
            DIV SIX
          </div>
        </div>
      </section>

      <div className="min-h-screen flex justify-center items-center text-9xl bg-gray-900 text-white">
        Other Content Below
      </div>
    </>
  );
};

export default ParallaxEffect;
