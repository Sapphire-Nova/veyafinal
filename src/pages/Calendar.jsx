import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalIcon, Clock, MapPin, Users, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, parseISO, isToday } from "date-fns";
import SectionHeader from "@/components/veya/SectionHeader";

const EVENT_TYPE_COLORS = {
  reading:    { bg: "#7c3aed20", border: "#7c3aed60", dot: "#7c3aed", label: "Reading" },
  meditation: { bg: "#3b82f620", border: "#3b82f660", dot: "#3b82f6", label: "Meditation" },
  ritual:     { bg: "#d4af3720", border: "#d4af3760", dot: "#d4af37", label: "Ritual" },
  reiki:      { bg: "#22c55e20", border: "#22c55e60", dot: "#22c55e", label: "Reiki" },
  circle:     { bg: "#f97316  20", border: "#f9731660", dot: "#f97316", label: "Circle" },
  other:      { bg: "#c4b5fd20", border: "#c4b5fd40", dot: "#c4b5fd", label: "Session" },
};

function EventCard({ event }) {
  const typeStyle = EVENT_TYPE_COLORS[event.event_type] || EVENT_TYPE_COLORS.other;
  const start = event.start_time ? parseISO(event.start_time) : null;
  const end = event.end_time ? parseISO(event.end_time) : null;

  if (event.status === "cancelled") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border"
      style={{ background: typeStyle.bg, borderColor: typeStyle.border }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: typeStyle.dot }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: typeStyle.dot, fontFamily: "'Cinzel', serif" }}>
              {typeStyle.label}
            </span>
          </div>
          <h3 className="text-[#f5f0ff] font-medium text-sm truncate">{event.title}</h3>
          {event.description && (
            <p className="text-[#c4b5fd]/60 text-xs mt-1 line-clamp-2">{event.description}</p>
          )}
        </div>
        {start && (
          <div className="text-right flex-shrink-0">
            <p className="text-[#d4af37] text-xs font-medium">{format(start, "MMM d")}</p>
            <p className="text-[#c4b5fd]/60 text-xs">{format(start, "h:mm a")}</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#c4b5fd]/50">
        {start && end && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {format(start, "h:mm a")} – {format(end, "h:mm a")}
          </span>
        )}
        {event.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {event.location}
          </span>
        )}
        {event.meet_link && (
          <a href={event.meet_link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#7c3aed] hover:text-[#c4b5fd] transition-colors">
            <Video className="w-3 h-3" /> Join
          </a>
        )}
        {event.attendees?.length > 0 && (
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {event.attendees.length} attendee{event.attendees.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const { data: allEvents = [], isLoading } = useQuery({
    queryKey: ["calendar-events"],
    queryFn: () => base44.entities.CalendarEvent.filter({ google_event_id: { $ne: "__sync_token__" } }, "start_time", 500),
  });

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const startPadding = startOfMonth(currentMonth).getDay();

  const eventsOnDay = (day) =>
    allEvents.filter(e => e.start_time && isSameDay(parseISO(e.start_time), day) && e.status !== "cancelled");

  const selectedDayEvents = eventsOnDay(selectedDay).sort(
    (a, b) => parseISO(a.start_time) - parseISO(b.start_time)
  );

  const upcomingEvents = allEvents
    .filter(e => e.start_time && parseISO(e.start_time) >= new Date() && e.status !== "cancelled" && e.google_event_id !== "__sync_token__")
    .sort((a, b) => parseISO(a.start_time) - parseISO(b.start_time))
    .slice(0, 5);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Sacred Sessions"
          subtitle="Your upcoming rituals, readings, and appointments — synced from Google Calendar."
          gold
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Calendar */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentMonth(m => subMonths(m, 1))}
                className="p-2 rounded-lg text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-[#d4af37] font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button onClick={() => setCurrentMonth(m => addMonths(m, 1))}
                className="p-2 rounded-lg text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="text-center text-xs text-[#c4b5fd]/30 py-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(startPadding)].map((_, i) => <div key={`pad-${i}`} />)}
              {days.map(day => {
                const dayEvents = eventsOnDay(day);
                const isSelected = isSameDay(day, selectedDay);
                const isTodayDay = isToday(day);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg text-sm transition-all
                      ${isSelected ? "bg-[#7c3aed]/30 text-[#f5f0ff]" : "hover:bg-white/5 text-[#c4b5fd]/60 hover:text-[#c4b5fd]"}
                      ${isTodayDay ? "ring-1 ring-[#d4af37]/40" : ""}
                    `}
                  >
                    <span className={`text-xs ${isTodayDay ? "text-[#d4af37] font-bold" : ""}`}>
                      {format(day, "d")}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center px-0.5">
                        {dayEvents.slice(0, 3).map((e, i) => (
                          <span key={i} className="w-1 h-1 rounded-full"
                            style={{ background: (EVENT_TYPE_COLORS[e.event_type] || EVENT_TYPE_COLORS.other).dot }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected day events */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-[#d4af37] text-sm mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                {isToday(selectedDay) ? "Today" : format(selectedDay, "MMMM d")}
              </h3>
              {isLoading ? (
                <p className="text-[#c4b5fd]/40 text-xs">Loading...</p>
              ) : selectedDayEvents.length === 0 ? (
                <p className="text-[#c4b5fd]/40 text-xs italic">No sessions on this day.</p>
              ) : (
                <div className="space-y-3">
                  {selectedDayEvents.map(e => <EventCard key={e.id} event={e} />)}
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-[#d4af37] text-sm mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                Upcoming Sessions
              </h3>
              {isLoading ? (
                <p className="text-[#c4b5fd]/40 text-xs">Loading...</p>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-[#c4b5fd]/40 text-xs italic">No upcoming sessions synced yet.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(e => <EventCard key={e.id} event={e} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}