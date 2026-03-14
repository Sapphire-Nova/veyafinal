import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Zap, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VioletAdmin() {
  const [user, setUser] = useState(null);
  const [statusRecord, setStatusRecord] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => {
      if (u?.role !== "admin") {
        window.location.href = "/";
        return;
      }
      setUser(u);
    }).catch(() => base44.auth.redirectToLogin());
  }, []);

  useEffect(() => {
    base44.entities.VioletStatus.list().then((records) => {
      setStatusRecord(records?.[0] || null);
    });
  }, []);

  const isLive = statusRecord?.is_live ?? false;

  const toggleLive = async () => {
    setSaving(true);
    const newValue = !isLive;
    if (statusRecord) {
      const updated = await base44.entities.VioletStatus.update(statusRecord.id, { is_live: newValue });
      setStatusRecord(updated);
    } else {
      const created = await base44.entities.VioletStatus.create({ is_live: newValue });
      setStatusRecord(created);
    }
    setSaving(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 max-w-sm w-full text-center"
      >
        <Moon className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
        <h1 className="text-2xl text-[#d4af37] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Live Status
        </h1>
        <p className="text-[#c4b5fd]/60 text-sm mb-8">
          Toggle whether you're currently available for live readings.
        </p>

        {/* Status indicator */}
        <div className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl mb-8 border ${
          isLive
            ? "border-emerald-400/30 bg-emerald-400/10"
            : "border-[#7c3aed]/20 bg-[#7c3aed]/5"
        }`}>
          <span className="relative flex h-3 w-3">
            {isLive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? "bg-emerald-400" : "bg-[#c4b5fd]/30"}`} />
          </span>
          <span className={`text-sm font-medium ${isLive ? "text-emerald-400" : "text-[#c4b5fd]/50"}`}
            style={{ fontFamily: "'Cinzel', serif" }}>
            {isLive ? "You are LIVE" : "You are Offline"}
          </span>
        </div>

        <Button
          onClick={toggleLive}
          disabled={saving}
          className="w-full py-6 rounded-xl font-semibold text-base"
          style={{
            background: isLive
              ? "rgba(239,68,68,0.2)"
              : "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)",
            color: isLive ? "#fca5a5" : "#0a0118",
            border: isLive ? "1px solid rgba(239,68,68,0.3)" : "none",
            fontFamily: "'Cinzel', serif",
          }}
        >
          <Zap className="w-5 h-5 mr-2" />
          {saving ? "Saving..." : isLive ? "Go Offline" : "Go Live"}
        </Button>

        <p className="text-[#c4b5fd]/30 text-xs mt-4">
          When live, users can send messages at 25 credits each.
        </p>
      </motion.div>
    </div>
  );
}