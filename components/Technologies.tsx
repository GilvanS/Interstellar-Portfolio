
import React, { useState, useEffect, useMemo } from 'react';

// Interface para certificados
interface Certificate {
  name: string;
  imageUrl: string;
  platform: 'alura' | 'udemy' | 'dio';
}

// Lista completa de certificados organizados por plataforma
const allCertificates: Certificate[] = [
  // Certificados Alura
  {
    name: 'Appium - compreenda e aplique testes de interface',
    imageUrl: '/certificates/ALURA - Appium - compreenda e aplique testes de interface.png',
    platform: 'alura'
  },
  {
    name: 'BDD e Java - Behavior Driven Development com Cucumber',
    imageUrl: '/certificates/ALURA - BDD e Java - Behavior Driven Development com Cucumber.png',
    platform: 'alura'
  },
  {
    name: 'Engenharia de Prompt - criando prompts eficazes para IA Generativa',
    imageUrl: '/certificates/ALURA - Engenharia de Prompt - criando prompts eficazes para IA Generativa.png',
    platform: 'alura'
  },
  {
    name: 'Gemini e Node.js - integrando sua aplicação com a API do Google',
    imageUrl: '/certificates/ALURA - Gemini e Node.js - integrando sua aplicação com a API do Google.png',
    platform: 'alura'
  },
  {
    name: 'Java - aplicando a Orientação a Objetos',
    imageUrl: '/certificates/ALURA - Java - aplicando a Orientação a Objetos.png',
    platform: 'alura'
  },
  {
    name: 'Java - consumindo API, gravando arquivos e lidando com erros',
    imageUrl: '/certificates/ALURA - Java - consumindo API, gravando arquivos e lidando com erros.png',
    platform: 'alura'
  },
  {
    name: 'Java - criando a sua primeira aplicação',
    imageUrl: '/certificates/ALURA - Java - criando a sua primeira aplicação.png',
    platform: 'alura'
  },
  {
    name: 'Java - trabalhando com listas e coleções de dados',
    imageUrl: '/certificates/ALURA - Java - trabalhando com listas e coleções de dados.png',
    platform: 'alura'
  },
  {
    name: 'Java e refatoração - melhorando códigos com boas práticas',
    imageUrl: '/certificates/ALURA - Java e refatoração - melhorando códigos com boas práticas.png',
    platform: 'alura'
  },
  {
    name: 'Quality Assurance - plano de testes e gestão de bugs',
    imageUrl: '/certificates/ALURA - Quality Assurance - plano de testes e gestão de bugs.png',
    platform: 'alura'
  },
  // Certificados Udemy
  {
    name: 'Aprenda BDD com Cucumber em JAVA',
    imageUrl: '/certificates/UDEMY - Aprenda BDD com Cucumber em JAVA_UC-1098a8cd-eb6b-43fa-ad7d-e38c0f1b9c58.png',
    platform: 'udemy'
  },
  {
    name: 'Automação de Testes com Sikuli',
    imageUrl: '/certificates/UDEMY - Automação de Testes com Sikuli_UC-960a467c-50b2-4e71-98ec-82acc85435f7.png',
    platform: 'udemy'
  },
  {
    name: 'AWS CodeWhisperer - Generative AI para Testes Automatizados',
    imageUrl: '/certificates/UDEMY - AWS CodeWhisperer - Generative AI para Testes Automatizados_UC-61e44808-d1e7-4b4e-b314-930bdb70bb71.png',
    platform: 'udemy'
  },
  {
    name: 'AWS CodeWhisperer - Generative AI para Testes',
    imageUrl: '/certificates/UDEMY - AWS CodeWhisperer - Generative AI para Testes_UC-61e44808-d1e7-4b4e-b314-930bdb70bb71.png',
    platform: 'udemy'
  },
  {
    name: 'Cypress eXpress',
    imageUrl: '/certificates/UDEMY - Cypress eXpress_UC-8efb6ad3-f20c-4e90-922a-a2ba44b1ab8d.png',
    platform: 'udemy'
  },
  {
    name: 'Data Science de A a Z - Extração e Exibição dos Dados',
    imageUrl: '/certificates/UDEMY - Data Science de A a Z - Extraçao e Exibição dos Dados_UC-A91GGTG4.png',
    platform: 'udemy'
  },
  {
    name: 'Databricks Developer Spark, SQL, Python Para Análise de Dados',
    imageUrl: '/certificates/UDEMY - Databricks Developer Spark,SQL,Python Para Análise de Dados_UC-b7d6c9f9-2157-4386-ab0c-b35a0cbf7e30.png',
    platform: 'udemy'
  },
  {
    name: 'Jira + Xray - Aprenda a criar e gerir seu Plano de Teste',
    imageUrl: '/certificates/UDEMY - Jira + Xray - Aprenda a criar e gerir seu Plano de Teste_UC-144abdbe-4f41-4d43-a1a8-ad088d8c3083.png',
    platform: 'udemy'
  },
  {
    name: 'Produtividade de Testes de Software com Uso do ChatGPT',
    imageUrl: '/certificates/UDEMY - Produtividade de Testes de Software com Uso do ChatGPT_UC-b6ffecaf-5b1b-4e42-8b70-08098ba1dc14.png',
    platform: 'udemy'
  },
  {
    name: 'Robot Framework e Appium para Android e iOS',
    imageUrl: '/certificates/UDEMY - Robot Framework e Appium para Android e iOS_UC-9ce88a48-878b-40cd-b73d-5c64ef7eb259.png',
    platform: 'udemy'
  },
  {
    name: 'Testando API REST com MongoDB e RabbitMQ em Cypress',
    imageUrl: '/certificates/UDEMY - Testando API REST com MongoDB e RabbitMQ em Cypress_UC-0d9e3853-5f59-4f7b-a375-668c8ce491e0.png',
    platform: 'udemy'
  },
  {
    name: 'Testes funcionais com Selenium WebDriver - Do básico ao GRID',
    imageUrl: '/certificates/UDEMY - Testes funcionais com Selenium WebDriver - Do básico ao GRID_UC-ba4fa402-a3b2-4fab-af88-2a09e66c0630.png',
    platform: 'udemy'
  },
  // Certificados DIO
  {
    name: 'GFT Quality Assurance #1',
    imageUrl: '/certificates/DIO -GFT Quality Assurance #1_ZBMZETMN.png',
    platform: 'dio'
  },
  {
    name: 'Introdução ao Desenvolvimento Moderno de Software',
    imageUrl: '/certificates/Introdução ao Desenvolvimento Moderno de Software_9XXGKSU1.png',
    platform: 'dio'
  },
  {
    name: 'Testes funcionais de aplicações Android com Appium',
    imageUrl: '/certificates/Testes funcionais de aplicações Android com Appium_UC-4f6b53eb-7358-4a86-bb31-e1da94401d60.png',
    platform: 'dio'
  },
];

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
  
  // Estado para plataforma selecionada
  const [selectedPlatform, setSelectedPlatform] = useState<'alura' | 'udemy' | 'dio' | 'random'>('random');
  
  // Estado para o carousel de certificados
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  // Função para misturar array aleatoriamente (Fisher-Yates)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filtrar certificados baseado na plataforma selecionada usando useMemo
  const filteredCertificates = useMemo(() => {
    if (selectedPlatform === 'random') {
      return shuffleArray(allCertificates);
    }
    return allCertificates.filter(cert => cert.platform === selectedPlatform);
  }, [selectedPlatform]);

  // Resetar índice quando mudar a plataforma
  useEffect(() => {
    setCurrentCertIndex(0);
  }, [selectedPlatform]);

  // Funções de navegação do carousel
  const nextCert = () => {
    setCurrentCertIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const prevCert = () => {
    setCurrentCertIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  const goToCert = (index: number) => {
    setCurrentCertIndex(index);
  };

  // Auto-play do carousel
  useEffect(() => {
    if (filteredCertificates.length === 0) return;
    const interval = setInterval(() => {
      setCurrentCertIndex((prev) => (prev + 1) % filteredCertificates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredCertificates.length]);

  return (
    <>
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
      <div className="relative py-8 sm:py-12 md:py-16 w-full z-10">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 md:gap-24 lg:gap-48 whitespace-nowrap px-4 sm:px-6 md:px-10">
            {doubleTechs.map((tech, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center group/item cursor-pointer"
              >
                {/* Container do ícone - Padding generoso para não cortar nada */}
                <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 p-3 sm:p-4 md:p-6 transition-all duration-500 group-hover/item:scale-110 ${tech.scale || ''} ${tech.name === 'Playwright' ? 'overflow-visible' : ''}`}>
                  {/* Fundo com efeito glass-panel e iluminação */}
                  <div className="absolute inset-0 glass-panel rounded-2xl border border-primary/40 shadow-[0_0_30px_rgba(102,126,234,0.4)] group-hover/item:shadow-[0_0_50px_rgba(102,126,234,0.6)] transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
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
                </div>

                {/* Legenda Estilo HUD */}
                <div className="h-12 mt-10 flex items-center justify-center">
                  <span className="px-6 py-2.5 rounded-lg bg-black/95 border border-primary/50 text-white text-xs md:text-sm font-display font-bold tracking-[0.3em] uppercase opacity-0 -translate-y-6 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(102,126,234,0.5)] backdrop-blur-2xl">
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
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        
        /* Otimização para mobile - animação mais rápida */
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
        
        /* Otimização para telas muito pequenas - ainda mais rápido */
        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
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

    {/* Seção de Certificados - Baseada no HTML fornecido, adaptada para tema galáxia */}
    <section className="container mx-auto px-4 py-16 z-10 relative mt-32" id="certificates">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_0_30px_rgba(102,126,234,0.3)]">
          CERTIFICADOS
        </h1>
        <div className="w-40 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(102,126,234,0.6)]"></div>
      </div>

      {/* Abas de seleção de plataforma */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-12">
        <button
          onClick={() => setSelectedPlatform('random')}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-display font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 ${
            selectedPlatform === 'random'
              ? 'bg-primary text-black shadow-[0_0_30px_rgba(102,126,234,0.8)] scale-105'
              : 'bg-black/40 text-white border border-white/20 hover:border-primary/50 hover:bg-primary/20'
          }`}
        >
          Aleatório
        </button>
        <button
          onClick={() => setSelectedPlatform('alura')}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-display font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 ${
            selectedPlatform === 'alura'
              ? 'bg-primary text-black shadow-[0_0_30px_rgba(102,126,234,0.8)] scale-105'
              : 'bg-black/40 text-white border border-white/20 hover:border-primary/50 hover:bg-primary/20'
          }`}
        >
          Alura
        </button>
        <button
          onClick={() => setSelectedPlatform('udemy')}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-display font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 ${
            selectedPlatform === 'udemy'
              ? 'bg-primary text-black shadow-[0_0_30px_rgba(102,126,234,0.8)] scale-105'
              : 'bg-black/40 text-white border border-white/20 hover:border-primary/50 hover:bg-primary/20'
          }`}
        >
          Udemy
        </button>
        <button
          onClick={() => setSelectedPlatform('dio')}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-display font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 ${
            selectedPlatform === 'dio'
              ? 'bg-primary text-black shadow-[0_0_30px_rgba(102,126,234,0.8)] scale-105'
              : 'bg-black/40 text-white border border-white/20 hover:border-primary/50 hover:bg-primary/20'
          }`}
        >
          DIO
        </button>
      </div>

      <div className="slide relative max-w-6xl mx-auto">
        <div className="slides relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentCertIndex * 100}%)` }}
          >
            {filteredCertificates.length === 0 ? (
              <div className="min-w-full flex-shrink-0 flex items-center justify-center py-20">
                <p className="text-white/60 text-xl md:text-2xl font-display">
                  Nenhum certificado encontrado para esta plataforma
                </p>
              </div>
            ) : (
              filteredCertificates.map((cert, index) => (
                <div key={index} className="conteudo min-w-full flex-shrink-0">
                  <div className="course-information-slide text-center mb-6">
                    <p className="text-xl md:text-2xl font-bold text-white/90">
                      {cert.name}
                    </p>
                  </div>
                  <div className="certification-course bg-white rounded-lg shadow-2xl p-4 md:p-6 flex items-center justify-center">
                    <img 
                      src={(() => {
                        const baseUrl = (import.meta as any).env?.BASE_URL || '/';
                        const cleanUrl = cert.imageUrl.startsWith('/') ? cert.imageUrl.slice(1) : cert.imageUrl;
                        // Dividir o caminho e codificar apenas o nome do arquivo (última parte)
                        const pathParts = cleanUrl.split('/');
                        const lastIndex = pathParts.length - 1;
                        pathParts[lastIndex] = encodeURIComponent(pathParts[lastIndex]);
                        return `${baseUrl}${pathParts.join('/')}`;
                      })()} 
                      alt={cert.name}
                      className="max-w-full max-h-[600px] md:max-h-[700px] object-contain"
                      onError={(e) => {
                        console.error('❌ Erro ao carregar imagem:', cert.imageUrl);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Botões de navegação */}
        <button 
          className="prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/80 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 shadow-lg text-xl md:text-2xl"
          onClick={prevCert}
          aria-label="Certificado anterior"
        >
          &lt;
        </button>
        
        <button 
          className="next absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/80 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 shadow-lg text-xl md:text-2xl"
          onClick={nextCert}
          aria-label="Próximo certificado"
        >
          &gt;
        </button>
        
        {/* Indicadores */}
        {filteredCertificates.length > 0 && (
          <div className="indicators flex justify-center items-center gap-3 mt-8">
            {filteredCertificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCert(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentCertIndex
                    ? 'w-3 h-3 bg-primary shadow-[0_0_15px_rgba(102,126,234,0.8)]'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para certificado ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default Technologies;
