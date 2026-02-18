"use client";

import React, { useState, useEffect } from "react";

const emptyBoard = Array(9).fill(null);

type Player = "X" | "O" | null;

function checkWinner(board: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function findBestMove(board: Player[]): number {
  // Try to win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const copy = board.slice();
      copy[i] = "O";
      if (checkWinner(copy) === "O") return i;
    }
  }
  // Block X's win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const copy = board.slice();
      copy[i] = "X";
      if (checkWinner(copy) === "X") return i;
    }
  }
  // Otherwise, pick first available
  return board.findIndex(cell => cell === null);
}

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = checkWinner(board);

  // Bot move: after user (X) plays, let O play automatically
  useEffect(() => {
    if (!xIsNext && !winner && board.some(cell => cell === null)) {
      const botMove = findBestMove(board);
      if (botMove !== -1) {
        setTimeout(() => {
          setBoard(prev => {
            const newBoard = prev.slice();
            newBoard[botMove] = "O";
            return newBoard;
          });
          setXIsNext(true);
        }, 500);
      }
    }
  }, [xIsNext, winner, board]);

  function handleClick(idx: number) {
    if (board[idx] || winner || !xIsNext) return;
    const newBoard = board.slice();
    newBoard[idx] = "X";
    setBoard(newBoard);
    setXIsNext(false);
  }

  function reset() {
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      background: "#f5f5dc",
      border: "2px solid #d6c9a5",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      padding: 16,
      zIndex: 10000,
      width: 160,
      textAlign: "center"
    }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Tic-Tac-Toe</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: 40,
              height: 40,
              fontSize: 20,
              fontWeight: 700,
              background: cell ? "#d6c9a5" : "#fff",
              color: "#333",
              border: "1px solid #d6c9a5",
              borderRadius: 6,
              cursor: cell || winner || !xIsNext ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, minHeight: 24 }}>
        {winner ? (
          <span style={{ color: "#7c6f4c", fontWeight: 600 }}>{winner} wins!</span>
        ) : board.every(Boolean) ? (
          <span style={{ color: "#7c6f4c", fontWeight: 600 }}>Draw!</span>
        ) : (
          <span style={{ color: "#7c6f4c" }}>{xIsNext ? "Your" : "Bot"}'s turn</span>
        )}
      </div>
      <button onClick={reset} style={{ marginTop: 8, fontSize: 12, color: "#7c6f4c", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Reset</button>
    </div>
  );
};

export default TicTacToe;
