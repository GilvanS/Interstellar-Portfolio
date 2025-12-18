
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 scroll-mt-24 overflow-hidden">
      <div className="flex items-center gap-6 mb-16">
        <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase">CONTATO</h3>
        <div className="h-[2px] flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight">
            VAMOS <span className="text-primary">CONECTAR?</span>
          </h2>
          
          <div className="grid gap-6">
            {/* EMAIL CARD */}
            <div className="glass-panel p-6 flex items-center gap-6 hover:translate-x-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(102,126,234,0.2)]">
                <i className="fas fa-envelope text-3xl"></i>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-display font-bold text-slate-500 tracking-[0.3em] uppercase">E-mail Oficial</p>
                <a href="mailto:gillvanjs@gmail.com" className="text-slate-200 text-xl md:text-2xl font-body hover:text-primary transition-colors">
                  gillvanjs@gmail.com
                </a>
              </div>
            </div>

            {/* PHONE CARD */}
            <div className="glass-panel p-6 flex items-center gap-6 hover:translate-x-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_20px_rgba(102,126,234,0.2)]">
                <i className="fas fa-mobile-screen-button text-3xl"></i>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-display font-bold text-slate-500 tracking-[0.3em] uppercase">Telefone / Celular</p>
                <a href="tel:+5511982371339" className="text-slate-200 text-xl md:text-2xl font-body hover:text-primary transition-colors">
                  +55 11 98237-1339
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/5511982371339" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#25D366] text-black font-display font-black tracking-widest text-xs rounded-full hover:scale-105 transition-all shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              WHATSAPP AGORA
            </a>

            <div className="flex gap-4">
              <a href="https://github.com/GilvanS" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:text-primary transition-all">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/gilvan-sousa-4a9755a9" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:text-primary transition-all">
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* PHONE 3D VISUALIZATION */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative py-12">
          <div className="relative w-64 md:w-72 aspect-[9/19] animate-float-space">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-2xl rounded-[100%] animate-shadow-pulse"></div>
            
            <div className="absolute inset-0 bg-[#1a1a1a] rounded-[3rem] border-[6px] border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#333] rounded-b-2xl z-30"></div>
              
              <div className="absolute inset-0 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=800" 
                  alt="Black Hole Wallpaper" 
                  className="w-full h-full object-cover scale-125"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center scale-90 md:scale-100">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-space {
          0%, 100% {
            transform: translateY(0) rotateX(10deg) rotateY(-15deg) rotateZ(2deg);
          }
          50% {
            transform: translateY(-30px) rotateX(15deg) rotateY(-10deg) rotateZ(-2deg);
          }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
          50% { transform: translateX(-50%) scale(0.8); opacity: 0.2; }
        }
        .animate-float-space {
          perspective: 1000px;
          animation: float-space 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-shadow-pulse { animation: shadow-pulse 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Contact;
