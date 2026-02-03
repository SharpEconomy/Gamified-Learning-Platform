"use client";

import { useState, useCallback } from "react";

export default function MemoryGame() {
  const [cards, setCards] = useState<
    { id: number; value: string; flipped: boolean; matched: boolean }[]
  >([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const codes = ["A", "B", "C", "D", "1", "2", "3", "4"];
  const totalPairs = 4;

  const shuffle = useCallback((array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const initGame = useCallback(() => {
    const shuffled = [...codes, ...codes];
    shuffle(shuffled);

    const initialCards = shuffled.map((code, i) => ({
      id: i,
      value: code,
      flipped: false,
      matched: false,
    }));

    setCards(initialCards);
    setMatches(0);
    setFlipped([]);
    setGameStarted(true);
  }, [codes, shuffle]);

  const flipCard = useCallback(
    (index: number) => {
      if (flipped.length === 2) return;
      if (cards[index].flipped || cards[index].matched) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      const updatedCards = [...cards];
      updatedCards[index].flipped = true;
      setCards(updatedCards);

      if (newFlipped.length === 2) {
        const [first, second] = newFlipped;
        setTimeout(() => {
          const finalCards = [...updatedCards];

          if (updatedCards[first].value === updatedCards[second].value) {
            finalCards[first].matched = true;
            finalCards[second].matched = true;
            setMatches((prev) => prev + 1);
          } else {
            finalCards[first].flipped = false;
            finalCards[second].flipped = false;
          }

          setCards(finalCards);
          setFlipped([]);
        }, 1000);
      }
    },
    [cards, flipped],
  );

  const isComplete = matches === totalPairs;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-slate-900">🧠 Memory Match</h2>
      <p className="text-slate-700">Concept: Array matching, flip tracking</p>

      {!gameStarted ? (
        <button
          onClick={initGame}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
        >
          Start Game
        </button>
      ) : (
        <>
          <div className="mb-4 text-lg">
            <span className="text-slate-600">Matches: </span>
            <span className="text-2xl font-bold text-purple-600">
              {matches}
            </span>
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
                  ${
                    card.flipped || card.matched
                      ? card.matched
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-4 border-green-600"
                        : "bg-gradient-to-br from-purple-400 to-pink-500 text-white border-4 border-purple-600 rotate-y-180"
                      : "bg-gradient-to-br from-slate-400 to-slate-500 border-4 border-slate-600 hover:scale-105 cursor-pointer"
                  }
                `}
              >
                {card.flipped || card.matched ? card.value : "?"}
              </button>
            ))}
          </div>

          <button
            onClick={initGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
          >
            Restart Game
          </button>

          {isComplete && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-center">
              <p className="text-xl font-bold">🎉 All Matched! Great Memory!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
