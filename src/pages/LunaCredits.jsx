import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap, Star, Crown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/veya/SectionHeader";

const PACKS = [
  {
    id: "spark",
    name: "Spark Pack",
    credits: 59,
    base: 49,
    price: "$4.99",
    icon: Star,
    color: "#c4b5fd",
    perks: ["49 Luna Credits", "+ 10 Bonus Credits", "59 credits total", "Perfect for beginners"],
  },
  {
    id: "glow",
    name: "Glow Pack",
    credits: 109,
    base: 99,
    price: "$9.99",
    icon: Zap,
    color: "#d4af37",
    popular: true,
    perks: ["99 Luna Credits", "+ 10 Bonus Credits", "109 credits total", "Most popular choice"],
  },
  {
    id: "moon",
    name: "Moon Pack",
    credits: 159,
    base: 149,
    price: "$14.99",
    icon: Crown,
    color: "#f5e6a3",
    perks: ["149 Luna Credits", "+ 10 Bonus Credits", "159 credits total", "Deep seeker sessions"],
  },
  {
    id: "priestess",
    name: "Priestess Pack",
    credits: 209,
    base: 199,
    price: "$19.99",
    icon: Crown,
    color: "#d4af37",
    perks: ["199 Luna Credits", "+ 10 Bonus Credits", "209 credits total", "Full priestess experience"],
  },
];

export default function LunaCredits() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    setIsInIframe(window.self !== window.top);
  }, []);

  const { data: creditRecord } = useQuery({
    queryKey: ["lunaCredits", user?.email],
    queryFn: () => base44.entities.LunaCredit.filter({ user_email: user.email }),
    enabled: !!user,
    select: (data) => data?.[0] || null,
  });

  const balance = creditRecord?.balance ?? 0;

  const handlePurchase = async (packId) => {
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }

    if (isInIframe) {
      alert("Checkout is only available from the published app. Please open the app in a full browser tab.");
      return;
    }

    setLoading(packId);
    try {
      const successUrl = window.location.origin + window.location.pathname + "?success=true";
      const cancelUrl = window.location.origin + window.location.pathname + "?cancelled=true";

      const response = await base44.functions.invoke("createCheckout", {
        pack: packId,
        successUrl,
        cancelUrl,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  // Check for success/cancelled query params
  const urlParams = new URLSearchParams(window.location.search);
  const isSuccess = urlParams.get("success") === "true";
  const isCancelled = urlParams.get("cancelled") === "true";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        title="Luna Credits"
        subtitle="Power your spiritual journey. Credits unlock AI readings, intention spells, and more."
        gold
      />

      {/* Success / cancelled banners */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-center"
        >
          <CheckCircle className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
          <p className="text-[#f5f0ff] font-medium">Payment successful! Your Luna Credits have been added. ✨</p>
        </motion.div>
      )}
      {isCancelled && (
        <div className="mb-8 p-4 rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-center">
          <p className="text-[#c4b5fd]">Payment cancelled. Your credits were not charged.</p>
        </div>
      )}

      {/* Current Balance */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-10 text-center max-w-sm mx-auto"
        >
          <p className="text-[#c4b5fd] text-sm mb-1 uppercase tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>
            Your Balance
          </p>
          <p className="text-5xl font-bold text-[#d4af37]" style={{ fontFamily: "'Cinzel', serif" }}>
            {balance}
          </p>
          <p className="text-[#c4b5fd]/60 text-xs mt-1">Luna Credits</p>
        </motion.div>
      )}

      {/* Packs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKS.map((pack, i) => {
          const Icon = pack.icon;
          return (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-7 flex flex-col relative ${pack.popular ? "border-[#d4af37]/50" : ""}`}
              style={pack.popular ? { boxShadow: "0 0 40px rgba(212,175,55,0.15)" } : {}}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0a0118] text-xs font-bold px-3 py-1 rounded-full">
                  ✦ Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${pack.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: pack.color }} />
                </div>
                <div>
                  <h3 className="text-[#f5f0ff] text-base font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
                    {pack.name}
                  </h3>
                  <p style={{ color: pack.color }} className="text-2xl font-bold">
                    {pack.price}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-7 flex-1">
                {pack.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-[#c4b5fd]">
                    <span style={{ color: pack.color }}>✦</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(pack.id)}
                disabled={loading === pack.id}
                className="w-full py-5 rounded-xl font-medium text-sm"
                style={{
                  background: pack.popular ? "#d4af37" : "rgba(124,58,237,0.25)",
                  color: pack.popular ? "#0a0118" : "#f5f0ff",
                  border: pack.popular ? "none" : "1px solid rgba(124,58,237,0.4)",
                }}
              >
                {loading === pack.id ? "Redirecting..." : `Get ${pack.credits} Credits`}
              </Button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[#c4b5fd]/40 text-xs mt-10">
        Payments are processed securely via Stripe. Credits are added instantly after purchase.
      </p>
    </div>
  );
}