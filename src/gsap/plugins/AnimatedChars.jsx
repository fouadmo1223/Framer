import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AnimatedChars = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split = new SplitText(textRef.current, {
        type: "words",
      });

      // initial state (unfilled)
      gsap.set(split.words, {
        opacity: 0.2,
      });

      // fill words on scroll
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className="min-h-[200vh] px-6 flex justify-center items-center">
      <span
        ref={textRef}
        className="text-4xl text-center max-w-4xl leading-snug"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam odit
        laudantium hic nobis amet! Vitae, nihil, neque quisquam fugit nobis sed
        consequuntur voluptatem mollitia excepturi cupiditate odit alias facere
        expedita?
      </span>
    </div>
  );
};

export default AnimatedChars;
