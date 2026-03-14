import React from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles, Compass, BookOpen, Heart, Star, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/veya/SectionHeader";

const BOOKINGS_URL = createPageUrl("Bookings");

const services = [
{
  emoji: "🌙",
  title: "Mediumship & Tarot",
  description: "Bridge the gap between worlds. Gain clarity on your soul path through channeled wisdom and sacred card readings.",
  glow: false
},
{
  emoji: "✨",
  title: "Reiki & Energy Work",
  description: "Restore your luminous field. Distant energy healing sessions designed to balance, clear, and ignite your spirit.",
  glow: false
},
{
  emoji: "🕯️",
  title: "Lightworker Blessing Rituals",
  description: "Intentional magic crafted to amplify your light and manifest your highest timeline. Sacred, powerful, and uniquely yours.",
  glow: true
}];


const tools = [
{ icon: Moon, title: "Full Moon Circles", page: "FullMoonCircles" },
{ icon: Sparkles, title: "Intention Builder", page: "IntentionBuilder" },
{ icon: Compass, title: "Chakra Hub", page: "ChakraHub" },
{ icon: BookOpen, title: "Sacred Library", page: "Library" },
{ icon: Heart, title: "Shadow Journal", page: "ShadowJournal" },
{ icon: Star, title: "Ask the Priestess", page: "AskPriestess" }];


export default function Home() {
  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center px-4 sm:px-8 py-20 relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}>

            <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-5" style={{ fontFamily: "'Cinzel', serif" }}>
              Luna Bloom Tarot
            </p>
            <h1 className="text-zinc-950 mb-6 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"

            style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif", color: "#f5f0ff" }}>

              Reconnect with the Magic that Lives{" "}
              <span className="text-zinc-800">Within You.</span>
            </h1>
            <p className="text-zinc-600 mb-10 text-base font-medium leading-relaxed md:text-lg max-w-xl">Violet, founder of Luna Bloom Tarot, welcomes you. Step through the veil for Tarot, Mediumship, Reiki, and Lightworker Blessing Rituals.

            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={BOOKINGS_URL}>
                <Button
                  className="px-8 py-6 rounded-xl text-base font-medium"
                  style={{ background: "#d4af37", color: "#0a0118" }}>

                  Book a Session with Violet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("FullMoonCircles")}>
                <Button
                  variant="outline" className="bg-background text-zinc-600 px-8 py-6 text-base font-medium rounded-xl inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-9 border-[#7c3aed]/40 hover:bg-[#7c3aed]/10">


                  <Moon className="w-5 h-5 mr-2" />
                  Join a Full Moon Circle
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — Violet portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end">

            <div className="relative w-[340px] h-[420px] md:w-[400px] md:h-[500px]">
              {/* Glow ring behind image */}
              <div className="absolute inset-0 rounded-3xl opacity-40"
              style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.4), transparent 70%)" }} />
              <div className="w-full h-full rounded-3xl overflow-hidden border border-[#d4af37]/20"
              style={{ background: "rgba(26,5,51,0.6)", backdropFilter: "blur(20px)" }}>
                {/* Portrait placeholder — replace src with Violet's actual photo */}
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b4c0060553de697bc30fd6/881eac4ce_PsychicViolet_20260309_225015_0000.png"
                  alt="Violet — Luna Bloom Tarot"
                  className="w-full h-full object-cover object-top opacity-80" />

                <div className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(to top, rgba(10,1,24,0.8) 0%, transparent 50%)" }} />
              </div>
              {/* Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-5 py-2.5 rounded-full border border-[#d4af37]/30 whitespace-nowrap">
                <p className="text-[#d4af37] text-xs font-medium" style={{ fontFamily: "'Cinzel', serif" }}>
                  ✦ Violet · Luna Bloom Tarot ✦
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SACRED INVITATIONS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader
          title="Sacred Invitations"
          subtitle="Direct sessions with Violet — channeled, energy-driven, and uniquely crafted for your soul's journey."
          gold />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) =>
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={svc.glow ? { boxShadow: "0 0 40px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.1)" } : {}}
            className="glass-card p-7 flex flex-col gap-5 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 cursor-default rounded-2xl relative overflow-hidden">

              {svc.glow &&
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse at top left, rgba(212,175,55,0.08), transparent 70%)" }} />
            }
              <span className="text-4xl">{svc.emoji}</span>
              <div>
                <h3 className="text-[#080410] mb-2 text-lg font-semibold"
              style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}>
                  {svc.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{svc.description}</p>
              </div>
              <Link to={BOOKINGS_URL} className="bg-zinc-700 text-[#d4af37] mt-auto text-xs text-center opacity-90 rounded-[32px] inline-flex items-center gap-2 hover:text-[#f5e6a3] transition-colors">

                Book this session <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── MESSAGE FROM THE PRIESTESS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden rounded-2xl">

          <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(212,175,55,0.4), transparent 60%)" }} />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            {/* Photo thumbnail */}
            <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-[#d4af37]/25">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b4c0060553de697bc30fd6/881eac4ce_PsychicViolet_20260309_225015_0000.png"
                alt="Violet"
                className="w-full h-full object-cover object-top opacity-85" />

            </div>
            {/* Text */}
            <div>
              <p className="bg-slate-800 text-[#d4af37] mb-3 text-xs uppercase tracking-[0.25em]" style={{ fontFamily: "'Cinzel', serif" }}>
                ✦ A Message from the Priestess
              </p>
              <h2 className="text-[#463861] mb-4 text-2xl md:text-3xl"
              style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}>
                I bridge worlds — so you can find your way home.
              </h2>
              <p className="text-zinc-700 mb-4 text-sm leading-relaxed md:text-base">I bridge the physical and spiritual realms as a Reiki Master (Level III), Certified Life Coach, and specialist in Chakra and Crystal Healing. My unique approach to holistic wellness has been featured in two local magazines, highlighting my dedication to helping clients find clarity and healing.

              </p>
              <p className="text-[#08070d] text-sm leading-relaxed">Whether you're navigating grief, seeking soul clarity, or simply craving reconnection with your own magic — I meet you exactly where you are, with warmth, depth, and a little bit of fire. ✦

              </p>
              <p className="text-[#d4af37] text-sm mt-5 italic" style={{ fontFamily: "'Cinzel', serif" }}>
                — Violet
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SPIRITUAL TOOLBOX ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader
          title="Your Spiritual Toolbox"
          subtitle="Self-guided practices to deepen your journey between sessions." />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.page}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}>

                <Link
                  to={createPageUrl(tool.page)}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#7c3aed]/10 bg-[#1a0533]/30 hover:border-[#d4af37]/30 hover:bg-[#1a0533]/60 transition-all duration-300 group">

                  <div className="bg-violet-500 rounded-xl w-10 h-10 flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#c4b5fd] group-hover:text-[#d4af37] transition-colors" />
                  </div>
                  <span className="bg-slate-50 text-zinc-600 text-lg font-normal text-center leading-snug opacity-90 group-hover:text-[#f5f0ff] transition-colors">
                    {tool.title}
                  </span>
                </Link>
              </motion.div>);

          })}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <p className="text-4xl mb-6">🌕</p>
          <h3 className="text-[#0b0911] mb-4 text-2xl md:text-3xl"
          style={{ fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif" }}>
            Your reading awaits.
          </h3>
          <p className="text-zinc-600 mb-8 text-sm">"You were never lost — you were simply waiting for the right guide to help you remember the magic that has always lived within you."

          </p>
          <Link to={BOOKINGS_URL}>
            <Button
              className="px-10 py-6 rounded-xl text-base font-medium"
              style={{ background: "#d4af37", color: "#0a0118" }}>

              Book a Session with Violet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>);

}