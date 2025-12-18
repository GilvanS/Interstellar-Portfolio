
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
    <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-12 py-20 relative">
      <div className="lg:w-2/3 space-y-10 text-center lg:text-left z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] text-white tracking-tight uppercase">
          PRECISÃO. <br /> QUALIDADE. <br />
          <span className="text-primary">CONFIABILIDADE.</span>
        </h1>
        <div className="space-y-4">
          <h2 className="text-lg md:text-2xl font-display text-primary tracking-[0.2em] uppercase">
            GILVAN SOUSA — SENIOR QA ENGINEER
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed mx-auto lg:mx-0 font-body">
            Garantindo a integridade dos sistemas através de testes rigorosos e especialização em meios de pagamento. Onde a qualidade encontra a perfeição técnica.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
          <button 
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-primary text-black font-display font-bold tracking-widest text-xs rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(102,126,234,0.4)] flex items-center gap-3 cursor-pointer"
          >
            VER PROJETOS
            <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <a 
            href="./Gilvan_Sousa_QA_Resume.pdf" 
            download="Gilvan_Sousa_QA_Resume.pdf"
            className="px-8 py-4 border border-secondary/60 text-secondary font-display font-bold tracking-widest text-xs rounded-full hover:bg-secondary hover:text-black transition-all flex items-center gap-3 cursor-pointer"
          >
            BAIXAR CURRÍCULO
            <i className="fas fa-download"></i>
          </a>
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
