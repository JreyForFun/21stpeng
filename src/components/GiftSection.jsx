import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const GiftSection = () => {
  const [step, setStep] = useState(0); // 0: Wrapped, 1: Untied, 2: Open, 3: Surprise!

  const handleClick = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#e5cca5', '#ffffff']
      });
      setStep(3);
    }
  };

  const reset = (e) => {
    e.stopPropagation();
    setStep(0);
  };

  return (
    <section className="min-h-screen w-full bg-[#1a0b0a] relative flex flex-col items-center justify-center py-24 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1b1a] to-[#0f0505]"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Title */}
      <div className="relative z-10 mb-16 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-[#e5cca5] tracking-[0.2em] mb-4 drop-shadow-lg">
          The Final Surprise
        </h2>
        <p className="text-white/40 font-light tracking-widest uppercase text-sm">
          {step === 0 ? "Tap to Untie" : step === 1 ? "Tap to Open" : step === 2 ? "Tap the Heart" : "Happy Birthday!"}
        </p>
      </div>

      {/* 2D GIFT BOX CONTAINER */}
      <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer group" onClick={handleClick}>

        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gold-500/20 blur-[60px] rounded-full transition-all duration-1000 ${step >= 2 ? 'opacity-50 scale-150' : 'opacity-20'}`}></div>

        <div className="relative w-48 h-48">

          {/* SURPRISE CONTENT (Behind the box layers initially) */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: -80, scale: 1.2 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="relative hover:scale-110 transition-transform duration-300">
                  <Heart size={100} fill="#d4af37" className="text-[#d4af37] drop-shadow-lg" />
                  <div className="absolute inset-0 bg-gold-400 blur-xl opacity-50 animate-pulse"></div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100 - 50
                      }}
                      transition={{ delay: 0.5 + Math.random() * 0.5, duration: 2, repeat: Infinity }}
                      className="absolute left-1/2 top-1/2 w-2 h-2 bg-gold-300 rounded-full"
                    />
                  ))}

                  {/* Click Hint */}
                  {step === 2 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gold-200 text-xs tracking-widest whitespace-nowrap opacity-60"
                    >
                      ( CLICK ME )
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOX LID (Top Layer) */}
          <motion.div
            animate={step >= 2 ? { y: -150, rotate: -10, opacity: 0 } : { y: step === 0 ? 0 : -5 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-12 z-30"
          >
            <div className="w-full h-full bg-[#1e3a8a] rounded-sm shadow-lg border-b-4 border-[#0f172a] relative overflow-hidden">
              {/* Lid Texture */}
              <div className="absolute inset-0 bg-white/5"></div>
              {/* Ribbon Horiz (Lid) */}
              <AnimatePresence>
                {step === 0 && (
                  <motion.div exit={{ scaleX: 0 }} className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-[#d4af37] shadow-sm"></motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOW (On top of lid) */}
            <AnimatePresence>
              {step === 0 && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-12"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full border-4 border-[#d4af37] -rotate-12"></div>
                  <div className="absolute right-0 w-8 h-8 rounded-full border-4 border-[#d4af37] rotate-12"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* BOX BODY (Bottom Layer) */}
          <motion.div
            animate={{ scale: step === 0 ? [1, 1.02, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-0 left-0 w-full h-40 bg-[#172554] rounded-b-lg shadow-2xl z-20 flex items-center justify-center overflow-hidden"
          >
            {/* Box Texture/Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>

            {/* Ribbon Vert (Body) */}
            <AnimatePresence>
              {step === 0 && (
                <motion.div exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5 }} className="w-8 h-full bg-[#d4af37] shadow-md z-10"></motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>

      {/* FINAL MESSAGE OVERLAY */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={reset}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#1a0b0a] border border-[#d4af37]/30 p-12 md:p-16 max-w-2xl text-center rounded-2xl relative shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={reset} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X size={24} />
              </button>

              <h3 className="font-serif text-3xl md:text-5xl text-[#d4af37] mb-6">Happy 21st Birthday Again Pengay!</h3>
              <p className="font-serif text-lg md:text-xl text-gray-300 leading-relaxed italic max-w-2xl mx-auto">
                Witnessing you evolve into the incredible woman you are today has been my greatest privilege. As you step into this new chapter, may you find the strength to conquer every challenge and the wisdom to cherish every joy. You are, and always will be, the most profound gift of my life. I love you.
              </p>
              <br />
              <p className="font-serif text-lg md:text-xl text-gray-300 leading-relaxed italic max-w-2xl mx-auto">
                Wala ng surprise sana dumating na agad yung other gifts ko sayo on delivery pa sila huhu 
              </p>
              <br />
              <p className="font-serif text-lg md:text-xl text-gray-300 leading-relaxed italic max-w-2xl mx-auto" >
                Happiest Birthday Pengay! I love you so much lovey!
              </p>
              <div className="mt-8 text-4xl animate-bounce flex gap-4 justify-center">
                <span>❤️</span>
                <span>❤️</span>
                <span>❤️</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default GiftSection;
