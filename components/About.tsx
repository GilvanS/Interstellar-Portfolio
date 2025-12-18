
import React from 'react';
import { Skill } from '../types';

const skills: Skill[] = [
  { label: 'AUTOMAÇÃO', value: 'Cypress, Selenium & Appium', icon: 'fas fa-robot', color: 'text-primary' },
  { label: 'MAINFRAME', value: 'Vision Plus & TSO', icon: 'fas fa-terminal', color: 'text-secondary' },
  { label: 'PAGAMENTOS', value: 'ISO 8583 & EMV', icon: 'fas fa-credit-card', color: 'text-accent' },
  { label: 'ESTRATÉGIA', value: 'QA Sênior & Liderança', icon: 'fas fa-chess-knight', color: 'text-green-400' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 scroll-mt-24">
      <div className="p-8 md:p-16 rounded-3xl relative overflow-hidden">
        {/* Glow behind the content instead of a border */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] -z-10 rounded-full"></div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 border border-dashed border-primary/30 rounded-full animate-[spin_25s_linear_infinite]"></div>
              
              <div className="relative w-full h-full rounded-full border-4 border-slate-800 overflow-hidden shadow-[0_0_40px_rgba(0,195,255,0.15)] group-hover:shadow-[0_0_60px_rgba(0,195,255,0.3)] transition-all duration-500 bg-slate-900/80">
                <img 
                  src="/images/profile.jpg" 
                  alt="Gilvan Sousa Profile" 
                  className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110 brightness-110 contrast-125 saturate-[1.1]"
                  onError={(e) => {
                    e.currentTarget.src = "https://github.com/Gilvan-Sousa.png";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(0,195,255,0.8)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>
              </div>
              
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-950 border border-primary/40 px-6 py-2 rounded-full whitespace-nowrap shadow-xl z-30">
                <span className="text-primary font-display text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  QA SENIOR PILOT
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                Gilvan <span className="text-primary">Sousa</span>
              </h2>
              <div className="h-1 w-24 bg-primary rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-slate-50 text-lg md:text-xl font-body leading-relaxed">
              <p>
                Sou <span className="text-white font-bold">Analista de Testes Sênior há 8 anos</span>, especialista em <span className="text-primary font-bold underline underline-offset-4 decoration-primary/50">Quality Assurance</span> focado em ecossistemas de <span className="text-white font-black">Meios de Pagamento e Varejo</span>.
              </p>
              
              <p className="text-slate-100 text-base md:text-lg font-medium">
                Minha expertise abrange todo o ciclo de vida do software, desde testes manuais até arquiteturas complexas de automação Web/Mobile e core bancário em Mainframe (Vision Plus). Minha missão é garantir que cada linha de código resista aos testes mais rigorosos antes de chegar ao usuário final.
              </p>
            </div>

            <div className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4 backdrop-blur-md shadow-2xl">
              <h4 className="text-accent font-display text-[11px] tracking-[0.4em] uppercase font-black opacity-100">Core Especializado</h4>
              <p className="text-white text-base font-body leading-relaxed">
                Domínio profundo de <span className="text-white font-black border-b border-accent/50">Vision Plus (Mainframe/Mocha)</span> e injeção transacional <span className="text-white font-black border-b border-accent/50">ISO 8583</span>. Experiência sólida em validação de fluxos financeiros críticos.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all group hover:-translate-y-1 backdrop-blur-sm">
                  <div className={`${skill.color} text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                    <i className={skill.icon}></i>
                  </div>
                  <div className="text-[9px] text-slate-400 font-display font-bold tracking-widest mb-1 uppercase">
                    {skill.label}
                  </div>
                  <div className="text-white font-bold text-xs font-body">
                    {skill.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
