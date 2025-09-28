# Budgeting tool

A personal budgeting tool that runs entirely in the browser.

## Features

- Track income and expenses
- Define categories (e.g. groceries, rent, entertainment, savings)
- Project expenses per category
- Compare actual spending to projected spending per category
- Check how much money is free to spend
- Estimate whether future obligations can be covered
- Simulate budget adjustments (e.g. "What happens if I reduce dining out by $100 per month?").

## Tech stack

- NPM
- React
- TypeScript
- Vite
- Recharts
- ESLint
- Prettier

Budget data is stored locally on device - no database.

## Setup instructions

```zsh
npm install
npm run build
```

## Command line

```zsh
npm run dev # start a dev server with vite
npm run build # build with vite
npm run preview # serve the latest build
npm run lint # see linting issues with eslint
npm run lint:fix # fix linting issues with eslint
npm run format # see formatting issues with prettier
npm run format:fix # fix formatting issues with prettier
```
