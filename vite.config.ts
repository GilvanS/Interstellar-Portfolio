import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path para GitHub Pages
    // IMPORTANTE: Para repositório de projeto, use '/Interstellar-Portfolio/'
    // Para username.github.io, use '/'
    const getBasePath = () => {
      // Prioridade 1: Variável de ambiente explícita (permite override)
      if (process.env.VITE_BASE_PATH) {
        return process.env.VITE_BASE_PATH;
      }
      
      // Prioridade 2: Detectar do GitHub Actions (se disponível)
      if (process.env.GITHUB_REPOSITORY) {
        const parts = process.env.GITHUB_REPOSITORY.split('/');
        if (parts.length === 2) {
          const repoName = parts[1];
          return `/${repoName}/`;
        }
      }
      
      // Prioridade 3: Padrão fixo para este repositório
      // Este é o nome do repositório: Interstellar-Portfolio
      return '/Interstellar-Portfolio/';
    };
    
    const base = getBasePath();
    
    // Log para debug durante o build
    console.log(`[Vite Config] Base path: ${base}`);
    console.log(`[Vite Config] GITHUB_REPOSITORY: ${process.env.GITHUB_REPOSITORY || 'não definido'}`);
    console.log(`[Vite Config] VITE_BASE_PATH: ${process.env.VITE_BASE_PATH || 'não definido'}`);
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
      }
    };
});
