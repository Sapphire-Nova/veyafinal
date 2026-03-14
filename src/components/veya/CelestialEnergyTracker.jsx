import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function CelestialEnergyTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoonData = async () => {
      try {
        const response = await base44.functions.invoke('getMoonPhase', {});
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch moon phase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoonData();
    const interval = setInterval(fetchMoonData, 3600000); // Refresh hourly
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="h-24 bg-gradient-to-r from-[#7c3aed]/10 to-[#d4af37]/10 rounded-xl animate-pulse" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 border border-[#7c3aed]/30 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-[#d4af37] font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
          ✦ Celestial Energy
        </h3>
        <span className="text-3xl">{data.emoji}</span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-[#c4b5fd]/60 uppercase tracking-widest mb-1">Moon Phase</p>
          <p className="text-[#f5f0ff] font-medium">{data.phase}</p>
        </div>

        {/* Moon Illumination Bar */}
        <div>
          <p className="text-xs text-[#c4b5fd]/60 uppercase tracking-widest mb-2">Illumination</p>
          <div className="w-full h-2 bg-[#0a0118] rounded-full overflow-hidden border border-[#7c3aed]/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#d4af37]"
            />
          </div>
          <p className="text-xs text-[#c4b5fd] mt-1">{data.percentage}% illuminated</p>
        </div>

        <div>
          <p className="text-xs text-[#c4b5fd]/60 uppercase tracking-widest mb-1">Zodiac Season</p>
          <p className="text-[#f5f0ff] font-medium">♈ {data.zodiacSign}</p>
        </div>
      </div>
    </motion.div>
  );
}