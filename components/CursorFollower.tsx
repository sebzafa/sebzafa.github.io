"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
      }}
    >
      {/* Outer glow */}
      <div 
        className="absolute rounded-full bg-blue-400/40 blur-2xl" 
        style={{ width: '100px', height: '100px', left: '-50px', top: '-50px' }}
      />
      {/* Main dot */}
      <div 
        className="relative rounded-full bg-blue-400 shadow-2xl shadow-blue-500/80 border border-blue-300/30" 
        style={{ width: '16px', height: '16px' }}
      />
    </motion.div>
  );
}
