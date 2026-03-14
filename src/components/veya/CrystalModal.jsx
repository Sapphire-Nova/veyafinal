import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CrystalModal({ crystal, onClose }) {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image */}
          <div className="md:col-span-1">
            <div className="aspect-square rounded-xl overflow-hidden border border-[#7c3aed]/20 bg-[#1a0533]">
              <img
                src={crystal.image}
                alt={crystal.name}
                className="w-full h-full object-cover"
                onError={(e) => {e.target.style.display = 'none';}}
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl text-gradient-gold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              {crystal.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#7c3aed]/20 text-[#c4b5fd]">
                {crystal.chakra} Chakra
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                {crystal.element}
              </span>
              {crystal.zodiac && (
                <span className="px-3 py-1 rounded-full bg-[#7c3aed]/20 text-[#c4b5fd]">
                  {crystal.zodiac}
                </span>
              )}
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">✨ Spiritual Benefits</p>
                <p className="text-[#c4b5fd]/70 leading-relaxed">{crystal.spiritual}</p>
              </div>

              <div>
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">🔮 Magical Uses</p>
                <p className="text-[#c4b5fd]/70 leading-relaxed">{crystal.magical}</p>
              </div>

              <div>
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">📖 Folklore & History</p>
                <p className="text-[#c4b5fd]/60 leading-relaxed italic">{crystal.folklore}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}