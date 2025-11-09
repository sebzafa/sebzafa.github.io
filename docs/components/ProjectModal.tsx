"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    desc: string;
    fullDescription?: string;
    thumbnail?: string;
    images?: string[];
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return (
    <>
      {/* Modal anchored above the carousel (within its relative container) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-[100]"
        style={{ bottom: 'calc(100% + 12px)', pointerEvents: 'none' }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-${project.id}-title`}
          className="w-[60vw] h-[60vh] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          style={{ pointerEvents: 'none', display: 'block', background: 'rgba(10, 10, 10, 0.9)', borderRadius: '1.5rem' }}
        >
            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-4 p-6 h-full" style={{ fontFamily: "'JetBrains Mono', 'Monaco', 'Courier New', monospace" }}>
              
              {/* Top Left: Image */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <img 
                  src={(project.images && project.images[0]) || '/images/thumb.svg'} 
                  alt={`${project.title} 1`} 
                  className="w-full h-full object-cover" 
                  style={{ filter: 'grayscale(20%) contrast(0.95)' }} 
                />
              </div>

              {/* Top Right: Image */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <img 
                  src={(project.images && project.images[1]) || '/images/thumb.svg'} 
                  alt={`${project.title} 2`} 
                  className="w-full h-full object-cover" 
                  style={{ filter: 'grayscale(20%) contrast(0.95)' }} 
                />
              </div>

              {/* Bottom Left: Title & Description */}
              <div className="rounded-xl p-4 flex flex-col justify-center items-center text-center" style={{ background: 'rgba(255,255,255,0.015)' }}>
                <h2 id={`project-${project.id}-title`} className="text-xl font-bold mb-2" style={{ color: '#e6edf3', fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.25rem' }}>
                  {project.title}
                </h2>
                <p style={{ color: '#a1a1aa', fontSize: '0.75rem', lineHeight: '1.6' }}>
                  {project.desc}
                </p>
              </div>

              {/* Bottom Right: Detailed Description */}
              <div className="rounded-xl p-4 flex items-center justify-center text-center overflow-y-auto scrollbar-hide" style={{ background: 'rgba(255,255,255,0.015)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <p style={{ color: '#d4d4d8', fontSize: '0.75rem', lineHeight: '1.7', fontWeight: 400 }}>
                  {project.fullDescription || `Detailed information about ${project.title}. This is a placeholder description that you can replace with actual project details, technologies used, challenges faced, and outcomes achieved.`}
                </p>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
