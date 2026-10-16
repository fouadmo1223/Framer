import React, { useRef, useEffect, useCallback } from "react";

export default function Carousel() {
  const baseImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=85",
  ];

  const images = [...baseImages, ...baseImages, ...baseImages];

  const slideRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumId = useRef(null);

  const setWidth = useRef(0);
  const WALK = 1.2;

  const wrapScroll = useCallback(() => {
    const el = slideRef.current;
    if (!el) return;
    const oneSet = el.scrollWidth / 3;
    if (oneSet === 0) return;

    if (el.scrollLeft < oneSet * 0.5) {
      el.scrollLeft += oneSet;
      scrollLeft.current += oneSet;
      startX.current += oneSet / WALK;
    } else if (el.scrollLeft > oneSet * 2.5) {
      el.scrollLeft -= oneSet;
      scrollLeft.current -= oneSet;
      startX.current -= oneSet / WALK;
    }
  }, []);

  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const oneSet = el.scrollWidth / 3;
      setWidth.current = oneSet;
      el.scrollLeft = oneSet;
    });

    const stopMomentum = () => {
      if (momentumId.current) {
        cancelAnimationFrame(momentumId.current);
        momentumId.current = null;
      }
    };

    const onMouseDown = (e) => {
      stopMomentum();
      isDragging.current = true;
      el.classList.add("grabbing");
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      lastX.current = e.pageX;
      lastTime.current = performance.now();
      velocity.current = 0;
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        el.classList.remove("grabbing");
        startMomentum();
      }
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.classList.remove("grabbing");
      startMomentum();
    };

    const startMomentum = () => {
      let v = velocity.current;

      const glide = () => {
        if (Math.abs(v) < 0.3) {
          momentumId.current = null;
          return;
        }
        el.scrollLeft -= v;
        v *= 0.96;
        wrapScroll();
        momentumId.current = requestAnimationFrame(glide);
      };

      momentumId.current = requestAnimationFrame(glide);
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();

      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * WALK;
      el.scrollLeft = scrollLeft.current - walk;
      wrapScroll();

      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = ((e.pageX - lastX.current) * WALK) / dt * 16;
      }
      lastX.current = e.pageX;
      lastTime.current = now;
    };

    const onWheel = (e) => {
      e.preventDefault();
      stopMomentum();
      el.scrollLeft += e.deltaY + e.deltaX;
      wrapScroll();

      velocity.current = (e.deltaY + e.deltaX) * 0.3;
      startMomentum();
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stopMomentum();
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [wrapScroll]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .carouselPage {
          min-height: 100vh;
          background: #111;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 5rem;
          overflow: hidden;
        }

        .carouselTitle {
          margin: 0 0 1rem;
          font: 600 1.25rem/1.2 system-ui, sans-serif;
        }

        .slide {
          width: min(80%, 1000px);
          display: flex;
          gap: 2rem;
          padding: 8rem 4rem;
          overflow-x: auto;
          perspective: 100rem;
          transform-style: preserve-3d;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
        }

        .slide::-webkit-scrollbar {
          display: none;
        }

        .slide.grabbing {
          cursor: grabbing;
        }

        .slide li {
          list-style: none;
          position: relative;
          flex: 0 0 auto;
          transform-style: preserve-3d;
          animation: rotate-cover linear both;
          animation-timeline: view(inline);
          will-change: transform;
          z-index: 0;
        }

        .galleryImg {
          display: block;
          width: 10rem;
          height: 10rem;
          object-fit: cover;
          border-radius: 8px;
          backface-visibility: hidden;
          animation: rotate-cover linear both;
          animation-timeline: view(inline);
          box-shadow: 0 10px 50px rgb(0 0 0 / 0.45);
          -webkit-user-drag: none;
          pointer-events: none;
        }

        @keyframes rotate-cover {
          0% {
            transform: translateX(-125%) rotateY(-45deg) translateZ(-15rem) scale(0.75);
            opacity: 0;
          }

          35% {
            transform: translateX(0) rotateY(-45deg) translateZ(-5rem);
            opacity: 1;
          }

          48%,
          50%,
          52% {
            transform: rotateY(0deg) scale(1.35) translateZ(0);
            box-shadow: 0 10px 50px rgb(0 0 0 / 0.75);
          }

          65% {
            transform: translateX(0) rotateY(45deg) translateZ(-5rem);
            opacity: 1;
          }

          100% {
            transform: translateX(125%) rotateY(45deg) translateZ(-15rem) scale(0.75);
            opacity: 0;
          }
        }

        @media (max-width: 700px) {
          .slide {
            width: 100%;
            gap: 1rem;
            padding: 6rem 2rem;
          }

          .galleryImg {
            width: 14rem;
            height: 19rem;
          }
        }
      `}</style>

      <main className="carouselPage">
        <h1 className="carouselTitle">Scroll the gallery</h1>

        <ul className="slide" ref={slideRef}>
          {images.map((src, index) => (
            <li key={index}>
              <img
                className="galleryImg"
                src={src}
                alt={`Portrait ${(index % baseImages.length) + 1}`}
                loading="lazy"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
