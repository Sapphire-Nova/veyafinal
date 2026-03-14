import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Gem, Leaf, Wind, Palette, AlertTriangle, TrendingUp, ZapOff, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HealingCard({ icon: Icon, label, text, color }) {
  return (
    <div className="glass-card p-5 flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color, fontFamily: "'Cinzel', serif" }}>
          {label}
        </p>
        <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function SymptomList({ title, icon: Icon, items, iconColor }) {
  return (
    <div className="glass-card p-5">
      <h4 className="flex items-center gap-2 text-xs uppercase tracking-widest mb-3" style={{ color: iconColor, fontFamily: "'Cinzel', serif" }}>
        <Icon className="w-4 h-4" /> {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[#c4b5fd]/70 flex items-start gap-2">
            <span className="mt-1 flex-shrink-0" style={{ color: iconColor }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ChakraDetail({ chakra, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Hero image (if available) */}
      {chakra.image && (
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-[#d4af37]/10">
          <img src={chakra.image} alt={chakra.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(to top, rgba(10,1,24,0.85) 0%, rgba(10,1,24,0.2) 60%, transparent 100%)" }} />
          <div className="absolute bottom-4 left-5">
            <p className="text-xs text-[#d4af37] uppercase tracking-[0.25em]" style={{ fontFamily: "'Cinzel', serif" }}>
              {chakra.sanskrit}
            </p>
            <h2 className="text-2xl text-[#f5f0ff]" style={{ fontFamily: "'Cinzel', serif" }}>
              {chakra.name}
            </h2>
          </div>
        </div>
      )}

      {/* Header (shown when no image) */}
      {!chakra.image && (
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
            style={{ background: `${chakra.color}20`, boxShadow: `0 0 30px ${chakra.color}30` }}>
            {chakra.emoji}
          </div>
          <div>
            <h2 className="text-xl text-[#f5f0ff]" style={{ fontFamily: "'Cinzel', serif" }}>{chakra.name}</h2>
            <p className="text-xs text-[#c4b5fd]/40">{chakra.sanskrit} · {chakra.element} · {chakra.location}</p>
          </div>
        </div>
      )}

      {/* Back button when image shown */}
      {chakra.image && (
        <Button variant="ghost" onClick={onBack} className="text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5 p-2 -mt-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </Button>
      )}

      {/* Affirmation */}
      <div className="glass-card p-5 text-center" style={{ borderColor: `${chakra.color}20` }}>
        <p className="text-sm text-[#c4b5fd]/70 italic" style={{ fontFamily: "'Cinzel', serif" }}>
          "{chakra.affirmation}"
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <Music className="w-4 h-4 mx-auto mb-1 text-[#d4af37]" />
          <p className="text-xs text-[#c4b5fd]/40">Frequency</p>
          <p className="text-sm text-[#f5f0ff]">{chakra.frequency}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <span className="text-lg block mb-1">🕉️</span>
          <p className="text-xs text-[#c4b5fd]/40">Mantra</p>
          <p className="text-sm text-[#f5f0ff]">{chakra.mantra}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <span className="text-lg block mb-1">🌀</span>
          <p className="text-xs text-[#c4b5fd]/40">Element</p>
          <p className="text-sm text-[#f5f0ff]">{chakra.element}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="blocks" className="w-full">
        <TabsList className="grid grid-cols-3 bg-[#1a0533]/60 rounded-xl">
          <TabsTrigger value="blocks" className="text-xs data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg">
            Blocks & Signs
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="text-xs data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg">
            Symptoms
          </TabsTrigger>
          <TabsTrigger value="healing" className="text-xs data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg">
            Balance
          </TabsTrigger>
        </TabsList>

        {/* BLOCKS & WHAT CAUSES IT */}
        <TabsContent value="blocks" className="mt-4 space-y-4">
          <SymptomList
            title="What Blocks This Chakra"
            icon={AlertTriangle}
            items={chakra.blocks || []}
            iconColor="#f87171"
          />
          <div className="glass-card p-5">
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              When Balanced
            </h4>
            <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">{chakra.balanced}</p>
          </div>
        </TabsContent>

        {/* SYMPTOMS */}
        <TabsContent value="symptoms" className="mt-4 space-y-4">
          <SymptomList
            title="Stagnant / Underactive Signs"
            icon={ZapOff}
            items={chakra.stagnant_symptoms || []}
            iconColor="#60a5fa"
          />
          <SymptomList
            title="Overactive Signs"
            icon={TrendingUp}
            items={chakra.overactive_symptoms || []}
            iconColor="#fb923c"
          />
        </TabsContent>

        {/* HEALING TOOLKIT */}
        <TabsContent value="healing" className="mt-4 space-y-3">
          <p className="text-xs text-[#c4b5fd]/40 text-center italic mb-2">
            Use these throughout your day to strengthen and balance this chakra
          </p>
          {chakra.healing && (
            <>
              <HealingCard icon={Gem} label="Crystal" text={chakra.healing.crystal} color={chakra.color} />
              <HealingCard icon={Leaf} label="Herb" text={chakra.healing.herb} color={chakra.color} />
              <HealingCard icon={Wind} label="Scent" text={chakra.healing.scent} color={chakra.color} />
              <HealingCard icon={Palette} label="Color" text={chakra.healing.color} color={chakra.color} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}