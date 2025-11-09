"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";

const thumbData = [
  { 
    id: 0, 
    title: `High Voltage Controller`, 
    desc: `Hub for BMS boards, HV safety logic and monitoring. Revision A.`,
    fullDescription: `HVC monitors pack voltage, current, and temperature from multiple BMS boards, implements safety logic to disconnect the battery in fault conditions. CAN, isoSPI, stm32, precharge, ail, etc...`,
    thumbnail: '/images/HVC-Carousel.png',
    images: ['/images/HVC-Pic-1.png', '/images/HVC-Pic-2.JPG']
  },
  { 
    id: 1, 
    title: `Vehicle Control Unit`, 
    desc: `Distributes power and is logic hub for vehicle systems.`,
    fullDescription: `Fuses and current sensing for vehicle loads. Plausibility for pedals, temperature validating, steering angle validation, etc...`,
    thumbnail: '/images/VCU-Carousel.jpg',
    images: ['/images/VCU-Pic-1.JPG', '/images/VCU-Pic-2.JPG']
  },
  { 
    id: 2, 
    title: `Steering Board`, 
    desc: `Steering wheel angle reading and processing board`,
    fullDescription: `Validated and tested hall effect output, mapped to steering angle. VCP, CAN, Serial comm, and filtering.`,
    thumbnail: '/images/Steering-Carousel.gif',
    images: ['/images/Steering-Pic-1.gif', '/images/Steering-Pic-2.png']
  },
  { 
    id: 3, 
    title: `LHRe Dashboard`, 
    desc: `FSAE Judge: "Really, really robust dash, I really loved this dash"`,
    fullDescription: `Fully designed and validated waterproof dash, housing our 5G telemetry system. Helped set up 5G communication and validate antennas speakers, and other UI. Played spongebob during long nights on dash.`,
    thumbnail: '/images/Dash-Carousel.PNG',
    images: ['/images/Dash-Pic-1.JPG', '/images/Dash-Pic-2.jpg']
  },
  { 
    id: 4, 
    title: `3D-printed RC Car`, 
    desc: `High speed RC Car, with dual open differentials and universal joint drivetrain`,
    fullDescription: `Fully designed and validated 3D printed car's drivetrain and RF communication systems, with goal of 70mph. Aero shell not pictured`,
    thumbnail: '/images/RC-Carousel.png',
    images: ['/images/RC-Pic-1.PNG', '/images/RC-Pic-2.jpeg']
  },
  { 
    id: 5, 
    title: `FRC Golden Warriors Robotics`, 
    desc: `District champ robot. Picked at World Championship by reigning World Champs: HighTide for playoffs.`,
    fullDescription: `Prototyped, designed, and tuned intake and shooter systems, was main robot driver, had best passing statistics at worlds 2024`,
    thumbnail: '/images/FRC-Carousel.png',
    images: ['/images/FRC-Pic-1.png', '/images/FRC-Pic-2.png']
  },
];


const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsCarousel() {
  const { scrollY } = useScroll();
  const offset = useTransform(scrollY, [0, 800], [0, -20]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoopingRef = useRef(false);
  const [selectedProject, setSelectedProject] = useState<typeof thumbData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the thumbnails for seamless infinite loop in both directions
  const tripled = [...thumbData, ...thumbData, ...thumbData];

  // Initialize scroll position to middle set on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Start at the beginning of the second set (middle third)
        const oneSetWidth = container.scrollWidth / 3;
        container.scrollLeft = oneSetWidth;
      }
    }, 100); // Wait for content to render
    
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isLoopingRef.current) return;
    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const currentScroll = container.scrollLeft;
    
    // Calculate the width of one set of items (one third of total)
    const oneSetWidth = scrollWidth / 3;
    
    // If scrolled past 2/3 mark, jump back to 1/3 (looks identical)
    if (currentScroll >= oneSetWidth * 2 - 50) {
      isLoopingRef.current = true;
      container.scrollLeft = oneSetWidth + (currentScroll - oneSetWidth * 2);
      setTimeout(() => { isLoopingRef.current = false; }, 50);
    }
    // If scrolled before 1/3 mark, jump forward to 2/3 (looks identical)
    else if (currentScroll <= oneSetWidth + 50) {
      isLoopingRef.current = true;
      container.scrollLeft = oneSetWidth * 2 + (currentScroll - oneSetWidth);
      setTimeout(() => { isLoopingRef.current = false; }, 50);
    }
    
    // Only trigger interaction state, don't set timeout here
    // The timeout will be set when drag ends
    // interaction state is derived via effect
  };

  const handleProjectClick = (project: typeof thumbData[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectHover = (project: typeof thumbData[0]) => {
    if (isDragging) return;
    if (isModalOpen && selectedProject?.id === project.id) return;
    setIsHoveringCard(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // open immediately for reliability
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectLeave = () => {
    // Clear any pending open
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Close modal when leaving project card
    setIsModalOpen(false);
    setSelectedProject(null);
    // Mark hover ended; resume handled by effect with small delay
    setIsHoveringCard(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Resume handled by effect after hover/drag end
  };

  // Derive interaction state from dragging, hover and modal
  useEffect(() => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
    if (isDragging || isHoveringCard || isModalOpen) {
      setIsInteracting(true);
    } else {
      // small delay to avoid flicker on exit
      interactionTimeoutRef.current = setTimeout(() => setIsInteracting(false), 200);
    }
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };
  }, [isDragging, isHoveringCard, isModalOpen]);

  // Smooth idle auto-scroll without CSS animation to avoid stutter on hover
  useEffect(() => {
    let frame: number;
    const speedPxPerFrame = 0.5; // tune for desired idle speed
    const loop = () => {
      const el = scrollContainerRef.current;
      if (el && !isInteracting && !isDragging) {
        el.scrollLeft += speedPxPerFrame;
        // Loop logic handled by onScroll (handleScroll) already
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isInteracting, isDragging]);

  return (
    <div className="projects-carousel mt-12" aria-hidden={false}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-[0.6rem] text-neutral-600 font-semibold uppercase tracking-[0.25em]">SCROLL</div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none -mx-4 px-4 py-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}
      >
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 1 }}
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={container}
          style={{ willChange: 'transform' }}
        >
          {tripled.map((t, i) => (
            <motion.div
              key={`${t.id}-${i}`} 
              onMouseEnter={() => handleProjectHover(thumbData[t.id])}
              onMouseLeave={handleProjectLeave}
              className="w-64 h-40 card project-card flex-shrink-0 group pointer-events-auto cursor-pointer" 
              variants={item} 
              whileHover={{ scale: 1.02 }} 
              style={{ y: offset, minWidth: '16rem', maxWidth: '16rem', minHeight: '10rem', maxHeight: '10rem' }}
              draggable={false}
            >
              <img src={t.thumbnail} alt={t.title} className="w-full h-full object-cover thumb-img pointer-events-none" draggable={false} style={{ objectFit: 'cover' }} />
              <div className="thumb-overlay">
                <div className="thumb-title">{t.title}</div>
                <div className="thumb-desc">{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          project={selectedProject}
        />
      )}

      {/* Debug overlay to confirm modal state */}
      {/* Removed debug overlay - modal is working */}
    </div>
  );
}
