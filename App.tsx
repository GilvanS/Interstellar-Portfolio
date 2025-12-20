
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalaxyBackground, { GalaxyBackgroundRef } from './components/GalaxyBackground';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const galaxyRef = useRef<GalaxyBackgroundRef>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegenerate = () => galaxyRef.current?.regenerate();
  const handleTogglePause = () => {
    if (galaxyRef.current) {
      const newState = galaxyRef.current.togglePause();
      setIsPaused(newState);
    }
  };
  const handleReset = () => galaxyRef.current?.resetCamera();

  return (
    <div className="relative min-h-screen bg-black">
      <GalaxyBackground 
        ref={galaxyRef}
        count={100000}
        size={0.01}
        radius={2.15}
        branches={3}
        spin={3}
        randomness={5}
        randomnessPower={4}
        insideColor="#ff6030"
        outsideColor="#0949f0"
      />
      
      {/* HUD CONTROLS LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[70]">
        
        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => setShowControls(!showControls)}
          className={`absolute top-20 md:top-24 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel pointer-events-auto flex items-center justify-center text-white transition-all duration-500 hover:scale-110 active:scale-95 ${showControls ? 'rotate-90 border-primary/50 text-primary' : ''}`}
          title="Configurações Visuais"
        >
          <i className={`fas ${showControls ? 'fa-times' : 'fa-sliders'} text-sm md:text-base`}></i>
        </button>

        {/* PAINEL LATERAL RETRÁTIL */}
        <div className={`absolute top-32 md:top-40 right-4 md:right-8 w-[calc(100vw-2rem)] max-w-[280px] md:w-[260px] p-4 md:p-6 glass-panel pointer-events-auto flex flex-col gap-4 md:gap-6 transition-all duration-500 ease-out ${showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full md:translate-x-12 pointer-events-none'}`}>
          <div>
            <div className="text-xs md:text-sm uppercase tracking-[3px] text-slate-400 font-black mb-4 font-display">Galaxy Control</div>
            <p className="text-xs text-slate-500 mb-4">Animações de galáxia em tempo real</p>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
             <div className="text-xs md:text-sm text-slate-500 font-display tracking-[0.3em] uppercase font-black">Control Protocols</div>
             <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={handleRegenerate} 
                  className="w-full py-3 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-xl text-xs md:text-sm font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-transparent hover:border-primary/30"
                >
                  <i className="fas fa-redo"></i> Regenerate Galaxy
                </button>
                <button 
                  onClick={handleTogglePause} 
                  className={`w-full py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${isPaused ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-transparent text-white hover:bg-white/10'}`}
                >
                  <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i> 
                  {isPaused ? 'Resume Motion' : 'Pause Motion'}
                </button>
                <button 
                  onClick={handleReset} 
                  className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs md:text-sm font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i> Reset Camera
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-x-hidden w-full">
        <Navbar scrolled={scrolled} />
        <main className="container mx-auto px-3 sm:px-4 max-w-7xl pt-16 md:pt-20 w-full overflow-x-hidden">
          <Hero />
          <About />
          <Technologies />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;
