"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const child = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div variants={child} className="mb-10">
    <div className="text-[0.6rem] uppercase tracking-[0.25em] text-neutral-600 font-semibold mb-4">{title}</div>
    <div className="text-[0.8125rem] leading-[1.85] text-neutral-300 font-normal">{children}</div>
  </motion.div>
);

export default function MetaColumns() {
  return (
    <motion.aside 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={container} 
      className="space-y-8"
    >
      <Section title="POSITION">
        <div className="space-y-3">
          <div className="pl-4 border-l-2 border-neutral-800">
            <div className="font-medium text-neutral-50 text-[0.875rem]">Electrical and Computer Engineering</div>
            <div className="text-neutral-500 text-[0.75rem] mt-1.5 font-normal">University of Texas at Austin</div>
          </div>
          <div className="text-neutral-500 text-[0.75rem] space-y-1 font-normal ml-4">
            <div>December 2027</div>
            <div className="pl-8">Focus: Power Electronics,</div>
            <div className="pl-16">Embedded Hardware & Control</div>
          </div>
          <div className="text-neutral-500 text-[0.75rem] mt-4 pt-3 border-t border-neutral-800/60">
            <div className="font-medium text-neutral-400 mb-2 text-[0.65rem] uppercase tracking-[0.2em]">Experience</div>
            <div className="space-y-1 pl-6">
              <div>Hardware Engineering Co-op</div>
              <div>Formula SAE Electric</div>
              <div>Power Systems Research</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="RECOGNITION">
        <div className="space-y-2.5 text-[0.75rem]">
          <div className="text-right pr-4 border-r-2 border-neutral-800">
            <div className="font-medium text-neutral-200 text-[0.8125rem] mb-1.5">Academic & Projects</div>
          </div>
          <div className="text-neutral-500 space-y-0.5 font-normal leading-[1.7] pl-8">
            <div className="flex justify-between items-center">
              <span>04x</span>
              <span className="text-right flex-1 ml-4">Dean's List</span>
            </div>
            <div className="flex justify-between items-center">
              <span>02x</span>
              <span className="text-right flex-1 ml-4">Engineering Competition</span>
            </div>
            <div className="flex justify-between items-center">
              <span>01x</span>
              <span className="text-right flex-1 ml-4">Research Publication</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="BRANDS">
        <div className="text-neutral-500 text-[0.75rem] leading-[1.8] font-normal space-y-1">
          <div className="text-center">Tesla · Rivian · Base Power</div>
          <div className="pl-8">POWER Engineers · Formula SAE</div>
          <div className="text-right pr-4">Waterloo Engineering</div>
        </div>
      </Section>

      <Section title="CONNECT">
        <div className="space-y-3">
          <div className="flex flex-col gap-2.5 pl-6">
            <a href="https://www.linkedin.com/in/sebzapata" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-neutral-500 hover:text-neutral-200 transition-colors text-[0.8125rem] font-normal">
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:seb@example.com" className="flex items-center gap-2.5 text-neutral-500 hover:text-neutral-200 transition-colors text-[0.8125rem] font-normal ml-4">
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
            <a href="https://github.com/sebzapata" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-neutral-500 hover:text-neutral-200 transition-colors text-[0.8125rem] font-normal ml-8">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
          <div className="text-neutral-600 text-[0.7rem] pt-3 border-t border-neutral-800/60 font-normal tracking-wide text-center">
            Available Fall 2026
          </div>
        </div>
      </Section>
    </motion.aside>
  );
}
