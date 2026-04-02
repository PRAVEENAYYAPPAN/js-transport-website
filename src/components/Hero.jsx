import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import tnTruckBg from '../assets/tn_truck.png';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background / Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${tnTruckBg})` }}
        />
        {/* Dark overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/85 via-[#000000]/60 to-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-transparent to-[#000000]/70" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-white/10"
        >
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">
            Trusted Since the 1970s
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black leading-none mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <span className="text-white">100+ Trucks.</span>
          <br />
          <span className="gradient-text">One Powerful</span>
          <br />
          <span className="text-white">Network.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-center"
        >
          Delivering reliable transport solutions across{' '}
          <span className="text-white font-semibold">Tamil Nadu</span> and{' '}
          <span className="text-white font-semibold">all over India</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-dark text-black font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold text-lg cursor-pointer glass transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => document.querySelector('#fleet')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Our Fleet
          </motion.button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px glass rounded-2xl overflow-hidden border border-gold/20"
        >
          {[
            { value: '100+', label: 'Trucks' },
            { value: '4+', label: 'Decades' },
            { value: 'All India', label: 'Coverage' },
            { value: '24/7', label: 'Service' },
          ].map((stat, i) => (
            <div key={i} className="py-6 px-4 text-center bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
              <div className="text-zinc-500 text-sm mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
