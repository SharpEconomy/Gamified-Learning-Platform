"use client";

import { useState, useCallback } from "react";

export default function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const calculateWinner = useCallback((squares: (string | null)[]) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = xIsNext ? "X" : "O";
      setBoard(newBoard);

      const newWinner = calculateWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      }

      setXIsNext(!xIsNext);
    },
    [board, xIsNext, winner, calculateWinner],
  );

  const aiMove = useCallback(() => {
    if (winner || !board.includes(null)) return;

    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((i): i is number => i !== null);
    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];

    const newBoard = [...board];
    newBoard[randomMove as number] = "O";
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }

    setXIsNext(true);
  }, [board, winner, calculateWinner]);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        aiMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, aiMove]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }, []);

  const isDraw = !winner && !board.includes(null);

  const getStatus = () => {
    if (winner) {
      return winner === "X" ? "🎉 You Win!" : "🤖 AI Wins!";
    }
    if (isDraw) {
      return "🤝 It's a Draw!";
    }
    return xIsNext ? "Your Turn (X)" : "AI Turn (O)";
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">❌ Tic-Tac-Toe</h2>
      <p className="text-slate-700">Concept: Win conditions, AI logic</p>

      <div className="mb-4 text-xl font-bold text-purple-600">
        {getStatus()}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={cell !== null || winner !== null}
            className={`
              w-24 h-24 text-5xl font-bold rounded-xl transition-all duration-200
              ${
                cell
                  ? cell === "X"
                    ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white border-4 border-blue-700"
                    : "bg-gradient-to-br from-red-400 to-red-600 text-white border-4 border-red-700"
                  : "bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-slate-300 hover:scale-105 hover:border-slate-400 cursor-pointer"
              }
            `}
          >
            {cell || ""}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
      >
        Restart Game
      </button>
    </div>
  );
}
