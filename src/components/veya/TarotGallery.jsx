import React, { useState } from "react";
import { motion } from "framer-motion";
import { getCardImageUrl } from "@/lib/PageNotFound";

export default function TarotGallery({ cards, onSelectCard }) {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (cardId) => {
    setFailedImages(prev => ({ ...prev, [cardId]: true }));
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => (
        <motion.button
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onSelectCard(card)}
          className="group relative overflow-hidden rounded-lg border border-[#7c3aed]/20 hover:border-[#d4af37]/50 transition-all"
        >
          <div className="aspect-square bg-[#1a0533] overflow-hidden">
            {!failedImages[card.id] ? (
              <img
                src={getCardImageUrl(card.card_code)}
                alt={card.card_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => handleImageError(card.id)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[#c4b5fd]/40">
                {card.card_name}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <p className="text-xs text-[#d4af37] font-medium text-center w-full">
              {card.card_name}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}