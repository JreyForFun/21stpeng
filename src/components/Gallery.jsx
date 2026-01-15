import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

const memories = [
  {
    id: 1,
    src: '../src/assets/images/gallery-1.jpg',
    story: 'The First Spark',
    description: 'Syempre tayo muna ako gumawa neto e. Remember this image? Damned this is the exact moment that i have got a feeling that this is the time i should confess to you, but bro you are giving me mix signals. Time seemed to slow down, and I knew something special was about to begin. Your body signals lit it up.',
  },
  {
    id: 2,
    src: '../src/assets/images/gallery-2.jpg',
    story: 'The Day?',
    description: 'Remember this pic? This is our 4th time for a week going back again and again sa puro. Then you keep saying na ayaw mo sa puro duh. Anyways, yeah this is THE DAY na I GOT TO CONFESS TO YOU. Both of us got silent and awkward but after this day grabe na progress natin in our patago gala and relationship WAAAAHaaaahhh.',
  },
  {
    id: 3,
    src: '../src/assets/images/gallery-3.jpg',
    story: 'I dunno what to put na sa title basta last na2',
    description: 'Just want to say damn as the day goes my love goes deeper. Our Journey sometimes it might feel a little bit bitter but thats part of it. Sounds cringe right pake ko sakanila. Your laughter is my favorite sound in the world. The way you find humor in everything, even my terrible jokes, makes every day brighter.',
  },
  {
    id: 4,
    src: '../src/assets/images/gallery-4.jpg',
    story: 'Little Peng!',
    description: 'Ang bata bata mo po dito oh, model ka pa ng place nato oh. Ang innocente na cute and soaper soft kapa tingnan dito love, ngayon ganon parin lumaki lang dumagdag ng konti.',
  },
  {
    id: 5,
    src: '../src/assets/images/gallery-5.jpg',
    story: '21st Peng??',
    description: 'As you turn 21, I want you to know that this is just the beginning. More business to come pa to us kaya wag a-accept ng negashits i\'m always here baby. Also, I can\'t wait to create countless more memories with you. Happy Birthday, my love! 💕',
  },
];

const TimelineItem = ({ memory, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 relative"
    >
      {/* Picture on Left, Story on Right */}
      {isEven ? (
        <>
          {/* Picture (Left Side) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full md:w-[45%] flex justify-end"
          >
            <div className="bg-white p-3 pb-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 w-full">
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden mb-4">
                <img
                  src={memory.src}
                  alt={memory.story}
                  className="w-full h-full object-cover filter contrast-[1.1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none"></div>
              </div>
              <p className="font-serif text-center text-gray-600 text-lg italic">
                {memory.story}
              </p>
            </div>
          </motion.div>

          {/* Story (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="w-full md:w-[45%] text-left pl-8"
          >
            <div className="relative">
              <h3 className="font-serif text-4xl text-gold-400 mb-4">{memory.story}</h3>
              <p className="text-majestic-100 text-lg leading-relaxed font-light">
                {memory.description}
              </p>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Story on Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="w-full md:w-[45%] text-right pr-8 lg:pr-12"
          >
            <div className="relative">
              <h3 className="font-serif text-4xl text-gold-400 mb-4">{memory.story}</h3>
              <p className="text-majestic-100 text-lg leading-relaxed font-light">
                {memory.description}
              </p>
            </div>
          </motion.div>

          {/* Picture on Right */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full md:w-[45%] flex justify-start"
          >
            <div className="bg-white p-3 pb-8 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 w-full">
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden mb-4">
                <img
                  src={memory.src}
                  alt={memory.story}
                  className="w-full h-full object-cover filter contrast-[1.1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none"></div>
              </div>
              <p className="font-serif text-center text-gray-600 text-lg italic">
                {memory.story}
              </p>
            </div>
          </motion.div>
        </>
      )}

      {/* Timeline Dot (Center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gold-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)] z-20 hidden md:block ring-4 ring-majestic-900"></div>
    </motion.div>
  );
};


const Gallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 px-4 md:px-8 bg-majestic-900 overflow-hidden">

      {/* Central Timeline Line - Starts below header */}
      <div className="absolute top-[250px] bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent z-0 hidden md:block"></div>

      {/* Animated Thread Progress - Starts below header */}
      <motion.div
        style={{ scaleY: pathLength, transformOrigin: 'top' }}
        className="absolute top-[250px] bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-gold-500 via-gold-300 to-transparent z-0 shadow-[0_0_15px_rgba(255,215,0,0.5)] hidden md:block"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-gold-500 mb-6 drop-shadow-md"
          >
            Quite A Journey
          </motion.h2>
          <p className="text-majestic-200 text-lg font-light">
            Some chapters of our beautiful journey together...
          </p>
        </div>

        <div className="flex flex-col">
          {memories.map((memory, i) => (
            <TimelineItem key={memory.id} memory={memory} index={i} />
          ))}
        </div>

        {/* End Quote */}
        <div className="text-center mt-16">
          <p className="font-serif text-3xl text-gold-400 italic">"And many more chapters to write..."</p>
        </div>
      </div>

    </section>
  );
};

export default Gallery;
