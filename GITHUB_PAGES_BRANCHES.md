# 🌐 GitHub Pages e Branches - Como Funciona

## ⚠️ Importante: URLs Compartilhados

No **GitHub Pages**, quando você usa **GitHub Actions**, todas as branches compartilham o **mesmo URL**. Não é possível ter URLs diferentes para cada branch no mesmo repositório.

## 📍 URL Único do GitHub Pages

Para o seu repositório, o URL é sempre:

```
https://gilvans.github.io/Interstellar-Portfolio/
```

**Este é o único URL**, independentemente de qual branch foi deployada.

## 🔄 Como Funciona a Alternância de Branches

Com o workflow `deploy-scheduled.yml` que configuramos:

1. **O mesmo URL** (`https://gilvans.github.io/Interstellar-Portfolio/`) é usado para ambas as branches
2. A cada 6 horas, o workflow faz deploy de uma branch diferente
3. Quando a branch `alternative` é deployada, o conteúdo dela substitui o conteúdo anterior no mesmo URL
4. Quando a branch `main` é deployada, o conteúdo dela substitui o conteúdo anterior no mesmo URL

**Em resumo**: O URL não muda, apenas o **conteúdo exibido** muda conforme a branch deployada.

## 📊 Exemplo Prático

### Horário: 00h UTC (Deploy da branch `main`)
- **URL**: `https://gilvans.github.io/Interstellar-Portfolio/`
- **Conteúdo**: Versão da branch `main`

### Horário: 06h UTC (Deploy da branch `alternative`)
- **URL**: `https://gilvans.github.io/Interstellar-Portfolio/` (mesmo URL!)
- **Conteúdo**: Versão da branch `alternative` (substituiu o conteúdo anterior)

## 🎯 Alternativas para URLs Separados

Se você **realmente precisar** de URLs diferentes para cada branch, existem algumas alternativas:

### Opção 1: Dois Repositórios Separados (Recomendado)

Criar dois repositórios diferentes:
- `Interstellar-Portfolio-main` → `https://gilvans.github.io/Interstellar-Portfolio-main/`
- `Interstellar-Portfolio-alternative` → `https://gilvans.github.io/Interstellar-Portfolio-alternative/`

### Opção 2: Usar GitHub Environments

Criar ambientes diferentes no GitHub Actions (mas ainda usaria o mesmo URL base com paths diferentes):
- `main` → `https://gilvans.github.io/Interstellar-Portfolio/`
- `alternative` → `https://gilvans.github.io/Interstellar-Portfolio/alternative/` (seria necessário configurar paths diferentes)

### Opção 3: Usar Domínio Personalizado com Subdomínios

Se você tiver um domínio próprio:
- `main` → `https://main.seudominio.com`
- `alternative` → `https://alternative.seudominio.com`

## ✅ Recomendação Atual

A configuração atual (alternar branches no mesmo URL) é a mais simples e eficiente para:
- ✅ Mostrar versões diferentes do site automaticamente
- ✅ Testar diferentes versões com o mesmo público
- ✅ Manter tudo em um único repositório

O usuário não precisa saber qual branch está ativa - ele apenas acessa o site e vê a versão atual conforme o horário.

## 🔍 Como Verificar Qual Branch Está Ativa

Para verificar qual branch está atualmente no ar:

1. Acesse: `https://github.com/gilvans/Interstellar-Portfolio/actions`
2. Veja o último workflow executado: **"Deploy Scheduled - Branch Rotation"**
3. Nos logs do job `determine-branch`, você verá qual branch foi deployada
4. Ou nos logs do `deploy`, você verá a mensagem: `📦 Branch: main` ou `📦 Branch: alternative`

---

**"Simplicidade é a sofisticação máxima."** — *Configuração otimizada por Gilvan Sousa*
