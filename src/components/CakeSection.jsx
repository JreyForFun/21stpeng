import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import LetterModal from './LetterModal';
import { letters } from '../lib/letters';
import { cn } from '../lib/utils';
import { Sparkles } from 'lucide-react';
import ThreeDCake from './ThreeDCake'; // [NEW]

const CakeSection = () => {
  const [blownCandles, setBlownCandles] = useState([]);
  const [openLetter, setOpenLetter] = useState(null);
  const [isCelebrated, setIsCelebrated] = useState(false);
  /* Lights Out state removed to keep pictures visible */

  useEffect(() => {
    // Only celebrate if ALL candles are blown
    const allBlown = letters.every(l => blownCandles.includes(l.id));
    // Also check that we haven't celebrated yet to avoid re-opening
    if (allBlown && !isCelebrated) {
      setIsCelebrated(true);
      triggerCelebration();
      // Logic Change: Open Final Letter when all are blown
      // We can use the first letter as the "Final" one, or a specific hardcoded one.
      // Since the user said "a letter pop ups" (singular) and "use the letter from the lettersection",
      // we might want to ensure the content matches. 
      // For now, let's open the first letter in our list as the "Grand Finale".
      setTimeout(() => setOpenLetter(0), 1000); // Delay slightly for effect
    }
  }, [blownCandles, isCelebrated]);

  const triggerCelebration = () => {
    const duration = 8 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF0000', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF0000', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Optimize: useCallback to prevent unnecessary re-renders of the heavy 3D scene
  const handleCandleBlow = useCallback((id) => {
    setBlownCandles(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
    // REMOVED: setOpenLetter(id); -> No longer opening per candle
  }, []);

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-start pt-0 pb-32 overflow-hidden bg-black">

      {/* Lights Out Overlay - REMOVED */}

      {/* PHOTOS: Left Top (Corner) */}
      <div className="absolute top-24 left-72 z-0 hidden lg:block opacity-60 rotate-3 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-40 h-48 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/gallery-4.jpg" className="w-full h-32 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">Little Peng!</p>
        </div>
      </div>

      {/* PHOTOS: Left Middle */}
      <div className="absolute top-1/2 left-40 -translate-y-1/2 z-0 hidden lg:block opacity-60 -rotate-6 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-44 h-52 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/2c90570b-c5b1-484f-a247-7e790efa5f2c.jpg" className="w-full h-36 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">Gandara</p>
        </div>
      </div>

      {/* Scattered Memories (Right Top - Corner) */}
      <div className="absolute top-20 right-72 z-0 hidden lg:block opacity-60 rotate-6 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-40 h-48 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/gallery-5.jpg" className="w-full h-32 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">BLEEEEHHH</p>
        </div>
      </div>

      {/* PHOTOS: Right Middle */}
      <div className="absolute top-1/2 right-40 -translate-y-1/2 z-0 hidden lg:block opacity-60 rotate-2 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-44 h-52 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/addon2.jpg" className="w-full h-36 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">Galit</p>
        </div>
      </div>

      {/* PHOTOS: Left Bottom (Corner) */}
      <div className="absolute bottom-20 left-72 z-0 hidden lg:block opacity-60 -rotate-3 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-48 h-56 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/hero1.jpg" className="w-full h-40 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">Pengu</p>
        </div>
      </div>

      {/* PHOTOS: Right Bottom (Corner) */}
      <div className="absolute bottom-20 right-72 z-0 hidden lg:block opacity-60 rotate-4 transform hover:rotate-0 transition-transform duration-500">
        <div className="w-40 h-48 bg-white p-2 shadow-lg">
          <img src="../src/assets/images/hero4.jpg" className="w-full h-32 object-cover bg-gray-200" />
          <p className="text-black text-xs text-center mt-2 font-serif italic">Nyarrr</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-40 w-full max-w-6xl flex flex-col items-center">

        <div className="text-center mt-20 md:mt-32 px-4 relative z-50">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-5xl mb-4 text-gold-500"
          >
            Make a Wish
          </motion.h2>
          <p className="text-majestic-200 transition-opacity duration-700">
            Blow out all 21 candles to complete the ritual.
          </p>
        </div>



        <ThreeDCake blownCandles={blownCandles} onCandleBlow={handleCandleBlow} />

      </div>

      {/* Celebration Text - Outside cake, at bottom of section */}
      <AnimatePresence>
        {isCelebrated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full text-center mt-12 z-20"
          >
            <h2 className="font-serif text-xl md:text-2xl text-blue-200 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] tracking-widest uppercase">
              Scroll for more surprise!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <LetterModal
        isOpen={openLetter !== null}
        onClose={() => setOpenLetter(null)}
        letter={`To the Birthday Girl,

As the smoke clears, remember that your light shines brighter than any candle. I believe in you, your dreams, and everything you are becoming.

I'm always right here beside you.`}
        index={0}
      />
    </section>
  );
};

export default CakeSection;
