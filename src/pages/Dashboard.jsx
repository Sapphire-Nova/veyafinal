import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Moon, Sparkles, Heart, BookOpen, Star, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import SectionHeader from "@/components/veya/SectionHeader";

function StatCard({ icon: Icon, label, value, page, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link to={createPageUrl(page)} className="glass-card p-5 flex items-center gap-4 hover:border-[#7c3aed]/30 transition-all block">
        <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#c4b5fd]" />
        </div>
        <div>
          <p className="text-2xl text-[#f5f0ff] font-semibold">{value}</p>
          <p className="text-xs text-[#c4b5fd]/40">{label}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  const { data: entries = [] } = useQuery({
    queryKey: ["dashJournal"],
    queryFn: () => base44.entities.JournalEntry.list("-created_date", 5),
    enabled: !!user,
  });

  const { data: rsvps = [] } = useQuery({
    queryKey: ["dashRSVPs"],
    queryFn: () => base44.entities.FullMoonRSVP.list(),
    enabled: !!user,
  });

  const { data: spells = [] } = useQuery({
    queryKey: ["dashSpells"],
    queryFn: () => base44.entities.SavedSpell.list("-created_date", 5),
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <p className="text-sm text-[#d4af37] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Welcome back, radiant soul
        </p>
        <h1
          className="text-3xl md:text-4xl text-gradient-violet"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {user.full_name?.split(" ")[0] || "Seeker"}
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard icon={Heart} label="Journal Entries" value={entries.length} page="ShadowJournal" delay={0} />
        <StatCard icon={Moon} label="Moon Circles" value={rsvps.length} page="FullMoonCircles" delay={0.1} />
        <StatCard icon={Sparkles} label="Saved Spells" value={spells.length} page="IntentionBuilder" delay={0.2} />
        <StatCard icon={Star} label="Ask Violet" value="∞" page="AskPriestess" delay={0.3} />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Journal */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Recent Entries
            </h3>
            <Link to={createPageUrl("ShadowJournal")} className="text-xs text-[#c4b5fd]/30 hover:text-[#c4b5fd] flex items-center gap-1">
              View all <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          {entries.length === 0 ? (
            <p className="text-sm text-[#c4b5fd]/30 text-center py-6">No entries yet</p>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="p-3 rounded-lg bg-[#0a0118]/30">
                  <p className="text-sm text-[#f5f0ff]">{entry.title}</p>
                  <p className="text-xs text-[#c4b5fd]/30 mt-1">
                    {format(new Date(entry.created_date), "MMM d")} · {entry.mood || entry.category}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Spells */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Saved Spells
            </h3>
            <Link to={createPageUrl("IntentionBuilder")} className="text-xs text-[#c4b5fd]/30 hover:text-[#c4b5fd] flex items-center gap-1">
              Create new <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          {spells.length === 0 ? (
            <p className="text-sm text-[#c4b5fd]/30 text-center py-6">No spells saved yet</p>
          ) : (
            <div className="space-y-2">
              {spells.slice(0, 3).map((spell) => (
                <div key={spell.id} className="p-3 rounded-lg bg-[#0a0118]/30">
                  <p className="text-sm text-[#f5f0ff]">✨ {spell.name}</p>
                  <p className="text-xs text-[#c4b5fd]/30 mt-1">
                    {spell.intentions?.join(", ")} · {spell.moon_phase}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 md:p-8 mt-8 text-center"
      >
        <h3
          className="text-lg text-gradient-gold mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Book a 1-on-1 with Violet
        </h3>
        <p className="text-sm text-[#c4b5fd]/40 mb-4">
          Deep dive into your chart, tarot spread, or spiritual questions in a private session.
        </p>
        <a
          href="https://outlook.office365.com/book/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-sm hover:bg-[#d4af37]/30 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Schedule on Microsoft Bookings
        </a>
      </motion.div>
    </div>
  );
}