# Quiz de Fotos — PWA

App de quiz educativo multi-tipo que instala no iPhone, Android e PC como aplicativo nativo (PWA). Desenvolvido como arquivo único `index.html` com todas as funcionalidades embutidas.

---

## Arquivos

```
repositório/
├── index.html      ← app completo (único arquivo principal)
├── sw.js           ← service worker (cache + offline, network-first)
├── manifest.json   ← configuração PWA
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Tipos de questão suportados

| Tipo | Descrição |
|------|-----------|
| 📷 **Imagem** | Foto carregada + enunciado + alternativas (2–8) |
| 🕐 **Relógio analógico** | Relógio SVG com ponteiros — resposta por alternativas |
| 💻 **Relógio digital** | Display HH:MM — resposta por alternativas |
| 🌅 **Período do dia** | Display digital + escolha: Madrugada / Manhã / Tarde / Noite |
| 💰 **Valor/Cédulas** | Foto real das cédulas BR (R$ 2, 5, 10, 20, 50, 100, 200) |
| 🔢 **Numeral** | Dois números lado a lado — resposta em lista A/B |
| 🧩 **Quebra-cabeça** | Arrastar peças rotacionadas para os buracos corretos |
| 🔷 **Formas** | SVG de forma geométrica — resposta por voz ou alternativas |
| 💬 **Palavras** | Palavra em destaque — resposta por voz ou alternativas |
| 📄 **Documento** | Texto/imagem de documento — resposta por alternativas |
| ⚖️ **Comparar** | Duas imagens ou formas lado a lado — resposta comparativa |

---

## Funcionalidades principais

### Criação de questões
- Formulário com preview em tempo real por tipo
- Alternativas clicáveis para questões de cédulas (grade visual de notas)
- Configuração por questão: tentativas, resultado (só placar / placar+revisão)
- Leitura do enunciado em voz alta (TTS)
- Aceitar resposta por voz (Speech Recognition, pt-BR)
- Editar questão sem trocar de tipo

### Sistema de quiz
- **Percurso animado** (journey): personagem caminha ao acertar, para ao errar
- **Tentativas configuráveis** com contador regressivo e alertas visuais/sonoros:
  - 2 tentativas restantes → badge amarelo + som de atenção
  - 1 tentativa restante → badge vermelho piscando + som de perigo
- Botão ← Anterior (volta e reseta resposta)
- Botão Pular questão
- Botão ? com instruções lidas em voz alta

### Quebra-cabeça
- Peças nascem rotacionadas aleatoriamente (0°/90°/180°/270°)
- Duplo toque para girar 90°; rejeita peça fora de posição
- Borda verde flash ao encaixar, some depois para revelar a imagem
- Errar posição/buraco desconta tentativa e exibe alerta

### Resultado final
- Placar: certas / erradas / nota percentual
- Revisão por questão (quando configurado): imagem/visual + alternativas com verde/vermelho + tentativas usadas
- Questões configuradas como "só placar" não aparecem na revisão
- Histórico de resultados por quiz e usuário

### Autenticação e usuários
Três níveis de acesso:

| Papel | Permissões |
|-------|-----------|
| `master` | Tudo + configura GitHub + altera todas as senhas |
| `admin` | Cria/edita quizzes + gerencia jogadores |
| Jogador | Acessa quizzes liberados pelo admin |

### Sincronização GitHub
- Dados armazenados em `quiz-data.json` no repositório via GitHub Contents API
- Auto-sync após cada salvo, com SHA para evitar conflito (409)
- Backup/restore manual pelo painel do master
- Histórico de resultados sincronizado por jogador

### PWA / Offline
- Service Worker v8 com **network-first** (sempre busca versão nova do `index.html`)
- Instalável no iPhone (Safari → Compartilhar → Adicionar à Tela de Início)
- Instalável no Android (Chrome → menu → Adicionar à tela inicial)
- Funciona offline após primeiro acesso (exceto sync GitHub)

---

## Como publicar no GitHub Pages

### Passo 1 — Criar repositório
1. Acesse [github.com](https://github.com) e crie uma conta (se não tiver)
2. Clique em **New repository**
3. Nome: `quiz-fotos` · marque **Public** · clique **Create repository**

### Passo 2 — Fazer upload dos arquivos
1. Na página do repositório clique em **"uploading an existing file"**
2. Suba os arquivos na raiz:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - `icons/icon-192.png`
   - `icons/icon-512.png`
3. Clique em **Commit changes**

### Passo 3 — Ativar GitHub Pages
1. Vá em **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / pasta: `/ (root)`
4. Clique em **Save** e aguarde ~1 minuto

### Passo 4 — Acessar
```
https://SEU_USUARIO.github.io/quiz-fotos/
```

### Passo 5 — Configurar GitHub sync (master)
1. Faça login como `master` (senha inicial: `123`)
2. Vá em **⚙ GitHub** no painel admin
3. Preencha: usuário, repositório, arquivo (`quiz-data.json`) e token
4. Token: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained → permissão `Contents: Read and Write`

---

## Instalar como app

**iPhone:**
1. Abra o link no **Safari**
2. Toque em **Compartilhar** (ícone ↑)
3. **Adicionar à Tela de Início** → Adicionar

**Android:**
1. Abra no **Chrome**
2. Menu (⋮) → **Adicionar à tela inicial** → Confirmar

**PC:**
Abra no Chrome/Edge — ícone de instalação aparece na barra de endereço.

---

## Atualizar o app após novo upload

O Service Worker usa **network-first** — o `index.html` é sempre buscado da rede. Após subir um novo `index.html` no GitHub, o usuário recebe a versão atualizada automaticamente na próxima abertura.

Para forçar atualização imediata no Chrome:
- DevTools → Application → Service Workers → **Update** → **skipWaiting**
- Ou: DevTools → Application → Storage → **Clear site data**

---

## Notas técnicas para IAs

- App inteiramente em **um único `index.html`** (~340KB com imagens embutidas em base64)
- Sem dependências externas de JS (vanilla JS puro)
- Imagens das cédulas BR (R$ 2–200) embutidas como `data:image/jpeg;base64`
- Funções chave: `renderQuizQ`, `doRender`, `buildResults`, `renderClockQuestion`, `renderMoneyQuestion`, `renderPuzzleQuestion`, `renderShapesQuestion`, `renderPeriodQuestion`, `renderNumberQuestion`, `buildMoneyAdminGrids`, `handleVoiceAnswer`, `placePiece`, `puzzleWrongAttempt`
- Tipos de questão detectados via `q.qtype` — nunca mostrar `quiz-img` para tipos em `neverShowImg = ['puzzle','shapes','number','clock','money','period','words','compare']`
- `specialTypes` no `doRender` deve incluir todos os tipos interativos para que `renderTypeToCanvas` não sobrescreva o display
- Closure bug em loops `forEach` com `var`: sempre usar IIFE `(function(val){...})(v)` ou `let`
- Service Worker: ao atualizar, incrementar versão de cache (`quiz-fotos-vN`) para invalidar cache antigo
