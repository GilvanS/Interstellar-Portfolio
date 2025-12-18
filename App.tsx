
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
  const [density, setDensity] = useState(100);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const bgRef = useRef<Background3DRef>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--val', `${density}%`);
  }, [density]);

  const handleMorph = () => bgRef.current?.morph();
  const handleTogglePause = () => {
    if (bgRef.current) {
      const newState = bgRef.current.togglePause();
      setIsPaused(newState);
    }
  };
  const handleReset = () => bgRef.current?.resetCamera();

  return (
    <div className="relative min-h-screen bg-black">
      <Background3D 
        ref={bgRef} 
        theme="dark" 
        density={density}
        paletteIndex={paletteIndex}
      />
      
      {/* HUD CONTROLS LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[70]">
        
        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => setShowControls(!showControls)}
          className={`absolute top-24 right-8 w-12 h-12 rounded-full glass-panel pointer-events-auto flex items-center justify-center text-white transition-all duration-500 hover:scale-110 active:scale-95 ${showControls ? 'rotate-90 border-primary/50 text-primary' : ''}`}
          title="Configurações Visuais"
        >
          <i className={`fas ${showControls ? 'fa-times' : 'fa-sliders'}`}></i>
        </button>

        {/* PAINEL LATERAL RETRÁTIL */}
        <div className={`absolute top-40 right-8 w-[260px] p-6 glass-panel pointer-events-auto flex flex-col gap-6 transition-all duration-500 ease-out ${showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
          <div>
            <div className="text-[10px] uppercase tracking-[3px] text-slate-400 font-black mb-4 font-display">Neural Core</div>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  id={`theme-${i + 1}`}
                  onClick={() => setPaletteIndex(i)}
                  className={`theme-button ${paletteIndex === i ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider font-display">
              <span>Density Sync</span>
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded font-black">{density}%</span>
            </div>
            <div className="relative pt-1">
              <input 
                type="range" 
                min="30" 
                max="100" 
                step="1"
                value={density}
                onChange={(e) => setDensity(parseInt(e.target.value))}
                className="density-slider"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
             <div className="text-[8px] text-slate-500 font-display tracking-[0.3em] uppercase font-black">Control Protocols</div>
             <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={handleMorph} 
                  className="w-full py-3 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-xl text-[10px] font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-transparent hover:border-primary/30"
                >
                  <i className="fas fa-microchip"></i> Morph Grid
                </button>
                <button 
                  onClick={handleTogglePause} 
                  className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${isPaused ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-transparent text-white hover:bg-white/10'}`}
                >
                  <i className={`fas ${isPaused ? 'fa-play' : 'fa-snowflake'}`}></i> 
                  {isPaused ? 'Resume Motion' : 'Freeze Flux'}
                </button>
                <button 
                  onClick={handleReset} 
                  className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <i className="fas fa-sync-alt"></i> Reset Camera
                </button>
             </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default App;
