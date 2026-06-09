# Quiz de Fotos — PWA

App de quiz com fotos que instala no iPhone, Android e PC como aplicativo nativo.

## Arquivos

```
quiz-pwa/
├── index.html      ← app principal
├── manifest.json   ← configuração da PWA
├── sw.js           ← service worker (modo offline)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Como publicar no GitHub Pages (gratuito)

### Passo 1 — Criar conta no GitHub
Acesse https://github.com e crie uma conta gratuita (se ainda não tiver).

### Passo 2 — Criar repositório
1. Clique em **"New repository"**
2. Nome: `quiz-fotos` (ou qualquer nome)
3. Marque **"Public"**
4. Clique em **"Create repository"**

### Passo 3 — Fazer upload dos arquivos
1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste a pasta `quiz-pwa` inteira (ou os arquivos um a um)
3. Certifique-se de que a estrutura ficou assim na raiz:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icons/icon-192.png`
   - `icons/icon-512.png`
4. Clique em **"Commit changes"**

### Passo 4 — Ativar GitHub Pages
1. No repositório, vá em **Settings** → **Pages**
2. Em "Source", selecione **"Deploy from a branch"**
3. Branch: **main** / pasta: **/ (root)**
4. Clique em **Save**
5. Aguarde ~1 minuto

### Passo 5 — Acessar o app
Seu app estará disponível em:
```
https://SEU_USUARIO.github.io/quiz-fotos/
```

---

## Instalar no iPhone como app

1. Abra o link acima no **Safari** do iPhone
2. Toque no ícone de **Compartilhar** (quadrado com seta ↑)
3. Role e toque em **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"**
5. O ícone aparece na tela inicial — abre como app, sem barra do Safari

## Instalar no Android

1. Abra o link no **Chrome**
2. Toque no menu (⋮) → **"Adicionar à tela inicial"**
3. Confirme

## Usar no PC

Abra o link em qualquer navegador — funciona direto, sem instalação.

---

## Banco de questões (JSON)

- **Exportar**: botão "⬇ Exportar" gera `quiz-fotos-DATA.json`
- **Importar**: botão "⬆ Importar" carrega o JSON em qualquer dispositivo
- Os dados também ficam salvos automaticamente no navegador (localStorage)

---

## Funcionalidades

- ✅ Adicionar questões com foto + enunciado + alternativas variáveis (2–8)
- ✅ Editar qualquer questão existente
- ✅ Excluir questões com confirmação
- ✅ Reordenar questões (↑ ↓)
- ✅ Exportar/importar banco em JSON
- ✅ Quiz com progresso e gabarito detalhado
- ✅ Funciona offline (após primeiro acesso)
- ✅ Modo escuro automático
- ✅ Instalável no iPhone, Android e PC
