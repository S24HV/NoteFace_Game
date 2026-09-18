# Red Resonance — React / Vite

Первый уровень браузерной 2D horror-игры. Проект продолжает исходный стек:
**React 18 + TypeScript + Vite + SCSS**.

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
```

## Структура

```text
src/
├── App.tsx
├── main.tsx
├── style.scss
├── assets/
│   ├── menu-portrait.png
│   └── game-scene-clean.png
├── components/
│   ├── MainMenu/
│   ├── LevelSelect/
│   ├── Settings/
│   └── Game/
│       ├── GameScene.tsx
│       ├── Player.tsx
│       ├── PlayerController.tsx
│       ├── Boss.tsx
│       ├── HUD.tsx
│       ├── PauseMenu.tsx
│       └── ResultScreen.tsx
├── data/
│   └── gameData.ts
├── hooks/
│   └── useGameManager.ts
├── systems/
│   └── GameManager.ts
└── types/
    └── game.ts
```

## Управление

- `W` / `↑` — движение вверх
- `S` / `↓` — движение вниз
- `Space` — звуковая атака
- `Esc` — пауза

## Механика босса

Звуковая волна летит вправо. Каждый успешный удар активирует текущий символ печати.
Нужно последовательно активировать все символы. После полной последовательности
босс теряет 1 HP и последовательность начинается заново.

Данные уровней и боссов вынесены в `src/data/gameData.ts`, поэтому новые уровни
и боссы добавляются данными, а не переписыванием игрового компонента.
