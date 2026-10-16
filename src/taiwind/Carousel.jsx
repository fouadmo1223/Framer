import React from "react";

export default function Carousel() {
  const images = [
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
          scroll-snap-type: x mandatory;
          perspective: 100rem;
          transform-style: preserve-3d;
          scrollbar-width: thin;
          scrollbar-color: #555 #222;
        }

        .slide li {
          list-style: none;
          position: relative;
          flex: 0 0 auto;
          scroll-snap-align: center;
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

        <ul className="slide">
          {images.map((src, index) => (
            <li key={src}>
              <img
                className="galleryImg"
                src={src}
                alt={`Portrait ${index + 1}`}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
