"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Linkedin, Mail } from "lucide-react";

const navItems: Array<[string, string]> = [
  ["Projects", "projects-list"],
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999 }}
    >
      {/* Right-aligned cluster with glass background */}
      <div className="flex items-center gap-4 rounded-full backdrop-blur-2xl bg-neutral-900/70 shadow-2xl px-6 py-3.5">
        {/* Optional nav */}
        <nav className="hidden md:flex gap-5 text-sm text-white/90">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)} className="hover:text-white transition">
              {label}
            </button>
          ))}
        </nav>
        <div className="h-5 w-px bg-white/20 hidden md:block" />
        <a href="/Sebastian_Zapata_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume"
           className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition">
          <FileText className="h-5 w-5" />
        </a>
        <a href="https://www.linkedin.com/in/sebzafa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
           className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </motion.header>
  );
}
