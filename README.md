# Wordle Clone (React)

A Wordle-style game built with React.

This project uses the official Wordle word list from:
`src/wordlist/words.txt`

## Features

- 5-letter guessing gameplay
- Colored feedback per letter (`green`, `yellow`, `gray/red`)
- Word validation against the bundled Wordle list
- Secret word fetched from a remote source
- Configurable game settings (`secret URL`, `max guesses`, `word length`)

## Tech Stack

- React (Create React App)
- JavaScript
- CSS

## Project Structure

- `src/config/gameConfig.js`: app/game constants
- `src/hooks/useSecretWord.js`: secret word loading hook
- `src/hooks/useWordList.js`: word list loading + parsing hook
- `src/utils/secretWord.js`: secret word fetch/parser utility
- `src/utils/guessUtils.js`: normalize + guess grading utilities
- `src/components/GuessBoard.js`: board UI
- `src/components/GuessInput.js`: guess input UI
- `src/App.js`: main game flow/container

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

App runs at `http://localhost:3000`.

## Scripts

- `npm start`: run in development mode
- `npm test`: run tests
- `npm run build`: create a production build

## Notes

- You can change game settings in `src/config/gameConfig.js`.
