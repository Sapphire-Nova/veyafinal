import React from "react";
import { motion } from "framer-motion";
import { chakras } from "./chakraData";
import ChakraImageDisplay from "./ChakraImageDisplay";

export default function ChakraHoneycomb({ onSelectChakra }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {chakras.map((chakra, idx) => (
        <motion.button
          key={chakra.id}
          onClick={() => onSelectChakra(chakra)}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="text-left group"
        >
          <ChakraImageDisplay chakra={chakra} clickable />
          <p className="text-xs text-[#c4b5fd] mt-2 text-center group-hover:text-[#d4af37] transition-colors font-medium">
            {chakra.name}
          </p>
        </motion.button>
      ))}
    </div>
  );
}