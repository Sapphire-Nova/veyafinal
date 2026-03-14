import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TarotStudyView({ card, onClose }) {
  const [isReversed, setIsReversed] = useState(false);

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
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0a0118] border border-[#7c3aed]/20 rounded-2xl p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#7c3aed]/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-[#c4b5fd]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Card Image */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-gradient-gold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              {card.card_name}
            </h1>
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border border-[#d4af37]/30 mb-4 bg-[#1a0533]">
              {card.image_url ? (
                <img
                  src={card.image_url}
                  alt={card.card_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#c4b5fd]/40">
                  {card.card_name}
                </div>
              )}
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#7c3aed]/20 text-[#c4b5fd]">
                {card.arcana_type} Arcana
              </span>
            </div>
          </div>

          {/* Right: Meanings & Keywords */}
          <div className="bg-[#1a0533] rounded-xl p-6 border border-[#7c3aed]/20">
            {/* Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsReversed(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isReversed
                    ? "bg-[#7c3aed]/30 text-[#d4af37]"
                    : "text-[#c4b5fd]/60 hover:text-[#c4b5fd]"
                }`}
              >
                Upright
              </button>
              <button
                onClick={() => setIsReversed(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  isReversed
                    ? "bg-[#7c3aed]/30 text-[#d4af37]"
                    : "text-[#c4b5fd]/60 hover:text-[#c4b5fd]"
                }`}
              >
                Reversed
              </button>
            </div>

            {/* Keywords */}
            <div className="mb-6">
              <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">
                ✦ Key Meanings
              </p>
              <div className="flex flex-wrap gap-2">
                {card.keywords?.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-xs text-[#d4af37] bg-[#d4af37]/5"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Meaning */}
            <div className="mb-6">
              <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">
                {isReversed ? "⚡ Reversed Meaning" : "✨ Upright Meaning"}
              </p>
              <p className="text-sm text-[#c4b5fd] leading-relaxed">
                {isReversed ? card.reversed_meaning : card.upright_meaning}
              </p>
            </div>

            {/* Violet's Insight */}
            {card.violets_insight && (
              <div className="border-t border-[#7c3aed]/20 pt-6">
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">
                  🌙 Violet's Insight
                </p>
                <p className="text-sm text-[#c4b5fd] leading-relaxed italic">
                  {card.violets_insight}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}