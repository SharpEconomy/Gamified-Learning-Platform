"use client";

import { useEffect, useState } from "react";

export default function GamifiedGames() {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const score = localStorage.getItem("highScore") || "0";
    setHighScore(Number(score));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>🎮 Gamified Coding Platform</h1>

      <p>
        Coding seekho 3 mazedaar games ke through! Har game complete
        karo aur badge unlock karo.
      </p>

      <h2>High Score: {highScore}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => alert("Snake Game load here")}>
          🐍 Snake Game
        </button>

        <button onClick={() => alert("Memory Game load here")}>
          🧠 Memory Match
        </button>

        <button onClick={() => alert("Tic Tac Toe load here")}>
          ❌ Tic-Tac-Toe
        </button>
      </div>
    </div>
  );
}
