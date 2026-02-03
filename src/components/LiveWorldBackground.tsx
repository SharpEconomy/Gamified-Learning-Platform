"use client";
import { useEffect, useState } from "react";

export default function LiveWorldBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create coins
    const stage = document.querySelector(".stage");
    if (!stage) return;

    for (let i = 0; i < 8; i++) {
      const coin = document.createElement("div");
      coin.className = "coin";
      coin.style.left = 5 + Math.random() * 90 + "%";
      coin.style.top = 15 + Math.random() * 50 + "%";
      coin.style.animationDelay = Math.random() * 3 + "s";
      stage.appendChild(coin);
    }

    // Create stars
    for (let i = 0; i < 12; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = 5 + Math.random() * 30 + "%";
      star.style.animationDelay = Math.random() * 2 + "s";
      star.style.width = 4 + Math.random() * 8 + "px";
      star.style.height = star.style.width;
      stage.appendChild(star);
    }

    // Create gems
    for (let i = 0; i < 6; i++) {
      const gem = document.createElement("div");
      gem.className = "gem";
      gem.style.left = 10 + Math.random() * 80 + "%";
      gem.style.top = 20 + Math.random() * 40 + "%";
      gem.style.animationDelay = Math.random() * 4 + "s";
      stage.appendChild(gem);
    }

    // Create floating platforms
    const platforms = [
      { left: "10%", bottom: "25%", width: "80px" },
      { left: "75%", bottom: "30%", width: "60px" },
      { left: "20%", bottom: "20%", width: "70px" },
      { left: "60%", bottom: "18%", width: "90px" },
    ];

    platforms.forEach((pos, i) => {
      const platform = document.createElement("div");
      platform.className = "floating-platform";
      platform.style.left = pos.left;
      platform.style.bottom = pos.bottom;
      platform.style.width = pos.width;
      platform.style.animationDelay = i * 0.5 + "s";
      stage.appendChild(platform);
    });

    // Create question blocks
    for (let i = 0; i < 4; i++) {
      const block = document.createElement("div");
      block.className = "question-block";
      block.style.left = 15 + Math.random() * 70 + "%";
      block.style.top = 25 + Math.random() * 35 + "%";
      block.style.animationDelay = Math.random() * 2 + "s";
      stage.appendChild(block);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        .live-bg {
          position: fixed;
          inset: 0;
          z-index: -50;
          pointer-events: none;
          overflow: hidden;
        }

        .stage {
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom,
            #87CEEB 0%,
            #98D8C8 30%,
            #90EE90 60%,
            #228B22 100%);
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        /* Game-style clouds */
        .game-cloud {
          position: absolute;
          background: white;
          border-radius: 20px;
          box-shadow: 
            inset -10px -10px 20px rgba(0,0,0,0.1),
            0 5px 15px rgba(0,0,0,0.1);
        }

        .game-cloud::before,
        .game-cloud::after {
          content: '';
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
        }

        .cloud-1 {
          width: 120px;
          height: 40px;
          top: 8%;
          animation: cloudDrift 25s linear infinite;
        }
        .cloud-1::before {
          width: 50px;
          height: 50px;
          top: -25px;
          left: 20px;
        }
        .cloud-1::after {
          width: 40px;
          height: 40px;
          top: -20px;
          left: 55px;
        }

        .cloud-2 {
          width: 90px;
          height: 30px;
          top: 15%;
          animation: cloudDrift 30s linear infinite;
          animation-delay: -10s;
        }
        .cloud-2::before {
          width: 40px;
          height: 40px;
          top: -20px;
          left: 15px;
        }
        .cloud-2::after {
          width: 30px;
          height: 30px;
          top: -15px;
          left: 45px;
        }

        .cloud-3 {
          width: 140px;
          height: 45px;
          top: 5%;
          animation: cloudDrift 35s linear infinite;
          animation-delay: -20s;
        }
        .cloud-3::before {
          width: 60px;
          height: 60px;
          top: -30px;
          left: 25px;
        }
        .cloud-3::after {
          width: 45px;
          height: 45px;
          top: -22px;
          left: 70px;
        }

        @keyframes cloudDrift {
          from { transform: translateX(-150px); }
          to { transform: translateX(calc(100vw + 150px)); }
        }

        /* Floating platforms */
        .floating-platform {
          position: absolute;
          background: linear-gradient(to bottom, #8B4513 0%, #654321 100%);
          border: 4px solid #4A3520;
          border-radius: 8px;
          animation: platformFloat 4s ease-in-out infinite;
        }

        .floating-platform::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          height: 12px;
          background: linear-gradient(to bottom, #228B22 0%, #32CD32 100%);
          border-radius: 4px 4px 0 0;
          border: 3px solid #1B5E20;
        }

        @keyframes platformFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Coins */
        .coin {
          position: absolute;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
          border-radius: 50%;
          border: 3px solid #B8860B;
          animation: coinSpin 2s linear infinite, coinFloat 3s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
        }

        .coin::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 2px solid #FFE4B5;
          border-radius: 50%;
        }

        @keyframes coinSpin {
          0% { transform: scaleX(1) rotateY(0deg); }
          50% { transform: scaleX(0.1) rotateY(180deg); }
          100% { transform: scaleX(1) rotateY(360deg); }
        }

        @keyframes coinFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Stars */
        .star {
          position: absolute;
          background: #FFD700;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: starTwinkle 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
        }

        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(0.8) rotate(180deg); opacity: 0.6; }
        }

        /* Gems */
        .gem {
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: gemFloat 4s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(255, 20, 147, 0.4);
        }

        .gem::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
        }

        @keyframes gemFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }

        /* Question blocks */
        .question-block {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(to bottom, #FFD93D 0%, #FFA500 100%);
          border: 4px solid #8B4513;
          border-radius: 4px;
          animation: blockBounce 2s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 24px;
          color: #8B4513;
          text-shadow: 1px 1px 0 #FFD93D;
          box-shadow: 
            inset -3px -3px 10px rgba(255,255,255,0.3),
            0 5px 10px rgba(0,0,0,0.2);
        }

        @keyframes blockBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Ground */
        .ground {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20%;
          background: linear-gradient(to bottom, #228B22 0%, #1B5E20 50%, #0D3B0D 100%);
          border-top: 8px solid #32CD32;
        }

        .ground::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: repeating-linear-gradient(
            90deg,
            #32CD32,
            #32CD32 20px,
            #228B22 20px,
            #228B22 40px
          );
        }

        /* Grass tufts */
        .grass-tuft {
          position: absolute;
          width: 8px;
          height: 15px;
          background: #32CD32;
          border-radius: 50% 50% 0 0;
          top: -12px;
        }

        /* Game Hero - TV character */
        .game-hero {
          position: absolute;
          left: 50%;
          bottom: 20%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          animation: heroBounce 1.5s ease-in-out infinite;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.3));
        }

        .hero-body {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4169E1 0%, #2E5AAC 100%);
          border-radius: 12px;
          border: 4px solid #1E3A8A;
          position: relative;
        }

        .hero-screen {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 70%;
          height: 50%;
          background: linear-gradient(135deg, #74B9FF 0%, #0984E3 100%);
          border-radius: 8px;
          border: 3px solid #1E3A8A;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .hero-eye {
          width: 12px;
          height: 12px;
          background: #000;
          border-radius: 50%;
          position: relative;
          animation: blink 3s infinite;
        }

        .hero-eye::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
        }

        @keyframes heroBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-15px); }
        }

        @keyframes blink {
          0%, 85%, 100% { transform: scaleY(1); }
          90% { transform: scaleY(0.1); }
        }

        /* Hills */
        .hills {
          position: absolute;
          bottom: 15%;
          width: 100%;
          height: 40%;
          display: flex;
          align-items: flex-end;
        }

        .hill {
          background: linear-gradient(to bottom, #90EE90 0%, #228B22 100%);
          border-radius: 50% 50% 0 0;
        }

        .hill-1 {
          width: 200px;
          height: 80px;
          margin-left: -50px;
        }

        .hill-2 {
          width: 150px;
          height: 60px;
          margin-left: 100px;
        }

        .hill-3 {
          width: 180px;
          height: 70px;
          position: absolute;
          right: 100px;
        }

        /* Pipe */
        .game-pipe {
          position: absolute;
          bottom: 20%;
          left: 8%;
          width: 50px;
          height: 80px;
          background: linear-gradient(to right, #228B22 0%, #32CD32 50%, #228B22 100%);
          border: 4px solid #1B5E20;
          border-radius: 4px 4px 0 0;
        }

        .game-pipe::before {
          content: '';
          position: absolute;
          top: -15px;
          left: -6px;
          right: -6px;
          height: 20px;
          background: linear-gradient(to right, #32CD32 0%, #90EE90 50%, #32CD32 100%);
          border: 4px solid #1B5E20;
          border-radius: 8px 8px 0 0;
        }

        /* Flag */
        .flag-pole {
          position: absolute;
          bottom: 20%;
          right: 12%;
          width: 6px;
          height: 100px;
          background: #666;
        }

        .flag {
          position: absolute;
          top: 0;
          left: 6px;
          width: 50px;
          height: 35px;
          background: linear-gradient(to bottom, #FF0000 0%, #CC0000 100%);
          clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
          animation: flagWave 2s ease-in-out infinite;
        }

        @keyframes flagWave {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(5deg); }
        }

        /* XP popup */
        .xp-popup {
          position: absolute;
          font-weight: bold;
          font-size: 14px;
          color: #FFD700;
          text-shadow: 2px 2px 0 #000;
          animation: xpFloat 3s ease-out infinite;
        }

        @keyframes xpFloat {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-30px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .game-hero {
            width: 60px;
            height: 60px;
            bottom: 22%;
          }

          .hill {
            transform: scale(0.7);
          }

          .game-pipe {
            height: 60px;
            width: 40px;
          }
        }
      `}</style>

      <div className="live-bg">
        <div className="stage">
          {/* Game Clouds */}
          <div className="game-cloud cloud-1" />
          <div className="game-cloud cloud-2" />
          <div className="game-cloud cloud-3" />

          {/* Hills */}
          <div className="hills">
            <div className="hill hill-1" />
            <div className="hill hill-2" />
            <div className="hill hill-3" />
          </div>

          {/* Game Pipe */}
          <div className="game-pipe" />

          {/* Flag */}
          <div className="flag-pole">
            <div className="flag" />
          </div>

          {/* Floating elements */}
          <div className="xp-popup" style={{ left: "15%", top: "40%" }}>
            +100 XP
          </div>
          <div
            className="xp-popup"
            style={{ left: "75%", top: "35%", animationDelay: "1s" }}
          >
            +50 XP
          </div>
          <div
            className="xp-popup"
            style={{ left: "50%", top: "50%", animationDelay: "2s" }}
          >
            Level Up!
          </div>

          {/* Game Hero */}
          <div className="game-hero">
            <div className="hero-body">
              <div className="hero-screen">
                <div className="hero-eye" />
                <div className="hero-eye" />
              </div>
            </div>
          </div>

          {/* Ground */}
          <div className="ground" />
        </div>
      </div>
    </>
  );
}
