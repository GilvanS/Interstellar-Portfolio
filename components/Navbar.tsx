
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050508]/80 backdrop-blur-md py-3 border-b border-white/5 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        
        {/* LOGO */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-display font-bold tracking-widest text-white group cursor-pointer flex-shrink-0"
        >
          Gilvan <span className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(102,126,234,0.8)] transition-all">Sousa</span>
        </div>
        
        {/* NAV LINKS (CENTER) */}
        <div className="hidden lg:flex gap-10 text-[11px] font-bold tracking-[0.25em] font-display">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white hover:text-primary transition-all uppercase">INÍCIO</button>
          <button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-primary transition-all uppercase">SOBRE MIM</button>
          <button onClick={() => scrollToSection('projects')} className="text-slate-400 hover:text-primary transition-all uppercase">PROJETOS</button>
          <button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-primary transition-all uppercase">CONTATO</button>
        </div>

        {/* SOCIAL LINKS (RIGHT) */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/GilvanS" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all">
            <i className="fab fa-github text-xl"></i>
          </a>
          <button className="lg:hidden text-white">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
