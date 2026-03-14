import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import TarotSymbols from "@/components/veya/TarotSymbols";
import TarotCardImage from "@/components/veya/TarotCardImage";

export default function TarotCardFlip({ card, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [violetNote, setVioletNote] = useState(card.violets_insight || "");
  const [isSaving, setIsSaving] = useState(false);

  const updateCardMutation = useMutation({
    mutationFn: (data) => base44.entities.TarotCard.update(card.id, data),
    onSuccess: () => {
      setIsSaving(false);
    }
  });

  const handleSaveNote = async () => {
    if (violetNote === card.violets_insight) return;
    setIsSaving(true);
    await updateCardMutation.mutateAsync({ violets_insight: violetNote });
  };

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#7c3aed]/20 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5 text-[#c4b5fd]" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Flip Animation */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <motion.div
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="perspective w-full"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="relative w-full aspect-[2/3] cursor-pointer">
                {/* Front - Card Image */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isFlipped ? 0 : 1, pointerEvents: isFlipped ? "none" : "auto" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <TarotCardImage cardCode={card.card_code} cardName={card.card_name} />
                </motion.div>

                {/* Back - Meanings */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? "auto" : "none" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#1a0533] to-[#2d1b69] border-2 border-[#d4af37]/30 rounded-xl p-4 flex flex-col justify-center text-center"
                >
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">
                    {card.arcana_type} Arcana
                  </p>
                  <h2 className="text-lg text-gradient-gold mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                    {card.card_name}
                  </h2>
                  <div className="text-xs text-[#c4b5fd]/70">
                    {isFlipped && (
                      <p className="italic">"Click to see meanings"</p>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <p className="text-xs text-[#c4b5fd]/50 mt-4 text-center">Click card to flip</p>
          </div>

          {/* Meanings and Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card Header */}
            <div>
              <h1 className="text-3xl text-gradient-gold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                {card.card_name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#7c3aed]/20 text-[#c4b5fd] text-xs">
                  {card.arcana_type} Arcana
                </span>
                {card.suit && (
                  <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs">
                    {card.suit}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-[#7c3aed]/10 text-[#c4b5fd] text-xs">
                  Card {card.card_number}
                </span>
              </div>
            </div>

            {/* Keywords */}
            {(card.upright_keywords || card.reversed_keywords) && (
              <div className="space-y-4">
                {card.upright_keywords && (
                  <div>
                    <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">✦ Upright Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {card.upright_keywords.map((keyword) => (
                        <span key={keyword} className="px-2.5 py-1 rounded-lg bg-[#7c3aed]/15 text-[#c4b5fd] text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {card.reversed_keywords && (
                  <div>
                    <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">✦ Reversed Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {card.reversed_keywords.map((keyword) => (
                        <span key={keyword} className="px-2.5 py-1 rounded-lg bg-[#d4af37]/15 text-[#c4b5fd] text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Meanings */}
            <div className="space-y-4 border-t border-[#7c3aed]/10 pt-4">
              <div>
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">✨ Upright Meaning</p>
                <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{card.upright_meaning}</p>
              </div>
              <div>
                <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">⟳ Reversed Meaning</p>
                <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{card.reversed_meaning}</p>
              </div>
            </div>

            {/* Key Symbols */}
            <TarotSymbols symbols={card.key_symbols} />

            {/* Violet's Wisdom */}
            <div className="border-t border-[#7c3aed]/10 pt-4">
              <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-3">✦ Violet's Wisdom</p>
              <Textarea
                value={violetNote}
                onChange={(e) => setVioletNote(e.target.value)}
                placeholder="Add your personal spiritual insights and notes about this card..."
                className="min-h-[120px] bg-[#1a0533] border-[#7c3aed]/20 text-[#c4b5fd] placeholder:text-[#c4b5fd]/30 resize-none"
              />
              {violetNote !== card.violets_insight && (
                <Button
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="mt-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm"
                >
                  {isSaving ? "Saving..." : "Save Wisdom"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}