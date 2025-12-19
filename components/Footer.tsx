
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
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-sm mb-8">
            Elevando os padrões de qualidade e garantindo a excelência em cada entrega digital. Focado em automação, performance e segurança.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://github.com/GilvanS" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-14 h-14 md:w-16 md:h-16 rounded-xl glass-panel flex items-center justify-center text-white hover:text-primary border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(102,126,234,0.5)]"
            >
              <i className="fab fa-github text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110"></i>
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a 
              href="https://www.linkedin.com/in/gilvan-sousa-4a9755a9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-14 h-14 md:w-16 md:h-16 rounded-xl glass-panel flex items-center justify-center text-white hover:text-primary border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(102,126,234,0.5)]"
            >
              <i className="fab fa-linkedin text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110"></i>
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a 
              href="https://wa.me/5511982371339" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-14 h-14 md:w-16 md:h-16 rounded-xl glass-panel flex items-center justify-center text-white hover:text-[#25D366] border border-white/10 hover:border-[#25D366]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              <i className="fab fa-whatsapp text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110"></i>
              <div className="absolute inset-0 bg-[#25D366]/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-bold text-sm md:text-base tracking-[0.2em] mb-8 uppercase">Navegação</h4>
          <ul className="space-y-4 text-base md:text-lg">
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

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs md:text-sm font-display font-bold tracking-[0.3em] text-slate-500 uppercase">
        <div>© 2024 Gilvan Sousa. All Rights Reserved.</div>
        <div className="flex items-center gap-2">
          Quality Assured <i className="fas fa-shield-check text-primary/50"></i> For the cosmos
        </div>
      </div>
    </footer>
  );
};

export default Footer;
