import React, { useState } from "react";
import { getCardImageUrl } from "@/lib/tarotImageMap";

export default function TarotCardImage({ cardCode, cardName, showFallback = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getCardImageUrl(cardCode);

  const handleImageError = () => {
    setImageFailed(true);
  };

  return (
    <div className="aspect-[2/3] rounded-lg overflow-hidden border-2 border-[#d4af37]/30 bg-[#1a0533]">
      {!imageFailed ? (
        <img
          src={imageUrl}
          alt={cardName || "Tarot Card"}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        // Fallback: gold-embossed card back
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#2d1b69] to-[#1a0533]">
          <div className="text-center space-y-3">
            <p className="text-[#d4af37] text-6xl">✦</p>
            <p className="text-[#d4af37] text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
              Veya
            </p>
            <p className="text-[#c4b5fd]/40 text-xs">Card Back</p>
          </div>
        </div>
      )}
    </div>
  );
}