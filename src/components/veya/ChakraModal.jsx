import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ChakraModal({ chakra, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#0a0118] border border-[#7c3aed]/20 rounded-2xl p-6 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#7c3aed]/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[#c4b5fd]" />
        </button>

        <div className="mb-6">
          <div className="mb-4 w-full max-w-sm mx-auto">
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-[#d4af37]/20">
              <img
                src={chakra.image}
                alt={chakra.name}
                className="w-full h-full object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
            </div>
          </div>
          <h1 className="text-3xl text-gradient-gold mb-1 text-center" style={{ fontFamily: "'Cinzel', serif" }}>
            {chakra.name}
          </h1>
          <p className="text-sm text-[#c4b5fd]/60 italic text-center">{chakra.sanskrit}</p>
          <p className="text-xs text-[#d4af37] mt-2 text-center">Located: {chakra.location}</p>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">✦ Affirmation</p>
            <p className="text-[#f5f0ff] italic">"{chakra.affirmation}"</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[#d4af37] uppercase tracking-widest mb-1">Element</p>
              <p className="text-[#c4b5fd]/70">{chakra.element}</p>
            </div>
            <div>
              <p className="text-[#d4af37] uppercase tracking-widest mb-1">Color</p>
              <p className="text-[#c4b5fd]/70">{chakra.color}</p>
            </div>
            <div>
              <p className="text-[#d4af37] uppercase tracking-widest mb-1">Frequency</p>
              <p className="text-[#c4b5fd]/70">{chakra.frequency}</p>
            </div>
            <div>
              <p className="text-[#d4af37] uppercase tracking-widest mb-1">Mantra</p>
              <p className="text-[#c4b5fd]/70">{chakra.mantra}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">Governs</p>
            <p className="text-[#c4b5fd]/70 leading-relaxed">{chakra.governs?.join(", ")}</p>
          </div>

          <div>
            <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">When Balanced</p>
            <p className="text-[#c4b5fd]/70 leading-relaxed">{chakra.balanced?.join(", ")}</p>
          </div>

          {chakra.blockage && (
            <div>
              <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">Signs of Blockage</p>
              <p className="text-[#c4b5fd]/70 leading-relaxed">{chakra.blockage?.join(", ")}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}