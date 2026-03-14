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

const ZOOM_LINK = "https://us05web.zoom.us/j/6255544527?pwd=WI9vQswMimUFLxQBJTNbsqavg2mDBm.1";
const ZOOM_PASSCODE = "MEDITATION";

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
    enabled: !!user
  });

  const rsvpMutation = useMutation({
    mutationFn: (data) => base44.entities.FullMoonRSVP.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fullMoonRSVPs"] });
      setSelectedEvent(null);
      setIntention("");
    }
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
      status: "registered"
    });

    // Send confirmation email
    const eventDate = new Date(selectedEvent.date).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    await base44.integrations.Core.SendEmail({
      to: user.email,
      subject: `🌕 You're In — ${selectedEvent.name}: ${selectedEvent.focus}`,
      body: `
        <div style="background:#0a0118;color:#f5f0ff;padding:40px 32px;font-family:Georgia,serif;max-width:580px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:48px;margin-bottom:12px;">${selectedEvent.emoji}</div>
            <h1 style="color:#d4af37;font-size:26px;margin:0 0 6px;">${selectedEvent.name} Circle</h1>
            <p style="color:#c4b5fd;font-size:14px;margin:0;font-style:italic;">${selectedEvent.focus}</p>
          </div>

          <p style="color:#c4b5fd;font-size:15px;">Dear ${user.full_name},</p>
          <p style="color:#c4b5fd;font-size:14px;line-height:1.7;">
            Your seat in the sacred circle is confirmed. We can't wait to gather with you under the light of the ${selectedEvent.name}.
          </p>

          <div style="background:rgba(124,58,237,0.12);border:1px solid rgba(212,175,55,0.2);padding:20px 24px;border-radius:14px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">📅 Date</td>
                <td style="color:#f5f0ff;font-size:14px;padding:6px 0;">${eventDate}</td>
              </tr>
              <tr>
                <td style="color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">⏰ Time</td>
                <td style="color:#f5f0ff;font-size:14px;padding:6px 0;">6:00 PM Pacific Time</td>
              </tr>
              <tr>
                <td style="color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">🔗 Zoom Link</td>
                <td style="font-size:14px;padding:6px 0;"><a href="${ZOOM_LINK}" style="color:#7c3aed;">${ZOOM_LINK}</a></td>
              </tr>
              <tr>
                <td style="color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">🔑 Passcode</td>
                <td style="color:#f5f0ff;font-size:14px;font-family:monospace;padding:6px 0;">${ZOOM_PASSCODE}</td>
              </tr>
            </table>
          </div>

          <h3 style="color:#d4af37;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">✨ Circle Itinerary</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="color:#c4b5fd;opacity:0.5;font-size:12px;font-family:monospace;padding:6px 12px 6px 0;vertical-align:top;">0:00</td>
              <td style="color:#c4b5fd;font-size:14px;padding:6px 0;">🕯️ Opening & Grounding</td>
            </tr>
            <tr>
              <td style="color:#c4b5fd;opacity:0.5;font-size:12px;font-family:monospace;padding:6px 12px 6px 0;vertical-align:top;">0:02</td>
              <td style="color:#c4b5fd;font-size:14px;padding:6px 0;">🧘 Guided Moon Meditation <span style="opacity:0.5;">(10 min)</span></td>
            </tr>
            <tr>
              <td style="color:#c4b5fd;opacity:0.5;font-size:12px;font-family:monospace;padding:6px 12px 6px 0;vertical-align:top;">0:12</td>
              <td style="color:#c4b5fd;font-size:14px;padding:6px 0;">💜 Community Social & Sharing <span style="opacity:0.5;">(20 min)</span></td>
            </tr>
          </table>

          ${intention ? `
          <div style="background:rgba(212,175,55,0.06);border-left:2px solid rgba(212,175,55,0.3);padding:14px 18px;border-radius:0 10px 10px 0;margin-bottom:24px;">
            <p style="color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Your Intention</p>
            <p style="color:#c4b5fd;font-size:14px;font-style:italic;margin:0;">"${intention}"</p>
          </div>
          ` : ""}

          <p style="color:#c4b5fd;font-size:13px;line-height:1.7;font-style:italic;text-align:center;margin:24px 0 8px;">
            "${selectedEvent.significance}"
          </p>

          <p style="text-align:center;color:#d4af37;font-size:14px;margin-top:24px;">With love and moonlight,<br/>— Violet, Luna Bloom Tarot 🌙</p>
        </div>
      `
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const userRSVPMoons = rsvps.map((r) => r.moon_name);

  return (
    <div className="bg-zinc-500 mx-auto px-4 py-12 max-w-7xl sm:px-6">
      <SectionHeader
        title="Full Moon Circles"
        subtitle="Sacred monthly gatherings held under the full moon. Meditate, set intentions, and connect with fellow seekers."
        gold />


      {/* Itinerary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-6 md:p-8 mb-12 max-w-2xl mx-auto">

        <h3
          className="text-lg text-gradient-gold mb-4 text-center"
          style={{ fontFamily: "'Cinzel', serif" }}>

          Circle Itinerary
        </h3>
        <div className="space-y-3">
          {[
          { time: "0:00", label: "Opening & Grounding", icon: "🕯️" },
          { time: "0:02", label: "Guided Moon Meditation", duration: "10 min", icon: "🧘" },
          { time: "0:12", label: "Community Social & Sharing", duration: "20 min", icon: "💜" }].
          map((item) =>
          <div key={item.time} className="flex items-center gap-4 text-sm">
              <span className="text-[#c4b5fd]/70 font-mono w-10">{item.time}</span>
              <span className="text-lg">{item.icon}</span>
              <span className="text-[#e2dcff]">{item.label}</span>
              {item.duration &&
            <span className="text-[#c4b5fd]/70 ml-auto">{item.duration}</span>
            }
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col items-center gap-1 text-xs text-[#c4b5fd]/80">
          <div className="flex items-center gap-2">
            <Video className="w-3 h-3" />
            <span>Via Zoom · Every Full Moon · 6:00 PM PT</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <a href={ZOOM_LINK} target="_blank" rel="noopener noreferrer" className="text-[#7c3aed]/70 hover:text-[#7c3aed] transition-colors underline underline-offset-2">
              Join Zoom
            </a>
            <span>·</span>
            <span>Passcode: <span className="text-[#d4af37] font-mono">{ZOOM_PASSCODE}</span></span>
          </div>
        </div>
      </motion.div>

      {/* Moon Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fullMoonEvents2026.map((event, idx) =>
        <MoonEventCard
          key={event.date}
          event={event}
          onRSVP={handleRSVP}
          isRegistered={userRSVPMoons.includes(event.name)}
          isPast={event.date < today}
          delay={idx * 0.05} />

        )}
      </div>

      {/* RSVP Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-[#1a0533] border-[#7c3aed]/20 text-[#f5f0ff]">
          <DialogHeader>
            <DialogTitle
              className="text-gradient-gold text-xl"
              style={{ fontFamily: "'Cinzel', serif" }}>

              {selectedEvent?.emoji} {selectedEvent?.name} Circle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-xs text-[#d4af37] italic">{selectedEvent?.focus}</p>
            <p className="text-sm text-[#d4c9ff]">{selectedEvent?.significance}</p>
            <div className="flex gap-4 text-xs text-[#c4b5fd]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedEvent?.date && new Date(selectedEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
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
              className="bg-[#0a0118] border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[80px]" />

            <Button
              onClick={confirmRSVP}
              disabled={rsvpMutation.isPending}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-6 rounded-xl glow-violet">

              {rsvpMutation.isPending ? "Registering..." : "Confirm & Send Me Details ✨"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}