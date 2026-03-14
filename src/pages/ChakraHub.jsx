import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/veya/SectionHeader";
import ChakraCard from "@/components/veya/ChakraCard";
import ChakraDetail from "@/components/veya/ChakraDetail";
import { chakras } from "@/components/veya/chakraData";

export default function ChakraHub() {
  const [selectedChakra, setSelectedChakra] = useState(null);

  return (
    <div className="bg-zinc-500 mx-auto px-4 py-12 max-w-4xl sm:px-6">
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
                
                <div className="space-y-4 relative z-10">
                  {[...chakras].reverse().map((chakra, idx) =>
                <button
                  key={chakra.id}
                  onClick={() => setSelectedChakra(chakra)}
                  className="flex items-center gap-4 group">

                      <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform group-hover:scale-125"
                    style={{
                      background: `${chakra.color}20`,
                      boxShadow: `0 0 20px ${chakra.color}30`
                    }}>

                        {chakra.emoji}
                      </div>
                      <span className="text-xs text-[#c4b5fd]/40 group-hover:text-[#c4b5fd] transition-colors">
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