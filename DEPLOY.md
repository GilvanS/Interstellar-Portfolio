# 🚀 Guia de Deploy - GitHub Pages

## ✅ Checklist de Configuração

### 1. Configuração do Repositório GitHub

- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado para o repositório
- [ ] Branch principal é `main` ou `master`

### 2. Configuração do GitHub Pages

1. Acesse: `Settings` > `Pages` no seu repositório
2. Em `Source`, selecione: **GitHub Actions**
3. Salve as alterações

### 3. Configuração da API Key (Opcional - para AI Lab)

1. Acesse: `Settings` > `Secrets and variables` > `Actions`
2. Clique em `New repository secret`
3. Nome: `GEMINI_API_KEY`
4. Valor: Sua chave da API do Google Gemini
5. Clique em `Add secret`

> **Nota:** Se não configurar a API Key, o site funcionará normalmente, mas o AI Lab não terá funcionalidade.

### 4. Ajuste do Base Path (IMPORTANTE)

Edite o arquivo `vite.config.ts` e ajuste a variável `base`:

**Para repositório de projeto** (ex: `portfolio-interstellar`):
```typescript
base: '/portfolio-interstellar/'
```

**Para repositório username.github.io**:
```typescript
base: '/'
```

**Para desenvolvimento local** (já configurado):
```typescript
base: './'
```

### 5. Deploy Automático

Após fazer push para a branch `main` ou `master`:

1. O GitHub Actions irá automaticamente:
   - Fazer build do projeto
   - Fazer deploy para GitHub Pages

2. Acompanhe o progresso:
   - Vá em `Actions` no seu repositório
   - Clique no workflow `Deploy to GitHub Pages`
   - Aguarde a conclusão (geralmente 2-3 minutos)

3. Acesse seu site:
   - URL: `https://seu-usuario.github.io/nome-do-repositorio/`
   - Ou: `https://seu-usuario.github.io/` (se for username.github.io)

## 🔧 Troubleshooting

### Site não carrega corretamente

- Verifique se o `base` path está correto no `vite.config.ts`
- Certifique-se de que o GitHub Pages está configurado para usar `GitHub Actions`
- Verifique os logs em `Actions` para erros de build

### Imagens não aparecem

- Certifique-se de que as imagens estão na pasta `public/images/`
- Verifique se os caminhos no código usam `/images/` (caminho absoluto)

### AI Lab não funciona

- Verifique se o secret `GEMINI_API_KEY` foi configurado corretamente
- Verifique se a chave da API está válida e ativa
- Verifique os logs do console do navegador para erros

## 📝 Comandos Úteis

```bash
# Build local para testar
npm run build

# Preview do build local
npm run preview

# Deploy manual (se necessário)
npm run deploy
```

## 🎯 Próximos Passos

1. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "Config: Deploy para GitHub Pages"
   git push origin main
   ```

2. Configure o GitHub Pages conforme instruções acima

3. Aguarde o deploy automático

4. Acesse seu site publicado! 🚀

---

**"Qualidade não é um ato, é um hábito."** — *Garantido por Gilvan Sousa*
