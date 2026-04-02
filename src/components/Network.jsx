import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGlobeAsia, FaMapMarkedAlt, FaRoute, FaShippingFast, FaHandshake } from 'react-icons/fa';
import networkBg from '../assets/network_bg.png';

// Detailed India map outline (simplified but accurate)
const indiaPath = "M 250 52 L 260 48 L 275 50 L 290 55 L 305 58 L 318 62 L 330 68 L 345 72 L 358 78 L 370 85 L 380 92 L 388 100 L 395 110 L 400 122 L 403 135 L 400 148 L 405 160 L 410 175 L 415 188 L 418 200 L 420 215 L 422 228 L 420 242 L 418 255 L 422 268 L 418 280 L 412 295 L 405 308 L 398 318 L 390 328 L 382 340 L 375 350 L 368 358 L 358 368 L 348 378 L 338 385 L 328 392 L 320 398 L 314 408 L 308 418 L 304 430 L 300 442 L 296 455 L 292 468 L 288 478 L 283 488 L 278 496 L 274 502 L 268 496 L 262 486 L 256 475 L 250 462 L 245 450 L 240 438 L 236 425 L 232 412 L 228 400 L 224 388 L 218 375 L 212 362 L 206 348 L 200 335 L 195 320 L 190 305 L 185 290 L 180 275 L 176 260 L 172 245 L 168 230 L 162 215 L 158 200 L 154 185 L 150 170 L 148 155 L 146 140 L 148 125 L 152 112 L 158 100 L 166 90 L 176 82 L 188 72 L 200 62 L 215 55 L 232 50 Z";

// Tamil Nadu state path (detailed)
const tamilNaduPath = "M 235 405 L 245 398 L 258 396 L 270 398 L 282 402 L 294 412 L 304 424 L 310 438 L 312 452 L 308 466 L 302 478 L 294 488 L 286 496 L 278 500 L 270 498 L 262 490 L 254 480 L 246 468 L 240 455 L 236 442 L 234 428 L 233 415 Z";

// Key states outlines (simplified boundaries)
const statesPaths = {
  karnataka: "M 215 348 L 235 345 L 258 348 L 270 358 L 278 370 L 282 385 L 275 398 L 258 396 L 245 398 L 235 405 L 228 400 L 224 388 L 218 375 L 212 362 Z",
  kerala: "M 224 388 L 235 405 L 233 428 L 234 442 L 228 455 L 220 445 L 215 430 L 212 415 L 215 400 Z",
  andhraPradesh: "M 278 320 L 305 315 L 328 320 L 338 335 L 340 350 L 335 365 L 320 375 L 304 380 L 290 385 L 282 402 L 270 398 L 258 396 L 270 358 L 278 345 Z",
  telangana: "M 258 290 L 278 285 L 300 288 L 318 292 L 328 305 L 328 320 L 305 315 L 278 320 L 268 310 Z",
  maharashtra: "M 168 230 L 190 225 L 215 228 L 240 235 L 258 248 L 268 265 L 268 285 L 258 290 L 240 288 L 218 285 L 200 278 L 185 268 L 175 252 Z",
  gujarat: "M 140 165 L 158 168 L 172 180 L 172 200 L 168 230 L 155 225 L 142 215 L 132 200 L 130 185 L 135 172 Z",
  rajasthan: "M 158 100 L 180 108 L 200 118 L 218 128 L 230 142 L 235 160 L 230 178 L 218 190 L 200 195 L 182 198 L 168 195 L 155 188 L 148 175 L 148 155 L 150 135 L 152 120 Z",
  madhyaPradesh: "M 200 195 L 218 190 L 235 200 L 255 210 L 275 215 L 282 232 L 275 250 L 260 260 L 240 258 L 218 252 L 200 245 L 190 230 L 190 212 Z",
  delhi: "M 228 118 L 235 115 L 242 118 L 245 125 L 242 132 L 235 135 L 228 132 L 225 125 Z",
  westBengal: "M 360 195 L 375 200 L 385 218 L 388 238 L 382 258 L 372 270 L 358 260 L 350 245 L 348 228 L 352 210 Z",
  odisha: "M 338 270 L 358 260 L 372 270 L 378 285 L 375 300 L 365 312 L 350 318 L 338 315 L 330 300 L 332 285 Z",
};

// Route data: from Tamil Nadu hub to major cities
const routes = [
  { id: 'tn-mum', path: "M 275 450 Q 220 380 180 300 Q 160 250 155 200", delay: 0, label: 'Mumbai' },
  { id: 'tn-del', path: "M 280 445 Q 265 370 250 290 Q 240 220 235 125", delay: 0.4, label: 'Delhi' },
  { id: 'tn-kol', path: "M 290 440 Q 330 380 355 310 Q 368 270 370 225", delay: 0.8, label: 'Kolkata' },
  { id: 'tn-hyd', path: "M 278 430 Q 290 390 298 355 Q 306 330 310 310", delay: 0.3, label: 'Hyderabad' },
  { id: 'tn-blr', path: "M 265 425 Q 260 405 255 385 Q 252 375 250 365", delay: 0.15, label: 'Bangalore' },
  { id: 'tn-ahm', path: "M 270 445 Q 210 370 175 280 Q 155 230 145 185", delay: 0.6, label: 'Ahmedabad' },
];

// City markers
const cities = [
  { name: 'Chennai', x: 306, y: 420, major: true, tn: true },
  { name: 'Coimbatore', x: 252, y: 445, major: false, tn: true },
  { name: 'Madurai', x: 272, y: 478, major: false, tn: true },
  { name: 'Mumbai', x: 155, y: 200, major: true, tn: false },
  { name: 'Delhi', x: 235, y: 122, major: true, tn: false },
  { name: 'Kolkata', x: 370, y: 222, major: true, tn: false },
  { name: 'Hyderabad', x: 300, y: 310, major: true, tn: false },
  { name: 'Bangalore', x: 255, y: 370, major: true, tn: false },
  { name: 'Ahmedabad', x: 148, y: 188, major: false, tn: false },
  { name: 'Pune', x: 172, y: 240, major: false, tn: false },
  { name: 'Jaipur', x: 205, y: 148, major: false, tn: false },
  { name: 'Lucknow', x: 278, y: 155, major: false, tn: false },
  { name: 'Bhubaneswar', x: 365, y: 290, major: false, tn: false },
];

export default function Network() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), 300);
      return () => clearTimeout(t);
    } else {
      setAnimated(false);
    }
  }, [inView]);

  return (
    <section id="network" className="section-pad relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="section-bg" style={{ backgroundImage: `url(${networkBg})` }} />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold/20"
          >
            <FaGlobeAsia className="text-gold" />
            <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">Our Network</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            <span className="gradient-text">Pan-India</span> Coverage
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Strong transport network across Tamil Nadu with pan-India delivery capability.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-6 border border-gold/15 relative overflow-hidden">
              {/* Map glow background */}
              <div className="absolute inset-0 rounded-3xl opacity-20"
                style={{ background: 'radial-gradient(circle at 55% 80%, rgba(200,168,92,0.25), transparent 70%)' }}
              />

              <svg
                viewBox="0 0 530 560"
                className="w-full max-w-md mx-auto"
                style={{ filter: 'drop-shadow(0 0 2px rgba(200,168,92,0.3))' }}
              >
                {/* India outline */}
                <path
                  d={indiaPath}
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* State regions - subtle fills */}
                {Object.entries(statesPaths).map(([name, path]) => (
                  <motion.path
                    key={name}
                    d={path}
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={animated ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ fill: 'rgba(200,168,92,0.08)', stroke: 'rgba(200,168,92,0.3)' }}
                  />
                ))}

                {/* Tamil Nadu - HIGHLIGHTED */}
                <motion.path
                  d={tamilNaduPath}
                  fill="rgba(200,168,92,0.15)"
                  stroke="#C8A85C"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={animated ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(200,168,92,0.5))' }}
                />

                {/* "TAMIL NADU" label */}
                {animated && (
                  <motion.text
                    x={260}
                    y={450}
                    fill="#C8A85C"
                    fontSize="7"
                    fontFamily="Poppins, sans-serif"
                    fontWeight="700"
                    textAnchor="middle"
                    letterSpacing="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    TAMIL NADU
                  </motion.text>
                )}

                {/* Route lines (animated) */}
                {animated && routes.map((route) => (
                  <motion.path
                    key={route.id}
                    d={route.path}
                    fill="none"
                    stroke="rgba(200,168,92,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: route.delay, ease: 'easeInOut' }}
                  />
                ))}

                {/* City dots */}
                {cities.map((city, i) => (
                  <g key={i}>
                    {/* Ping ring */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.major ? 8 : 5}
                      fill="transparent"
                      stroke={city.tn ? '#C8A85C' : 'rgba(255,255,255,0.4)'}
                      strokeWidth="1"
                      opacity="0.5"
                      style={animated ? {
                        animation: `mapPing 2.5s ${i * 0.25}s infinite`,
                      } : {}}
                    />
                    {/* Dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.tn ? 4 : city.major ? 3.5 : 2}
                      fill={city.tn ? '#C8A85C' : city.major ? '#ffffff' : '#a1a1aa'}
                      style={{ filter: `drop-shadow(0 0 ${city.tn ? '6px rgba(200,168,92,0.7)' : '3px rgba(255,255,255,0.3)'})` }}
                    />
                    {/* Label */}
                    {(city.major || city.tn) && (
                      <text
                        x={city.x + (city.x > 300 ? -8 : 8)}
                        y={city.y + (city.y > 400 ? -8 : 4)}
                        fill={city.tn ? '#C8A85C' : 'rgba(255,255,255,0.6)'}
                        fontSize={city.tn ? '8' : '7'}
                        fontFamily="Poppins, sans-serif"
                        fontWeight={city.tn ? '700' : '500'}
                        textAnchor={city.x > 300 ? 'end' : 'start'}
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="flex gap-6 justify-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold" style={{ boxShadow: '0 0 6px #C8A85C' }} />
                  <span className="text-gray-400 text-xs">Tamil Nadu Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span className="text-gray-400 text-xs">Major Cities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gold/50 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8A85C 0, #C8A85C 4px, transparent 4px, transparent 7px)' }} />
                  <span className="text-gray-400 text-xs">Routes</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features / Right Side */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: FaMapMarkedAlt,
                title: 'Tamil Nadu Coverage',
                desc: 'Complete coverage of all major districts — Chennai, Coimbatore, Madurai, Trichy, Salem.',
              },
              {
                icon: FaRoute,
                title: 'Pan-India Delivery',
                desc: 'Regular freight routes to Mumbai, Delhi, Kolkata, Hyderabad, Bangalore.',
              },
              {
                icon: FaShippingFast,
                title: 'Express Service',
                desc: 'Choose from express same-day dispatch or economical scheduled service.',
              },
              {
                icon: FaHandshake,
                title: 'Agent Network',
                desc: 'Decades-strong agent partnerships across India ensure reliability.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ boxShadow: '0 10px 30px rgba(200,168,92,0.08)', transition: { duration: 0.3 } }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-gold/20 transition-colors duration-300"
              >
                <div className="text-2xl text-gold/80 mb-4"><item.icon /></div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
