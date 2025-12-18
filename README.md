
# 🚀 Interstellar Portfolio | Gilvan Sousa

![QA Sênior](https://img.shields.io/badge/Role-QA_S%C3%AAnior-667eea?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-React_|_Java_|_Gemini_API-ffd700?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-a3ff00?style=for-the-badge)

Este é um portfólio de alta performance com estética **Sci-Fi/Interstellar**, desenvolvido para demonstrar competências técnicas em Quality Assurance, Automação de Testes e Integração com Inteligência Artificial Generativa.

---

## 🌌 Visão Geral

O projeto vai além de um site estático. Ele incorpora uma experiência imersiva com um background 3D de redes neurais (Three.js) e um laboratório de IA funcional que utiliza o modelo **Gemini 2.5 Flash** para síntese e edição de imagens.

### 🛠️ Principais Seções
- **Hero Interativo:** Introdução dinâmica com controles de sistema para o background 3D.
- **Sobre Mim:** Detalhamento da trajetória de 8 anos como QA Sênior, com foco em Meios de Pagamento e Varejo.
- **Projetos de Engenharia:** Showcase de projetos reais hospedados no GitHub, focados em Java, REST Assured e Automação.
- **AI Lab (Beta):** Módulo de processamento neural para geração e modificação de imagens via API do Google Gemini.
- **Contato Futurista:** Interface de comunicação integrada com WhatsApp e Redes Sociais.

---

## 💻 Tech Stack

- **Frontend:** React 19 + TypeScript.
- **Estilização:** Tailwind CSS (Glassmorphism & Neon Design).
- **3D & Gráficos:** Three.js para a rede neural interativa no background.
- **Inteligência Artificial:** SDK `@google/genai` (Google Gemini API).
- **Ícones:** Font Awesome 6.4.
- **Fontes:** Orbitron (Display) e Outfit (Body).

---

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js instalado.
- Uma chave de API do Google Gemini (obtenha em [Google AI Studio](https://aistudio.google.com/)).

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/GilvanS/portfolio-interstellar.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure sua chave de API no arquivo de ambiente:
   Crie um arquivo `.env` na raiz e adicione:
   ```env
   API_KEY=sua_chave_aqui
   ```
3. Configure sua chave de API no arquivo de ambiente:
   Crie um arquivo `.env` na raiz e adicione:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```
   > **Nota:** O nome correto da variável é `GEMINI_API_KEY`, não `API_KEY`

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   > **Nota:** O comando correto é `npm run dev`, não `npm start`

---

## 🚀 Deploy no GitHub Pages

### Método Automático (Recomendado - GitHub Actions)

O projeto está configurado com GitHub Actions para deploy automático:

1. **Configure o GitHub Pages:**
   - Vá em `Settings` > `Pages` no seu repositório
   - Em `Source`, selecione `GitHub Actions`

2. **Configure a chave da API (Opcional):**
   - Vá em `Settings` > `Secrets and variables` > `Actions`
   - Adicione um novo secret chamado `GEMINI_API_KEY` com sua chave da API
   - Isso permitirá que o AI Lab funcione no site publicado

3. **Faça push para a branch main/master:**
   ```bash
   git add .
   git commit -m "Deploy: Configuração para GitHub Pages"
   git push origin main
   ```

4. **Aguarde o deploy:**
   - O GitHub Actions irá automaticamente fazer build e deploy
   - Acompanhe o progresso em `Actions` > `Deploy to GitHub Pages`
   - O site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

### Método Manual (gh-pages)

Se preferir fazer deploy manualmente:

1. **Instale as dependências** (já incluído):
   ```bash
   npm install
   ```

2. **Configure o base path** (se necessário):
   - Edite `vite.config.ts` e ajuste o `base` para o nome do seu repositório:
   ```typescript
   base: '/nome-do-repositorio/'
   ```

3. **Faça o build e deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

### ⚠️ Importante - Base Path

- **Repositório de projeto** (ex: `portfolio-interstellar`): Use `base: '/portfolio-interstellar/'` no `vite.config.ts`
- **Repositório username.github.io**: Use `base: '/'` no `vite.config.ts`
- **Desenvolvimento local**: Use `base: './'` (já configurado)

Para ajustar, edite a variável `base` em `vite.config.ts` ou defina `VITE_BASE_PATH` no arquivo `.env`.

---

## 🧪 Foco em Quality Assurance (QA)

Como este é o portfólio de um **Analista de Testes Sênior**, o código foi estruturado pensando em:
- **Acessibilidade:** Alto contraste de texto para legibilidade (WCAG Compliant).
- **Responsividade:** Design adaptável para Mobile, Tablet e Desktop.
- **Performance:** Otimização de assets e renderização 3D eficiente.
- **Robustez:** Tratamento de erros em chamadas de API de IA e fallbacks para imagens.

---

## 📁 Estrutura de Imagens

Para personalizar as imagens do projeto, siga as instruções no arquivo `/public/images/INSTRUCOES.txt`. O projeto está configurado para:
- `profile.jpg`: Sua foto profissional.
- `nebula.jpg`: Imagem de fundo do Hero.
- `blackhole.jpg`: Wallpaper do visualizador 3D de celular.

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e inspirar-se para o seu próprio cockpit de desenvolvedor.

---

**"Qualidade não é um ato, é um hábito."** — *Garantido por Gilvan Sousa*
