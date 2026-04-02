import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTruck, FaMapMarkedAlt, FaBolt, FaHandshake } from 'react-icons/fa';
import whyusBg from '../assets/whyus_bg.png';

const features = [
  {
    icon: FaTruck,
    value: '100+',
    title: 'Vehicles',
    desc: 'A massive fleet of 10-wheel to 16-wheel trucks ready to move your cargo.',
  },
  {
    icon: FaMapMarkedAlt,
    value: 'All India',
    title: 'Coverage',
    desc: 'From Tamil Nadu to every state — we deliver across the entire subcontinent.',
  },
  {
    icon: FaBolt,
    value: '24/7',
    title: 'Fast Pickup',
    desc: 'Round-the-clock pickup and delivery coordination for urgent freight.',
  },
  {
    icon: FaHandshake,
    value: '4+ Dec',
    title: 'Trusted Network',
    desc: 'Over four decades of deep industry relationships and agent partnerships.',
  },
];

export default function WhyUs() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="why" className="section-pad relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="section-bg" style={{ backgroundImage: `url(${whyusBg})` }} />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold/20"
          >
            <FaBolt className="text-gold" />
            <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            The JS <span className="gradient-text">Advantage</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Built on trust. Powered by experience. Driven by commitment.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 50px rgba(200,168,92,0.1)',
                transition: { duration: 0.3 },
              }}
              className="glass rounded-3xl p-8 border border-white/10 hover:border-gold/25 text-center group transition-all duration-300"
            >
              <div className="relative z-10 p-8 flex flex-col items-center text-center">
                <div className="text-4xl text-gold/70 mb-6 transform group-hover:scale-110 group-hover:text-gold transition-all duration-300">
                  <item.icon />
                </div>
                <div className="text-3xl font-black text-white mb-2">{item.value}</div>
                <div className="text-white font-bold text-lg mb-3">{item.title}</div>
                <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
                {/* Hover underline */}
                <div className="mt-5 h-0.5 w-full rounded-full bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="glass rounded-3xl p-10 border border-gold/15 text-center max-w-3xl mx-auto mt-20"
        >
          <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed mb-6 pt-4">
            "From a single truck to a nationwide fleet — JS Transport has been the backbone of reliable 
            logistics in Tamil Nadu for over four decades."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold font-semibold">JS Transport — Since the 1970s</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
