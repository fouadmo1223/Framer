import React from "react";
import { motion } from "motion/react";

const Variants = () => {
  const features = ["one", "two", "three", "four"];

  //   staggerChildren make child waits
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.ul variants={container} initial="hidden" animate="visible">
      {features.map((feat, index) => {
        return (
          <motion.li className="text-5xl" variants={item} key={index}>
            {feat}
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default Variants;
