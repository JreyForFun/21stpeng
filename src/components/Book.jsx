import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const totalPages = 21; // Exactly 21 pages
  const displayPages = 21; // But display as 21

  const pages = [
    { id: 0, text: "You assume the form of a brilliant galaxy, shining brightly with infinite grace, lighting up my entire universe with your love." },
    { id: 1, text: "Every moment spent with you feels like a beautiful dream that I never want to wake up from, my darling Peng." },
    { id: 2, text: "Your laugh is a melody that plays softly in my heart, bringing peace and joy to my soul every single day." },
    { id: 3, text: "I admire the strength you hold within, a quiet power that moves mountains and inspires everyone lucky enough to know you." },
    { id: 4, text: "Your kindness flows like a gentle river, touching the lives of others with a warmth that is rare and truly special." },
    { id: 5, text: "In your eyes, I see a future filled with endless adventures, laughter, and a love that grows deeper with every breath." },
    { id: 6, text: "You are the poetry my heart has always wanted to write, a masterpiece of grace and beauty in every single way." },
    { id: 7, text: "With every year, you become more radiant, a stunning flower blooming in the garden of life, captivating all who see you." },
    { id: 8, text: "I promise to walk beside you through every storm and every sunrise, holding your hand as we face the world together." },
    { id: 9, text: "You have a spirit that soars higher than the birds, free and wild, chasing dreams with a passion that is inspiring." },
    { id: 10, text: "My love for you is vast and endless, stretching beyond the stars and encompassing everything that makes you who you are." },
    { id: 11, text: "You bring magic into the mundane, turning ordinary days into extraordinary memories that I will cherish for the rest of time." },
    { id: 12, text: "Your wisdom guides me when I am lost, a beacon of light in the darkness, showing me the way home always." },
    { id: 13, text: "I celebrate the day you were born, for it gave the world a gift more precious than gold or fine jewels." },
    { id: 14, text: "You are my best friend, my confidant, and my greatest love, the one who understands my soul better than anyone else." },
    { id: 15, text: "Watching you grow is a privilege I treasure, witnessing your journey as you become the incredible woman you are meant to be." },
    { id: 16, text: "May your twenty-first year be filled with the same joy you bring to others, returning to you a thousand times over." },
    { id: 17, text: "You are the calm in my chaos, the anchor that grounds me when life gets overwhelming, my safe harbor in storms." },
    { id: 18, text: "I love the way you see the world, with wonder and hope, finding beauty in places where others only see shadows." },
    { id: 19, text: "You are deserving of all the happiness life has to offer, and I will do my best to give it to you." },
    { id: 20, text: "Happy birthday my dearest love, you are the heartbeat of my existence and I love you more than words can say." }
  ];

  const openBook = () => {
    if (!isOpen) {
      setIsOpen(true);
      setCurrentSpread(0);
    }
  };

  const closeBook = () => {
    setIsOpen(false);
    setCurrentSpread(0);
  };

  const nextSpread = () => {
    if (currentSpread < Math.floor(totalPages / 2)) {
      setCurrentSpread(currentSpread + 1);
    }
  };

  const prevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(currentSpread - 1);
    }
  };

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;

  return (
    <div className="relative w-[700px] h-[550px] mx-auto">

      {/* BOOK SHADOW */}
      <div className="absolute inset-0 bg-black/40 blur-3xl transform translate-y-6 scale-95"></div>

      {/* BOOK CONTAINER with 3D perspective */}
      <div className="relative w-full h-full" style={{ perspective: '2500px' }}>

        {/* CLOSED BOOK STATE */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ rotateY: 0 }}
              exit={{ rotateY: -20, scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 cursor-pointer flex items-center justify-center"
              onClick={openBook}
            >
              <div
                className="w-[400px] h-full bg-gradient-to-br from-[#5d3a38] via-[#4a2c2a] to-[#3e2723] rounded-xl shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.3)'
                }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] rounded-xl"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <h3 className="font-serif text-5xl text-[#d4af37] mb-4"
                    style={{ textShadow: '0 3px 0 rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(212,175,55,0.4)' }}>
                    Singularity
                  </h3>
                  <p className="font-serif text-3xl text-[#d4af37]"
                    style={{ textShadow: '0 2px 0 rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.1)' }}>
                   21 of 21st
                  </p>
                  <div className="mt-6 w-24 h-0.5 bg-[#d4af37] opacity-60"></div>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#2d1b1a] via-[#3e2723] to-transparent opacity-80 rounded-l-xl"></div>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-[#d4af37] text-sm font-serif italic opacity-60 animate-pulse">
                    Click to Open
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OPEN BOOK STATE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center gap-0"
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={closeBook}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#d4af37] hover:bg-[#c9a332] flex items-center justify-center shadow-lg transition-all z-50"
              >
                <X className="w-5 h-5 text-[#3e2723]" />
              </button>

              {/* LEFT PAGE with flip animation */}
              <motion.div
                key={`left-${currentSpread}`}
                initial={{ rotateY: currentSpread === 0 ? -90 : -15 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-[48%] h-[95%] bg-[#fdfaf5] shadow-2xl cursor-pointer"
                onClick={prevSpread}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                  boxShadow: '-5px 0 20px rgba(0,0,0,0.3), inset 3px 0 10px rgba(0,0,0,0.1)'
                }}
              >
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 via-black/10 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-[#d4af37] to-transparent opacity-40"></div>

                {leftPageIndex < totalPages && (
                  <motion.div
                    key={`left-content-${leftPageIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative h-full p-12 flex flex-col"
                  >
                    <span className="absolute top-8 left-10 font-serif text-xs text-gray-400">{leftPageIndex + 1}</span>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      {/* Chapter Header Removed */}
                      <p className="font-serif text-base text-gray-700 leading-relaxed max-w-[85%]">
                        {pages[leftPageIndex].text}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* CENTER SPINE */}
              <div
                className="w-8 h-[95%] bg-gradient-to-r from-[#2d1b1a] via-[#3e2723] to-[#2d1b1a] shadow-inner"
                style={{
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
                <div className="absolute top-[20%] left-0 right-0 h-1 bg-[#d4af37] opacity-30"></div>
                <div className="absolute top-[50%] left-0 right-0 h-1 bg-[#d4af37] opacity-30"></div>
                <div className="absolute top-[80%] left-0 right-0 h-1 bg-[#d4af37] opacity-30"></div>
              </div>

              {/* RIGHT PAGE with flip animation */}
              <motion.div
                key={`right-${currentSpread}`}
                initial={{ rotateY: currentSpread === 0 ? 90 : 15 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-[48%] h-[95%] bg-[#fdfaf5] shadow-2xl cursor-pointer"
                onClick={nextSpread}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  boxShadow: '5px 0 20px rgba(0,0,0,0.3), inset -3px 0 10px rgba(0,0,0,0.1)'
                }}
              >
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]"></div>
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 via-black/10 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-[#d4af37] to-transparent opacity-40"></div>

                {rightPageIndex < totalPages && (
                  <motion.div
                    key={`right-content-${rightPageIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative h-full p-12 flex flex-col"
                  >
                    <span className="absolute top-8 right-10 font-serif text-xs text-gray-400">{rightPageIndex + 1}</span>
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      {/* Chapter Header Removed */}
                      <p className="font-serif text-base text-gray-700 leading-relaxed max-w-[85%]">
                        {pages[rightPageIndex].text}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* NAVIGATION */}
      {isOpen && (
        <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between px-8">
          <button
            onClick={prevSpread}
            disabled={currentSpread === 0}
            className={`px-6 py-2 rounded-md font-serif text-sm transition-all ${currentSpread === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-[#d4af37] text-[#3e2723] hover:bg-[#c9a332] shadow-md'
              }`}
          >
            ← Previous
          </button>
          <p className="text-white/50 text-sm font-serif">
            Pages {leftPageIndex + 1}-{Math.min(rightPageIndex + 1, totalPages)} of {displayPages}
          </p>
          <button
            onClick={nextSpread}
            disabled={rightPageIndex >= totalPages - 1}
            className={`px-6 py-2 rounded-md font-serif text-sm transition-all ${rightPageIndex >= totalPages - 1
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-[#d4af37] text-[#3e2723] hover:bg-[#c9a332] shadow-md'
              }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Book;
