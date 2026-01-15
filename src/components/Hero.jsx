import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';
import hero4 from '../assets/images/hero4.jpg';

const StarField = () => {
  const stars = useMemo(() => {
    return [...Array(200)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const CinematicText = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
          className="inline-block origin-bottom"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000 bg-majestic-950">

      {/* 1. Cosmic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-majestic-800 via-majestic-950 to-black z-0" />
      <StarField />

      {/* Floating Blobs (Refined) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-majestic-600/30 rounded-full mix-blend-screen filter blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-600/20 rounded-full mix-blend-screen filter blur-[80px]"
        />
      </div>


      {/* Floating Polaroids - 4 Corners Configuration */}
      <div className="absolute inset-0 z-1 pointer-events-none hidden md:block">

        {/* TOP LEFT (Moved Higher) */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
          className="absolute top-[2%] left-[5%] w-48 bg-white p-3 shadow-2xl transform hover:scale-105 hover:rotate-0 transition-all duration-500 pointer-events-auto cursor-pointer"
        >
          <div className="w-full h-40 bg-gray-200 overflow-hidden mb-2 relative">
            <img src={hero3} alt="Memory" className="w-full h-full object-cover filter sepia-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            {/* Birthday Hat Decoration */}
            <div className="absolute top-2 right-2 text-3xl">🎉</div>
          </div>
          <p className="font-serif text-center text-gray-800 text-sm italic">Ganda!</p>
        </motion.div>

        {/* BOTTOM LEFT (Moved Lower) */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ delay: 2.1, duration: 1.5, type: "spring" }}
          className="absolute bottom-[10%] left-[5%] w-52 bg-white p-3 shadow-2xl transform hover:scale-105 hover:rotate-0 transition-all duration-500 pointer-events-auto cursor-pointer"
        >
          <div className="w-full h-48 bg-gray-200 overflow-hidden mb-2 relative">
            <img src={hero1} alt="Memory" className="w-full h-full object-cover filter contrast-125" />
            <div className="absolute inset-0 ring-1 ring-black/5"></div>
            {/* Birthday Balloons */}
            <div className="absolute top-2 left-2 text-2xl">🎈🎈</div>
          </div>
          <p className="font-serif text-center text-gray-800 text-sm italic">Pengu ❤️</p>
        </motion.div>

        {/* TOP RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ delay: 1.8, duration: 1.5, type: "spring" }}
          className="absolute top-[10%] right-[5%] w-44 bg-white p-3 shadow-2xl transform hover:scale-105 hover:rotate-0 transition-all duration-500 pointer-events-auto cursor-pointer"
        >
          <div className="w-full h-36 bg-gray-200 overflow-hidden mb-2 relative">
            <img src={hero4} alt="Memory" className="w-full h-full object-cover filter brightness-110" />
            {/* Birthday Cup */}
            <div className="absolute bottom-2 right-2 text-3xl">🥤</div>
          </div>
          <p className="font-serif text-center text-gray-800 text-sm italic">Cheers! 🎂</p>
        </motion.div>

        {/* BOTTOM RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ delay: 2.4, duration: 1.5, type: "spring" }}
          className="absolute bottom-[20%] right-[5%] w-50 bg-white p-3 shadow-2xl transform hover:scale-105 hover:rotate-0 transition-all duration-500 pointer-events-auto cursor-pointer"
        >
          <div className="w-full h-44 bg-gray-200 overflow-hidden mb-2 relative">
            <img src={hero2} alt="Memory" className="w-full h-full object-cover filter saturate-150" />
            {/* Party Hat */}
            <div className="absolute top-2 left-2 text-3xl">🎩</div>
          </div>
          <p className="font-serif text-center text-gray-800 text-sm italic">Party time!</p>
        </motion.div>

      </div>

      {/* 3. Main Content with Cinematic Entrance */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="text-majestic-100 tracking-[0.2em] text-lg md:text-xl font-semibold uppercase opacity-90">
            A BIG TWENTY-ONE FOR PENG!
          </span>
        </motion.div>

        <div className="font-serif font-bold text-transparent text-white drop-shadow-2xl mb-8 space-y-4">
          <CinematicText
            text="Happy Birthday"
            className="text-6xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <span className="block text-4xl md:text-6xl lg:text-7xl text-gold-400 font-serif italic mt-2">
              My Greatest Adventure
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-10 text-majestic-100 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light tracking-wide"
        >
          A majestic celebration for the person who lights up my universe.
        </motion.p>
      </motion.div>

      {/* 4. Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-majestic-300">Begin the Journey slowly</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-gold-400/0 via-gold-400 to-gold-400/0"
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
