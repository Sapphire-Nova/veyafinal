import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Gem, Search, Zap, BookOpen, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/veya/SectionHeader";
import ApothecaryGrid from "@/components/veya/ApothecaryGrid";
import { libraryHerbs } from "@/components/veya/herbData";
import { libraryCrystals } from "@/components/veya/crystalData";
import { chakras } from "@/components/veya/chakraData";
import TarotGallery from "@/components/veya/TarotGallery";
import TarotCardFlip from "@/components/veya/TarotCardFlip";
import CardOfTheDay from "@/components/veya/CardOfTheDay";
import HerbModal from "@/components/veya/HerbModal";
import CrystalModal from "@/components/veya/CrystalModal";
import ChakraModal from "@/components/veya/ChakraModal";

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
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [selectedCrystal, setSelectedCrystal] = useState(null);
  const [selectedChakra, setSelectedChakra] = useState(null);
  const [tarotFilter, setTarotFilter] = useState("all");

  const { data: tarotCards = [] } = useQuery({
    queryKey: ["tarotCards"],
    queryFn: () => base44.entities.TarotCard.list("-updated_date", 100)
  });

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

  const filteredTarot = tarotCards.filter((card) => {
    const matchesSearch = card.card_name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = tarotFilter === "all" || card.arcana_type === tarotFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.card_number - b.card_number);

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
        <TabsList className="grid grid-cols-4 bg-[#1a0533]/60 rounded-xl max-w-2xl mx-auto mb-8">
          <TabsTrigger
            value="herbs"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Leaf className="w-4 h-4" /> Herbs
          </TabsTrigger>
          <TabsTrigger
            value="crystals"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Gem className="w-4 h-4" /> Crystals
          </TabsTrigger>
          <TabsTrigger
            value="chakras"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Zap className="w-4 h-4" /> Chakras
          </TabsTrigger>
          <TabsTrigger
            value="tarot"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2">

            <Sparkles className="w-4 h-4" /> Tarot
          </TabsTrigger>
        </TabsList>

        <TabsContent value="herbs">
          <p className="text-center text-xs text-[#c4b5fd]/30 mb-8">Stocked apothecary of sacred herbs — click to learn more</p>
          <div className="grid grid-cols-1 gap-3">
            {filteredHerbs.map((herb, idx) => (
              <motion.button
                key={herb.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => setSelectedHerb(herb)}
                className="glass-card text-left hover:border-[#d4af37]/30 transition-all p-4 rounded-2xl cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-[#7c3aed]/15 bg-[#0a0118]/40">
                    <img
                      src={herb.image}
                      alt={herb.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {e.target.style.display = 'none';}}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#f5f0ff] font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
                      {herb.name}
                    </h3>
                    <p className="text-xs text-[#c4b5fd]/60">{herb.uses}</p>
                  </div>
                  <span className="text-[#c4b5fd]/30 group-hover:text-[#d4af37] transition-colors">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crystals">
          <p className="text-center text-xs text-[#c4b5fd]/30 mb-8">Crystal treasury for spiritual healing — click to learn more</p>
          <div className="grid grid-cols-1 gap-3">
            {filteredCrystals.map((crystal, idx) => (
              <motion.button
                key={crystal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => setSelectedCrystal(crystal)}
                className="glass-card text-left hover:border-[#d4af37]/30 transition-all p-4 rounded-2xl cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-[#7c3aed]/15 bg-[#0a0118]/40">
                    <img
                      src={crystal.image}
                      alt={crystal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {e.target.style.display = 'none';}}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#f5f0ff] font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
                      {crystal.name}
                    </h3>
                    <p className="text-xs text-[#c4b5fd]/60">{crystal.chakra} Chakra</p>
                  </div>
                  <span className="text-[#c4b5fd]/30 group-hover:text-[#d4af37] transition-colors">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chakras">
          <p className="text-center text-xs text-[#c4b5fd]/30 mb-8">Learn the seven sacred energy centers — click to explore</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chakras.map((chakra, idx) => (
              <motion.button
                key={chakra.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedChakra(chakra)}
                className="glass-card p-6 rounded-2xl border border-[#7c3aed]/20 hover:border-[#d4af37]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{chakra.emoji}</span>
                  <div>
                    <h3 className="text-[#f5f0ff] font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
                      {chakra.name}
                    </h3>
                    <p className="text-xs text-[#c4b5fd]/60">{chakra.sanskrit}</p>
                  </div>
                </div>
                <p className="text-xs text-[#c4b5fd]/70 mb-3">{chakra.location}</p>
                <p className="text-sm text-[#d4af37]">✦ {chakra.affirmation}</p>
              </motion.button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tarot">
          <div className="mb-8">
            <p className="text-center text-xs text-[#c4b5fd]/30 mb-4">Explore the Rider-Waite sacred cards</p>
            
            {/* Filter Buttons */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setTarotFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  tarotFilter === "all"
                    ? "bg-[#7c3aed]/30 text-[#d4af37]"
                    : "bg-[#7c3aed]/10 text-[#c4b5fd] hover:bg-[#7c3aed]/20"
                }`}
              >
                All Cards
              </button>
              <button
                onClick={() => setTarotFilter("Major")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  tarotFilter === "Major"
                    ? "bg-[#7c3aed]/30 text-[#d4af37]"
                    : "bg-[#7c3aed]/10 text-[#c4b5fd] hover:bg-[#7c3aed]/20"
                }`}
              >
                Major Arcana
              </button>
              <button
                onClick={() => setTarotFilter("Minor")}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  tarotFilter === "Minor"
                    ? "bg-[#7c3aed]/30 text-[#d4af37]"
                    : "bg-[#7c3aed]/10 text-[#c4b5fd] hover:bg-[#7c3aed]/20"
                }`}
              >
                Minor Arcana
              </button>
            </div>
          </div>
          <TarotGallery cards={filteredTarot} onSelectCard={setSelectedCard} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AnimatePresence>
        {selectedHerb && (
          <HerbModal herb={selectedHerb} onClose={() => setSelectedHerb(null)} />
        )}
        {selectedCrystal && (
          <CrystalModal crystal={selectedCrystal} onClose={() => setSelectedCrystal(null)} />
        )}
        {selectedChakra && (
          <ChakraModal chakra={selectedChakra} onClose={() => setSelectedChakra(null)} />
        )}
        {selectedCard && (
          <TarotCardFlip card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </div>);

}