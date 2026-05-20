import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function RevealOnMount() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from('[data-reveal="title"]', { y: 16, opacity: 0, duration: 0.6 })
        .from(
          '[data-reveal="subtitle"]',
          { y: 16, opacity: 0, duration: 0.5 },
          "-=0.3"
        )
        .from(
          '[data-reveal="bar"]',
          { scaleX: 0, transformOrigin: "left", duration: 0.6 },
          "-=0.2"
        )
        .from(
          '[data-reveal="card"]',
          { y: 36, opacity: 0, duration: 0.65, stagger: 0.12 },
          "-=0.25"
        );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="min-h-[calc(100vh-64px)] bg-zinc-950 text-white px-6 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <h1
          data-reveal="title"
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
        >
          GSAP Reveal (on mount)
        </h1>
        <p
          data-reveal="subtitle"
          className="mt-2 text-white/70 max-w-2xl leading-relaxed"
        >
          A simple component-reveal animation using a GSAP timeline: title,
          subtitle, accent bar, then staggered cards.
        </p>

        <div data-reveal="bar" className="mt-6 h-1 w-28 bg-lime-400 rounded" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Staggered cards", body: "Each card enters with a small delay." },
            { title: "Scoped selectors", body: "Animations are scoped to this page only." },
            { title: "Timeline control", body: "Easy to reorder, overlap, or tweak." },
            { title: "Clean unmount", body: "useGSAP handles cleanup automatically." },
            { title: "Tailwind styling", body: "No extra CSS needed for the demo." },
            { title: "Extend it", body: "Swap in clip-path, masks, or SVG reveals." },
          ].map((card) => (
            <div
              key={card.title}
              data-reveal="card"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="text-lg font-medium">{card.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                {card.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

