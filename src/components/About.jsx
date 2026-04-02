import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutBg from '../assets/about_bg.png';

const milestones = [
  { year: '1970s', title: 'The Beginning', desc: 'Founded with a single truck and a vision to connect Tamil Nadu.' },
  { year: '1990s', title: 'Growing Fleet', desc: 'Expanded operations across South India with a growing fleet of vehicles.' },
  { year: '2000s', title: 'Pan-India Reach', desc: 'Established routes across India, building a robust logistics network.' },
  { year: 'Today', title: 'Legacy of Trust', desc: '100+ trucks, pan-India coverage, and decades of reliable service.' },
];

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="section-bg" style={{ backgroundImage: `url(${aboutBg})` }} />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center gap-16">
          {/* Top: Text */}
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">Our Story</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-white">4+ Decades of </span>
                <span className="gradient-text">Delivering</span>
                <br />
                <span className="text-white">Excellence</span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                JS Transport was born in the <span className="text-white font-semibold">1970s</span> with a humble beginning — 
                one truck, one driver, and one dream. Today, we stand as a testimony to what{' '}
                <span className="text-white font-semibold">decades of trust and hard work</span> can build.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-gray-400 leading-relaxed mb-12">
                From a small family-run operation to a large-scale transport network spanning all of India, 
                our journey reflects the spirit of resilience. With roots in Tamil Nadu and routes across the 
                nation, we've built more than a business — we've built{' '}
                <span className="text-white font-medium">a legacy of reliability</span>.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '4+', label: 'Decades' },
                  { val: '100+', label: 'Trucks' },
                  { val: 'All India', label: 'Network' },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center border border-gold/15 hover:border-gold/40 transition-all duration-300 animate-border-glow">
                    <div className="text-2xl font-black text-white">{item.val}</div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Bottom: Timeline (Centered Variant) */}
          <div className="relative w-full max-w-lg mx-auto">
            {/* Vertical line centered */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className={`flex items-center w-full gap-4 md:gap-8 relative flex-row ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    
                    {/* Empty block for spacing alignment */}
                    <div className="flex-1 hidden md:block"></div>

                    {/* Dot Center */}
                    <div className="relative z-10 flex-shrink-0 absolute left-6 -translate-x-1/2 md:static md:translate-x-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full glass border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-all duration-300">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`glass rounded-2xl p-6 flex-1 text-left border border-white/10 transition-all duration-300 hover:bg-white/5 shadow-lg relative ml-12 md:ml-0 ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                      <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">{m.year}</div>
                      <div className="text-white font-bold text-lg mb-2">{m.title}</div>
                      <div className="text-gray-400 text-sm leading-relaxed">{m.desc}</div>
                    </div>

                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
