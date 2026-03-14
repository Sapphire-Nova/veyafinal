import React from "react";
import { motion } from "framer-motion";

export default function HeroOrb() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent, rgba(124,58,237,0.3), transparent, rgba(212,175,55,0.3), transparent)",
        }}
      />
      {/* Inner orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.8), rgba(45,27,105,0.9), rgba(10,1,24,1))",
          boxShadow: "0 0 60px rgba(124,58,237,0.4), inset 0 0 60px rgba(124,58,237,0.2)",
        }}
      />
      {/* Highlight */}
      <div
        className="absolute top-8 left-10 w-16 h-10 rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)",
        }}
      />
      {/* Moon symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl md:text-6xl opacity-80" style={{ textShadow: "0 0 30px rgba(212,175,55,0.5)" }}>
          🌙
        </span>
      </div>
    </div>
  );
}