import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const moods = [
  { value: "peaceful", emoji: "☮️" },
  { value: "reflective", emoji: "🪞" },
  { value: "emotional", emoji: "🌊" },
  { value: "empowered", emoji: "⚡" },
  { value: "conflicted", emoji: "🌀" },
  { value: "hopeful", emoji: "🌅" },
];

export default function JournalEntryEditor({ prompt, category, onSave, onCancel, saving }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = () => {
    onSave({
      title: title || "Untitled Entry",
      content,
      category,
      prompt_used: prompt || "",
      mood,
      tags: [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-4"
    >
      {prompt && (
        <div className="glass-card p-4 border-l-2 border-[#d4af37]/30">
          <p className="text-xs text-[#d4af37] mb-1">Prompt</p>
          <p className="text-sm text-[#c4b5fd]/70 italic">{prompt}</p>
        </div>
      )}

      <Input
        placeholder="Give this entry a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-[#0a0118] border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30"
      />

      <Textarea
        placeholder="Pour your soul onto the page..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-[#0a0118] border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[200px]"
      />

      <div className="flex flex-wrap gap-2">
        {moods.map((m) => (
          <button
            key={m.value}
            onClick={() => setMood(m.value)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
              mood === m.value
                ? "bg-[#7c3aed]/20 border-[#7c3aed]/30 text-[#c4b5fd]"
                : "bg-transparent border-[#7c3aed]/10 text-[#c4b5fd]/40 hover:border-[#7c3aed]/20"
            }`}
          >
            {m.emoji} {m.value}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-[#c4b5fd]/40 hover:text-[#c4b5fd] hover:bg-white/5"
        >
          <X className="w-4 h-4 mr-1" /> Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!content || saving}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
        >
          <Save className="w-4 h-4 mr-1" />
          {saving ? "Saving..." : "Save Entry"}
        </Button>
      </div>
    </motion.div>
  );
}