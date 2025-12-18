
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 scroll-mt-24 overflow-hidden">
      <div className="flex items-center gap-6 mb-16">
        <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wider uppercase">CONTATO</h3>
        <div className="h-[2px] flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 space-y-12 z-10">
          <h2 className="text-6xl md:text-7xl font-display font-bold text-primary tracking-tight drop-shadow-[0_0_15px_rgba(0,195,255,0.3)]">
            Fale comigo!
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="text-primary transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-4xl">mail</span>
              </div>
              <a href="mailto:gillvanjs@gmail.com" className="text-slate-300 text-xl md:text-2xl font-body hover:text-white transition-colors">
                gillvanjs@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="text-primary transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-4xl">smartphone</span>
              </div>
              <a href="tel:+5511982371339" className="text-slate-300 text-xl md:text-2xl font-body hover:text-white transition-colors">
                +55 11 98237-1339
              </a>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-6">
            <a 
              href="https://wa.me/5511982371339" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-4 border-2 border-primary text-primary font-display font-black tracking-widest text-sm hover:bg-primary hover:text-black transition-all group shadow-[0_0_20px_rgba(0,195,255,0.15)]"
            >
              <i className="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
              WHATSAPP
            </a>

            <div className="flex gap-4 items-center">
              <a href="https://github.com/Gilvan-Sousa" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center text-slate-500 hover:text-primary border border-white/5 transition-all">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center text-slate-500 hover:text-primary border border-white/5 transition-all">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center relative py-20">
          <div className="relative w-64 md:w-72 aspect-[9/19] animate-float-space">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-2xl rounded-[100%] animate-shadow-pulse"></div>
            
            <div className="absolute inset-0 bg-[#1a1a1a] rounded-[3rem] border-[6px] border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#333] rounded-b-2xl z-30"></div>
              
              <div className="absolute inset-0 z-10">
                <img 
                  src="/images/blackhole.jpg" 
                  alt="Black Hole Wallpaper" 
                  className="w-full h-full object-cover scale-125"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center scale-90 md:scale-100">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                </div>
                <div className="absolute -bottom-3 right-4 w-6 h-6 bg-white rotate-45 rounded-sm"></div>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full rounded-[3rem] border border-white/10 pointer-events-none z-40"></div>
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
          0%, 100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateX(-50%) scale(0.8);
            opacity: 0.2;
          }
        }

        .animate-float-space {
          perspective: 1000px;
          animation: float-space 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .animate-shadow-pulse {
          animation: shadow-pulse 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
