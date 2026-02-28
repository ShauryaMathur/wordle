import React, { useMemo, useState } from "react";
import "./App.css";
import wordFile from "./wordlist/words.txt";
import { MAX_GUESSES, SECRET_URL, WORD_LEN } from "./config/gameConfig";
import { gradeGuess, normalizeWord } from "./utils/guessUtils";
import GuessBoard from "./components/GuessBoard";
import GuessInput from "./components/GuessInput";
import { useSecretWord } from "./hooks/useSecretWord";
import { useWordList } from "./hooks/useWordList";

function App() {
  const { secret, loading: secretLoading, error: secretError } = useSecretWord(SECRET_URL);
  const { wordSet, loading: wordListLoading, error: wordListError } = useWordList(wordFile);

  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  const loading = secretLoading || wordListLoading;
  const loadErr = secretError || wordListError;
  const won = secret.length > 0 && guesses[guesses.length - 1] === secret;
  const lost = !won && guesses.length >= MAX_GUESSES;
  const gameOver = won || lost;
  const inputDisabled = loading || !!loadErr || gameOver;
  const canSubmit = !inputDisabled && normalizeWord(input).length === WORD_LEN;

  const rows = useMemo(() => {
    const out = [];
    for (let i = 0; i < MAX_GUESSES; i++) out.push(guesses[i] ?? "");
    return out;
  }, [guesses]);

  const gradedRows = useMemo(() => {
    if (!secret) return rows.map(() => Array(WORD_LEN).fill(null));
    return rows.map((g) => {
      if (g.length !== WORD_LEN) return Array(WORD_LEN).fill(null);
      return gradeGuess(secret, g);
    });
  }, [rows, secret]);

  function submitGuess() {
    if (loading || loadErr || gameOver) return;
    if (!secret) return;

    const g = normalizeWord(input);
    if (g.length !== WORD_LEN) return;
    if (guesses.length >= MAX_GUESSES) return;

    // Check word list
    if (!wordSet.has(g.toLowerCase())) {
      setStatusMsg("Not in word list");
      setInput("");
      return;
    }

    const next = [...guesses, g];
    setGuesses(next);
    setInput("");

    if (g === secret) {
      setStatusMsg("You've won!");
      return;
    }

    if (next.length === MAX_GUESSES) {
      setStatusMsg("You've lost!");
      return;
    }

    if (next.length === MAX_GUESSES - 1) {
      setStatusMsg("Last try left!");
    }
  }

  return (
    <div className="app-shell">
      <div className="app-card">
        <h2 className="app-title">WORDLE</h2>
        {loading && <div>Loading...</div>}
        {!loading && loadErr && (
          <div className="app-error">
            <b>Error loading secret:</b> {loadErr}
          </div>
        )}

        <GuessBoard rows={rows} gradedRows={gradedRows} wordLength={WORD_LEN} />

        <GuessInput
          input={input}
          wordLength={WORD_LEN}
          disabled={inputDisabled}
          canSubmit={canSubmit}
          onSubmit={submitGuess}
          onChange={(nextValue) => {
            setStatusMsg("");
            setInput(nextValue);
          }}
        />

        {statusMsg && <div className="app-status">{statusMsg}</div>}
      </div>
    </div>
  );
}

export default App;
