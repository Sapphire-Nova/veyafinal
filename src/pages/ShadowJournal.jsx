import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import SectionHeader from "@/components/veya/SectionHeader";
import JournalEntryEditor from "@/components/veya/JournalEntryEditor";
import { journalPrompts } from "@/components/veya/journalPrompts";

export default function ShadowJournal() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("prompts"); // prompts, write, entries, reading
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePrompt, setActivePrompt] = useState("");
  const [readingEntry, setReadingEntry] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  const { data: entries = [] } = useQuery({
    queryKey: ["journalEntries"],
    queryFn: () => base44.entities.JournalEntry.list("-created_date"),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.JournalEntry.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journalEntries"] });
      setView("entries");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.JournalEntry.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journalEntries"] }),
  });

  const startPromptEntry = (prompt, catKey) => {
    setActivePrompt(prompt);
    setActiveCategory(catKey === "dreams" ? "dream_journal" : "shadow_work");
    setView("write");
  };

  const startFreeWrite = () => {
    setActivePrompt("");
    setActiveCategory("free_write");
    setView("write");
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Shadow Journal"
        subtitle="A sacred, private space for your deepest reflections. Write freely or use guided prompts."
        gold
      />

      {/* Nav tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { key: "prompts", label: "Prompts" },
          { key: "entries", label: `My Entries (${entries.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              view === tab.key
                ? "bg-[#7c3aed]/20 text-[#c4b5fd] border border-[#7c3aed]/20"
                : "text-[#c4b5fd]/40 hover:text-[#c4b5fd]/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <Button
          onClick={startFreeWrite}
          className="ml-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Free Write
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {/* Prompt Categories */}
        {view === "prompts" && (
          <motion.div
            key="prompts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {Object.entries(journalPrompts).map(([key, category]) => (
              <div key={key} className="glass-card p-5">
                <h3
                  className="flex items-center gap-2 text-[#f5f0ff] mb-4"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span>{category.emoji}</span> {category.label}
                </h3>
                <div className="space-y-2">
                  {category.prompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => startPromptEntry(prompt, key)}
                      className="w-full text-left p-3 rounded-lg text-sm text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-[#7c3aed]/5 transition-all flex items-center gap-3 group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#7c3aed]/30 group-hover:text-[#7c3aed] flex-shrink-0" />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Write View */}
        {view === "write" && (
          <motion.div
            key="write"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <JournalEntryEditor
              prompt={activePrompt}
              category={activeCategory}
              onSave={(data) => createMutation.mutate(data)}
              onCancel={() => setView("prompts")}
              saving={createMutation.isPending}
            />
          </motion.div>
        )}

        {/* Entries View */}
        {view === "entries" && (
          <motion.div
            key="entries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {entries.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <BookOpen className="w-10 h-10 text-[#7c3aed]/30 mx-auto mb-4" />
                <p className="text-[#c4b5fd]/40">Your journal is empty. Begin your journey of self-discovery.</p>
              </div>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5 cursor-pointer hover:border-[#7c3aed]/30 transition-all"
                  onClick={() => { setReadingEntry(entry); setView("reading"); }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[#f5f0ff] text-sm font-medium">{entry.title}</h4>
                      <p className="text-xs text-[#c4b5fd]/30 mt-1">
                        {format(new Date(entry.created_date), "MMM d, yyyy · h:mm a")}
                        {entry.mood && ` · ${entry.mood}`}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(entry.id); }}
                      className="p-2 rounded-lg text-[#c4b5fd]/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-[#c4b5fd]/50 mt-2 line-clamp-2">{entry.content}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Reading View */}
        {view === "reading" && readingEntry && (
          <motion.div
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-6 md:p-8"
          >
            <Button
              variant="ghost"
              onClick={() => setView("entries")}
              className="text-[#c4b5fd]/40 hover:text-[#c4b5fd] hover:bg-white/5 mb-4"
            >
              ← Back to entries
            </Button>
            <h2 className="text-xl text-[#f5f0ff] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
              {readingEntry.title}
            </h2>
            <p className="text-xs text-[#c4b5fd]/30 mb-6">
              {format(new Date(readingEntry.created_date), "MMMM d, yyyy · h:mm a")}
              {readingEntry.mood && ` · Feeling: ${readingEntry.mood}`}
            </p>
            {readingEntry.prompt_used && (
              <div className="glass-card p-4 border-l-2 border-[#d4af37]/30 mb-6">
                <p className="text-xs text-[#d4af37] mb-1">Prompt</p>
                <p className="text-sm text-[#c4b5fd]/60 italic">{readingEntry.prompt_used}</p>
              </div>
            )}
            <div className="text-sm text-[#c4b5fd]/70 leading-relaxed whitespace-pre-line">
              {readingEntry.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}