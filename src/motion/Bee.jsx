import React from "react";

export default function Bee() {
  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        /* Wing flap animation */
        @keyframes flap {
          0%   { transform: rotate(0deg); }
          50%  { transform: rotate(15deg); }
          100% { transform: rotate(0deg); }
        }

        .wing {
          transform-origin: center;
          animation: flap 0.3s ease-in-out infinite;
        }

        .body {
          filter: drop-shadow(0 4px 4px rgba(0,0,0,0.15));
        }
      `}</style>

      {/* Bee Group */}
      <g className="body" transform="translate(100,75)">
        {/* Wings */}
        <ellipse
          className="wing"
          cx="40"
          cy="-25"
          rx="25"
          ry="15"
          fill="#AEE8FF"
          opacity="0.8"
        />
        <ellipse
          className="wing"
          cx="-40"
          cy="-25"
          rx="25"
          ry="15"
          fill="#CFF6FF"
          opacity="0.8"
        />

        {/* Body */}
        <ellipse
          cx="0"
          cy="0"
          rx="40"
          ry="25"
          fill="#FFD24D"
          stroke="#000"
          strokeWidth="1.5"
        />

        {/* Stripes */}
        <rect x="-30" y="-20" width="12" height="40" rx="6" fill="#333" />
        <rect x="-10" y="-20" width="12" height="40" rx="6" fill="#333" />
        <rect x="10" y="-20" width="12" height="40" rx="6" fill="#333" />

        {/* Head */}
        <circle
          cx="-50"
          cy="0"
          r="18"
          fill="#222"
          stroke="#000"
          strokeWidth="1"
        />
        <circle cx="-54" cy="-4" r="3" fill="#fff" />
        <circle cx="-46" cy="-4" r="3" fill="#fff" />

        {/* Antennae */}
        <path
          d="M -55 -10 q -8 -12 0 -20"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -45 -10 q 8 -12 0 -20"
          stroke="#222"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Stinger */}
        <polygon points="40,5 55,0 40,-5" fill="#222" />
      </g>
    </svg>
  );
}
