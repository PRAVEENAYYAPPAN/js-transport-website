import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import contactBg from '../assets/contact_bg.png';

const contacts = [
  {
    name: 'Madhan',
    email: 'madhanjasri@gmail.com',
    phone: '+91 96298 12334',
    whatsapp: '919629812334',
  },
  {
    name: 'Praveen',
    email: 'praveenayyappan28@gmail.com',
    phone: '+91 85088 87988',
    whatsapp: '918508887988',
  },
];

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/praveenayyappan28@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            message: form.message,
            _cc: 'madhanjasri@gmail.com',
            _subject: 'New Transport Enquiry from ' + form.name
        })
      });
      
      setSubmitted(true);
      setForm({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Failed to send enquiry automatically. Please contact us via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="section-bg" style={{ backgroundImage: `url(${contactBg})` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-gold/20"
          >
            <FaPhone className="text-gold" />
            <span className="text-zinc-300 text-sm font-medium tracking-widest uppercase">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            Let's Move <span className="gradient-text">Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Ready to ship? Our team is available 24/7 for pickups, quotations, and freight enquiries.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Side: Contact Cards */}
          <div className="space-y-6">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="glass rounded-3xl p-6 border border-white/10 group transition-all duration-300 hover:border-gold/20"
                whileHover={{ boxShadow: '0 20px 40px rgba(200,168,92,0.08)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-xl font-black text-black">
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{c.name}</div>
                      <div className="text-gray-400 text-sm flex items-center gap-1.5 mt-0.5">
                        <FaEnvelope className="text-gold/60 text-xs" />
                        <span>{c.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <FaPhone className="text-sm text-gold/60" />
                  <span className="font-mono text-lg">{c.phone}</span>
                </div>

                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${c.phone}`}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-black font-bold text-sm text-center flex items-center justify-center gap-2"
                  >
                    <FaPhone /> Call Now
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl glass border border-gold/20 text-white font-semibold text-sm text-center flex items-center justify-center gap-2 hover:border-gold/40 transition-colors"
                  >
                    <FaWhatsapp /> WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            ))}

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="glass rounded-3xl p-6 border border-white/10 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="text-white font-bold mb-1">Based in Tamil Nadu</div>
                <div className="text-gray-400 text-sm leading-relaxed">
                  Serving pan-India routes from Tamil Nadu.<br />
                  Available for pickups across all major cities.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden"
          >
            {/* Form glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/5 blur-3xl" />

            <h3 className="text-2xl font-black text-white mb-2">Send an Enquiry</h3>
            <p className="text-gray-400 text-sm mb-8">Fill in the form and we'll get back to you within the hour.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-4xl mb-4 text-gold"><FaCheckCircle /></div>
                <div className="text-white text-xl font-bold mb-2">Enquiry Sent!</div>
                <div className="text-gray-400">We'll contact you shortly.</div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium mb-2 block uppercase tracking-wider">Message / Requirement</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your freight requirement, pickup location, destination..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? {} : { scale: 1.02, boxShadow: '0 0 30px rgba(200,168,92,0.2)' }}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group ${submitting ? 'bg-gold/50 text-black/50 cursor-not-allowed' : 'bg-gradient-to-r from-gold to-gold-dark text-black'}`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {submitting ? 'Sending...' : 'Submit Enquiry'}
                  </span>
                  {!submitting && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
