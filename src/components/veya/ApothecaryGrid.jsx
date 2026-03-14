import React from "react";
import { motion } from "framer-motion";

export default function ApothecaryGrid({ items, type = "herbs" }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#d4af37] mb-3 flex items-center justify-center bg-[#1a0533]/40"
            style={{
              boxShadow: "0 0 25px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.1)"
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <h4 className="text-sm text-[#f5f0ff] font-medium">{item.name}</h4>
          <p className="text-xs text-[#d4af37]/70 mt-1">
            {type === "herbs" ? item.uses?.split(",")[0] : item.chakra}
          </p>
        </motion.div>
      ))}
    </div>
  );
}