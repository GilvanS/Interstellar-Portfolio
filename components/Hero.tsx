
import React from 'react';

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 py-12 md:py-20 px-4 relative">
      <div className="lg:w-2/3 space-y-6 md:space-y-10 text-center lg:text-left z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[1.1] text-white tracking-tight uppercase px-2">
          PRECISÃO. <br /> QUALIDADE. <br />
          <span className="text-primary">CONFIABILIDADE.</span>
        </h1>
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-display text-primary tracking-[0.15em] md:tracking-[0.2em] uppercase px-2">
            GILVAN SOUSA — ANALISTA DE TESTES SÊNIOR
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl leading-relaxed mx-auto lg:mx-0 font-body px-2">
            Garantindo a integridade dos sistemas através de testes rigorosos e especialização em meios de pagamento. Onde a qualidade encontra a perfeição técnica.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-2 md:pt-4 px-2">
          <button 
            onClick={scrollToProjects}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-primary text-black font-display font-bold tracking-widest text-[10px] md:text-xs rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(102,126,234,0.4)] flex items-center justify-center gap-2 md:gap-3 cursor-pointer w-full sm:w-auto"
          >
            VER PROJETOS
            <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
      
      <div className="lg:w-1/3 relative hidden lg:block">
        <div className="relative w-full aspect-square max-w-[450px]">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          
          <div className="relative w-full h-full rounded-full border border-white/5 overflow-hidden shadow-[0_0_60px_rgba(102,126,234,0.15)]">
            <img 
              src="/images/nebula.jpg" 
              alt="Interstellar Visualization" 
              className="w-full h-full object-cover opacity-50 mix-blend-lighten scale-110 saturate-50 contrast-125"
              style={{ maskImage: 'radial-gradient(circle, black 35%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 70%)' }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800&h=800";
              }}
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/10 rounded-full animate-[spin_25s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-white/5 rounded-full animate-[spin_35s_linear_infinite_reverse]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
