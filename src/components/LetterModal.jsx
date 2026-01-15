import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LetterModal = ({ isOpen, onClose, letter, index }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Vintage Map Style Letter (Copied from LetterSection) */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fdfbf7] text-black max-w-lg w-full p-8 md:p-12 shadow-2xl relative overflow-y-auto max-h-[85vh] border-4 border-[#d4af37]"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(212,175,55,0.1)"
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
            >
              <X />
            </button>

            <div className="font-serif leading-relaxed text-base md:text-lg space-y-6 text-gray-800">
              <div className="w-full text-center border-b-2 pb-4 mb-6 border-[#d4af37]">
                <p className="font-bold text-3xl text-majestic-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Happy 21st Pengay!</p>
              </div>

              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-gold-600 first-letter:float-left first-letter:mr-2 whitespace-pre-line">
                {letter || "I have so many things to tell you..."}
                <br />
              </p>

              <p className="font-bold text-right mt-12 italic text-majestic-900 text-xl">
                Always yours,<br />
                <span className="text-2xl">Ging</span>
              </p>

              {/* Vintage decorative elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4af37] opacity-30"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4af37] opacity-30"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LetterModal;
