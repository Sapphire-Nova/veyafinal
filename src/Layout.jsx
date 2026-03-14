import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  Moon, BookOpen, Sparkles, Heart, Compass, Home,
  Menu, X, LogOut, User, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", page: "Home", icon: Home },
  { name: "Full Moon Circles", page: "FullMoonCircles", icon: Moon },
  { name: "Intention Builder", page: "IntentionBuilder", icon: Sparkles },
  { name: "Chakra Hub", page: "ChakraHub", icon: Compass },
  { name: "Library", page: "Library", icon: BookOpen },
  { name: "Shadow Journal", page: "ShadowJournal", icon: Heart },
  { name: "Ask the Priestess", page: "AskPriestess", icon: Star },
];

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--veya-void)" }}>
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <Moon className="w-6 h-6 text-[#d4af37]" />
              <span
                className="text-xl font-semibold text-gradient-gold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Veya
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-[#7c3aed]/20 text-[#c4b5fd]"
                        : "text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to={createPageUrl("Dashboard")}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[#c4b5fd]/80 hover:text-[#c4b5fd] hover:bg-white/5 transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.full_name?.split(" ")[0]}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-[#c4b5fd]/40 hover:text-[#c4b5fd] hover:bg-white/5 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-4 py-1.5 rounded-lg"
                >
                  Enter the Portal
                </Button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#c4b5fd] hover:bg-white/5"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-[#7c3aed]/10"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-[#7c3aed]/20 text-[#c4b5fd]"
                          : "text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                {user && (
                  <>
                    <Link
                      to={createPageUrl("Dashboard")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#c4b5fd]/60 hover:text-[#c4b5fd] hover:bg-white/5"
                    >
                      <User className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#c4b5fd]/40 hover:text-[#c4b5fd] hover:bg-white/5"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 glass border-t border-[#7c3aed]/10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-[#d4af37]" />
              <span className="text-gradient-gold" style={{ fontFamily: "'Cinzel', serif" }}>
                Veya by Luna Bloom Tarot
              </span>
            </div>
            <p className="text-sm text-[#c4b5fd]/40">
              Guided by Violet · Illuminated by the Moon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}