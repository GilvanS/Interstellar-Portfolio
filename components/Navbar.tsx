
import React from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050b14]/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-display font-bold tracking-widest text-white group cursor-pointer"
        >
          G. <span className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,195,255,0.8)] transition-all">SOUSA</span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.2em] font-display">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-primary transition-all uppercase">INÍCIO</button>
          <button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-primary transition-all uppercase">SOBRE MIM</button>
          <button onClick={() => scrollToSection('projects')} className="text-slate-400 hover:text-primary transition-all uppercase">PROJETOS</button>
          <button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-primary transition-all uppercase">CONTATO</button>
        </div>
        <button className="md:hidden text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
