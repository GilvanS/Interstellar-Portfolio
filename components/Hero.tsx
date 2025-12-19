
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
    <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 py-8 md:py-12 lg:py-20 px-3 sm:px-4 relative overflow-x-hidden w-full">
      <div className="w-full lg:w-2/3 space-y-4 md:space-y-6 lg:space-y-10 text-center lg:text-left z-10 max-w-full">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-black leading-[1.15] text-white tracking-normal sm:tracking-tight uppercase break-words overflow-wrap-anywhere w-full">
          <span className="block">PRECISÃO.</span>
          <span className="block">QUALIDADE.</span>
          <span className="block text-primary">CONFIABILIDADE.</span>
        </h1>
        <div className="space-y-2 md:space-y-3 lg:space-y-4 w-full">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-display text-primary tracking-[0.05em] sm:tracking-[0.08em] md:tracking-[0.12em] lg:tracking-[0.15em] xl:tracking-[0.2em] uppercase break-words overflow-wrap-anywhere w-full">
            GILVAN SOUSA — ANALISTA DE TESTES SÊNIOR
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-2xl leading-relaxed mx-auto lg:mx-0 font-body break-words overflow-wrap-anywhere w-full">
            Garantindo a integridade dos sistemas através de testes rigorosos e especialização em meios de pagamento. Onde a qualidade encontra a perfeição técnica.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4 w-full">
          <button 
            onClick={scrollToProjects}
            className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-primary text-black font-display font-bold tracking-widest text-xs sm:text-sm md:text-base rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(102,126,234,0.4)] flex items-center justify-center gap-2 md:gap-3 cursor-pointer w-full sm:w-auto"
          >
            VER PROJETOS
            <i className="fas fa-chevron-right text-xs sm:text-sm group-hover:translate-x-1 transition-transform"></i>
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
