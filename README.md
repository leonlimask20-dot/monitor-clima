# Monitor de Clima

![CI](https://github.com/leonlimask20-dot/monitor-clima/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Tests](https://img.shields.io/badge/tests-Jest%20+%20RTL-C21325?logo=jest&logoColor=white)

Weather monitor for cities worldwide with real-time data via the Open-Meteo API.

---

## Key skills demonstrated

- React 18 with Hooks — useState, useCallback, custom hook
- Bootstrap 5 — responsive grid, cards, badges, spinner
- External API consumption — Open-Meteo (free, no registration)
- Custom hook — business logic separated from components
- Testing with Jest and React Testing Library — components and services
- CI pipeline with GitHub Actions

---

## Tech stack

| Technology | Version |
|---|---|
| React | 18 |
| Bootstrap | 5.3 |
| Bootstrap Icons | 1.11 |
| Jest | 29 |
| React Testing Library | 14 |
| Vite | 5 |

---

## Features

- Search any city in the world by name
- Current temperature, feels-like, humidity and wind speed
- Weather description with an icon and a color per condition
- Quick-access buttons for major cities
- Visual feedback for loading and errors
- Prioritizes Brazilian results in the search

---

## Architecture

```
src/
├── components/
│   ├── BuscaCidade.jsx   ← search form with a controlled input
│   └── CartaoClima.jsx   ← card with weather data
├── hooks/
│   └── useClima.js       ← custom hook with useState and useCallback
├── services/
│   └── climaApi.js       ← integration with the Open-Meteo API
└── tests/
    ├── climaApi.test.js    ← service tests with a mocked fetch
    ├── CartaoClima.test.js  ← component tests with RTL
    └── BuscaCidade.test.js  ← user interaction tests
```

---

## How to run

```bash
npm install
npm run dev
```

Interface available at `http://localhost:5173`

---

## Tests

```bash
npm test
```

---

## API used

[Open-Meteo](https://open-meteo.com) — free, open source, no registration.

Call flow:
1. `GET geocoding-api.open-meteo.com/v1/search?name={city}` — fetch coordinates
2. `GET api.open-meteo.com/v1/forecast?latitude=...&longitude=...` — fetch weather

---

## 🤖 Agent Architecture

This project was built and code-reviewed using a **multi-agent
context-optimization workflow**: specialized AI agents each audit a single
slice of the codebase — components, custom hooks, services, tests — within a
strict context budget. The approach cuts review time and token cost while
keeping full traceability of every finding.

Methodology, agent templates and the full playbook: **[leonlim3.gumroad.com](https://leonlim3.gumroad.com)**

---

## Author

**LNL**
GitHub: [@leonlimask20-dot](https://github.com/leonlimask20-dot)
Email: leonlimask@gmail.com
