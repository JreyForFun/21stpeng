import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScatteredMemories = () => {
  const images = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      src: `https://picsum.photos/seed/${i + 200}/300/400`,
      rotation: Math.random() * 40 - 20, // -20 to 20 deg
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 100, // 0 to 100% of height
      scale: Math.random() * 0.4 + 0.8,
      zIndex: Math.floor(Math.random() * 10),
    }));
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Container to hold scattered items */}
      <div className="relative w-full h-full opacity-30">
        {images.map((img) => (
          <motion.div
            key={img.id}
            style={{
              position: 'absolute',
              left: `${img.x}%`,
              top: `${img.y}%`,
              rotate: img.rotation,
              scale: img.scale,
              zIndex: img.zIndex,
              y: y, // Basic parallax
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + img.id * 0.1, duration: 2 }}
            className="w-40 md:w-56 p-2 bg-white shadow-xl transform hover:scale-110 transition-transform duration-500"
          >
            <div className="w-full h-full p-1 border border-gray-100 bg-gray-50/50">
              <img src={img.src} alt="Memory" className="w-full h-full object-cover filter sepia-[0.3]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScatteredMemories;
