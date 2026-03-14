import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Send, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import MessageBubble from "@/components/veya/MessageBubble.jsx";

const AGENT_NAME = "dream_interpreter";

export default function DreamInterpreter() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!conversation) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversation?.id]);

  const startNewSession = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: AGENT_NAME,
      metadata: { name: "Dream Session" },
    });
    setConversation(conv);
    setMessages(conv.messages || []);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    setLoading(true);

    let conv = conversation;
    if (!conv) {
      conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: "Dream Session" },
      });
      setConversation(conv);
    }

    await base44.agents.addMessage(conv, { role: "user", content: text });
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Moon className="w-6 h-6 text-[#d4af37]" />
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "'Cinzel', serif" }}>
              Dream Oracle
            </span>
            <Moon className="w-6 h-6 text-[#d4af37]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#f5f0ff] leading-tight mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Decode Your Dreams
          </h1>
          <p className="text-[#c4b5fd]/60 text-sm max-w-md mx-auto">
            Share your dream — no matter how strange or fragmented — and receive deep spiritual and symbolic interpretation.
          </p>
        </div>

        {/* Chat area */}
        <div className="glass-card rounded-2xl flex flex-col" style={{ minHeight: "520px" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: "500px" }}>
            {messages.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center gap-4"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3), rgba(212,175,55,0.1))" }}>
                  <Moon className="w-10 h-10 text-[#d4af37] opacity-70" />
                </div>
                <p className="text-[#c4b5fd]/50 text-sm italic max-w-xs">
                  "Tell me your dream, beautiful soul — every symbol, every feeling, every fleeting image."
                </p>
                <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
                  {[
                    "I dreamed I was flying over a dark ocean...",
                    "I keep having the same dream about my teeth falling out",
                    "What does it mean to dream of snakes?",
                  ].map((prompt) => (
                    <button key={prompt} onClick={() => setInput(prompt)}
                      className="text-left px-4 py-2.5 rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 text-[#c4b5fd]/70 hover:text-[#c4b5fd] hover:border-[#7c3aed]/40 text-xs transition-all">
                      <Sparkles className="w-3 h-3 inline mr-2 text-[#d4af37]" />{prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages
              .filter(m => m.role === "user" || m.role === "assistant")
              .map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#1a0533]/60 border border-[#d4af37]/15 rounded-2xl px-4 py-3">
                  <p className="text-xs text-[#d4af37] mb-2">Dream Oracle is reading the symbols...</p>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#7c3aed]/10 flex gap-3 items-end">
            {conversation && (
              <button onClick={startNewSession} title="New session"
                className="p-2 rounded-lg text-[#c4b5fd]/30 hover:text-[#c4b5fd] hover:bg-white/5 transition-all flex-shrink-0">
                <Plus className="w-5 h-5" />
              </button>
            )}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Describe your dream in as much detail as you remember..."
              className="bg-[#1a0533]/40 border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[52px] max-h-[140px] rounded-xl resize-none flex-1"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || loading}
              className="rounded-xl px-4 flex-shrink-0 self-end"
              style={{ background: "#d4af37", color: "#0a0118" }}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}