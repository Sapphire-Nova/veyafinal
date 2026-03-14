import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Gem, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/veya/SectionHeader";
import { herbs, crystals } from "@/components/veya/spellData";

function ItemCard({ item, type, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card p-5 text-left hover:border-[#7c3aed]/30 transition-all"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{item.image}</span>
          <div className="flex-1">
            <h3 className="text-[#f5f0ff] font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
              {item.name}
            </h3>
            <p className="text-xs text-[#c4b5fd]/40 mt-0.5">{item.uses}</p>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#7c3aed]/10"
            >
              <div className="grid grid-cols-2 gap-3">
                {type === "herb" && (
                  <>
                    <div>
                      <p className="text-xs text-[#d4af37] mb-1">Element</p>
                      <p className="text-sm text-[#c4b5fd]/60">{item.element}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#d4af37] mb-1">Uses</p>
                      <p className="text-sm text-[#c4b5fd]/60">{item.uses}</p>
                    </div>
                  </>
                )}
                {type === "crystal" && (
                  <>
                    <div>
                      <p className="text-xs text-[#d4af37] mb-1">Chakra</p>
                      <p className="text-sm text-[#c4b5fd]/60">{item.chakra}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#d4af37] mb-1">Properties</p>
                      <p className="text-sm text-[#c4b5fd]/60">{item.uses}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Library() {
  const [search, setSearch] = useState("");
  const herbList = Object.values(herbs);
  const crystalList = Object.values(crystals);

  const filterItems = (items) =>
    items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.uses.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="The Sacred Library"
        subtitle="A curated collection of herbs and crystals — their properties, correspondences, and spiritual uses."
        gold
      />

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4b5fd]/30" />
        <Input
          placeholder="Search herbs and crystals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-[#1a0533]/40 border-[#7c3aed]/10 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 rounded-xl"
        />
      </div>

      <Tabs defaultValue="herbs" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#1a0533]/60 rounded-xl max-w-xs mx-auto mb-8">
          <TabsTrigger
            value="herbs"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2"
          >
            <Leaf className="w-4 h-4" /> Herbs
          </TabsTrigger>
          <TabsTrigger
            value="crystals"
            className="text-sm data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg gap-2"
          >
            <Gem className="w-4 h-4" /> Crystals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="herbs">
          <div className="space-y-3">
            {filterItems(herbList).map((herb, i) => (
              <ItemCard key={herb.name} item={herb} type="herb" delay={i * 0.05} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crystals">
          <div className="space-y-3">
            {filterItems(crystalList).map((crystal, i) => (
              <ItemCard key={crystal.name} item={crystal} type="crystal" delay={i * 0.05} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}