
import React from 'react';

const technologies = [
  { 
    name: 'Playwright', 
    icon: 'https://logo.svgcdn.com/devicon/playwright-original.svg',
    fallback: 'https://playwright.dev/img/playwright-logo.svg',
    scale: 'scale-100' 
  },
  { 
    name: 'Cypress', 
    icon: 'https://skillicons.dev/icons?i=cypress' 
  },
  { 
    name: 'Appium', 
    icon: 'https://www.vectorlogo.zone/logos/appium/appium-icon.svg',
    scale: 'scale-110' 
  },
  { 
    name: 'JavaScript', 
    icon: 'https://skillicons.dev/icons?i=js' 
  },
  { 
    name: 'GitHub', 
    icon: 'https://skillicons.dev/icons?i=github' 
  },
  { 
    name: 'Docker', 
    icon: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg',
    scale: 'scale-100' 
  },
  { 
    name: 'HTML5', 
    icon: 'https://skillicons.dev/icons?i=html' 
  },
  { 
    name: 'CSS3', 
    icon: 'https://skillicons.dev/icons?i=css' 
  },
  { 
    name: 'SQL', 
    icon: 'https://skillicons.dev/icons?i=postgres' 
  },
  { 
    name: 'Java', 
    icon: 'https://skillicons.dev/icons?i=java' 
  },
  { 
    name: 'Selenium', 
    icon: 'https://skillicons.dev/icons?i=selenium' 
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
                <div className={`relative flex items-center justify-center w-24 h-24 md:w-36 md:h-36 p-6 transition-all duration-500 group-hover/item:scale-110 ${tech.scale || ''}`}>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover/item:drop-shadow-[0_0_30px_rgba(102,126,234,0.7)] transition-all duration-500"
                    loading="lazy"
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
                          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg'
                        ];
                        const currentSrc = target.src;
                        const altIndex = alternatives.findIndex(alt => currentSrc.includes(alt.split('/').pop() || ''));
                        const nextAlt = alternatives[altIndex + 1];
                        
                        if (nextAlt && !currentSrc.includes(nextAlt)) {
                          target.src = nextAlt;
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
                  <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 -z-10"></div>
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
      `}</style>
    </section>
  );
};

export default Technologies;
