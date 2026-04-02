import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTruck, FaTruckMoving, FaTruckLoading } from 'react-icons/fa';
import fleetBg from '../assets/fleet_bg.png';

const trucks = [
  {
    type: '10 Wheel Truck',
    icon: FaTruck,
    capacity: 'Up to 16 Tons',
    usage: 'Consumer Goods, FMCG, Retail Cargo',
    glowColor: 'rgba(200,168,92,0.15)',
    features: ['City Delivery', 'Inter-district', 'Flexible Routes'],
  },
  {
    type: '12 Wheel Truck',
    icon: FaTruckMoving,
    capacity: 'Up to 25 Tons',
    usage: 'Industrial Goods, Machinery, Raw Materials',
    glowColor: 'rgba(200,168,92,0.1)',
    features: ['Heavy Cargo', 'All India Routes', 'Long Haul'],
  },
  {
    type: '14 / 16 Wheel',
    icon: FaTruckLoading,
    capacity: 'Up to 40 Tons',
    usage: 'Steel, Cement, Heavy Equipment',
    glowColor: 'rgba(200,168,92,0.2)',
    featured: true,
    features: ['Super Heavy Haul', 'Port & Factory', 'Pan-India'],
  },
];

function TruckCard({ truck, index }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${truck.glowColor}, 0 0 30px ${truck.glowColor}`,
        transition: { duration: 0.3 },
      }}
      className={`relative glass rounded-3xl p-8 border transition-all duration-300 cursor-default group ${
        truck.featured
          ? 'border-gold/30 bg-gradient-to-b from-gold/5 to-transparent'
          : 'border-white/5 hover:border-gold/20'
      }`}
    >
      {truck.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold to-gold-dark text-black text-xs font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{truck.type}</h3>
          <div className="text-zinc-400 text-sm">{truck.capacity}</div>
        </div>
        <div className="text-3xl text-gold/80 group-hover:text-gold group-hover:scale-110 transition-all duration-300">
          <truck.icon />
        </div>
      </div>

      <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">{truck.usage}</p>

      <div className="space-y-2">
        {truck.features.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gray-300 text-sm">{f}</span>
          </div>
        ))}
      </div>

      {/* Bottom shimmer bar */}
      <div className="mt-6 h-1 rounded-full bg-gradient-to-r from-gold/40 to-gold-dark/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function Fleet() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="fleet" className="section-pad relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="section-bg" style={{ backgroundImage: `url(${fleetBg})` }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold/20"
          >
            <FaTruck className="text-gold" />
            <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">Our Fleet</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            Built for Every <span className="gradient-text">Scale</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            From light cargo to heavy industrial loads — we have the right truck for every job.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trucks.map((truck, i) => (
            <TruckCard key={i} truck={truck} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-block glass rounded-2xl px-8 py-4 border border-gold/15 text-gray-300">
            All vehicles are GPS-tracked •{' '}
            <span className="text-gold">Experienced drivers</span> •{' '}
            Fully insured cargo
          </div>
        </motion.div>
      </div>
    </section>
  );
}
