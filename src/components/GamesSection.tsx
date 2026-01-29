'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Flame, ArrowRight, Zap } from 'lucide-react'

interface GamesSectionProps {
  className?: string
}

export default function GamesSection({ className = '' }: GamesSectionProps) {
  const [currentGame, setCurrentGame] = useState<'reaction' | 'memory' | 'ttt' | null>(null)
  const [highScore, setHighScore] = useState(0)
  
  // Load high score on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highScore') || '0'
      setHighScore(parseInt(saved))
    }
  }, [])

  // Update high score helper
  const updateHighScore = useCallback((newScore: number) => {
    setHighScore(newScore)
    if (typeof window !== 'undefined') {
      localStorage.setItem('highScore', newScore.toString())
    }
  }, [])

  // Reaction Time Game State
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting')
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [startTime, setStartTime] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Memory Game State
  const [cards, setCards] = useState<string[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [memoryScore, setMemoryScore] = useState(0)

  // Tic-Tac-Toe State
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill(''))
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X')
  const [tttWinner, setTttWinner] = useState<string | null>(null)
  const [tttStatus, setTttStatus] = useState('Your turn (X)')
  const [isAiThinking, setIsAiThinking] = useState(false)

  // Initialize Reaction Game
  const initReaction = useCallback(() => {
    setGameState('waiting')
    setReactionTime(0)
    setBestTime(null)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Start Reaction Game
  const startReactionGame = useCallback(() => {
    setGameState('ready')
    
    // Random delay between 1-4 seconds
    const delay = Math.random() * 3000 + 1000
    
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now())
      setGameState('go')
    }, delay)
  }, [])

  // Handle screen click for reaction game
  const handleReactionClick = useCallback(() => {
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
        updateHighScore(points)
      }
    } else if (gameState === 'ready') {
      // Clicked too early
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setGameState('waiting')
    }
  }, [gameState, startTime, bestTime, updateHighScore])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Initialize Memory Cards
  const initMemory = useCallback(() => {
    const codes = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', '1', '2', '3', '4', '1', '2', '3', '4']
    const shuffled = codes.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedPairs(0)
    setMemoryScore(0)
  }, [])

  // Initialize Tic-Tac-Toe
  const initTTT = useCallback(() => {
    setTttBoard(Array(9).fill(''))
    setTttTurn('X')
    setTttWinner(null)
    setTttStatus('Your turn (X)')
    setIsAiThinking(false)
  }, [])

  // Load game
  const loadGame = (game: 'reaction' | 'memory' | 'ttt') => {
    setCurrentGame(game)
    if (game === 'memory') initMemory()
    if (game === 'ttt') initTTT()
    if (game === 'reaction') initReaction()
  }

  const exitGame = () => {
    setCurrentGame(null)
  }

  // Memory Game Logic
  const flipCard = useCallback((index: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(index) || matchedPairs >= 8) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setTimeout(() => {
        if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
          const newMatches = matchedPairs + 1
          setMatchedPairs(newMatches)
          const newScore = newMatches * 2
          setMemoryScore(newScore)
          updateHighScore(newScore)
        }
        setFlippedCards([])
      }, 1000)
    }
  }, [flippedCards, cards, matchedPairs, updateHighScore])

  // Tic-Tac-Toe Logic
  const checkWinner = useCallback((board: string[]) => {
    if (board.some(cell => cell === null)) return null
    
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]

    for (const combo of wins) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a]
      }
    }
    return null
  }, [])

  const makeTTTMove = useCallback((index: number) => {
    if (tttBoard[index] || tttWinner || tttTurn !== 'X' || isAiThinking) {
      return
    }

    const newBoard = [...tttBoard]
    newBoard[index] = 'X'
    setTttBoard(newBoard)

    const winner = checkWinner(newBoard)
    if (winner) {
      setTttWinner(winner)
      setTttStatus(winner === 'X' ? 'You Win! 🎉' : 'AI Wins! 😢')
      
      if (winner === 'X') {
        const currentHigh = parseInt(localStorage.getItem('highScore') || '0')
        updateHighScore(currentHigh + 10)
      }
      return
    }

    if (!newBoard.includes('')) {
      setTttStatus('Draw! 🤝')
      return
    }

    // AI Move
    setTttTurn('O')
    setTttStatus('AI turn (O)...')
    setIsAiThinking(true)

    setTimeout(() => {
      const currentBoard = [...newBoard]
      const availableMoves = currentBoard.map((cell, i) => cell === '' ? i : -1).filter(i => i !== -1)
      
      if (availableMoves.length > 0) {
        const aiMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
        const aiBoard = [...currentBoard]
        aiBoard[aiMove] = 'O'
        setTttBoard(aiBoard)

        const aiWinner = checkWinner(aiBoard)
        if (aiWinner) {
          setTttWinner(aiWinner)
          setTttStatus(aiWinner === 'X' ? 'You Win! 🎉' : 'AI Wins! 😢')
        } else if (!aiBoard.includes('')) {
          setTttStatus('Draw! 🤝')
        } else {
          setTttTurn('X')
          setTttStatus('Your turn (X)')
        }
      }
      setIsAiThinking(false)
    }, 600)
  }, [tttBoard, tttTurn, tttWinner, isAiThinking, checkWinner, updateHighScore])

  return (
    <section className={`py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm text-orange-300 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/30 mb-6">
            <Zap className="h-4 w-4" />
            <span>Interactive Learning Games</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Play & <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Learn!</span>
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Learn coding concepts through fun games! Practice logic, arrays, and win conditions.
          </p>
        </header>

        {/* High Score Display */}
        <div className="max-w-md mx-auto mb-8">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50">
            <CardContent className="flex items-center justify-center gap-4 py-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-sm text-slate-400">High Score</div>
                <div className="text-3xl font-bold text-yellow-400">{highScore}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Selection Menu */}
        {!currentGame && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-green-500/30 hover:border-green-400/60 hover:shadow-xl hover:shadow-green-500/20" onClick={() => loadGame('reaction')}>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4 border border-green-400/30 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">⚡</span>
                </div>
                <CardTitle className="text-xl text-slate-900">Reaction Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-slate-600 mb-4">
                  Test your reflexes! Click as fast as you can when the screen turns green.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Flame className="h-4 w-4" />
                  <span>Reflexes & Speed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20" onClick={() => loadGame('memory')}>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-400/30 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">🧠</span>
                </div>
                <CardTitle className="text-xl text-slate-900">Memory Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-slate-600 mb-4">
                  Learn array matching and state tracking. Find matching pairs of cards!
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Flame className="h-4 w-4" />
                  <span>Arrays & State</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-red-500/30 hover:border-red-400/60 hover:shadow-xl hover:shadow-red-500/20" onClick={() => loadGame('ttt')}>
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4 border border-red-400/30 group-hover:scale-110 transition-transform">
                  <span className="text-5xl">❌</span>
                </div>
                <CardTitle className="text-xl text-slate-900">Tic-Tac-Toe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-slate-600 mb-4">
                  Master win condition checking. Beat the AI in this classic strategy game!
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Flame className="h-4 w-4" />
                  <span>Conditions & AI</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reaction Time Game */}
        {currentGame === 'reaction' && (
          <Card className="max-w-2xl mx-auto bg-slate-900/95 border-2 border-green-500/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">⚡ Reaction Time</CardTitle>
                <Button onClick={exitGame} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <div className="mb-6 text-center">
                {gameState === 'waiting' && (
                  <Button onClick={startReactionGame} className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
                    🎮 Start Test
                  </Button>
                )}
                
                {gameState === 'ready' && (
                  <div 
                    onClick={handleReactionClick}
                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-12 px-8 rounded-2xl transition-all"
                  >
                    🔴 Wait for it...
                  </div>
                )}
                
                {gameState === 'go' && (
                  <div 
                    onClick={handleReactionClick}
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-12 px-8 rounded-2xl animate-pulse transition-all"
                  >
                    🟢 CLICK NOW!
                  </div>
                )}
                
                {gameState === 'result' && (
                  <div className="space-y-4">
                    <div className="text-4xl font-bold text-green-400 mb-4">
                      {reactionTime}ms
                    </div>
                    <div className="text-slate-300 text-lg mb-4">
                      {reactionTime < 250 && '⚡ Incredible speed!'}
                      {reactionTime >= 250 && reactionTime < 350 && '🏃 Great reflexes!'}
                      {reactionTime >= 350 && reactionTime < 450 && '👍 Good reaction time!'}
                      {reactionTime >= 450 && reactionTime < 600 && '😊 Not bad, keep practicing!'}
                      {reactionTime >= 600 && '🐢 A bit slow, try again!'}
                    </div>
                    {bestTime && (
                      <div className="text-yellow-400 text-xl mb-4">
                        Best: {bestTime}ms
                      </div>
                    )}
                    <div className="space-x-4">
                      <Button onClick={startReactionGame} className="bg-green-600 hover:bg-green-700 text-white">
                        🔄 Try Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Memory Game */}
        {currentGame === 'memory' && (
          <Card className="max-w-2xl mx-auto bg-slate-900/95 border-2 border-purple-500/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">🧠 Memory Match</CardTitle>
                <Button onClick={exitGame} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <div className="mb-4 text-center">
                <p className="text-purple-400 text-lg mb-2">Click cards to flip and find matches</p>
                <p className="text-slate-400 mb-4">Find all matching pairs to win!</p>
                <div className="inline-block bg-purple-500/20 px-6 py-3 rounded-lg border border-purple-500/50">
                  <span className="text-purple-400 text-2xl font-bold">
                    Matches: {matchedPairs}/8
                  </span>
                  <span className="text-slate-400 ml-4">Score: {memoryScore}</span>
                </div>
              </div>

              {/* Memory Grid */}
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-4 gap-3">
                  {cards.map((card, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => flipCard(i)}
                      className={`
                        w-20 h-20 rounded-xl
                        transition-all duration-300
                        flex items-center justify-center text-3xl font-bold
                        ${flippedCards.includes(i) || matchedPairs >= 8 ? 'bg-white' : 'bg-purple-600 hover:bg-purple-500'}
                        ${matchedPairs >= 8 ? 'opacity-50' : ''}
                      `}
                      style={{
                        perspective: '1000px'
                      }}
                    >
                      {(flippedCards.includes(i) || matchedPairs >= 8) ? card : ''}
                    </button>
                  ))}
                </div>
              </div>

              {matchedPairs >= 8 && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-4 animate-bounce">
                    🎉 YOU WIN!
                  </div>
                  <div className="text-purple-400 text-xl mb-4">
                    Perfect Score: {memoryScore}/16
                  </div>
                  <Button onClick={initMemory} className="bg-purple-600 hover:bg-purple-700 text-white">
                    🔄 Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tic-Tac-Toe Game */}
        {currentGame === 'ttt' && (
          <Card className="max-w-2xl mx-auto bg-slate-900/95 border-2 border-red-500/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">❌ Tic-Tac-Toe</CardTitle>
                <Button onClick={exitGame} variant="outline" className="border-white text-white hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <div className="mb-4 text-center">
                <p className="text-red-400 text-lg mb-2">You are X, AI is O</p>
                <p className="text-slate-400 mb-4">Get three in a row to win!</p>
                <div className="inline-block bg-red-500/20 px-6 py-3 rounded-lg border border-red-500/50">
                  <span className={`text-red-400 text-xl ${isAiThinking ? 'animate-pulse' : ''}`}>
                    {tttStatus}
                  </span>
                </div>
              </div>

              {/* TTT Board */}
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {tttBoard.map((cell, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => makeTTTMove(i)}
                      disabled={cell !== '' || tttWinner !== null || tttTurn !== 'X' || isAiThinking}
                      className={`
                        w-24 h-24 rounded-xl
                        transition-all duration-200
                        flex items-center justify-center text-5xl font-bold
                        ${cell === 'X' ? 'bg-red-500 text-white cursor-not-allowed' : ''}
                        ${cell === 'O' ? 'bg-blue-500 text-white cursor-not-allowed' : ''}
                        ${!cell && tttTurn === 'X' && !isAiThinking ? 'bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 cursor-pointer' : 'bg-slate-800/50 border-2 border-slate-700 cursor-not-allowed'}
                      `}
                    >
                      {cell}
                    </button>
                  ))}
                </div>
              </div>

              {tttWinner && (
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-4 animate-pulse ${tttWinner === 'X' ? 'text-green-400' : 'text-red-500'}`}>
                    {tttWinner === 'X' ? '🎉 YOU WIN!' : '😢 AI WINS!'}
                  </div>
                  <Button onClick={initTTT} className="bg-red-600 hover:bg-red-700 text-white">
                    🔄 Play Again
                  </Button>
                </div>
              )}

              {!tttWinner && tttBoard.every(cell => cell !== '') && (
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-4">
                    🤝 IT'S A DRAW!
                  </div>
                  <Button onClick={initTTT} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    🔄 Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}


