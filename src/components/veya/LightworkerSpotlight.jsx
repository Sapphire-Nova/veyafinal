import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LightworkerSpotlight() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* 1-on-1 Session */}
        <div
          className="glass-card p-8 rounded-2xl relative overflow-hidden"
          style={{
            border: "2px solid #d4af37",
            boxShadow: "0 0 40px rgba(212, 175, 55, 0.25), inset 0 0 30px rgba(212, 175, 55, 0.08)"
          }}
        >
          <div className="absolute top-0 left-0 text-6xl opacity-10">✨</div>
          <div className="relative z-10">
            <p className="text-[#d4af37] text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              ✦ Personal Path
            </p>
            <h3 className="text-2xl text-[#f5f0ff] font-semibold mb-3">1-on-1 Reading</h3>
            <p className="text-[#c4b5fd]/70 text-sm mb-6">
              Deep-dive into your chart, tarot spread, or spiritual questions in a private, channeled session with Violet.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-[#c4b5fd]/60">
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Personalized guidance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Chakra & crystal insights
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Energy alignment
              </li>
            </ul>
            <Link to={createPageUrl("Bookings")}>
              <Button
                className="w-full py-6 rounded-xl font-medium"
                style={{ background: "#d4af37", color: "#0a0118" }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Blessing Ritual */}
        <div
          className="glass-card p-8 rounded-2xl relative overflow-hidden"
          style={{
            border: "2px solid #d4af37",
            boxShadow: "0 0 40px rgba(212, 175, 55, 0.25), inset 0 0 30px rgba(212, 175, 55, 0.08)"
          }}
        >
          <div className="absolute top-0 right-0 text-6xl opacity-10">🕯️</div>
          <div className="relative z-10">
            <p className="text-[#d4af37] text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              ✦ Group Healing
            </p>
            <h3 className="text-2xl text-[#f5f0ff] font-semibold mb-3">Lightworker Blessing Ritual</h3>
            <p className="text-[#c4b5fd]/70 text-sm mb-6">
              Join our monthly full moon circles for guided meditation, community connection, and collective healing energy.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-[#c4b5fd]/60">
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Monthly gatherings
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Community of seekers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37]">✦</span> Collective intention-setting
              </li>
            </ul>
            <Link to={createPageUrl("FullMoonCircles")}>
              <Button
                className="w-full py-6 rounded-xl font-medium"
                style={{ background: "#d4af37", color: "#0a0118" }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Join the Circle
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}