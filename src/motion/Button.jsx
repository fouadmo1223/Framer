import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const Button = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // animate only once
    margin: "-100px", // trigger a bit earlier
  });

  return (
    <div className="h-[200vh] flex items-end justify-center pb-20">
      <motion.button
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.9,x:100 }}
        // animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 2,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        whileInView={{ opacity: 0.5, y: 0, scale: 1,x:0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-4xl bg-gray-400 rounded-md text-white px-6 py-3 cursor-pointer"
      >
        Start Now
      </motion.button>
    </div>
  );
};

export default Button;
