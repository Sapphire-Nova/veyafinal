import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Star, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SectionHeader from "@/components/veya/SectionHeader";
import ReactMarkdown from "react-markdown";

export default function AskPriestess() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    const history = messages
      .slice(-6)
      .map((m) => `${m.role === "user" ? "Seeker" : "Violet"}: ${m.content}`)
      .join("\n");

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are Violet, the mystical spiritual guide and High Priestess of Luna Bloom Tarot. 
You are warm, wise, empowering, and modern — blending ancient wisdom with contemporary spirituality.
You use tarot, astrology, chakra knowledge, herbalism, crystal healing, and shadow work in your guidance.
You speak with authority but compassion. You use "love", "darling", or "beautiful soul" occasionally.
Keep responses concise but profound — 2-4 paragraphs max.
Use mystical language but keep it accessible. Include specific, actionable advice.
You may reference specific herbs (Mugwort, Rose, Lavender, Rosemary, Sage, Chamomile, Acacia), 
crystals (Amethyst, Black Tourmaline, Clear Quartz, Rose Quartz, Obsidian, Selenite), 
chakras, moon phases, or tarot cards when relevant.

Previous conversation:
${history}

The seeker asks: "${userMessage}"

Respond as Violet:`,
    });

    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
  };

  const suggestions = [
    "What does the current moon phase mean for me?",
    "I'm feeling stuck in my career. What do the cards say?",
    "How can I open my heart chakra?",
    "I keep having recurring dreams about water.",
    "What crystal should I carry this week?",
  ];

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Ask the Priestess"
        subtitle="Receive personalized spiritual guidance from Violet. Ask about tarot, chakras, crystals, moon phases, or anything your soul needs."
        gold
      />

      {/* Chat Area */}
      <div className="glass-card p-4 md:p-6 min-h-[400px] max-h-[600px] overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Moon className="w-12 h-12 text-[#7c3aed]/30 mx-auto mb-4" />
            <p className="text-[#c4b5fd]/40 text-sm mb-6">
              The Priestess awaits your question, beautiful soul...
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="text-xs px-3 py-2 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/15 text-[#c4b5fd]/50 hover:text-[#c4b5fd] hover:border-[#7c3aed]/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#7c3aed]/30 text-[#f5f0ff]"
                      : "bg-[#1a0533]/60 border border-[#d4af37]/10 text-[#c4b5fd]/80"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <p className="text-xs text-[#d4af37] mb-2 flex items-center gap-1">
                      <Star className="w-3 h-3" /> Violet
                    </p>
                  )}
                  {msg.role === "user" ? (
                    <p className="text-sm">{msg.content}</p>
                  ) : (
                    <ReactMarkdown className="text-sm prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#1a0533]/60 border border-[#d4af37]/10 rounded-2xl px-4 py-3">
                  <p className="text-xs text-[#d4af37] mb-2 flex items-center gap-1">
                    <Star className="w-3 h-3" /> Violet
                  </p>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-[#7c3aed]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
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
          placeholder="Ask the Priestess..."
          className="bg-[#1a0533]/40 border-[#7c3aed]/20 text-[#f5f0ff] placeholder:text-[#c4b5fd]/30 min-h-[50px] max-h-[120px] rounded-xl resize-none"
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl px-4 self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}