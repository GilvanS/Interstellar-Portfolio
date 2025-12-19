
import React from 'react';

const technologies = [
  { 
    name: 'Java', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Java.svg'
  },
  { 
    name: 'JavaScript', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Javascript.svg'
  },
  { 
    name: 'Cypress', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Cypress.svg'
  },
  { 
    name: 'Selenium', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Selenium.svg'
  },
  { 
    name: 'Playwright', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
    fallback: 'https://raw.githubusercontent.com/microsoft/playwright-mcp/main/extension/icons/icon-128.png',
    scale: 'scale-100' 
  },
  { 
    name: 'Appium', 
    icon: 'https://www.vectorlogo.zone/logos/appium/appium-icon.svg',
    scale: 'scale-110',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Android.svg'
  },
  { 
    name: 'GitHub', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Github.svg'
  },
  { 
    name: 'Docker', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg',
    scale: 'scale-100',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Docker.svg'
  },
  { 
    name: 'HTML5', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/HTML5.svg'
  },
  { 
    name: 'CSS3', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/CSS3.svg'
  },
  { 
    name: 'SQL', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg',
    fallback: 'https://raw.githubusercontent.com/gui-bus/TechIcons/main/Dark/Postgresql.svg'
  },
];

const Technologies: React.FC = () => {
  // Duplicamos a lista para criar o efeito de loop infinito perfeito
  const doubleTechs = [...technologies, ...technologies];

  return (
    <section className="py-32 overflow-hidden relative min-h-[550px] flex flex-col justify-center">
      {/* Overlay de contraste ESCURO para o título - Aumentado para garantir leitura */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-black via-black to-transparent pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 mb-24 text-center z-10 relative">
        <div className="inline-block relative">
          <h3 className="text-4xl md:text-6xl font-display font-black text-white tracking-[0.4em] uppercase drop-shadow-[0_0_30px_rgba(102,126,234,0.3)]">
            <span className="text-primary">TEC</span>NOLOGIAS
          </h3>
          {/* Brilho sutil atrás do texto */}
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10"></div>
        </div>
        <div className="w-40 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(102,126,234,0.6)]"></div>
      </div>

      {/* Área de movimento centralizada - Ícones flutuando no meio */}
      <div className="relative py-16 w-full z-10">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex items-center gap-24 md:gap-48 whitespace-nowrap px-10">
            {doubleTechs.map((tech, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center group/item cursor-pointer"
              >
                {/* Container do ícone - Padding generoso para não cortar nada */}
                <div className={`relative flex items-center justify-center w-24 h-24 md:w-36 md:h-36 p-4 md:p-6 transition-all duration-500 group-hover/item:scale-110 ${tech.scale || ''} ${tech.name === 'Playwright' ? 'overflow-visible' : ''}`}>
                  {/* Fundo sutil para destacar os ícones */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-60 group-hover/item:opacity-100 group-hover/item:bg-white/10 transition-all duration-500 blur-sm"></div>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={`relative z-10 max-w-full max-h-full object-contain brightness-110 contrast-125 saturate-110 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] drop-shadow-[0_0_25px_rgba(102,126,234,0.4)] group-hover/item:drop-shadow-[0_0_30px_rgba(102,126,234,0.9)] group-hover/item:brightness-125 group-hover/item:contrast-150 transition-all duration-500 ${tech.name === 'Playwright' ? 'w-full h-full p-2' : ''}`}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // Fallback para ícones que não carregam
                      const target = e.currentTarget;
                      const techItem = technologies.find(t => t.icon === tech.icon || t.name === tech.name);
                      
                      // Se tiver fallback definido, tentar usar
                      if (techItem && (techItem as any).fallback && target.src !== (techItem as any).fallback) {
                        target.src = (techItem as any).fallback;
                        return;
                      }
                      
                      // Se for Playwright e ainda falhar, tentar outras alternativas
                      if (tech.name === 'Playwright') {
                        const alternatives = [
                          'https://playwright.dev/img/playwright-logo.svg',
                          'https://raw.githubusercontent.com/microsoft/playwright-mcp/main/extension/icons/icon-128.png',
                          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg'
                        ];
                        const currentSrc = target.src;
                        let triedCount = 0;
                        
                        // Contar quantas tentativas já foram feitas
                        alternatives.forEach(alt => {
                          if (currentSrc.includes(alt.split('/').pop()?.split('.')[0] || '')) {
                            triedCount++;
                          }
                        });
                        
                        if (triedCount < alternatives.length) {
                          target.src = alternatives[triedCount];
                          return;
                        }
                      }
                      
                      // Último recurso: mostrar inicial do nome
                      target.style.display = 'none';
                      if (!target.parentElement?.querySelector('.icon-fallback')) {
                        target.parentElement?.insertAdjacentHTML('beforeend', 
                          `<div class="icon-fallback w-full h-full flex items-center justify-center text-primary text-xl md:text-2xl font-bold">${tech.name.charAt(0)}</div>`
                        );
                      }
                    }}
                  />
                  
                  {/* Brilho radial no hover para dar profundidade espacial */}
                  <div className="absolute inset-0 bg-primary/30 blur-[50px] rounded-full opacity-30 group-hover/item:opacity-100 transition-opacity duration-700 -z-10"></div>
                  {/* Brilho constante sutil para melhor visibilidade */}
                  <div className="absolute inset-0 bg-white/10 blur-[30px] rounded-full opacity-20 -z-10"></div>
                </div>

                {/* Legenda Estilo HUD */}
                <div className="h-12 mt-10 flex items-center justify-center">
                  <span className="px-6 py-2.5 rounded-lg bg-black/95 border border-primary/50 text-white text-[10px] md:text-xs font-display font-bold tracking-[0.3em] uppercase opacity-0 -translate-y-6 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(102,126,234,0.5)] backdrop-blur-2xl">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Gradientes de desfoque nas bordas (Vignette) */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        /* Estilos específicos para ícone do Playwright */
        .animate-marquee img[alt="Playwright"] {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          padding: 8px;
          box-sizing: border-box;
        }
        
        /* Garantir que SVGs sejam renderizados corretamente */
        .animate-marquee img[src*="playwright"],
        .animate-marquee img[src*="Playwright"] {
          min-width: 0;
          min-height: 0;
          max-width: 100%;
          max-height: 100%;
        }
        
        /* Melhorar visibilidade de todos os ícones */
        .animate-marquee img {
          opacity: 0.95;
          transition: opacity 0.3s ease;
        }
        
        .animate-marquee img:hover,
        .group-hover .animate-marquee img {
          opacity: 1;
        }
        
        /* Adicionar contraste extra para ícones SVG */
        .animate-marquee img[src$=".svg"] {
          filter: brightness(1.15) contrast(1.2) saturate(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.6)) drop-shadow(0 0 25px rgba(102,126,234,0.4));
        }
      `}</style>
    </section>
  );
};

export default Technologies;
