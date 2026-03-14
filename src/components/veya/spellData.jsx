export const intentions = [
  { id: "love", label: "Love", emoji: "💗", color: "bg-pink-500/20 border-pink-500/30 text-pink-300" },
  { id: "money", label: "Abundance", emoji: "💰", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
  { id: "protection", label: "Protection", emoji: "🛡️", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
  { id: "healing", label: "Healing", emoji: "💚", color: "bg-green-500/20 border-green-500/30 text-green-300" },
  { id: "clarity", label: "Clarity", emoji: "🔮", color: "bg-violet-500/20 border-violet-500/30 text-violet-300" },
  { id: "confidence", label: "Confidence", emoji: "🔥", color: "bg-orange-500/20 border-orange-500/30 text-orange-300" },
  { id: "peace", label: "Peace", emoji: "🕊️", color: "bg-sky-500/20 border-sky-500/30 text-sky-300" },
  { id: "creativity", label: "Creativity", emoji: "🎨", color: "bg-amber-500/20 border-amber-500/30 text-amber-300" },
];

export const herbs = {
  mugwort: { name: "Mugwort", uses: "Psychic vision, lucid dreaming, protection", element: "Earth/Air", image: "🌿" },
  rose: { name: "Rose", uses: "Love, self-love, emotional healing, beauty", element: "Water", image: "🌹" },
  lavender: { name: "Lavender", uses: "Peace, calm, purification, sleep", element: "Air", image: "💜" },
  rosemary: { name: "Rosemary", uses: "Memory, clarity, protection, fidelity", element: "Fire", image: "🌱" },
  sage: { name: "Sage", uses: "Cleansing, wisdom, purification", element: "Earth", image: "🍃" },
  chamomile: { name: "Chamomile", uses: "Luck, money, meditation, calm", element: "Water", image: "🌼" },
  acacia: { name: "Acacia Gum", uses: "Psychic power, spiritual awareness, meditation", element: "Air", image: "🫧" },
};

export const crystals = {
  amethyst: { name: "Amethyst", uses: "Intuition, sobriety, spiritual awareness, calm", chakra: "Third Eye / Crown", image: "💎" },
  black_tourmaline: { name: "Black Tourmaline", uses: "Protection, grounding, EMF shielding", chakra: "Root", image: "🖤" },
  clear_quartz: { name: "Clear Quartz", uses: "Amplification, clarity, energy programming", chakra: "Crown", image: "💠" },
  rose_quartz: { name: "Rose Quartz", uses: "Unconditional love, heart healing, compassion", chakra: "Heart", image: "🩷" },
  obsidian: { name: "Obsidian", uses: "Shadow work, truth, protection, grounding", chakra: "Root", image: "⚫" },
  selenite: { name: "Selenite", uses: "Cleansing, high vibration, angelic connection", chakra: "Crown", image: "🤍" },
};

export const spellCombinations = {
  "love": { herbs: ["rose", "lavender", "chamomile"], crystals: ["rose_quartz", "amethyst"], moon: "Full Moon or Waxing", spell: "Attraction Spell" },
  "money": { herbs: ["chamomile", "rosemary", "acacia"], crystals: ["clear_quartz", "amethyst"], moon: "New Moon or Waxing", spell: "Prosperity Ritual" },
  "love+money": { herbs: ["rose", "chamomile", "rosemary"], crystals: ["rose_quartz", "clear_quartz"], moon: "Waxing Moon", spell: "Attraction Spell" },
  "protection": { herbs: ["sage", "rosemary", "mugwort"], crystals: ["black_tourmaline", "obsidian"], moon: "Waning Moon", spell: "Shield of Light" },
  "healing": { herbs: ["lavender", "chamomile", "rose"], crystals: ["rose_quartz", "selenite"], moon: "Full Moon", spell: "Restoration Circle" },
  "clarity": { herbs: ["mugwort", "rosemary", "acacia"], crystals: ["amethyst", "clear_quartz"], moon: "Full Moon", spell: "Third Eye Opening" },
  "confidence": { herbs: ["rosemary", "sage", "acacia"], crystals: ["clear_quartz", "black_tourmaline"], moon: "Waxing Moon", spell: "Inner Fire Ignition" },
  "peace": { herbs: ["lavender", "chamomile", "rose"], crystals: ["selenite", "amethyst"], moon: "Full Moon", spell: "Tranquility Invocation" },
  "creativity": { herbs: ["mugwort", "rose", "acacia"], crystals: ["amethyst", "clear_quartz"], moon: "Waxing Moon", spell: "Muse's Awakening" },
};

export function getSpellForIntentions(selectedIntentions) {
  if (selectedIntentions.length === 0) return null;

  const key = selectedIntentions.sort().join("+");
  if (spellCombinations[key]) return spellCombinations[key];

  // Combine from individual intentions
  const allHerbs = new Set();
  const allCrystals = new Set();
  let spellName = "";

  selectedIntentions.forEach((intent) => {
    const combo = spellCombinations[intent];
    if (combo) {
      combo.herbs.forEach((h) => allHerbs.add(h));
      combo.crystals.forEach((c) => allCrystals.add(c));
      if (!spellName) spellName = combo.spell;
    }
  });

  return {
    herbs: [...allHerbs].slice(0, 4),
    crystals: [...allCrystals].slice(0, 3),
    moon: "Waxing or Full Moon",
    spell: selectedIntentions.length > 1 ? "Unified Intention Ritual" : spellName,
  };
}