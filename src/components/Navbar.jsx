import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Network', href: '#network' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark py-4 shadow-2xl' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-between md:justify-center">
          
          {/* Mobile Toggle & Desktop Left Spacer */}
          <div className="md:absolute md:left-6 flex-1 flex md:hidden">
            <button
              className="text-white text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-end gap-6 mr-10">
            {navLinks.slice(0, 3).map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ color: '#ffffff' }}
                className="text-zinc-400 hover:text-white text-sm font-medium tracking-wider transition-colors duration-300 uppercase"
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Centered Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center cursor-pointer flex-shrink-0 z-10"
            onClick={() => handleNav('#hero')}
          >
            <div className="font-black text-white text-3xl tracking-widest leading-none">JS TRANSPORT</div>
            <div className="text-gold text-xs tracking-[0.25em] uppercase mt-1 font-medium">Logistics & Freight</div>
          </motion.div>

          <div className="hidden md:flex flex-1 items-center justify-start gap-6 ml-10">
            {navLinks.slice(3).map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ color: '#ffffff' }}
                className="text-zinc-400 hover:text-white text-sm font-medium tracking-wider transition-colors duration-300 uppercase"
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-center text-white text-2xl font-black uppercase hover:text-zinc-400 transition-colors"
                onClick={() => handleNav(link.href)}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
