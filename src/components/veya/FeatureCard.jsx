import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, page, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Link to={createPageUrl(page)}>
        <div className="glass-card p-6 h-full hover:border-[#7c3aed]/30 transition-all duration-500 group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center mb-4 group-hover:glow-violet transition-all duration-500">
            <Icon className="w-6 h-6 text-[#c4b5fd] group-hover:text-[#d4af37] transition-colors duration-500" />
          </div>
          <h3
            className="text-lg mb-2 text-[#f5f0ff] group-hover:text-gradient-gold transition-all"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {title}
          </h3>
          <p className="text-sm text-[#c4b5fd]/60 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}