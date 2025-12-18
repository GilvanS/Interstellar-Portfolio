
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D, { Background3DRef } from './components/Background3D';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const bgRef = useRef<Background3DRef>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMorph = () => bgRef.current?.morph();
  const handleTogglePause = () => {
    if (bgRef.current) setIsPaused(bgRef.current.togglePause());
  };
  const handleReset = () => bgRef.current?.resetCamera();

  return (
    <div className="relative min-h-screen bg-[#050b14] overflow-x-hidden">
      {/* Complete Quantum Background */}
      <Background3D ref={bgRef} />
      
      {/* Main Content Overlay */}
      <div className="relative z-10">
        <Navbar scrolled={scrolled} />
        <main className="container mx-auto px-4 max-w-7xl pt-20">
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>

      {/* Quantum Control Panel */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-2 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        <button 
          onClick={handleMorph}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all hover:scale-110 active:scale-95 group"
          title="Morph Formation"
        >
          <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">memory</span>
        </button>
        <button 
          onClick={handleTogglePause}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all hover:scale-110 active:scale-95"
          title={isPaused ? "Play" : "Freeze"}
        >
          <span className="material-symbols-outlined">{isPaused ? 'play_arrow' : 'ac_unit'}</span>
        </button>
        <button 
          onClick={handleReset}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all hover:scale-110 active:scale-95"
          title="Reset Camera"
        >
          <span className="material-symbols-outlined">restart_alt</span>
        </button>
      </div>

      <style>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(0, 195, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 195, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }
      `}</style>
    </div>
  );
};

export default App;
