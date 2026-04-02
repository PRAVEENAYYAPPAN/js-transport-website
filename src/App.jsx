import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Fleet from './components/Fleet';
import Network from './components/Network';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />
      <Hero />
      <About />
      <Fleet />
      <Network />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
