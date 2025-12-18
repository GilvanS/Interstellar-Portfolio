import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path para GitHub Pages
    // Para repositório de projeto: '/nome-do-repositorio/'
    // Para username.github.io: '/'
    // Em produção (GitHub Actions), detectar automaticamente o nome do repositório
    const getBasePath = () => {
      // Se estiver no GitHub Actions, usar a variável de ambiente
      if (process.env.GITHUB_REPOSITORY) {
        const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
        return `/${repoName}/`;
      }
      // Se for username.github.io, usar raiz
      if (process.env.VITE_BASE_PATH === '/') {
        return '/';
      }
      // Padrão para repositório de projeto
      return process.env.VITE_BASE_PATH || '/Interstellar-Portfolio/';
    };
    
    const base = getBasePath();
    
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
