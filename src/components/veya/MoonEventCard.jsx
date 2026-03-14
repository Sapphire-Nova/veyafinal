import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function MoonEventCard({ event, onRSVP, isRegistered, isPast, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-6 relative overflow-hidden ${isPast ? "opacity-50" : ""}`}
    >
      {/* Moon glow background */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${event.color || "rgba(124,58,237,0.5)"}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-3xl mb-2 block">{event.emoji}</span>
            <h3
              className="text-lg text-[#f5f0ff] mb-1"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {event.name}
            </h3>
            <p className="text-xs text-[#d4af37]" style={{ fontFamily: "'Cinzel', serif" }}>
              {event.focus}
            </p>
          </div>
          {isRegistered && (
            <span className="text-xs bg-[#7c3aed]/20 text-[#c4b5fd] px-3 py-1 rounded-full border border-[#7c3aed]/20">
              Registered ✓
            </span>
          )}
        </div>

        <p className="text-sm text-[#c4b5fd]/50 mb-4 leading-relaxed">
          {event.significance}
        </p>

        <div className="flex items-center gap-4 text-xs text-[#c4b5fd]/40 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(event.date), "MMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            6:00 PM PT
          </span>
        </div>

        {!isPast && (
          <Button
            onClick={() => onRSVP(event)}
            disabled={isRegistered}
            className={`w-full rounded-lg text-sm ${
              isRegistered
                ? "bg-[#7c3aed]/10 text-[#c4b5fd]/40 border border-[#7c3aed]/20"
                : "bg-[#7c3aed] hover:bg-[#6d28d9] text-white glow-violet"
            }`}
          >
            {isRegistered ? "You're In ✨" : "Reserve My Seat"}
          </Button>
        )}
        {isPast && (
          <span className="text-xs text-[#c4b5fd]/30 italic">This circle has passed</span>
        )}
      </div>
    </motion.div>
  );
}