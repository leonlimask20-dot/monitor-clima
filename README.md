# Monitor de Clima

![CI](https://github.com/leonlimask20-dot/monitor-clima/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Testes](https://img.shields.io/badge/testes-Jest%20+%20RTL-C21325?logo=jest&logoColor=white)

Monitor de clima para cidades brasileiras com dados em tempo real via Open-Meteo API.

---

## Principais competências demonstradas

- React 18 com Hooks — useState, useCallback, hook customizado
- Bootstrap 5 — grid responsivo, cards, badges, spinner
- Consumo de API externa — Open-Meteo (gratuita, sem cadastro)
- Hook customizado — separação de lógica de negócio dos componentes
- Testes com Jest e React Testing Library — componentes e serviços
- Pipeline de CI com GitHub Actions

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | 18 |
| Bootstrap | 5.3 |
| Bootstrap Icons | 1.11 |
| Jest | 29 |
| React Testing Library | 14 |
| Vite | 5 |

---

## Funcionalidades

- Busca de qualquer cidade do mundo por nome
- Temperatura atual, sensação térmica, umidade e velocidade do vento
- Descrição do clima com ícone e cor por condição
- Botões de acesso rápido para cidades brasileiras
- Feedback visual de carregamento e erros
- Prioriza resultados do Brasil na busca

---

## Arquitetura

```
src/
├── components/
│   ├── BuscaCidade.jsx   ← formulário de busca com controlled input
│   └── CartaoClima.jsx   ← card com dados climáticos
├── hooks/
│   └── useClima.js       ← hook customizado com useState e useCallback
├── services/
│   └── climaApi.js       ← integração com Open-Meteo API
└── tests/
    ├── climaApi.test.js  ← testes do serviço com fetch mockado
    ├── CartaoClima.test.js ← testes do componente com RTL
    └── BuscaCidade.test.js ← testes de interação do usuário
```

---

## Como executar

```bash
npm install
npm run dev
```

Interface disponível em `http://localhost:5173`

---

## Testes

```bash
npm test
```

---

## API utilizada

[Open-Meteo](https://open-meteo.com) — gratuita, open source, sem cadastro.

Fluxo de chamadas:
1. `GET geocoding-api.open-meteo.com/v1/search?name={cidade}` — busca coordenadas
2. `GET api.open-meteo.com/v1/forecast?latitude=...&longitude=...` — busca clima

---

## Autor

**LNL**
GitHub: [@leonlimask20-dot](https://github.com/leonlimask20-dot)
Email: leonlimask@gmail.com
