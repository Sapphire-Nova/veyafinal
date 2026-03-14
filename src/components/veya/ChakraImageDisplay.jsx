import React from "react";
import { motion } from "framer-motion";

export default function ChakraImageDisplay({ chakra, clickable = false, onClick = null }) {
  return (
    <motion.div
      whileHover={clickable ? { scale: 1.05 } : {}}
      onClick={clickable ? onClick : undefined}
      className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 border-[#d4af37]/20 ${
        clickable ? "cursor-pointer hover:border-[#d4af37]/40 transition-all" : ""
      }`}
      style={{
        background: "rgba(26,5,51,0.6)",
        backdropFilter: "blur(20px)"
      }}
    >
      <img
        src={chakra.image}
        alt={chakra.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      {/* Fallback glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${chakra.color}20, transparent 70%)`,
          pointerEvents: "none"
        }}
      />
    </motion.div>
  );
}