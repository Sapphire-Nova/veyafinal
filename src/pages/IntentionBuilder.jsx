import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Leaf, Gem, Moon, Save, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SectionHeader from "@/components/veya/SectionHeader";
import { intentions, herbs, crystals, getSpellForIntentions } from "@/components/veya/spellData";

export default function IntentionBuilder() {
  const [selected, setSelected] = useState([]);
  const [spell, setSpell] = useState(null);
  const [ritualText, setRitualText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const toggleIntention = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setSpell(null);
    setRitualText("");
  };

  const generateSpell = async () => {
    const result = getSpellForIntentions(selected);
    setSpell(result);

    setGenerating(true);
    const intentionNames = selected.map(
      (s) => intentions.find((i) => i.id === s)?.label
    ).join(", ");

    const herbNames = result.herbs.map((h) => herbs[h]?.name).join(", ");
    const crystalNames = result.crystals.map((c) => crystals[c]?.name).join(", ");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are Violet, a mystical spiritual guide from Luna Bloom Tarot. Write a beautiful, 
      empowering ritual spell for these intentions: ${intentionNames}. 
      Incorporate these herbs: ${herbNames}, and these crystals: ${crystalNames}. 
      Best moon phase: ${result.moon}. Spell name: "${result.spell}".
      Write in second person ("you"), be mystical yet modern. 
      Include: preparation steps, the ritual process, and a closing affirmation.
      Keep it concise but powerful - about 200 words.`,
    });

    setRitualText(response);
    setGenerating(false);
  };

  const saveMutation = useMutation({
    mutationFn: (data) => base44.entities.SavedSpell.create(data),
    onSuccess: () => toast.success("Spell saved to your collection ✨"),
  });

  const saveSpell = () => {
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }
    saveMutation.mutate({
      name: spell.spell,
      intentions: selected,
      herbs: spell.herbs.map((h) => herbs[h]?.name),
      crystals: spell.crystals.map((c) => crystals[c]?.name),
      ritual_text: ritualText,
      moon_phase: spell.moon,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Intention Builder"
        subtitle="Select your desires and let the universe craft a personalized spell with herbs, crystals, and celestial timing."
        gold
      />

      {/* Intention Selection */}
      <div className="mb-12">
        <h3
          className="text-sm text-[#c4b5fd]/50 uppercase tracking-widest mb-6 text-center"
        >
          Choose Your Intentions
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {intentions.map((intent) => {
            const isSelected = selected.includes(intent.id);
            return (
              <motion.button
                key={intent.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleIntention(intent.id)}
                className={`px-5 py-3 rounded-xl border text-sm transition-all ${
                  isSelected
                    ? `${intent.color} glow-violet`
                    : "bg-[#1a0533]/40 border-[#7c3aed]/10 text-[#c4b5fd]/50 hover:border-[#7c3aed]/30"
                }`}
              >
                <span className="mr-2">{intent.emoji}</span>
                {intent.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center mb-12">
        <Button
          onClick={generateSpell}
          disabled={selected.length === 0 || generating}
          className="bg-gradient-to-r from-[#7c3aed] to-[#d4af37] text-white px-10 py-6 rounded-xl text-base glow-violet disabled:opacity-30"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          {generating ? "Channeling..." : "Generate My Spell"}
        </Button>
      </div>

      {/* Spell Results */}
      <AnimatePresence>
        {spell && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-8"
          >
            {/* Spell Name */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-4xl text-gradient-gold mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ✨ {spell.spell} ✨
              </motion.h2>
              <p className="text-sm text-[#c4b5fd]/40">
                <Moon className="w-3 h-3 inline mr-1" />
                Best performed during: {spell.moon}
              </p>
            </div>

            {/* Ingredients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Herbs */}
              <div className="glass-card p-6">
                <h4 className="flex items-center gap-2 text-sm text-[#d4af37] mb-4 uppercase tracking-widest">
                  <Leaf className="w-4 h-4" /> Sacred Herbs
                </h4>
                <div className="space-y-3">
                  {spell.herbs.map((herbKey) => {
                    const herb = herbs[herbKey];
                    if (!herb) return null;
                    return (
                      <div key={herbKey} className="flex items-start gap-3">
                        <span className="text-xl">{herb.image}</span>
                        <div>
                          <p className="text-sm text-[#f5f0ff] font-medium">{herb.name}</p>
                          <p className="text-xs text-[#c4b5fd]/40">{herb.uses}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Crystals */}
              <div className="glass-card p-6">
                <h4 className="flex items-center gap-2 text-sm text-[#d4af37] mb-4 uppercase tracking-widest">
                  <Gem className="w-4 h-4" /> Power Crystals
                </h4>
                <div className="space-y-3">
                  {spell.crystals.map((crystalKey) => {
                    const crystal = crystals[crystalKey];
                    if (!crystal) return null;
                    return (
                      <div key={crystalKey} className="flex items-start gap-3">
                        <span className="text-xl">{crystal.image}</span>
                        <div>
                          <p className="text-sm text-[#f5f0ff] font-medium">{crystal.name}</p>
                          <p className="text-xs text-[#c4b5fd]/40">{crystal.uses}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ritual Text */}
            {generating ? (
              <div className="glass-card p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-4xl mb-4 inline-block"
                >
                  🌙
                </motion.div>
                <p className="text-[#c4b5fd]/60 text-sm">Violet is channeling your ritual...</p>
              </div>
            ) : ritualText ? (
              <div className="glass-card p-6 md:p-8">
                <h4
                  className="text-sm text-[#d4af37] mb-4 uppercase tracking-widest"
                >
                  The Ritual
                </h4>
                <div className="text-[#c4b5fd]/80 text-sm leading-relaxed whitespace-pre-line">
                  {ritualText}
                </div>
              </div>
            ) : null}

            {/* Save */}
            {ritualText && (
              <div className="text-center">
                <Button
                  onClick={saveSpell}
                  disabled={saveMutation.isPending}
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-5 rounded-xl"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save to My Spells"}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}