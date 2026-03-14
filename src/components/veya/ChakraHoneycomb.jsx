import React from "react";
import { motion } from "framer-motion";
import { chakras } from "./chakraData";

export default function ChakraHoneycomb({ onSelectChakra }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 items-center">
      {chakras.map((chakra, idx) => (
        <motion.button
          key={chakra.id}
          onClick={() => onSelectChakra(chakra)}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl transition-all"
          style={{
            background: `radial-gradient(circle, ${chakra.color}20, transparent)`,
            boxShadow: `0 0 30px ${chakra.color}40, inset 0 0 20px ${chakra.color}15`,
            border: `2px solid ${chakra.color}60`,
          }}
        >
          <span className="drop-shadow-lg">{chakra.emoji}</span>
        </motion.button>
      ))}
    </div>
  );
}