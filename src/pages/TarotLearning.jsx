import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/veya/SectionHeader";
import TarotGallery from "@/components/veya/TarotGallery";
import TarotStudyView from "@/components/veya/TarotStudyView";

export default function TarotLearning() {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [filterArcana, setFilterArcana] = useState("all");

  const { data: cards = [] } = useQuery({
    queryKey: ["tarotCards"],
    queryFn: () => base44.entities.TarotCard.list("-updated_date", 100)
  });

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.card_name.toLowerCase().includes(search.toLowerCase());
    const matchesArcana = filterArcana === "all" || card.arcana_type === filterArcana;
    return matchesSearch && matchesArcana;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Rider-Waite Tarot Encyclopedia"
        subtitle="A comprehensive study guide to the sacred cards. Master the Upright and Reversed meanings, arcane wisdom, and Violet's personal insights."
        gold
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c4b5fd]/30" />
          <Input
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-[#1a0533]/40 border-[#7c3aed]/10 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterArcana("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterArcana === "all"
                ? "bg-[#7c3aed]/30 text-[#c4b5fd]"
                : "text-[#c4b5fd]/60 hover:text-[#c4b5fd]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterArcana("Major")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterArcana === "Major"
                ? "bg-[#7c3aed]/30 text-[#c4b5fd]"
                : "text-[#c4b5fd]/60 hover:text-[#c4b5fd]"
            }`}
          >
            Major
          </button>
          <button
            onClick={() => setFilterArcana("Minor")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filterArcana === "Minor"
                ? "bg-[#7c3aed]/30 text-[#c4b5fd]"
                : "text-[#c4b5fd]/60 hover:text-[#c4b5fd]"
            }`}
          >
            Minor
          </button>
        </div>
      </div>

      {/* Gallery */}
      <TarotGallery cards={filteredCards} onSelectCard={setSelectedCard} />

      {/* Study View */}
      <AnimatePresence>
        {selectedCard && (
          <TarotStudyView card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-[#c4b5fd]/20 mx-auto mb-4" />
          <p className="text-[#c4b5fd]/40 text-sm">No cards found</p>
        </div>
      )}
    </div>
  );
}