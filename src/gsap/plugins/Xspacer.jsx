import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Xspacer = () => {
  const container = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".slide");

      const tl = gsap.timeline({});

      //   slides.forEach((_, i) => {

      //     if (i !== 0) {
      //       tl.fromTo(
      //         track.current,
      //         { xPercent: -(i - 1) * 100, duration: 3 },
      //         { xPercent: -i * 100, ease: "none", duration: 3 }
      //       );
      //     }
      //   });

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        duration: 3,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="overflow-x-hidden bg-amber-100">
      {/* SLIDE TRACK */}
      <div ref={track} className="flex w-[300vw] h-screen">
        <section className="slide min-w-screen flex items-center justify-center bg-white text-black text-5xl">
          Box 1
        </section>

        <section className="slide min-w-screen flex items-center justify-center bg-black text-white text-5xl">
          Box 2
        </section>

        <section className="slide min-w-screen flex items-center justify-center bg-white text-black text-5xl">
          Box 3
        </section>
      </div>
    </div>
  );
};

export default Xspacer;
