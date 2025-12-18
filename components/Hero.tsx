
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
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] hologram-text tracking-tight uppercase">
          Precision. <br /> Quality. <br />
          Reliability.
        </h1>
        <div className="space-y-4">
          <h2 className="text-lg md:text-2xl font-display text-primary tracking-[0.2em] uppercase">
            GILVAN SOUSA — ANALISTA DE TESTES SÊNIOR
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-body">
            Garantindo a integridade dos sistemas através de testes rigorosos e especialização em meios de pagamento. Onde a qualidade encontra a perfeição técnica.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
          <button 
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-primary/10 border border-primary text-primary font-display font-bold tracking-widest text-xs overflow-hidden transition-all hover:bg-primary hover:text-black cursor-pointer"
          >
            VER PROJETOS
            <span className="ml-3 material-symbols-outlined align-middle text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
          </button>
          
          <a 
            href="./Gilvan_Sousa_QA_Resume.pdf" 
            download="Gilvan_Sousa_QA_Resume.pdf"
            className="px-8 py-4 border border-secondary/40 text-secondary font-display font-bold tracking-widest text-xs hover:bg-secondary hover:text-black transition-all flex items-center gap-2 cursor-pointer"
          >
            BAIXAR CURRÍCULO
            <span className="material-symbols-outlined text-sm">download</span>
          </a>
        </div>
      </div>
      
      <div className="lg:w-1/3 relative hidden lg:block">
        <div className="relative w-full aspect-square max-w-[450px]">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          
          <div className="relative w-full h-full rounded-full border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,195,255,0.2)]">
            <img 
              src="/images/nebula.jpg" 
              alt="Interstellar Visualization" 
              className="w-full h-full object-cover opacity-80 mix-blend-screen scale-110"
              style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 75%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 75%)' }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800&h=800";
              }}
            />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(0,195,255,0.8)] animate-[scan_4s_ease-in-out_infinite] z-20"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] border border-primary/5 rounded-full opacity-10 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
