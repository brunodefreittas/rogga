# Rôgga App — Protótipo Mobile

Protótipo funcional do app institucional Rôgga, construído em React + Vite.

## Pré-requisitos

- **Node.js** 18+ instalado → [nodejs.org](https://nodejs.org)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

O navegador abrirá automaticamente em `http://localhost:5173`.

## Como publicar (build estático)

```bash
npm run build
```

Os arquivos estáticos ficam em `dist/`. Pode hospedar em qualquer servidor (Vercel, Netlify, GitHub Pages, etc).

## Estrutura

```
rogga-app/
├── index.html          ← Entrada HTML (fontes, reset CSS)
├── package.json        ← Dependências (React + Vite)
├── vite.config.js      ← Config do Vite
├── src/
│   ├── main.jsx        ← Bootstrap React
│   └── App.jsx         ← Componente principal (todas as telas)
└── README.md
```

## Telas incluídas

- Login (CPF + senha)
- Seleção de empreendimento
- Home (Inicial)
- Meu Apê
- Progresso da Obra
- Minhas Parcelas (multi-select, antecipação)
- IR (Imposto de Renda)
- Documentos
- Procurações
- Patrimônio de Afetação
- Notificações
- Troca de Titularidade
- Atendimento (fluxo completo)
- Perfil
