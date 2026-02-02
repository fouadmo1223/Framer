// NumberAlongPath.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins (do this once)
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function NumberAlongPath() {
  const numberRef = useRef(null);
  const pathRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Animation 1: Follow the path ───────────────────────────────
      gsap.to(numberRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90, // makes number face direction of path
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 15%",
          scrub: 0.4, // smooth following (0.4s delay feel)
          // markers: true,         // ← uncomment for debugging
        },
      });

      // ─── Animation 2: Count up the number ───────────────────────────
      const endValue = 2025;

      gsap.to(numberRef.current, {
        innerHTML: endValue,
        duration: 2.8,
        snap: { innerHTML: 1 }, // only whole numbers
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=50000",
          scrub: true,
          // toggleActions: "play none none reverse",
        },
        onUpdate: function () {
          // Optional: add nice formatting (k, M, etc.)
          // this.targets()[0].innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString();
        },
      });
    }, sectionRef); // scoping context to our section

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[180vh] w-full bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-950 py-24"
    >
      {/* The SVG path — can be edited in Figma / Inkscape / etc */}
      <svg
        className="absolute left-1/2 top-0 h-[140vh] w-[90vw] max-w-5xl -translate-x-1/2 pointer-events-none"
        viewBox="0 0 1200 1800"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M 200,300 
             C 300,100  900,100  1000,300
             S 900,700   800,900
             C 600,1200  200,1400 200,1700
             L 1000,1700"
          stroke="rgba(99,102,241,0.15)"
          strokeWidth="4"
          strokeDasharray="12 8"
        />
      </svg>

      {/* The animated number */}
      <div
        ref={numberRef}
        className="absolute left-1/2 top-[20vh] flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-4xl font-black text-white shadow-2xl shadow-indigo-500/40 ring-8 ring-indigo-500/30"
        style={{ willChange: "transform" }}
      >
        0
      </div>

      {/* Some dummy content to make scroll longer */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-gray-300">
        <h2 className="mb-16 mt-32 text-5xl font-bold text-white md:text-7xl">
          Scroll to reveal magic
        </h2>

        <p className="mx-auto max-w-2xl text-xl leading-relaxed">
          The number follows a beautiful path while counting up — built with
          GSAP MotionPath, ScrollTrigger and Tailwind.
        </p>

        <div className="my-40 h-[80vh] rounded-3xl bg-black/30 backdrop-blur-xl" />
        <div className="my-40 h-[80vh] rounded-3xl bg-black/30 backdrop-blur-xl" />
      </div>
    </div>
  );
}
