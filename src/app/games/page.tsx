'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Gamepad2, Trophy } from 'lucide-react'
import Link from 'next/link'

// Game Components - Inline for simplicity
function ReactionTimeGame() {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting')
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [startTime, setStartTime] = useState(0)
  const [timeoutRef, settimeoutRef] = useState<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameState('ready')
    setReactionTime(0)
    
    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000
    
    const timeout = setTimeout(() => {
      setStartTime(Date.now())
      setGameState('go')
    }, delay)
    
    settimeoutRef(timeout)
  }

  const handleScreenClick = () => {
    if (gameState === 'go') {
      const endTime = Date.now()
      const time = endTime - startTime
      setReactionTime(time)
      setGameState('result')
      
      // Update best time
      if (!bestTime || time < bestTime) {
        setBestTime(time)
        // Update high score (lower time = better score, convert to points)
        const points = Math.max(0, Math.floor(500 - time / 10))
        const currentHigh = parseInt(localStorage.getItem('highScore') || '0')
        if (points > currentHigh) {
          localStorage.setItem('highScore', points.toString())
        }
      }
    } else if (gameState === 'ready') {
      // Clicked too early
      if (timeoutRef) {
        clearTimeout(timeoutRef)
        settimeoutRef(null)
      }
      setGameState('waiting')
    }
  }

  const resetGame = () => {
    setGameState('waiting')
    setReactionTime(0)
    setBestTime(null)
    if (timeoutRef) {
      clearTimeout(timeoutRef)
      settimeoutRef(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">⚡ Reaction Time</h2>
      <p className="text-slate-700">Logic: Timing, event handling, reflex measurement</p>

      {gameState === 'waiting' && (
        <>
          <Button onClick={startGame} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">
            🎮 Start Test
          </Button>
          <p className="text-sm text-slate-600">Click as fast as you can when screen turns green!</p>
        </>
      )}

      {gameState === 'ready' && (
        <div 
          onClick={handleScreenClick}
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-16 px-12 rounded-2xl transition-all w-full max-w-md"
        >
          🔴 Wait for it...
        </div>
      )}

      {gameState === 'go' && (
        <div 
          onClick={handleScreenClick}
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-16 px-12 rounded-2xl animate-pulse transition-all w-full max-w-md"
        >
          🟢 CLICK NOW!
        </div>
      )}

      {gameState === 'result' && (
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold text-green-600">
            {reactionTime}ms
          </div>
          <div className="text-lg text-slate-700">
            {reactionTime < 250 && '⚡ Incredible speed!'}
            {reactionTime >= 250 && reactionTime < 350 && '🏃 Great reflexes!'}
            {reactionTime >= 350 && reactionTime < 450 && '👍 Good reaction time!'}
            {reactionTime >= 450 && reactionTime < 600 && '😊 Not bad, keep practicing!'}
            {reactionTime >= 600 && '🐢 A bit slow, try again!'}
          </div>
          {bestTime && (
            <div className="text-xl font-bold text-yellow-600">
              Best: {bestTime}ms
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={startGame} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">
              🔄 Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)

  const codes = ['A', 'B', 'C', 'D', '1', '2', '3', '4']
  const totalPairs = 4

  const shuffle = (array: string[]) => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  useEffect(() => {
    const shuffled = [...codes, ...codes]
    shuffle(shuffled)

    const initialCards = shuffled.map((code, i) => ({
      id: i,
      value: code,
      flipped: false,
      matched: false
    }))

    setCards(initialCards)
  }, [])

  const flipCard = (index: number) => {
    if (flippedCards.length >= 2 || cards[index].flipped || cards[index].matched) return

    const newFlipped = [...flippedCards, index]
    const updatedCards = [...cards]
    updatedCards[index].flipped = true

    setFlippedCards(newFlipped)
    setCards(updatedCards)

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const finalCards = [...updatedCards]

        if (updatedCards[newFlipped[0]].value === updatedCards[newFlipped[1]].value) {
          finalCards[newFlipped[0]].matched = true
          finalCards[newFlipped[1]].matched = true
          setMatches((prev) => prev + 1)
          
          // Update high score
          const currentHigh = parseInt(localStorage.getItem('highScore') || '0')
          const newScore = matches * 2
          if (newScore > currentHigh) {
            localStorage.setItem('highScore', newScore.toString())
          }
        } else {
          finalCards[newFlipped[0]].flipped = false
          finalCards[newFlipped[1]].flipped = false
        }

        setCards(finalCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  const resetGame = () => {
    const shuffled = [...codes, ...codes]
    shuffle(shuffled)

    const initialCards = shuffled.map((code, i) => ({
      id: i,
      value: code,
      flipped: false,
      matched: false
    }))

    setCards(initialCards)
    setFlippedCards([])
    setMatches(0)
  }

  const isComplete = matches === totalPairs

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">🧠 Memory Match</h2>
      <p className="text-slate-700">Concept: Array matching, flip tracking</p>

      {!isComplete ? (
        <>
          <div className="mb-4 text-lg">
            <span className="text-slate-600">Matches: </span>
            <span className="text-2xl font-bold text-purple-600">{matches}</span>
            <span className="text-slate-600">/{totalPairs}</span>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => flipCard(index)}
                disabled={card.matched}
                className={`
                  w-20 h-20 rounded-xl font-bold text-2xl transition-all duration-300
                  ${card.flipped || card.matched
                    ? card.matched
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-4 border-green-600'
                      : 'bg-gradient-to-br from-purple-400 to-pink-500 text-white border-4 border-purple-600 rotate-y-180'
                    : 'bg-gradient-to-br from-slate-400 to-slate-500 border-4 border-slate-600 hover:scale-105 cursor-pointer'
                  }
                `}
              >
                {card.flipped || card.matched ? card.value : '?'}
              </button>
            ))}
          </div>

          <Button onClick={resetGame} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">
            Restart Game
          </Button>

          {isComplete && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-center">
              <p className="text-xl font-bold">🎉 All Matched! Great Memory!</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600 mb-4">🎉 You Won!</p>
          <p className="text-lg text-slate-700 mb-4">Amazing memory! Want to play again?</p>
          <Button onClick={resetGame} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const calculateWinner = (squares: (string | null)[]) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      
      // Update high score for winning
      if (newWinner === 'X') {
        const currentHigh = parseInt(localStorage.getItem('highScore') || '0')
        localStorage.setItem('highScore', (currentHigh + 10).toString())
      }
      
      return
    }

    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
  }

  const isDraw = !winner && !board.includes(null)

  const getStatus = () => {
    if (winner) {
      return winner === 'X' ? '🎉 You Win!' : '🤖 AI Wins!'
    }
    if (isDraw) {
      return "🤝 It's a Draw!"
    }
    return xIsNext ? 'Your Turn (X)' : 'AI Turn (O)'
  }

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
              ${cell
                ? cell === 'X'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white border-4 border-blue-700'
                  : 'bg-gradient-to-br from-red-400 to-red-600 text-white border-4 border-red-700'
                : 'bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-slate-300 hover:scale-105 hover:border-slate-400 cursor-pointer'
              }
            `}
          >
            {cell || ''}
          </button>
        ))}
      </div>

      <Button onClick={resetGame} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition-transform">
        Restart Game
      </Button>
    </div>
  )
}

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<'reaction' | 'memory' | 'ttt' | null>(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHighScore = localStorage.getItem('highScore') || '0'
      setTimeout(() => {
        setHighScore(parseInt(savedHighScore))
      }, 0)
    }
  }, [])

  const games = [
    {
      id: 'reaction' as const,
      title: 'Reaction Time',
      description: 'Logic: Timing, event handling, reflex measurement',
      icon: '⚡',
      component: ReactionTimeGame,
      color: 'from-green-500 to-emerald-600',
      xp: 'Speed & Timing'
    },
    {
      id: 'memory' as const,
      title: 'Memory Match',
      description: 'Concept: Array matching, flip tracking',
      icon: '🧠',
      component: MemoryGame,
      color: 'from-purple-500 to-pink-600',
      xp: 'Memory & Arrays'
    },
    {
      id: 'ttt' as const,
      title: 'Tic-Tac-Toe',
      description: 'Concept: Win conditions, AI opponent',
      icon: '❌',
      component: TicTacToeGame,
      color: 'from-blue-500 to-purple-600',
      xp: 'Conditions & AI'
    }
  ]

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'reaction':
        return <ReactionTimeGame />
      case 'memory':
        return <MemoryGame />
      case 'ttt':
        return <TicTacToeGame />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-purple-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <Trophy className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-bold text-slate-900">
              High Score: <span className="text-2xl font-bold text-amber-600">{highScore}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold text-purple-600">CodeQuest Games</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!selectedGame ? (
          <>
            {/* Title Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                🎮 Learn Through <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Games!</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Master coding concepts through fun games! Each game teaches different programming principles.
              </p>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className="group cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20"
                  onClick={() => setSelectedGame(game.id)}
                >
                  <CardHeader>
                    <div className={`p-8 rounded-2xl bg-gradient-to-br ${game.color} text-white shadow-lg group-hover:scale-110 transition-transform mb-4`}>
                      <span className="text-6xl">{game.icon}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 mt-2">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                        🔹 {game.xp}
                      </div>
                      <span className="text-sm text-slate-500 group-hover:text-purple-600 transition-colors">
                        Click to play →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={() => setSelectedGame(null)}
                variant="outline"
                size="sm"
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Button>
            </div>
            <Card className="bg-white shadow-xl border-2 border-purple-200">
              <CardContent className="p-8">
                {renderSelectedGame()}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
