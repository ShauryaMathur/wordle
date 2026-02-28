import { WORD_LEN } from "../config/gameConfig";

export function normalizeWord(value) {
  return (value ?? "").trim().toUpperCase();
}

export function gradeGuess(secret, guess) {
  const res = Array(WORD_LEN).fill("red");
  for (let i = 0; i < WORD_LEN; i++) {
    const g = guess[i];
    if (!g) continue;
    if (secret[i] === g) res[i] = "green";
    else if (secret.includes(g)) res[i] = "yellow";
    else res[i] = "red";
  }
  return res;
}
