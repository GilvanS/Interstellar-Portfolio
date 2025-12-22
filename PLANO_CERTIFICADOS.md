# Plano de Implementação - Apresentação de Certificados

## Objetivo
Criar uma apresentação simples e elegante dos certificados, similar ao exemplo fornecido, com carousel funcional e design limpo.

---

## Fase 1: Estrutura do Modal/Container ✅ (JÁ IMPLEMENTADO)

### 1.1 Container Principal
- ✅ Container centralizado (`max-w-6xl mx-auto`)
- ✅ Título da seção "CERTIFICADOS"
- ✅ Nome do certificado atual acima do frame

### 1.2 Frame do Certificado
**Especificações Técnicas:**
- **Largura máxima**: `500px` (adequada para certificados em formato retrato)
- **Proporção**: `aspectRatio: '3/4'` (formato retrato padrão de certificados)
- **Padding interno**: `p-3 md:p-4` (mínimo para não cortar conteúdo)
- **Fundo**: Branco sólido (`bg-white`)
- **Bordas**: Arredondadas (`rounded-lg md:rounded-xl`)
- **Borda brilhante**: Efeito glow azul-roxo com gradiente

**Estado Atual:**
```tsx
<div className="relative w-full mx-auto" style={{ maxWidth: '500px', aspectRatio: '3/4' }}>
  {/* Borda brilhante */}
  {/* Fundo branco com imagem */}
</div>
```

---

## Fase 2: Correção do Carregamento de Imagens 🔧 (A CORRIGIR)

### 2.1 Problema Identificado
- ❌ Imagens não estão carregando (erro 404 ou caminho incorreto)
- ❌ Espaços nos nomes dos arquivos podem causar problemas

### 2.2 Soluções a Implementar

**Opção A: Verificar caminhos dos arquivos**
```tsx
// Certificar que os caminhos estão corretos
imageUrl: '/certificates/AWS CodeWhisperer - Generative AI para Testes_UC-61e44808-d1e7-4b4e-b314-930bdb70bb71.png'
```

**Opção B: Usar encodeURIComponent para espaços**
```tsx
src={encodeURIComponent(certificates[currentCertIndex].imageUrl)}
```

**Opção C: Verificar se arquivos estão em `/public/certificates/`**
- Arquivos devem estar em: `public/certificates/`
- Nomes devem corresponder exatamente (incluindo espaços e caracteres especiais)

### 2.3 Implementação
```tsx
<img 
  src={certificates[currentCertIndex].imageUrl.replace(/\s/g, '%20')} 
  alt={certificates[currentCertIndex].name}
  style={{ 
    width: '100%', 
    height: '100%', 
    objectFit: 'contain',
    display: 'block'
  }}
  onError={(e) => {
    // Tratamento de erro melhorado
  }}
/>
```

---

## Fase 3: Navegação do Carousel ✅ (JÁ IMPLEMENTADO)

### 3.1 Botões de Navegação
- ✅ Botão anterior (esquerda) com ícone chevron-left
- ✅ Botão próximo (direita) com ícone chevron-right
- ✅ Posicionamento absoluto nas laterais
- ✅ Efeitos hover com escala e brilho

### 3.2 Indicadores (Dots)
- ✅ Pontos indicadores abaixo do certificado
- ✅ Destaque visual no certificado atual (azul brilhante)
- ✅ Clique para navegar diretamente

### 3.3 Funcionalidade
- ✅ Funções `nextCert()`, `prevCert()`, `goToCert(index)`
- ✅ Estado `currentCertIndex` para controle

---

## Fase 4: Ajustes Finais de Design 🎨

### 4.1 Espaçamento
- ✅ Padding vertical no container (`py-8`)
- ✅ Espaçamento entre título e certificado (`mb-6`)
- ✅ Espaçamento dos indicadores (`mt-8`)

### 4.2 Responsividade
- ✅ Largura máxima adaptável
- ✅ Padding responsivo (`p-3 md:p-4`)
- ✅ Tamanhos de fonte responsivos

### 4.3 Efeitos Visuais
- ✅ Borda brilhante com gradiente
- ✅ Sombra profunda (`shadow-2xl`)
- ✅ Transições suaves nos hovers

---

## Checklist de Implementação

### ✅ Concluído
- [x] Estrutura do container principal
- [x] Frame do certificado com borda brilhante
- [x] Sistema de navegação (botões e dots)
- [x] Estado e funções do carousel
- [x] Layout responsivo básico

### ✅ Corrigido
- [x] **CRÍTICO**: Implementado tratamento robusto de carregamento de imagens
- [x] Função helper `getImageSrc()` para garantir caminhos corretos
- [x] Handlers `handleImageError()` e `handleImageLoad()` para gerenciar estados
- [x] Estado `imageErrors` para rastrear quais imagens falharam
- [x] Key dinâmica no `<img>` para forçar re-render quando necessário
- [x] Remoção automática de mensagens de erro quando imagem carregar

### 🎨 Melhorias Opcionais
- [ ] Animação de transição entre certificados
- [ ] Loading state enquanto imagem carrega
- [ ] Lazy loading para melhor performance

---

## Estrutura Final Esperada

```
┌─────────────────────────────────────┐
│        CERTIFICADOS                 │
│  ─────────────────────────────      │
│                                     │
│  Nome do Certificado Atual          │
│                                     │
│  [<]  ┌─────────────┐  [>]         │
│       │             │               │
│       │  Certificado│               │
│       │   (3:4)     │               │
│       │             │               │
│       └─────────────┘               │
│                                     │
│        ● ○ ○ (indicadores)          │
└─────────────────────────────────────┘
```

---

## Próximos Passos Imediatos

1. **Verificar arquivos** em `public/certificates/`
2. **Testar carregamento** de uma imagem específica diretamente no navegador
3. **Corrigir caminhos** se necessário
4. **Ajustar codificação** de URL se espaços forem problema
5. **Testar visualmente** o tamanho do frame

---

## Notas Técnicas

- Formato de certificado padrão: Retrato (3:4)
- Largura máxima recomendada: 500px
- Padding mínimo: 12-16px para não cortar bordas do certificado
- Object-fit: `contain` para preservar proporção sem cortar
