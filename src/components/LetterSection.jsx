import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import LetterModal from './LetterModal';
import Book from './Book';

const CSSEnvelope = ({ isOpen, onClick, onLetterClick }) => {
  return (
    <div className="relative w-[340px] h-[240px] md:w-[420px] md:h-[280px] group perspective-1000">

      {/* 1. ENVELOPE BODY (Clickable to OPEN) - Only shown when CLOSED */}
      {!isOpen && (
        <div
          className="absolute inset-0 z-50 cursor-pointer"
          onClick={onClick}
          title="Click to Open"
        />
      )}

      {/* Envelope Base (Back) */}
      <div className="absolute inset-0 bg-[#cfa16e] shadow-2xl rounded-sm z-0 overflow-hidden flex items-end justify-center"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        {/* Kraft Paper Texture */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none mix-blend-multiply"></div>
        {/* Inside Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
      </div>

      {/* 2. THE LETTER (Slides out - Clickable to READ) */}
      <motion.div
        initial={{ y: 60, zIndex: 15, opacity: 0 }}
        animate={{
          y: isOpen ? -120 : 60,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut",
          opacity: { duration: 0.3, delay: isOpen ? 0.6 : 0 } // Reveal at ~60% of animation
        }}
        className={`absolute left-[7.5%] w-[85%] h-[85%] bg-[#fffcf4] flex items-center justify-center border border-gray-300 shadow-md origin-bottom overflow-hidden transition-transform duration-300 ${isOpen ? 'cursor-pointer hover:-translate-y-2' : ''}`}
        style={{
          top: '15%',
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
          zIndex: 15 // ALWAYS < Front Flaps (20) but > Back (0)
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering envelope click
          if (isOpen) onLetterClick && onLetterClick();
        }}
      >
        {/* Letter Content Preview */}
        <div className="text-center font-serif w-full h-full p-6 flex items-center justify-center">
          <div className="font-handwriting text-4xl text-[#3e2723] rotate-[-2deg]">
            For My Love
          </div>
          <p className="absolute bottom-4 text-[10px] uppercase tracking-widest text-gray-400">Click to Read</p>
        </div>
      </motion.div>

      {/* 3. FRONT FLAPS (The Pocket) - Pointer events none to let clicks pass to letter? No, z-index handles it. */}
      {/* Actually, side flaps are z-20. Letter is z-15. Letter is BEHIND flaps visually at bottom, but SLIDES OUT. */}
      {/* When slid out (y: -120), it is ABOVE the envelope top edge visually. */}
      {/* Issue: If z-index is 15, and flaps are 20, clicks on the bottom part of letter will hit flaps? */}
      {/* Fix: Pointer events on flaps should be none? No, visually okay. */}
      {/* We can make flaps pointer-events-none so we can click "through" them if needed, but we want to click the letter part sticking OUT. */}

      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Side Flaps - True Triangles meeting at center */}
        <div className="absolute left-0 top-0 h-full w-[54%] bg-[#a1887f] z-20"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            filter: "drop-shadow(2px 0 3px rgba(0,0,0,0.2))"
          }}>
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-multiply"></div>
          {/* Burnt Edge Gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(62,39,35,0.1)_100%)]"></div>
        </div>
        <div className="absolute right-0 top-0 h-full w-[54%] bg-[#a1887f] z-20"
          style={{
            clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
            filter: "drop-shadow(-2px 0 3px rgba(0,0,0,0.2))"
          }}>
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-multiply"></div>
          {/* Burnt Edge Gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent_90%,rgba(62,39,35,0.1)_100%)]"></div>
        </div>

        {/* Bottom Flap - Overlaps sides */}
        <div className="absolute bottom-0 w-full h-[45%] bg-[#bcaaa4] z-20"
          style={{
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            filter: "drop-shadow(0 -4px 6px rgba(0,0,0,0.1))"
          }}>
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20 blur-[0.5px]"></div>
        </div>
      </div>

      {/* 4. TOP FLAP (The Lid) */}
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{
          rotateX: isOpen ? 180 : 0,
          zIndex: isOpen ? 1 : 30
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute top-0 left-0 w-full h-[55%] z-30 pointer-events-none" // Pointer events none to allow click on "Envelope Body" area behind it when closed?
      // Actually if z-30, it blocks. So we need onClick here too if we want to click the flap to open.
      >
        <div className="w-full h-full bg-[#8d6e63] relative"
          style={{
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.25))"
          }}>
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none mix-blend-multiply"></div>
          <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-black/20 to-transparent"></div>
          {/* Crease line */}
          <div className="absolute top-0 w-full h-[1px] bg-white/10"></div>
        </div>

        {/* CLOSURE: WAX SEAL (Centered on the tip) */}
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 w-16 h-16 z-40"
        >
          {/* Realistic Wax Blob */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#b71c1c] to-[#7f0000] shadow-lg flex items-center justify-center relative box-border"
            style={{
              borderRadius: "53% 47% 52% 48% / 51% 45% 55% 49%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.2), inset -2px -2px 5px rgba(0,0,0,0.3)"
            }}
          >
            {/* Splatter edges */}
            <div className="absolute -top-1 left-2 w-2 h-2 bg-[#b71c1c] rounded-full opacity-80"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#7f0000] rounded-full opacity-80"></div>

            {/* Inner Stamp Ring */}
            <div className="w-10 h-10 rounded-full border-2 border-[#5e0000]/30 shadow-inner flex items-center justify-center bg-[#a31515]">
              <span className="text-[#3e0000] font-serif font-extrabold text-xl opacity-60 drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">P</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const LetterSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnvelope1Open, setIsEnvelope1Open] = useState(false);
  const [isEnvelope2Open, setIsEnvelope2Open] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(0);

  const letters = [
    // Letter 1: The Confession / Nostalgia
    `Still remember when we are still BFFS?
    
    The days I need to hide it to you, it takes 2 or maybe 3 long years before i can do it. But THE DAY. The day I finally confessed.
    
    I remember being so nervous. Everything went silent and awkward for a moment... but looking back, it was the start of everything.
    
    From those 'patago' galas to where we are now, damn our progress. Every secret trip, every quiet moment, it all led to this. I'm so happy I took that risk with you.`,

    // Letter 2: The Future / Encouragement
    `As you turn 21, I see so much potential in you. 'Little Peng' is growing up into such an amazing woman.
    
    I know you have big dreams for yourself. There will be challenges, maybe some people giving 'negashits' along the way, but never let them stop you.
    
    I'm always here, cheering you on, ready to support you.
    
    Happy Birthday, my love! Here's to more success and memories.`
  ];

  // Envelope 1 handlers
  const handleEnvelope1Click = () => {
    if (!isEnvelope1Open) {
      setIsEnvelope1Open(true);
    }
  };

  const handleLetter1Click = () => {
    setCurrentLetter(0);
    setIsModalOpen(true);
  };

  // Envelope 2 handlers
  const handleEnvelope2Click = () => {
    if (!isEnvelope2Open) {
      setIsEnvelope2Open(true);
    }
  };

  const handleLetter2Click = () => {
    setCurrentLetter(1);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEnvelope1Open(false);
    setIsEnvelope2Open(false);
    // Don't reset currentLetter immediately to avoid content flash
  };


  return (
    <section className="min-h-screen w-full bg-[#1a100e] relative flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[#3e2723] opacity-20"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>

      {/* Content Container - Grid */}
      <div className="container mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT: Two Envelopes Stacked Vertically */}
        <div className="flex flex-col items-center justify-center gap-16">

          {/* UPPER ENVELOPE */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <CSSEnvelope onClick={handleEnvelope1Click} onLetterClick={handleLetter1Click} isOpen={isEnvelope1Open} />
            </motion.div>
            <p className="mt-6 text-white/50 font-serif italic tracking-widest text-sm">
              Something??
            </p>
          </div>

          {/* BOTTOM ENVELOPE */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <CSSEnvelope onClick={handleEnvelope2Click} onLetterClick={handleLetter2Click} isOpen={isEnvelope2Open} />
            </motion.div>
            <p className="mt-6 text-white/50 font-serif italic tracking-widest text-sm">
              Go Go Go!
            </p>
          </div>

        </div>

        {/* RIGHT: The Book of 21 */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-serif text-[#d7ccc8] mb-8 tracking-widest uppercase border-b border-[#5d4037] pb-2">
            Book of 21 of 21st
          </h2>
          <Book />
        </div>

      </div>

      <LetterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        letter={letters[currentLetter]}
        index={currentLetter}
      />

    </section>
  );
};

export default LetterSection;
