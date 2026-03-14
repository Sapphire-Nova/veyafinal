import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TarotCardImage from "@/components/veya/TarotCardImage";

export default function CardOfTheDay() {
  const [dailyCard, setDailyCard] = useState(null);

  const { data: allCards = [] } = useQuery({
    queryKey: ["allTarotCards"],
    queryFn: () => base44.entities.TarotCard.list("-updated_date", 100)
  });

  useEffect(() => {
    if (allCards.length === 0) return;

    // Use date as seed for consistent daily card
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % allCards.length;
    setDailyCard(allCards[index]);
  }, [allCards]);

  if (!dailyCard) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl border border-[#d4af37]/20 p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#d4af37]" />
        <p className="text-xs text-[#d4af37] uppercase tracking-widest font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
          Card of the Day
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Card Image */}
        <div className="col-span-1">
          <TarotCardImage cardCode={dailyCard.card_code} cardName={dailyCard.card_name} />
        </div>

        {/* Content */}
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="text-lg text-gradient-gold mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
            {dailyCard.card_name}
          </h3>
          <p className="text-xs text-[#c4b5fd]/60 mb-3">{dailyCard.arcana_type} Arcana</p>
          <p className="text-xs text-[#c4b5fd]/70 leading-relaxed italic">
            "{dailyCard.upright_meaning.substring(0, 80)}..."
          </p>
        </div>
      </div>
    </motion.div>
  );
}