
import React, { useState, useRef } from 'react';
import { editImageWithAI, generateImageWithAI } from '../services/geminiService';

type ToolMode = 'modify' | 'synthesize';

const AIEditor: React.FC = () => {
  const [mode, setMode] = useState<ToolMode>('modify');
  
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [modPrompt, setModPrompt] = useState('');
  const [mimeType, setMimeType] = useState('image/png');
  
  const [genPrompt, setGenPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [style, setStyle] = useState('none');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styles = [
    { id: 'none', label: 'Padrão', prefix: '' },
    { id: 'cyberpunk', label: 'Cyberpunk', prefix: 'Cyberpunk style, neon lights: ' },
    { id: 'cinematic', label: 'Cinematográfico', prefix: 'Cinematic lighting, high resolution: ' },
    { id: 'pixel', label: 'Pixel Art', prefix: 'Retro pixel art style: ' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProcessModify = async () => {
    if (!image || !modPrompt) return;
    setIsProcessing(true);
    try {
      const result = await editImageWithAI(image, modPrompt, mimeType);
      if (result) setEditedImage(result);
    } catch (err) {
      alert("Falha na transformação neural.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessSynthesize = async () => {
    if (!genPrompt) return;
    setIsProcessing(true);
    try {
      const selectedStyle = styles.find(s => s.id === style);
      const fullPrompt = `${selectedStyle?.prefix || ''}${genPrompt}`;
      const result = await generateImageWithAI(fullPrompt, aspectRatio);
      if (result) setGeneratedImage(result);
    } catch (err) {
      alert("Falha na síntese neural.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setEditedImage(null);
    setModPrompt('');
    setGenPrompt('');
    setGeneratedImage(null);
  };

  return (
    <section id="ai-lab" className="py-24 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-display font-bold text-white tracking-tight">AI LAB</h3>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded border border-primary/20">BETA</span>
          </div>
          <p className="text-slate-400 max-w-lg">
            Experimente o poder da inteligência artificial para processamento de imagens em tempo real.
          </p>
        </div>
        
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => { setMode('modify'); handleReset(); }}
            className={`px-8 py-2 text-xs font-semibold rounded-lg transition-all ${mode === 'modify' ? 'bg-primary text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Modificar
          </button>
          <button 
            onClick={() => { setMode('synthesize'); handleReset(); }}
            className={`px-8 py-2 text-xs font-semibold rounded-lg transition-all ${mode === 'synthesize' ? 'bg-primary text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Sintetizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-8 bg-slate-900/30 p-8 rounded-2xl border border-white/5">
          {mode === 'modify' ? (
            <div className="space-y-4">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Imagem de Origem</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-all text-center"
              >
                {image ? (
                  <img src={image} alt="Source" className="max-h-48 rounded-lg shadow-xl" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">add_photo_alternate</span>
                    <p className="text-sm text-slate-500">Clique para carregar</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">Formato</label>
                <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none">
                  {['1:1', '3:4', '16:9'].map(ar => <option key={ar} value={ar}>{ar}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase">Estilo</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none">
                  {styles.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Instrução Neural
            </label>
            <textarea 
              value={mode === 'modify' ? modPrompt : genPrompt}
              onChange={(e) => mode === 'modify' ? setModPrompt(e.target.value) : setGenPrompt(e.target.value)}
              placeholder={mode === 'modify' ? "Ex: Adicione um efeito de neon azul..." : "Ex: Uma estação espacial futurista orbitando a Terra..."}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-primary/50 min-h-[120px] outline-none transition-all leading-relaxed"
            />
          </div>

          <button 
            disabled={isProcessing}
            onClick={mode === 'modify' ? handleProcessModify : handleProcessSynthesize}
            className="w-full py-4 bg-primary text-black font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
          >
            {isProcessing ? (
              <><i className="fas fa-spinner fa-spin"></i> PROCESSANDO...</>
            ) : (
              <><span className="material-symbols-outlined text-lg">bolt</span> EXECUTAR PROTOCOLO</>
            )}
          </button>
        </div>

        <div className="lg:col-span-7 h-full flex flex-col">
          <div className="flex-grow bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center p-8 relative overflow-hidden min-h-[400px]">
            {(mode === 'modify' ? editedImage : generatedImage) ? (
              <div className="max-w-full text-center">
                <img 
                  src={(mode === 'modify' ? editedImage : generatedImage) || ''} 
                  alt="Result" 
                  className="max-h-[500px] rounded-lg shadow-2xl mx-auto border border-white/10" 
                />
                <a 
                  href={(mode === 'modify' ? editedImage : generatedImage) || ''} 
                  download="ai_result.png"
                  className="inline-flex items-center gap-2 mt-6 text-primary hover:text-white transition-colors font-semibold"
                >
                  Baixar Resultado <span className="material-symbols-outlined text-lg">download</span>
                </a>
              </div>
            ) : (
              <div className="text-center opacity-30">
                <span className="material-symbols-outlined text-6xl mb-4">memory</span>
                <p className="text-sm font-display tracking-widest uppercase">Aguardando Processamento Neural</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEditor;
