import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AFFIRMATIONS_BY_ZODIAC = {
  Aries: {
    new: "I channel my courage into bold new beginnings.",
    waxing: "I am igniting my inner fire and manifesting my dreams.",
    full: "I am a beacon of passion and unstoppable power.",
    waning: "I release what no longer serves my highest purpose."
  },
  Taurus: {
    new: "I am grounded and open to abundance in all forms.",
    waxing: "I nurture my gifts and attract stability and prosperity.",
    full: "I am a magnet for lasting love and material security.",
    waning: "I let go of attachments and trust in divine timing."
  },
  Gemini: {
    new: "I speak my truth with clarity and purpose.",
    waxing: "My words are seeds of wisdom that bloom and grow.",
    full: "I am a bridge between worlds, curious and illuminated.",
    waning: "I clear my mind and release limiting thoughts."
  },
  Cancer: {
    new: "I create safe spaces for my heart to heal and grow.",
    waxing: "I nurture myself and others with infinite compassion.",
    full: "I am emotionally intuitive and deeply connected to purpose.",
    waning: "I release emotional baggage and guard my peace."
  },
  Leo: {
    new: "I shine my light unapologetically into the world.",
    waxing: "I am creative, radiant, and magnetic.",
    full: "I am a sovereign being of unlimited potential.",
    waning: "I release ego and honor the light in others."
  },
  Virgo: {
    new: "I am organized, clear, and ready to serve with grace.",
    waxing: "I refine my gifts and manifest with precision.",
    full: "I am discerning, wise, and grounded in truth.",
    waning: "I release perfectionism and embrace wholeness."
  },
  Libra: {
    new: "I attract harmony, balance, and divine partnerships.",
    waxing: "I create beauty and peace in all my relationships.",
    full: "I am a channel for love, grace, and perfect balance.",
    waning: "I release codependency and honor my own needs."
  },
  Scorpio: {
    new: "I embrace transformation and emerge renewed.",
    waxing: "I harness my power and claim my truth.",
    full: "I am a phoenix rising, magnetic and unstoppable.",
    waning: "I release resentment and honor my evolution."
  },
  Sagittarius: {
    new: "I expand into my highest vision and adventure.",
    waxing: "I am a seeker of truth and divine wisdom.",
    full: "I am blessed with abundance, luck, and vision.",
    waning: "I release arrogance and stay humble and open."
  },
  Capricorn: {
    new: "I build my empire with patience and integrity.",
    waxing: "I am disciplined, ambitious, and divinely guided.",
    full: "I am a master of my destiny and legacy.",
    waning: "I release control and trust the unfolding."
  },
  Aquarius: {
    new: "I embrace my uniqueness and lead with innovation.",
    waxing: "I am a visionary channeling divine inspiration.",
    full: "I am a revolutionary beacon for humanity.",
    waning: "I release detachment and stay present with love."
  },
  Pisces: {
    new: "I trust my mystical gifts and swim with the current.",
    waxing: "I am a dreamer manifesting magic into reality.",
    full: "I am ocean-deep, intuitive, and infinitely wise.",
    waning: "I release illusion and anchor in truth."
  }
};

export default function DynamicAffirmation() {
  const [affirmation, setAffirmation] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");
  const [lunarPhase, setLunarPhase] = useState("");

  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await base44.functions.invoke('getMoonPhase', {});
        const { zodiacSign, phase } = response.data;
        
        setZodiacSign(zodiacSign);
        
        // Map phase to affirmation category
        let phaseCategory = 'full';
        if (phase.includes('New')) phaseCategory = 'new';
        else if (phase.includes('Waxing')) phaseCategory = 'waxing';
        else if (phase.includes('Waning')) phaseCategory = 'waning';
        
        setLunarPhase(phase);
        const text = AFFIRMATIONS_BY_ZODIAC[zodiacSign]?.[phaseCategory] || 
          AFFIRMATIONS_BY_ZODIAC['Pisces']['full'];
        setAffirmation(text);
      } catch (err) {
        console.error('Failed to fetch affirmation:', err);
        setAffirmation("I trust in the divine timing of my life.");
      }
    };

    fetchAffirmation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass-card p-8 border border-[#d4af37]/30 rounded-2xl text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.4), transparent 70%)" }} />
      
      <div className="relative z-10">
        <Sparkles className="w-6 h-6 text-[#d4af37] mx-auto mb-4" />
        
        <p className="text-xs text-[#c4b5fd] uppercase tracking-[0.2em] mb-4">
          {zodiacSign} Season · {lunarPhase}
        </p>
        
        <p 
          className="text-xl md:text-2xl text-[#f5f0ff] leading-relaxed mb-6 italic"
          style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}
        >
          "{affirmation}"
        </p>
        
        <p className="text-xs text-[#c4b5fd]/50">
          Your Daily Affirmation for Today ✦
        </p>
      </div>
    </motion.div>
  );
}