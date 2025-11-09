"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxPortrait() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -60]);

  return (
    <motion.div style={{ y }} className="relative aspect-[3/4] w-64 md:w-80 rounded-3xl overflow-hidden border border-neutral-800 card">
      {/* Replace src with your portrait image or keep placeholder */}
      <img src="/images/portrait.svg" alt="portrait" className="w-full h-full object-cover thumb-img" />
    </motion.div>
  );
}
