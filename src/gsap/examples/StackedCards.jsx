import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StackedCards = () => {
  const container = useRef();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      cards.forEach((card, index) => {
        // We want to animate all cards except the last one
        // as they get "pushed back" by the card coming up
        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9 - index * 0.02, // Slightly scale down
            opacity: 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 10%", // When card hits 10% from top
              endTrigger: ".container-end",
              end: "top 10%",
              scrub: true,
              markers: false,
            },
          });
        }
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
      <div ref={container} className="bg-zinc-950 py-20">
        <div className="max-w-4xl mx-auto px-4">
          {cardData.map((card, i) => (
            <div
              key={i}
              className={`card sticky top-20 h-[500px] w-full mb-20 rounded-3xl p-10 flex flex-col justify-between shadow-2xl transition-shadow ${card.color}`}
            >
              <h2 className="text-4xl font-bold text-white">{card.title}</h2>
              <p className="text-xl text-white/80">{card.text}</p>
              <div className="text-sm font-mono text-white/50">0{i + 1}</div>
            </div>
          ))}
          {/* Helper div to mark where the last animation should end */}
          <div className="container-end h-1 w-full" />
        </div>
        {/* Spacer to allow scrolling past the cards */}
        <div className="h-screen" />
      </div>
    </>
  );
};

export default StackedCards;
