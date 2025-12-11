import React from "react";
import { motion } from "motion/react";

const TextAnimation = () => {
  const text =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate";

  const pVariants = {
    hidden: { opacity: 1 }, // keep visible so children animate
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, },
    visible: {
      opacity: 1,
     
    },
  };

  return (
    <div>
      <motion.p
        variants={pVariants}
        initial="hidden"
        animate="visible"
        className="p-4 text-3xl leading-relaxed"
      >
        {text.split("").map((char, i) => (
          <motion.span key={i} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default TextAnimation;
