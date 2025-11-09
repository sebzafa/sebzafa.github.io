"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ProjectsCarousel from "../components/ProjectsCarousel";
import { Mail, Linkedin, Github } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Top badge */}
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-neutral-900/60 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              Power Electronics • Embedded Systems • Validation
            </span>
          </motion.div>

          {/* Name and Portrait - side by side centered */}
          <div className="grid grid-cols-[auto_300px] lg:grid-cols-[auto_330px] gap-8 lg:gap-12 items-center justify-center mb-12 mx-auto max-w-5xl">
            <motion.h1
              variants={fadeUp}
              className="text-[10rem] sm:text-[12rem] md:text-[14rem] lg:text-[16rem] font-bold tracking-tight leading-[0.85]"
            >
              Sebastian<br />Zapata
            </motion.h1>
            
            <motion.div variants={fadeUp} className="relative group w-full aspect-square">
              <div className="relative rounded-2xl p-[3px] bg-gradient-to-br from-blue-500 via-purple-500 to-fuchsia-500 h-full">
                <div className="rounded-[14px] overflow-hidden bg-neutral-950 h-full">
                  <Image
                    src="/images/portrait-pic.png"
                    alt="Portrait of Sebastian Zapata"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-fuchsia-500/40 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          </div>

          {/* Compact intro below hero */}
          <div className="max-w-4xl mx-auto">
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-neutral-400 mb-5"
            >
              Power electronics and embedded hardware — University of Texas at Austin.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Email */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <p className="text-neutral-300">sebzafa@gmail.com</p>
      </section>

      {/* Projects Section — moved up for emphasis */}
      <section id="projects-list" className="mx-auto max-w-7xl px-6 pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Projects</h2>
          <ProjectsCarousel />
        </motion.div>
      </section>

      {/* Experience brands logos */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-y border-neutral-800/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-neutral-500 mb-8 uppercase tracking-wider">Experience</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-2xl font-bold text-neutral-700">Base Power Inc.</div>
            <div className="text-2xl font-bold text-neutral-700">Longhorn Racing Electric - Power Electronics Lead</div>
            <div className="text-2xl font-bold text-neutral-700">POWER Engineers/wsp</div>
            <div className="text-2xl font-bold text-neutral-700">Texas Aerial Robotics</div>
          </div>
        </motion.div>
      </section>

      {/* Who I Am Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16"
        >
          <div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Electrical and Computer Engineering '27 with a focus in power electronics and ICs
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-neutral-400 leading-relaxed">
ECE @ UT Austin focused on power electronics and embedded systems. Designed HV control hardware and VCU boards for an electric race car, custom flight-controller PCBs for UAVs, and various microcontroller control systems.            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="space-y-8">
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-sm uppercase tracking-wider text-blue-400 mb-2">Expertise</h3>
              <ul className="space-y-2 text-neutral-300">
                <li>Power Electronics Design</li>
                <li>Embedded Systems</li>
                <li>PCB Layout & Design</li>
                <li>Control Systems </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      

      

      

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-12 border-t border-neutral-800/50">
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Sebastian Zapata. All rights reserved.
          </div>
          <a
            href="/old/docs/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-900/60 hover:bg-neutral-800/80 backdrop-blur-sm transition-all duration-300"
          >
            Old Website
          </a>
        </div>
      </footer>
    </div>
  );
}
