import React from "react";

function GuessBoard({ rows, gradedRows, wordLength }) {
  return (
    <div className="board">
      {rows.map((word, rowIndex) => (
        <div
          key={rowIndex}
          className="board-row"
          style={{ gridTemplateColumns: `repeat(${wordLength}, 44px)` }}
        >
          {Array.from({ length: wordLength }).map((_, colIndex) => {
            const ch = word[colIndex] ?? "";
            const status = gradedRows[rowIndex][colIndex];
            const tileClass = status ? `tile tile--${status}` : "tile";
            return (
              <div key={colIndex} className={tileClass}>
                {ch}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GuessBoard;
