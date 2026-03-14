import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ChakraCard({ chakra, onClick, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className={`w-full glass-card p-5 flex items-center gap-4 hover:border-[${chakra.color}]/30 transition-all group text-left`}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#d4af37]/20 flex-shrink-0">
        <img
          src={chakra.image}
          alt={chakra.name}
          className="w-full h-full object-cover"
          onError={(e) => {e.target.style.display = 'none';}}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[#f5f0ff] text-sm font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
          {chakra.name}
        </h3>
        <p className="text-xs text-[#c4b5fd]/40">{chakra.sanskrit} · {chakra.location}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#c4b5fd]/20 group-hover:text-[#c4b5fd]/60 transition-colors flex-shrink-0" />
    </motion.button>
  );
}