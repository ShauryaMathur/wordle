import React from "react";
import { normalizeWord } from "../utils/guessUtils";

function GuessInput({ input, wordLength, disabled, canSubmit, onSubmit, onChange }) {
  return (
    <div className="guess-controls">
      <input
        className="guess-input"
        value={input}
        disabled={disabled}
        maxLength={wordLength}
        onChange={(e) => {
          const cleaned = normalizeWord(e.target.value).replace(/[^A-Z]/g, "");
          onChange(cleaned.slice(0, wordLength));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder="Type 5 letters..."
      />
      <button className="guess-button" onClick={onSubmit} disabled={!canSubmit}>
        Guess
      </button>
    </div>
  );
}

export default GuessInput;
