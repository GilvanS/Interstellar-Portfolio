
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'FINTECH BANK APP',
    description: 'Plataforma bancária digital completa com foco em segurança transacional, processamento em tempo real e experiência do usuário premium. Desenvolvido com arquitetura escalável.',
    tech: 'REACT / TAILWIND / API',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=500',
    icon: 'fas fa-vault',
    color: 'primary',
    github: 'https://github.com/GilvanS/FintechBankApp',
    demo: '#'
  },
  {
    id: '2',
    title: 'GERADOR DE MASSAS',
    description: 'Framework em Java para criação de dados sintéticos complexos. Desenvolvido para acelerar o ciclo de vida do QA, permitindo testes de carga e estresse com massas realistas e seguras.',
    tech: 'JAVA / AUTOMATION',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=500',
    icon: 'fas fa-microchip',
    color: 'secondary',
    github: 'https://github.com/GilvanS/GERADOR_DE_MASSAS',
    demo: '#'
  },
  {
    id: '3',
    title: 'AUTOMACAO REST API',
    description: 'Solução completa de automação para APIs REST (CMS). Implementação de testes de contrato, funcionalidade e performance, garantindo a integridade dos endpoints e payloads JSON.',
    tech: 'JAVA / REST ASSURED / API',
    image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?auto=format&fit=crop&q=80&w=800&h=500',
    icon: 'fas fa-cloud-rpc',
    color: 'accent',
    github: 'https://github.com/GilvanS/AUTOMACAO-REST-API-cms-for-qas-api',
    demo: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-32">
      <div className="flex items-center gap-6 mb-16">
        <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase">PROJETOS</h3>
        <div className="h-[2px] flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p) => (
          <div key={p.id} className="group relative bg-[#101a2d]/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all hover:bg-[#101a2d]/60 flex flex-col shadow-2xl border border-white/5">
            <div className={`absolute inset-0 bg-${p.color}/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
            
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101a2d]/80 via-transparent to-transparent"></div>
              
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-${p.color} group-hover:scale-110 transition-transform`}>
                <i className={`${p.icon} text-xl`}></i>
              </div>
            </div>
            
            <div className="p-8 space-y-4 flex-grow flex flex-col relative z-10">
              <div className={`inline-block w-fit px-3 py-1 bg-${p.color}/20 border border-${p.color}/40 text-${p.color} font-display font-bold text-[10px] tracking-[0.2em] rounded`}>
                {p.tech}
              </div>
              <h4 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors uppercase">{p.title}</h4>
              <p className="text-slate-200 text-sm leading-relaxed flex-grow">
                {p.description}
              </p>
              
              <div className="flex gap-4 pt-4">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-[10px] font-bold font-display border border-white/20 text-white hover:bg-white/20 text-center rounded-xl transition-all uppercase tracking-widest">
                  <i className="fab fa-github mr-2"></i> Code
                </a>
                <a href={p.demo} className={`flex-1 py-3 text-[10px] font-bold font-display bg-${p.color}/20 border border-${p.color}/40 text-${p.color} hover:bg-${p.color} hover:text-black text-center rounded-xl transition-all uppercase tracking-widest`}>
                  Live Demo <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
