import React from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles, Compass, BookOpen, Heart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import HeroOrb from "@/components/veya/HeroOrb";
import FeatureCard from "@/components/veya/FeatureCard";
import SectionHeader from "@/components/veya/SectionHeader";

const features = [
  {
    icon: Moon,
    title: "Full Moon Circles",
    description: "Join our sacred monthly gatherings. Meditate, connect, and set intentions under the light of the full moon.",
    page: "FullMoonCircles",
  },
  {
    icon: Sparkles,
    title: "Intention Builder",
    description: "Craft personalized spells and rituals combining herbs, crystals, and celestial timing for your desires.",
    page: "IntentionBuilder",
  },
  {
    icon: Compass,
    title: "Chakra Hub",
    description: "Explore all 7 energy centers. Diagnose blockages and discover foods, crystals, yoga, and frequencies to heal.",
    page: "ChakraHub",
  },
  {
    icon: BookOpen,
    title: "The Library",
    description: "A curated collection of sacred herbs and crystals — their properties, uses, and spiritual significance.",
    page: "Library",
  },
  {
    icon: Heart,
    title: "Shadow Journal",
    description: "Private journaling with guided prompts for inner child work, triggers, and self-forgiveness.",
    page: "ShadowJournal",
  },
  {
    icon: Star,
    title: "Ask the Priestess",
    description: "Receive personalized spiritual guidance from Violet, powered by ancient wisdom and intuition.",
    page: "AskPriestess",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <HeroOrb />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-3xl"
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Veya
          </h1>
          <p
            className="text-lg md:text-xl text-[#c4b5fd]/80 mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            A Spiritual Portal by Violet
          </p>
          <p className="text-sm md:text-base text-[#c4b5fd]/50 max-w-xl mx-auto mb-8 leading-relaxed">
            Step through the veil. Discover ancient wisdom reborn for the modern mystic.
            Rituals, readings, and radical self-discovery — guided by the moon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl("FullMoonCircles")}>
              <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-6 rounded-xl text-base glow-violet">
                <Moon className="w-5 h-5 mr-2" />
                Join a Full Moon Circle
              </Button>
            </Link>
            <Link to={createPageUrl("IntentionBuilder")}>
              <Button
                variant="outline"
                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 px-8 py-6 rounded-xl text-base"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Build an Intention
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-[#7c3aed]/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-[#7c3aed]/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader
          title="The Sacred Offerings"
          subtitle="Every tool Violet has channeled for your spiritual evolution — all in one sanctum."
          gold
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.page} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Violet's Message */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212,175,55,0.3), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <span className="text-3xl mb-4 block">✨</span>
            <p
              className="text-lg md:text-xl text-[#c4b5fd]/80 italic leading-relaxed mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              "You were never lost — you were simply waiting for the right guide to help you
              remember the magic that has always lived within you."
            </p>
            <p className="text-[#d4af37] text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
              — Violet, Luna Bloom Tarot
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3
            className="text-2xl md:text-3xl text-gradient-violet mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ready to Begin Your Journey?
          </h3>
          <p className="text-[#c4b5fd]/50 mb-8 text-sm">
            Create your free account and unlock the mysteries within.
          </p>
          <Link to={createPageUrl("Dashboard")}>
            <Button className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white px-10 py-6 rounded-xl text-base glow-violet">
              Enter the Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}