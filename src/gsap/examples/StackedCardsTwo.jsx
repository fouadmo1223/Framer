import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StackedCardsTwo = () => {
  const container = useRef();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      const cardsWithoutFirst = gsap.utils.toArray(".card:not(:first-child)");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${cards.length * 1000}px`,
          scrub: 1,
          pin: ".pin-wrapper",
        },
      });

      cardsWithoutFirst.forEach((card, index) => {
        tl.from(card, {
          y: window.innerHeight,
        });
      });
    },
    { scope: container },
  );

  const cardData = [
    {
      title: "The Vision",
      color: "bg-blue-500",
      text: "Defining the future of web design.",
    },
    {
      title: "The Build",
      color: "bg-purple-600",
      text: "Crafting pixel-perfect components.",
    },
    {
      title: "The Launch",
      color: "bg-emerald-500",
      text: "Deploying excellence to the world.",
    },
    {
      title: "The Growth",
      color: "bg-orange-500",
      text: "Scaling ideas into reality.",
    },
  ];

  return (
    <>
      <div className="relative pt-20 bg-black" ref={container}>
        <div className="container flex-center pin-wrapper">
          <div className="relative w-full">
            {cardData.map((card, i) => (
              <div
                key={i}
                className={`card  h-[500px] w-full mb-20 rounded-3xl p-10 flex flex-col justify-between shadow-2xl transition-shadow ${card.color}`}
              >
                <h2 className="text-4xl font-bold text-white">{card.title}</h2>
                <p className="text-xl text-white/80">{card.text}</p>
                <div className="text-sm font-mono text-white/50">0{i + 1}</div>
              </div>
            ))}
            {/* Helper div to mark where the last animation should end */}
            <div className="container-end h-1 w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StackedCardsTwo;
