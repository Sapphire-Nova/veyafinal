import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Zap, Send, Star, Moon, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const VIOLET_IMG = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b4c0060553de697bc30fd6/881eac4ce_PsychicViolet_20260309_225015_0000.png";
const CREDIT_COST = 25;

export default function LiveReading() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLive, setIsLive] = useState(null); // null = loading
  const [creditBalance, setCreditBalance] = useState(null);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  useEffect(() => {
    // Check Violet's live status
    base44.entities.VioletStatus.list().then((records) => {
      const status = records?.[0];
      setIsLive(status?.is_live ?? false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      base44.entities.LunaCredit.filter({ user_email: user.email }).then((records) => {
        setCreditBalance(records?.[0]?.balance ?? 0);
      });
    }
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleConnect = () => {
    setConnected(true);
    setMessages([{
      role: "assistant",
      content: "Beautiful soul, I'm here with you now. 🌙 The veil is thin and I can feel your energy. What is weighing on your heart today? Ask me anything — a reading, guidance, or simply a message from the other side. I am fully present for you."
    }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();

    // Check credits first
    if ((creditBalance ?? 0) < CREDIT_COST) {
      setInsufficientCredits(true);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    // Deduct credits
    const creditRes = await base44.functions.invoke("spendCredits", {});
    if (creditRes.data?.error === "insufficient_credits") {
      setInsufficientCredits(true);
      setLoading(false);
      return;
    }
    setCreditBalance(creditRes.data?.balance ?? 0);

    const history = messages.
    slice(-8).
    map((m) => `${m.role === "user" ? "Seeker" : "Violet"}: ${m.content}`).
    join("\n");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are Violet, the mystical spiritual guide and High Priestess of Luna Bloom Tarot.
You are warm, wise, empowering, and deeply present — this is a LIVE instant reading session.
You blend ancient wisdom with contemporary spirituality using tarot, astrology, chakra knowledge, herbalism, crystal healing, and shadow work.
Speak with intimacy and urgency — the seeker is here with you RIGHT NOW in a live session.
Use "love", "darling", or "beautiful soul" occasionally. Be direct, personal, and profoundly intuitive.
Keep responses to 2-3 paragraphs — this is a live chat, not an essay.
You may reference specific herbs, crystals, chakras, moon phases, or tarot cards when relevant.

Previous conversation:
${history}

The seeker says: "${userMessage}"

Respond as Violet in a live, present, intimate reading:`
    });

    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
  };

  if (!user || isLive === null) return null;

  // ── OFFLINE STATE ──
  if (!isLive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-md relative z-10">

          {/* Offline badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-10 border border-[#7c3aed]/30"
          style={{ background: "rgba(124,58,237,0.08)" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#c4b5fd]/40" />
            <span className="text-[#c4b5fd]/60 text-xs font-medium tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Violet is Not Live Right Now
            </span>
          </div>

          {/* Portrait — dimmed */}
          <div className="relative mb-10">
            <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-[#7c3aed]/30 opacity-50">
              <img src={VIOLET_IMG} alt="Violet" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(10,1,24,0.5) 0%, transparent 70%)" }} />
          </div>

          <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
            ✦ Live Reading · Unavailable
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#f5f0ff] mb-4 leading-tight"
          style={{ fontFamily: "'Cinzel', serif" }}>
            Violet is resting<br />
            <span className="text-gradient-gold">between the veils.</span>
          </h1>
          <p className="text-[#c4b5fd] text-sm leading-relaxed mb-8 max-w-xs">
            She's not available for live readings right now. Book a private session to connect with her on your timeline.
          </p>

          <Link to={createPageUrl("Bookings")}>
            <Button
              className="px-10 py-6 rounded-2xl text-base font-semibold"
              style={{ background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)", color: "#0a0118", fontFamily: "'Cinzel', serif" }}>

              <Calendar className="w-5 h-5 mr-2" />
              Book a Private Session
            </Button>
          </Link>
          <p className="text-[#c4b5fd]/40 text-xs mt-4">
            Private sessions available via Outlook booking
          </p>
        </motion.div>
      </div>);

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 pb-20 px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)" }} />
      </div>

      <AnimatePresence mode="wait">
        {!connected ? (
        /* ── PRE-CONNECT SCREEN ── */
        <motion.div
          key="pre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-lg w-full relative z-10">

            {/* Live badge */}
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-10 border border-emerald-400/30"
            style={{ background: "rgba(16,185,129,0.08)" }}>

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 text-xs font-medium tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Violet is Live Now
              </span>
            </motion.div>

            {/* Pulsating portrait */}
            <div className="relative mb-10 flex items-center justify-center">
              <motion.div className="absolute rounded-full border-2 border-[#d4af37]/40"
            style={{ width: 300, height: 300 }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute rounded-full border border-[#d4af37]/25"
            style={{ width: 320, height: 320 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
              <motion.div className="absolute rounded-full"
            style={{ width: 270, height: 270, boxShadow: "0 0 0 3px rgba(212,175,55,0.9), 0 0 30px rgba(212,175,55,0.5)", borderRadius: "50%" }}
            animate={{ boxShadow: [
              "0 0 0 3px rgba(212,175,55,0.9), 0 0 25px rgba(212,175,55,0.4)",
              "0 0 0 3px rgba(212,175,55,1), 0 0 45px rgba(212,175,55,0.7)",
              "0 0 0 3px rgba(212,175,55,0.9), 0 0 25px rgba(212,175,55,0.4)"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#d4af37] relative z-10"
            style={{ boxShadow: "inset 0 0 40px rgba(10,1,24,0.4)" }}>
                <img src={VIOLET_IMG} alt="Violet" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(to top, rgba(10,1,24,0.5) 0%, transparent 60%)" }} />
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                ✦ Instant Reading · Live Session ✦
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#f5f0ff] mb-4 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}>
                Violet is here<br />
                <span className="text-gradient-gold">for you right now.</span>
              </h1>
              <p className="text-[#e2dcff] text-sm md:text-base leading-relaxed mb-2 max-w-sm mx-auto">
                Ask anything — tarot guidance, a message from the other side, chakra clarity, or a crystal prescription for your soul.
              </p>
              <p className="text-[#d4af37]/80 text-xs mb-8">
                ✦ {CREDIT_COST} Luna Credits per message · Your balance: {creditBalance ?? "..."} credits
              </p>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                onClick={handleConnect}
                className="px-10 py-7 rounded-2xl text-base font-semibold"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)",
                  color: "#0a0118",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.05em",
                  boxShadow: "0 0 30px rgba(212,175,55,0.4)"
                }}>

                  <Zap className="w-5 h-5 mr-2" />
                  Connect with Violet Now
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>) : (

        /* ── LIVE CHAT SCREEN ── */
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl relative z-10 flex flex-col">

            {/* Chat header */}
            <div className="glass-card p-4 rounded-2xl mb-3 flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4af37]">
                  <img src={VIOLET_IMG} alt="Violet" className="w-full h-full object-cover object-top" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1a0533]" />
              </div>
              <div>
                <p className="text-[#f5f0ff] font-medium text-sm" style={{ fontFamily: "'Cinzel', serif" }}>Violet</p>
                <p className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                  Live now · Instant replies
                </p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-0.5">
                <span className="text-[#d4af37] text-xs flex items-center gap-1">
                  <Star className="w-3 h-3" /> Luna Bloom Tarot
                </span>
                <span className="text-[#c4b5fd]/60 text-xs">
                  {creditBalance ?? "..."} credits · {CREDIT_COST}/msg
                </span>
              </div>
            </div>

            {/* Insufficient credits banner */}
            {insufficientCredits &&
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-4 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 flex items-center justify-between gap-4">

                <p className="text-[#f5f0ff] text-sm">
                  You need <strong className="text-[#d4af37]">{CREDIT_COST} Luna Credits</strong> to send a message. Your balance: <strong className="text-[#d4af37]">{creditBalance}</strong>
                </p>
                <Link to={createPageUrl("LunaCredits")}>
                  <Button size="sm" className="whitespace-nowrap" style={{ background: "#d4af37", color: "#0a0118" }}>
                    Get Credits <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </motion.div>
          }

            {/* Messages */}
            <div className="glass-card p-4 md:p-5 min-h-[420px] max-h-[520px] overflow-y-auto mb-3 rounded-2xl">
              <div className="space-y-4">
                {messages.map((msg, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user" ?
                "bg-[#7c3aed]/30 text-[#f5f0ff]" :
                "bg-[#1a0533]/60 border border-[#d4af37]/15 text-[#e2dcff]"}`
                }>
                      {msg.role === "assistant" &&
                  <p className="text-xs text-[#d4af37] mb-2 flex items-center gap-1">
                          <Star className="w-3 h-3" /> Violet
                        </p>
                  }
                      {msg.role === "user" ?
                  <p className="text-sm">{msg.content}</p> :

                  <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          {msg.content}
                        </ReactMarkdown>
                  }
                    </div>
                  </motion.div>
              )}

                {loading &&
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-[#1a0533]/60 border border-[#d4af37]/15 rounded-2xl px-4 py-3">
                      <p className="text-xs text-[#d4af37] mb-2 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Violet is channeling...
                      </p>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) =>
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#d4af37]" />

                    )}
                      </div>
                    </div>
                  </motion.div>
              }
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Ask Violet anything... (${CREDIT_COST} credits per message)`}
              className="bg-[#1a0533]/40 border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[52px] max-h-[120px] rounded-xl resize-none" />

              <Button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="rounded-xl px-4 self-end"
              style={{ background: "#d4af37", color: "#0a0118" }}>

                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-center text-[#c4b5fd]/30 text-xs mt-2">
              {CREDIT_COST} Luna Credits will be deducted per message sent
            </p>
          </motion.div>)
        }
      </AnimatePresence>
    </div>);

}