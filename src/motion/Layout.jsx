import { motion } from "motion/react";
import { useState } from "react";

export  default function Layout() {
  const [expanded, setExpanded] = useState(null);
  const items = [1, 2, 3];
  return (
    <div className="list">
      {items.map((id) => (
        <motion.div
          key={id}
          layout
          onClick={() => setExpanded((prev) => (prev === id ? null : id))}
          className="list-item"
        >
          <h3>Item {id}</h3>
          {expanded === id && (
            <motion.p layout>
              This section expands and contracts with a layout animation.{" "}
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
