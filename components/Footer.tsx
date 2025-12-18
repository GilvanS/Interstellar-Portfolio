
import React from 'react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-24 pt-16 pb-12 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-display font-bold tracking-widest text-white mb-6">
            Gilvan <span className="text-primary">Sousa</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-8">
            Elevando os padrões de qualidade e garantindo a excelência em cada entrega digital. Focado em automação, performance e segurança.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/GilvanS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/40 border border-white/10 transition-all">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/40 border border-white/10 transition-all">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://wa.me/5511982371339" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900/50 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/40 border border-white/10 transition-all">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-[11px] tracking-[0.2em] mb-8 uppercase">Navegação</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => scrollToSection('top')} className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase text-left">Início</button></li>
            <li><button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase text-left">Sobre Mim</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase text-left">PROJETOS</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase text-left">Contato</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-[11px] tracking-[0.2em] mb-8 uppercase">Recursos</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a 
                href="./Gilvan_Sousa_QA_Resume.pdf" 
                download="Gilvan_Sousa_QA_Resume.pdf"
                className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase flex items-center gap-2 text-left cursor-pointer"
              >
                Baixar Currículo <span className="material-symbols-outlined text-xs">download</span>
              </a>
            </li>
            <li><a href="https://github.com/GilvanS" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors font-display tracking-widest uppercase">Github Profile</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-[10px] font-display font-bold tracking-[0.3em] text-slate-500 uppercase">
        <div>© 2024 Gilvan Sousa. All Rights Reserved.</div>
        <div className="flex items-center gap-2">
          Quality Assured <i className="fas fa-shield-check text-primary/50"></i> For the cosmos
        </div>
      </div>
    </footer>
  );
};

export default Footer;
