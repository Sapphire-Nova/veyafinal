import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Moon, Calendar, Clock, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/veya/SectionHeader";
import MoonEventCard from "@/components/veya/MoonEventCard";
import { fullMoonEvents2026 } from "@/components/veya/fullMoonData";

const ZOOM_LINK = "https://zoom.us/j/your-meeting-id";

export default function FullMoonCircles() {
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [intention, setIntention] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: rsvps = [] } = useQuery({
    queryKey: ["fullMoonRSVPs"],
    queryFn: () => base44.entities.FullMoonRSVP.list(),
    enabled: !!user,
  });

  const rsvpMutation = useMutation({
    mutationFn: (data) => base44.entities.FullMoonRSVP.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fullMoonRSVPs"] });
      setSelectedEvent(null);
      setIntention("");
    },
  });

  const handleRSVP = (event) => {
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }
    setSelectedEvent(event);
  };

  const confirmRSVP = async () => {
    await rsvpMutation.mutateAsync({
      moon_name: selectedEvent.name,
      event_date: selectedEvent.date,
      user_email: user.email,
      user_name: user.full_name,
      intention,
      status: "registered",
    });

    // Send confirmation email
    await base44.integrations.Core.SendEmail({
      to: user.email,
      subject: `🌕 You're Registered for the ${selectedEvent.name} Circle`,
      body: `
        <div style="background:#0a0118;color:#f5f0ff;padding:40px;font-family:Georgia,serif;">
          <h1 style="color:#d4af37;text-align:center;">✨ Welcome to the ${selectedEvent.name} Circle ✨</h1>
          <p style="text-align:center;color:#c4b5fd;">Dear ${user.full_name},</p>
          <p style="color:#c4b5fd;">You have been registered for our sacred Full Moon gathering.</p>
          <div style="background:rgba(124,58,237,0.15);padding:20px;border-radius:12px;margin:20px 0;">
            <p><strong style="color:#d4af37;">Date:</strong> ${selectedEvent.date}</p>
            <p><strong style="color:#d4af37;">Time:</strong> 6:00 PM Pacific Time</p>
            <p><strong style="color:#d4af37;">Zodiac:</strong> ${selectedEvent.zodiac}</p>
            <p><strong style="color:#d4af37;">Zoom Link:</strong> <a href="${ZOOM_LINK}" style="color:#7c3aed;">${ZOOM_LINK}</a></p>
          </div>
          <h3 style="color:#d4af37;">Circle Itinerary (30 min)</h3>
          <ul style="color:#c4b5fd;">
            <li>Opening & Grounding (3 min)</li>
            <li>Guided Moon Meditation (12 min)</li>
            <li>Intention Setting (5 min)</li>
            <li>Community Sharing & Social (10 min)</li>
          </ul>
          <p style="color:#c4b5fd;font-style:italic;text-align:center;margin-top:30px;">"${selectedEvent.significance}"</p>
          <p style="text-align:center;color:#d4af37;margin-top:20px;">— Violet, Luna Bloom Tarot</p>
        </div>
      `,
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const userRSVPMoons = rsvps.map((r) => r.moon_name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Full Moon Circles"
        subtitle="Sacred monthly gatherings held under the full moon. Meditate, set intentions, and connect with fellow seekers."
        gold
      />

      {/* Itinerary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-6 md:p-8 mb-12 max-w-2xl mx-auto"
      >
        <h3
          className="text-lg text-gradient-gold mb-4 text-center"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Circle Itinerary
        </h3>
        <div className="space-y-3">
          {[
            { time: "0:00", label: "Opening & Grounding", icon: "🕯️" },
            { time: "0:02", label: "Guided Moon Meditation", duration: "10 min", icon: "🧘" },
            { time: "0:12", label: "Community Social & Sharing", duration: "20 min", icon: "💜" },
          ].map((item) => (
            <div key={item.time} className="flex items-center gap-4 text-sm">
              <span className="text-[#c4b5fd]/30 font-mono w-10">{item.time}</span>
              <span className="text-lg">{item.icon}</span>
              <span className="text-[#c4b5fd]/80">{item.label}</span>
              {item.duration && (
                <span className="text-[#c4b5fd]/30 ml-auto">{item.duration}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#c4b5fd]/30">
          <Video className="w-3 h-3" />
          <span>Via Zoom · Every Full Moon · 6:00 PM PT</span>
        </div>
      </motion.div>

      {/* Moon Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fullMoonEvents2026.map((event, idx) => (
          <MoonEventCard
            key={event.date}
            event={event}
            onRSVP={handleRSVP}
            isRegistered={userRSVPMoons.includes(event.name)}
            isPast={event.date < today}
            delay={idx * 0.05}
          />
        ))}
      </div>

      {/* RSVP Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-[#1a0533] border-[#7c3aed]/20 text-[#f5f0ff]">
          <DialogHeader>
            <DialogTitle
              className="text-gradient-gold text-xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {selectedEvent?.emoji} {selectedEvent?.name} Circle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-sm text-[#c4b5fd]/60">{selectedEvent?.significance}</p>
            <div className="flex gap-4 text-xs text-[#c4b5fd]/40">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedEvent?.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                6:00 PM PT
              </span>
            </div>
            <Textarea
              placeholder="Set your intention for this circle... (optional)"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="bg-[#0a0118] border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[80px]"
            />
            <Button
              onClick={confirmRSVP}
              disabled={rsvpMutation.isPending}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-6 rounded-xl glow-violet"
            >
              {rsvpMutation.isPending ? "Registering..." : "Confirm & Send Me Details ✨"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}