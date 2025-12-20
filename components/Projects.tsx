
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
    gitlab: 'https://gitlab.com/GilvanS/poc-fintech-cypress/-/tree/main',
    demo: '#'
  },
  {
    id: '2',
    title: 'POC FINTECH CYPRESS',
    description: 'Prova de Conceito de automação de testes para aplicação Fintech utilizando Cypress. Foco em testes end-to-end, integração contínua e validação de fluxos críticos de transações bancárias.',
    tech: 'CYPRESS / JAVASCRIPT / E2E',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=500',
    icon: 'fas fa-vial',
    color: 'primary',
    gitlab: 'https://gitlab.com/GilvanS/poc-fintech-cypress/-/tree/main',
    demo: '#'
  },
  {
    id: '3',
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
    id: '4',
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
  // Helpers para mapear as cores das classes do Tailwind
  const colorMap: Record<string, string> = {
    primary: 'text-primary border-primary/40 bg-primary/10',
    secondary: 'text-secondary border-secondary/40 bg-secondary/10',
    accent: 'text-accent border-accent/40 bg-accent/10',
  };

  const buttonColorMap: Record<string, string> = {
    primary: 'bg-primary/20 text-primary border-primary/40 hover:bg-primary hover:text-black',
    secondary: 'bg-secondary/20 text-secondary border-secondary/40 hover:bg-secondary hover:text-black',
    accent: 'bg-accent/20 text-accent border-accent/40 hover:bg-accent hover:text-black',
  };

  return (
    <section id="projects" className="py-12 md:py-24 scroll-mt-20 md:scroll-mt-32 px-4">
      <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-16">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-wider uppercase">PROJETOS</h3>
        <div className="h-[2px] flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {projects.map((p) => (
          <div key={p.id} className="group relative bg-black/95 backdrop-blur-3xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,1)] border border-white/10 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(102,126,234,0.2)]">
            
            {/* Imagem do Projeto com Overlay */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-all duration-500"></div>
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
              
              <div className={`absolute top-6 right-6 w-14 h-14 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl z-30 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(102,126,234,0.4)] group-hover:scale-110 relative`}>
                <i className={`${p.icon} ${p.color === 'primary' ? 'text-primary' : p.color === 'secondary' ? 'text-secondary' : 'text-accent'}`}></i>
                <div className={`absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${p.color === 'primary' ? 'bg-primary/10' : p.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'}`}></div>
              </div>
            </div>
            
            {/* Conteúdo do Card */}
            <div className="p-6 md:p-8 space-y-4 md:space-y-5 flex-grow flex flex-col relative">
              <div className={`inline-block w-fit px-3 md:px-4 py-1 md:py-1.5 rounded-full border font-display font-bold text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] ${colorMap[p.color]}`}>
                {p.tech}
              </div>
              
              <h4 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">
                {p.title}
              </h4>
              
              <p className="text-slate-300 text-sm md:text-base font-body leading-relaxed flex-grow">
                {p.description}
              </p>
              
              {/* Botões de Ação Padronizados */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                {p.github && (
                  <a 
                    href={p.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative flex-1 py-2.5 md:py-3 text-xs md:text-sm font-bold font-display border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 active:scale-95 text-center rounded-lg md:rounded-xl transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(102,126,234,0.4)]"
                  >
                    <i className="fab fa-github text-sm md:text-base"></i> GITHUB
                    <div className="absolute inset-0 bg-primary/10 rounded-lg md:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                )}
                {p.gitlab && (
                  <a 
                    href={p.gitlab} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative flex-1 py-2.5 md:py-3 text-xs md:text-sm font-bold font-display border border-white/10 text-white hover:bg-white/10 hover:border-primary/50 active:scale-95 text-center rounded-lg md:rounded-xl transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(102,126,234,0.4)]"
                  >
                    <i className="fab fa-gitlab text-sm md:text-base"></i> GITLAB
                    <div className="absolute inset-0 bg-primary/10 rounded-lg md:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                )}
                <a 
                  href={p.demo} 
                  className={`flex-1 py-2.5 md:py-3 text-xs md:text-sm font-bold font-display border text-center rounded-lg md:rounded-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 ${buttonColorMap[p.color]}`}
                >
                  DEMO <i className="fas fa-external-link-alt text-xs md:text-sm"></i>
                </a>
              </div>
            </div>

            {/* Brilho sutil no hover - iluminação transparente */}
            <div className={`absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl ${p.color === 'primary' ? 'via-primary/10' : p.color === 'secondary' ? 'via-secondary/10' : 'via-accent/10'}`}></div>
            <div className={`absolute inset-0 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${p.color === 'primary' ? 'bg-primary/5' : p.color === 'secondary' ? 'bg-secondary/5' : 'bg-accent/5'}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
