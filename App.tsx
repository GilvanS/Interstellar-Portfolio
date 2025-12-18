
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
      
      <div className="fixed inset-0 pointer-events-none z-[60]">
        
        <div className="absolute top-24 right-8 w-[240px] p-6 glass-panel pointer-events-auto hidden md:flex flex-col gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[2px] text-slate-400 font-bold mb-4 font-display">Neural Palette</div>
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
              <span>System Density</span>
              <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{density}%</span>
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

          <div className="pt-2 border-t border-white/5 flex flex-col gap-4">
             <div className="text-[8px] text-slate-500 font-display tracking-widest uppercase">Visualization Engine</div>
             
             <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleMorph} 
                  className="py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-bold text-white uppercase tracking-tighter transition-all"
                >
                  Morph
                </button>
                <button onClick={handleReset} className="py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-bold text-white uppercase tracking-tighter transition-all">Reset</button>
             </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
          <button onClick={handleMorph} className="control-button group">
            <i className="fas fa-microchip group-hover:rotate-45 transition-transform"></i>
            <span>Morph</span>
          </button>
          <button onClick={handleTogglePause} className="control-button">
            <i className={`fas ${isPaused ? 'fa-play' : 'fa-snowflake'}`}></i>
            <span>{isPaused ? 'Play' : 'Freeze'}</span>
          </button>
          <button onClick={handleReset} className="control-button">
            <i className="fas fa-sync-alt"></i>
            <span>Reset</span>
          </button>
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
