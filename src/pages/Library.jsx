import React, { useState } from "react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Gem, Search, Zap, Wind, Droplets, Flame, Mountain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/veya/SectionHeader";
import ApothecaryGrid from "@/components/veya/ApothecaryGrid";
import { libraryHerbs } from "@/components/veya/herbData";
import { libraryCrystals } from "@/components/veya/crystalData";

const elementColors = {
  Fire: "text-orange-400",
  Water: "text-blue-400",
  Air: "text-sky-300",
  Earth: "text-emerald-400",
  Saturn: "text-purple-400"
};

function HerbCard({ herb, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card text-left hover:border-[#d4af37]/30 transition-all duration-300 overflow-hidden rounded-2xl">

        <div className="flex items-center gap-4 p-5">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#7c3aed]/15 bg-[#0a0118]/40">
            <img
              src={herb.image}
              alt={herb.name}
              className="w-full h-full object-cover"
              onError={(e) => {e.target.style.display = 'none';}} />

          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#f5f0ff] font-medium text-base" style={{ fontFamily: "'Cinzel', serif" }}>
              {herb.name}
            </h3>
            <p className="text-xs text-[#c4b5fd]/40 mt-0.5 truncate">{herb.uses}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: herb.element?.includes("Fire") ? "#fb923c" : herb.element?.includes("Water") ? "#60a5fa" : herb.element?.includes("Air") ? "#7dd3fc" : "#34d399" }}>
              ✦ {herb.element}
            </p>
          </div>
          <span className="text-[#c4b5fd]/30 text-lg flex-shrink-0">{expanded ? "−" : "+"}</span>
        </div>

        <AnimatePresence>
          {expanded &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5">

              <div className="border-t border-[#7c3aed]/10 pt-4 space-y-4">
                <div>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-1.5">✨ Magical Properties</p>
                  <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{herb.magical}</p>
                </div>
                <div>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-1.5">📖 Folklore & History</p>
                  <p className="text-sm text-[#c4b5fd]/60 leading-relaxed italic">{herb.folklore}</p>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </button>
    </motion.div>);

}

function CrystalCard({ crystal, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card text-left hover:border-[#d4af37]/30 transition-all duration-300 overflow-hidden rounded-2xl">

        <div className="flex items-center gap-4 p-5">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#7c3aed]/15 bg-[#0a0118]/40">
            <img
              src={crystal.image}
              alt={crystal.name}
              className="w-full h-full object-cover"
              onError={(e) => {e.target.style.display = 'none';}} />

          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#f5f0ff] font-medium text-base" style={{ fontFamily: "'Cinzel', serif" }}>
              {crystal.name}
            </h3>
            <p className="text-xs text-[#c4b5fd]/40 mt-0.5">{crystal.chakra} Chakra</p>
            <p className="text-xs text-blue-300 mt-1 font-medium">✦ {crystal.element}</p>
          </div>
          <span className="text-[#c4b5fd]/30 text-lg flex-shrink-0">{expanded ? "−" : "+"}</span>
        </div>

        <AnimatePresence>
          {expanded &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5">

              <div className="border-t border-[#7c3aed]/10 pt-4 space-y-4">
                <div className="flex gap-6 text-xs">
                  <div>
                    <p className="text-[#d4af37] uppercase tracking-widest mb-1">Chakra</p>
                    <p className="text-[#c4b5fd]/60">{crystal.chakra}</p>
                  </div>
                  <div>
                    <p className="text-[#d4af37] uppercase tracking-widest mb-1">Element</p>
                    <p className="text-[#c4b5fd]/60">{crystal.element}</p>
                  </div>
                  {crystal.zodiac &&
                <div>
                      <p className="text-[#d4af37] uppercase tracking-widest mb-1">Zodiac</p>
                      <p className="text-[#c4b5fd]/60">{crystal.zodiac}</p>
                    </div>
                }
                </div>
                <div>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-1.5">✨ Spiritual Benefits</p>
                  <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{crystal.spiritual}</p>
                </div>
                <div>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-1.5">🔮 Magical Uses</p>
                  <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{crystal.magical}</p>
                </div>
                <div>
                  <p className="text-xs text-[#d4af37] uppercase tracking-widest mb-1.5">📖 Folklore & History</p>
                  <p className="text-sm text-[#c4b5fd]/60 leading-relaxed italic">{crystal.folklore}</p>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </button>
    </motion.div>);

}

export default function Library() {
  const [search, setSearch] = useState("");
  const filteredHerbs = libraryHerbs.filter(
    (h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.uses.toLowerCase().includes(search.toLowerCase()) ||
    h.element.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCrystals = libraryCrystals.filter(
    (c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.spiritual.toLowerCase().includes(search.toLowerCase()) ||
    c.chakra.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="The Sacred Library"
        subtitle="A curated collection of sacred herbs and crystals — their magical properties, folklore, elemental correspondences, and spiritual uses."
        gold />


      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4b5fd]/30" />
        <Input
          placeholder="Search herbs, crystals, or elements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-[#1a0533]/40 border-[#7c3aed]/10 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 rounded-xl" />

      </div>

      <Tabs defaultValue="herbs" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#1a0533]/60 rounded-xl max-w-xs mx-auto mb-8">
          <TabsTrigger
            value="herbs"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Leaf className="w-4 h-4" /> Herbs ({libraryHerbs.length})
          </TabsTrigger>
          <TabsTrigger
            value="crystals"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Gem className="w-4 h-4" /> Crystals ({libraryCrystals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="herbs">
          <p className="text-center text-xs text-[#c4b5fd]/30 mb-8">Stocked apothecary of sacred herbs</p>
          <ApothecaryGrid items={filteredHerbs} type="herbs" />
        </TabsContent>

        <TabsContent value="crystals">
          <p className="text-center text-xs text-[#c4b5fd]/30 mb-8">Crystal treasury for spiritual healing</p>
          <ApothecaryGrid items={filteredCrystals} type="crystals" />
        </TabsContent>
      </Tabs>
    </div>);

}