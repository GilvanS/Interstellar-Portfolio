# 🔄 Rotação Automática de Branches - A cada 6 horas

## 📋 Como Funciona

O workflow `.github/workflows/deploy-scheduled.yml` alterna automaticamente entre duas branches do seu repositório a cada 6 horas:

- **00h-05h UTC**: Deploy da branch `main`
- **06h-11h UTC**: Deploy da branch `alternative`
- **12h-17h UTC**: Deploy da branch `main`
- **18h-23h UTC**: Deploy da branch `alternative`

## 🚀 Configuração Inicial

### 1. Criar a segunda branch

Você precisa criar uma segunda branch com uma versão alternativa do site:

```bash
# Criar e fazer checkout da branch alternative
git checkout -b alternative

# Fazer as alterações que deseja nesta versão
# (ex: cores diferentes, conteúdo diferente, etc.)

# Commit e push
git add .
git commit -m "feat: Versão alternativa do site"
git push origin alternative
```

### 2. Personalizar os nomes das branches (opcional)

Se você quiser usar nomes diferentes de `main` e `alternative`, edite o arquivo `.github/workflows/deploy-scheduled.yml` e altere:

```yaml
# Linha ~24-35: Altere 'main' e 'alternative' para os nomes desejados
if [ $HOUR -ge 0 ] && [ $HOUR -lt 6 ]; then
  echo "branch=main" >> $GITHUB_OUTPUT  # ← Altere aqui
elif [ $HOUR -ge 6 ] && [ $HOUR -lt 12 ]; then
  echo "branch=alternative" >> $GITHUB_OUTPUT  # ← Altere aqui
# ... etc
```

### 3. Ativar o workflow

1. Acesse: `https://github.com/gilvans/Interstellar-Portfolio/actions`
2. Clique no workflow **"Deploy Scheduled - Branch Rotation"**
3. Clique em **"Run workflow"** para testar manualmente pela primeira vez
4. O workflow será executado automaticamente a cada 6 horas

## ⚙️ Como Funciona o Agendamento

O workflow usa cron jobs do GitHub Actions:

```yaml
schedule:
  - cron: '0 */6 * * *'  # A cada 6 horas (0h, 6h, 12h, 18h UTC)
```

**⚠️ Importante**: O GitHub Actions pode ter um atraso de até 15 minutos nos agendamentos. Isso é normal e esperado.

## 🎯 Execução Manual

Você também pode executar o workflow manualmente:

1. Vá em **Actions** > **Deploy Scheduled - Branch Rotation**
2. Clique em **"Run workflow"**
3. Escolha a branch desejada ou deixe em **"auto"** para usar a lógica automática

## 📊 Fuso Horário

O agendamento usa **UTC (Coordinated Universal Time)**. Para calcular o horário local:

- **UTC-3 (Brasil)**:
  - 00h UTC = 21h (dia anterior)
  - 06h UTC = 03h
  - 12h UTC = 09h
  - 18h UTC = 15h

## 🔍 Monitoramento

Para acompanhar os deploys:

1. Acesse: `https://github.com/gilvans/Interstellar-Portfolio/actions`
2. Filtre por workflow: **"Deploy Scheduled - Branch Rotation"**
3. Veja o histórico de execuções e qual branch foi deployada em cada horário

## ⚠️ Observações Importantes

1. **Conflitos de Deploy**: O workflow usa um grupo de concorrência separado (`pages-scheduled`) para evitar conflitos com o deploy manual
2. **Ambas as branches devem compilar**: Certifique-se de que ambas as branches estão funcionando corretamente antes de ativar o workflow
3. **Primeira execução**: Recomenda-se executar manualmente pela primeira vez para garantir que está funcionando

## 🔧 Troubleshooting

### O workflow não está executando automaticamente

- Verifique se o workflow está habilitado no repositório
- Certifique-se de que há pelo menos um push recente no repositório (GitHub Actions requer atividade recente)
- Verifique os logs em Actions para erros

### A branch errada está sendo deployada

- Verifique o horário UTC atual
- Execute manualmente selecionando a branch desejada
- Verifique os logs do job `determine-branch` no workflow

### O deploy falha

- Verifique se ambas as branches têm todos os arquivos necessários
- Certifique-se de que o `package.json` está atualizado em ambas
- Verifique os logs do workflow para erros específicos

---

**"Automação é a chave para a eficiência."** — *Sistema configurado por Gilvan Sousa*

