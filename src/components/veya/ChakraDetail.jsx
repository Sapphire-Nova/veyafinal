import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, AlertTriangle, TrendingUp, TrendingDown, Apple, Palette, Gem, Activity, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DiagnosisTab({ chakra }) {
  const [selectedState, setSelectedState] = useState("balanced");
  const states = [
    { key: "balanced", label: "Balanced", icon: Heart, description: chakra.balanced, color: "text-green-400" },
    { key: "blocked", label: "Blocked", icon: AlertTriangle, description: chakra.blocked, color: "text-red-400" },
    { key: "overactive", label: "Overactive", icon: TrendingUp, description: chakra.overactive, color: "text-orange-400" },
    { key: "underactive", label: "Underactive", icon: TrendingDown, description: chakra.underactive, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {states.map((state) => {
          const Icon = state.icon;
          return (
            <button
              key={state.key}
              onClick={() => setSelectedState(state.key)}
              className={`p-3 rounded-xl border text-xs text-center transition-all ${
                selectedState === state.key
                  ? `${chakra.bgColor} ${chakra.borderColor}`
                  : "bg-[#1a0533]/40 border-[#7c3aed]/10 hover:border-[#7c3aed]/20"
              }`}
            >
              <Icon className={`w-4 h-4 mx-auto mb-1 ${state.color}`} />
              {state.label}
            </button>
          );
        })}
      </div>
      <div className="glass-card p-5">
        <p className="text-sm text-[#c4b5fd]/70 leading-relaxed">
          {states.find((s) => s.key === selectedState)?.description}
        </p>
      </div>
    </div>
  );
}

function ListSection({ title, icon: Icon, items }) {
  return (
    <div className="glass-card p-5">
      <h4 className="flex items-center gap-2 text-xs text-[#d4af37] uppercase tracking-widest mb-3">
        <Icon className="w-4 h-4" /> {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[#c4b5fd]/60 flex items-start gap-2">
            <span className="text-[#7c3aed]/60 mt-1">•</span>
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
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
          style={{ background: `${chakra.color}20`, boxShadow: `0 0 30px ${chakra.color}30` }}
        >
          {chakra.emoji}
        </div>
        <div>
          <h2 className="text-xl text-[#f5f0ff]" style={{ fontFamily: "'Cinzel', serif" }}>
            {chakra.name}
          </h2>
          <p className="text-xs text-[#c4b5fd]/40">
            {chakra.sanskrit} · {chakra.element} · {chakra.location}
          </p>
        </div>
      </div>

      {/* Affirmation */}
      <div className="glass-card p-5 text-center" style={{ borderColor: `${chakra.color}20` }}>
        <p className="text-sm text-[#c4b5fd]/70 italic" style={{ fontFamily: "'Cinzel', serif" }}>
          "{chakra.affirmation}"
        </p>
      </div>

      {/* Quick Info */}
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
      <Tabs defaultValue="diagnosis" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#1a0533]/60 rounded-xl">
          <TabsTrigger
            value="diagnosis"
            className="text-xs data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg"
          >
            Diagnosis
          </TabsTrigger>
          <TabsTrigger
            value="healing"
            className="text-xs data-[state=active]:bg-[#7c3aed]/20 data-[state=active]:text-[#c4b5fd] rounded-lg"
          >
            Healing Protocol
          </TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="mt-4">
          <DiagnosisTab chakra={chakra} />
        </TabsContent>

        <TabsContent value="healing" className="mt-4 space-y-4">
          <ListSection title="Nourishing Foods" icon={Apple} items={chakra.foods} />
          <ListSection title="Healing Colors" icon={Palette} items={chakra.colors} />
          <ListSection title="Crystals" icon={Gem} items={chakra.crystals} />
          <ListSection title="Yoga Poses" icon={Activity} items={chakra.yogaPoses} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}