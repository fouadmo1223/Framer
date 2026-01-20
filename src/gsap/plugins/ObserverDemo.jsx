import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

const sectionsData = [
  {
    title: "Scroll down",
    bg: "https://assets.codepen.io/16327/site-landscape-1.jpg",
  },
  {
    title: "Animated with GSAP",
    bg: "https://assets.codepen.io/16327/site-landscape-2.jpg",
  },
  {
    title: "GreenSock",
    bg: "https://assets.codepen.io/16327/site-landscape-3.jpg",
  },
  {
    title: "Animation platform",
    bg: "https://assets.codepen.io/16327/site-landscape-4.jpg",
  },
  {
    title: "Keep scrolling",
    bg: "https://assets.codepen.io/16327/site-landscape-5.jpg",
  },
];

const ObserverDemo = () => {
  const sectionsRef = useRef([]);
  const outerRef = useRef([]);
  const innerRef = useRef([]);
  const splitHeadings = useRef([]);
  const currentIndexRef = useRef(-1); // use ref instead of state
  const animatingRef = useRef(false);

  useEffect(() => {
    gsap.set(outerRef.current, { yPercent: 100 });
    gsap.set(innerRef.current, { yPercent: -100 });

    splitHeadings.current = sectionsRef.current.map(
      (section) =>
        new SplitText(section.querySelector("h2"), {
          type: "chars,words,lines",
          linesClass: "clip-text",
        }),
    );

    const wrap = gsap.utils.wrap(0, sectionsData.length);

    function gotoSection(index, direction) {
      index = wrap(index);
      animatingRef.current = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animatingRef.current = false),
      });

      if (currentIndexRef.current >= 0) {
        const prev = sectionsRef.current[currentIndexRef.current];
        gsap.set(prev, { zIndex: 0 });
        tl.to(prev.querySelector(".bg"), { yPercent: -15 * dFactor }).set(
          prev,
          {
            autoAlpha: 0,
          },
        );
      }

      const curr = sectionsRef.current[index];
      gsap.set(curr, { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [outerRef.current[index], innerRef.current[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0,
      )
        .fromTo(
          curr.querySelector(".bg"),
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0,
        )
        .fromTo(
          splitHeadings.current[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          0.2,
        );

      currentIndexRef.current = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {sectionsData.map((section, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="absolute w-full h-screen top-0 left-0 opacity-0"
        >
          <div
            ref={(el) => (outerRef.current[i] = el)}
            className="w-full h-full overflow-hidden"
          >
            <div
              ref={(el) => (innerRef.current[i] = el)}
              className="w-full h-full overflow-hidden"
            >
              <div
                className="bg w-full h-full flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%), url(${section.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold text-center">
                  {section.title}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ObserverDemo;
