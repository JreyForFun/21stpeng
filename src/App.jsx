import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import CakeSection from './components/CakeSection';
import LetterSection from './components/LetterSection';
import GiftSection from './components/GiftSection';
import ScatteredMemories from './components/ScatteredMemories';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for the "Majestic" feel
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-majestic-900 text-white overflow-hidden selection:bg-gold-500 selection:text-majestic-900 relative">
      <AnimatePresence>
        {!isLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-majestic-950">
            <div className="animate-pulse text-gold-500 font-serif text-2xl tracking-widest flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
              LOADING SURPRISE...
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Background Elements */}
      <ScatteredMemories />

      {/* (Music Player removed by user request) */}

      <main className="relative z-10 space-y-0">
        <Hero />
        <Gallery />
        <CakeSection />
        <LetterSection />
        <GiftSection />
      </main>

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
    </div>
  );
}

export default App;
