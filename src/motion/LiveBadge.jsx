import { motion } from "motion/react";

export function LiveBadge() {
  return (
    <motion.div className="live-container">
      <motion.span
        animate={{
          scale: [1, 1.25, 1],
          boxShadow: [
            "0 0 0px rgba(198, 28, 255, 0.4)",
            "0 0 8px rgba(200, 0, 255, 0.7)",
            "0 0 0px rgba(153, 0, 255, 0.4)",
          ],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        className="badge-live"
      >
        LIVE
      </motion.span>
    </motion.div>
  );
}
