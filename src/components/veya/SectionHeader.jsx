import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, gold = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2
        className={`text-3xl md:text-4xl font-semibold mb-3 ${gold ? "text-gradient-gold" : "text-gradient-violet"}`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#c4b5fd]/60 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
    </motion.div>
  );
}