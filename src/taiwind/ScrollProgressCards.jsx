export default function ScrollProgressCards() {
  const cards = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <>
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          height: 0.5rem;
          background-color: blue;
          transform: scaleX(0);
          transform-origin: 0 50%;
          animation: grow-progress auto linear both;
          animation-timeline: scroll(root block);
        }

        @keyframes grow-progress {
          from {
            transform: scaleX(0);
            background-color: blue;
          }
          to {
            transform: scaleX(1);
            background-color: blueviolet;
          }
        }

        .scroll-card {
          border: 1px solid gray;
          padding: 2rem;
          margin: 2rem 0;
          font-size: 2rem;
          border-radius: 1rem;
        }
      `}</style>

      <div className="scroll-progress" aria-hidden="true" />

      <main>
        {cards.map((number) => (
          <section className="scroll-card" key={number}>
            Card {number}
          </section>
        ))}
      </main>
    </>
  );
}
