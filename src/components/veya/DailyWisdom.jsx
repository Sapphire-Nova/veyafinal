import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";

const MAJOR_ARCANA = [
  { name: "The Fool", emoji: "🤡" },
  { name: "The Magician", emoji: "✨" },
  { name: "The High Priestess", emoji: "👑" },
  { name: "The Empress", emoji: "👸" },
  { name: "The Emperor", emoji: "👨‍👦" },
  { name: "The Hierophant", emoji: "🙏" },
  { name: "The Lovers", emoji: "💕" },
  { name: "The Chariot", emoji: "🎪" },
  { name: "Strength", emoji: "💪" },
  { name: "The Hermit", emoji: "🕯️" },
  { name: "Wheel of Fortune", emoji: "🎡" },
  { name: "Justice", emoji: "⚖️" },
  { name: "The Hanged Man", emoji: "🔄" },
  { name: "Death", emoji: "🍂" },
  { name: "Temperance", emoji: "🍶" },
  { name: "The Devil", emoji: "😈" },
  { name: "The Tower", emoji: "🏚️" },
  { name: "The Star", emoji: "⭐" },
  { name: "The Moon", emoji: "🌙" },
  { name: "The Sun", emoji: "☀️" },
  { name: "Judgement", emoji: "🎺" },
  { name: "The World", emoji: "🌍" },
];

const MOON_PHASES = [
  { name: "New Moon", emoji: "🌑", energy: "Beginnings & Intentions" },
  { name: "Waxing Crescent", emoji: "🌒", energy: "Growth & Momentum" },
  { name: "First Quarter", emoji: "🌓", energy: "Action & Challenges" },
  { name: "Waxing Gibbous", emoji: "🌔", energy: "Refinement & Progress" },
  { name: "Full Moon", emoji: "🌕", energy: "Culmination & Clarity" },
  { name: "Waning Gibbous", emoji: "🌖", energy: "Gratitude & Release" },
  { name: "Last Quarter", emoji: "🌗", energy: "Reflection & Letting Go" },
  { name: "Waning Crescent", emoji: "🌘", energy: "Rest & Integration" },
];

export default function DailyWisdom() {
  const [card, setCard] = useState(null);
  const [moonPhase, setMoonPhase] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    setCard(MAJOR_ARCANA[seed % MAJOR_ARCANA.length]);
    setMoonPhase(MOON_PHASES[(seed + 5) % MOON_PHASES.length]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl max-w-2xl mx-auto border border-[#d4af37]/30"
    >
      <h3
        className="text-center text-[#d4af37] text-sm uppercase tracking-widest mb-8"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        ✦ Daily Wisdom ✦
      </h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Card of the Day */}
        <div className="flex flex-col items-center">
          <p className="text-xs text-[#c4b5fd]/60 mb-3 uppercase">Tarot Card</p>
          <div className="text-6xl mb-3">{card?.emoji}</div>
          <p className="text-[#f5f0ff] font-medium text-center">{card?.name}</p>
        </div>

        {/* Moon Phase */}
        <div className="flex flex-col items-center">
          <p className="text-xs text-[#c4b5fd]/60 mb-3 uppercase">Current Phase</p>
          <div className="text-6xl mb-3">{moonPhase?.emoji}</div>
          <div className="text-center">
            <p className="text-[#f5f0ff] font-medium">{moonPhase?.name}</p>
            <p className="text-xs text-[#d4af37]/70 mt-1">{moonPhase?.energy}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}