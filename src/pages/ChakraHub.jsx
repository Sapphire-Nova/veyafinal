import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/veya/SectionHeader";
import ChakraCard from "@/components/veya/ChakraCard";
import ChakraDetail from "@/components/veya/ChakraDetail";
import ChakraImageDisplay from "@/components/veya/ChakraImageDisplay";
import { chakras } from "@/components/veya/chakraData";

export default function ChakraHub() {
  const [selectedChakra, setSelectedChakra] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <AnimatePresence mode="wait">
        {selectedChakra ?
        <ChakraDetail
          key="detail"
          chakra={selectedChakra}
          onBack={() => setSelectedChakra(null)} /> :


        <div key="list">
            <SectionHeader
            title="Chakra Learning Hub"
            subtitle="Explore your seven energy centers. Diagnose imbalances, discover healing protocols, and align your spiritual body."
            gold />


            {/* Visual chakra column */}
            <div className="flex flex-col items-center mb-12">
              <div className="relative">
                {/* Spine line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a855f7]/30 via-[#22c55e]/30 to-[#ef4444]/30" />
                
                <div className="space-y-4 relative z-10 w-full">
                   {[...chakras].reverse().map((chakra, idx) =>
                 <button
                   key={chakra.id}
                   onClick={() => setSelectedChakra(chakra)}
                   className="flex items-center gap-4 group w-full hover:opacity-80 transition-opacity">

                       <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all">
                         <img
                           src={chakra.image}
                           alt={chakra.name}
                           className="w-full h-full object-cover"
                           onError={(e) => {e.target.style.display = 'none';}}
                         />
                       </div>
                       <span className="text-xs text-[#c4b5fd]/60 group-hover:text-[#c4b5fd] transition-colors">
                         {chakra.name}
                       </span>
                     </button>
                 )}
                 </div>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {chakras.map((chakra, idx) =>
            <ChakraCard
              key={chakra.id}
              chakra={chakra}
              onClick={() => setSelectedChakra(chakra)}
              delay={idx * 0.05} />

            )}
            </div>
          </div>
        }
      </AnimatePresence>
    </div>);

}