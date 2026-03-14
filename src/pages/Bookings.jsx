import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/veya/SectionHeader";

export default function Bookings() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Book a Session"
        subtitle="Choose your session with Violet — channeled, energy-driven, and uniquely crafted for your soul's journey."
        gold />


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl overflow-hidden border border-[#d4af37]/20"
        style={{ minHeight: "800px" }}>

        <iframe
          src="https://outlook.office.com/book/LunaBloomTarotReadings@lunabloomtarot.net/?ismsaljsauthenabled"
          width="100%"
          height="800px"
          scrolling="yes"
          style={{ border: 0, display: "block", minHeight: "800px" }}
          title="Book a Session with Violet" />

      </motion.div>
    </div>);

}