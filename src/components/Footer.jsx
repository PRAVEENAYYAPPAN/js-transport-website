import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-12 text-center md:text-left mb-16">
          {/* Brand Info */}
          <div className="flex flex-col items-center text-center max-w-sm mx-auto pt-12">
            <div className="font-black text-white text-4xl tracking-wide leading-none mb-1">JS TRANSPORT</div>
            <div className="text-gold text-sm tracking-[0.25em] uppercase mb-6 font-medium">Logistics & Freight</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Four decades of excellence in moving India's cargo. Reliable, trackable, and professional freight solutions.
            </p>
            <div className="flex gap-4 justify-center">
              {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass border border-gold/15 flex items-center justify-center text-white hover:bg-gold/10 hover:border-gold/30 transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap w-full justify-evenly text-center md:text-left">
            {/* Quick Links */}
            <div className="mb-8 w-40">
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'About Us', 'Our Fleet', 'Network', 'Why Choose Us', 'Contact'].map((link, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4, color: '#C8A85C' }}
                    className="block text-gray-500 text-sm hover:text-gold transition-colors duration-300"
                    onClick={() => {
                      const map = { 'Home': '#hero', 'About Us': '#about', 'Our Fleet': '#fleet', 'Network': '#network', 'Why Choose Us': '#why', 'Contact': '#contact' };
                      document.querySelector(map[link])?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <div className="text-white font-bold mb-6 text-lg">Contact</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaPhone className="text-gold flex-shrink-0" />
                  <span>Madhan: +91 96298 12334</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaEnvelope className="text-gold flex-shrink-0" />
                  <span>madhanjasri@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaPhone className="text-gold flex-shrink-0" />
                  <span>Praveen: +91 85088 87988</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaEnvelope className="text-gold flex-shrink-0" />
                  <span>praveenayyappan28@gmail.com</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6 justify-center md:justify-start">
                <motion.a
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(200,168,92,0.3)' }}
                  href="tel:+919629812334"
                  className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold border border-gold/20 hover:bg-gold/25 transition-colors"
                >
                  <FaPhone />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(200,168,92,0.3)' }}
                  href="https://wa.me/919629812334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold border border-gold/20 hover:bg-gold/25 transition-colors"
                >
                  <FaWhatsapp />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-gold/10 flex flex-col items-center justify-center text-center w-full pb-8">
          <p className="text-gray-500 text-sm">
            &copy; {year} JS Transport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
