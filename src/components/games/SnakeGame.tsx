"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const snake = useRef([{ x: 200, y: 200 }]);
  const dxRef = useRef(20);
  const dyRef = useRef(0);
  const foodRef = useRef({ x: 200, y: 200 });
  const gameRunningRef = useRef(false);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  const generateFood = useCallback(() => {
    foodRef.current = {
      x: Math.floor(Math.random() * 20) * 20,
      y: Math.floor(Math.random() * 20) * 20,
    };
  }, []);

  const hasGameEnded = useCallback(() => {
    const head = snake.current[0];
    for (let i = 1; i < snake.current.length; i++) {
      if (head.x === snake.current[i].x && head.y === snake.current[i].y) {
        return true;
      }
    }
    return head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400;
  }, []);

  const gameLoop = useCallback(() => {
    if (!gameRunningRef.current || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 400, 400);

    // Draw snake
    snake.current.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? "#4ecdc4" : "#44bd32";
      ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    // Draw food
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(foodRef.current.x, foodRef.current.y, 20, 20);

    // Move snake
    const head = {
      x: snake.current[0].x + dxRef.current,
      y: snake.current[0].y + dyRef.current,
    };

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      const newScore = score + 1;
      setScore(newScore);
      generateFood();
      snake.current.unshift({ x: snake.current[0].x, y: snake.current[0].y });

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snakeHighScore", newScore.toString());
      }
    } else {
      snake.current.unshift(head);
      snake.current.pop();
    }

    if (hasGameEnded()) {
      setGameOver(true);
      gameRunningRef.current = false;
      return;
    }

    setTimeout(gameLoop, 150);
  }, [score, highScore, gameOver, generateFood, hasGameEnded]);

  const changeDirection = useCallback((e: KeyboardEvent) => {
    const LEFT = 37,
      UP = 38,
      RIGHT = 39,
      DOWN = 40;
    if (e.keyCode === LEFT && dxRef.current === 0) {
      dxRef.current = -20;
      dyRef.current = 0;
    }
    if (e.keyCode === UP && dyRef.current === 0) {
      dxRef.current = 0;
      dyRef.current = -20;
    }
    if (e.keyCode === RIGHT && dxRef.current === 0) {
      dxRef.current = 20;
      dyRef.current = 0;
    }
    if (e.keyCode === DOWN && dyRef.current === 0) {
      dxRef.current = 0;
      dyRef.current = 20;
    }
  }, []);

  const startGame = useCallback(() => {
    snake.current = [{ x: 200, y: 200 }];
    dxRef.current = 20;
    dyRef.current = 0;
    setScore(0);
    setGameOver(false);
    generateFood();
    gameRunningRef.current = true;
    gameLoop();
  }, [generateFood, gameLoop]);

  useEffect(() => {
    document.addEventListener("keydown", changeDirection);
    return () => {
      document.removeEventListener("keydown", changeDirection);
    };
  }, [changeDirection]);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">🐍 Snake Game</h2>
      <p className="text-slate-700">
        Logic: Collision detection, array manipulation
      </p>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-4 border-white rounded-xl shadow-2xl"
        />

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-xl font-bold text-slate-900 mb-4">
                Game Over!
              </p>
              <p className="text-lg text-slate-700">Score: {score}</p>
              <button
                onClick={startGame}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="text-lg">
          <span className="text-slate-600">Score: </span>
          <span className="text-2xl font-bold text-green-600">{score}</span>
        </div>
        <button
          onClick={startGame}
          disabled={gameRunningRef.current && !gameOver}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50"
        >
          {gameRunningRef.current && !gameOver ? "Playing..." : "Start Game"}
        </button>
      </div>

      <p className="text-sm text-slate-600">Use arrow keys to move</p>
    </div>
  );
}
