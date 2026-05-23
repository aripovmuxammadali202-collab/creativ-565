import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Zap, RefreshCw, Layers, Gamepad2, ThumbsUp } from 'lucide-react';

interface GamesProps {
  onAwardCoins: (amount: number) => void;
  userCoins: number;
}

const TECH_PAIR_NAMES = ['Code', 'Figma', 'React', 'Python', 'NodeJS', 'SMM'];
const CARD_ICONS = ['💻', '📐', '⚛️', '🐍', '🚀', '📢'];

interface MemoryCard {
  id: number;
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Games({ onAwardCoins, userCoins }: GamesProps) {
  const [activeTab, setActiveTab] = useState<'arqon' | 'xotira'>('arqon');

  // Tug of War States (Arqon Tortish)
  const [ropePosition, setRopePosition] = useState(0); // -40 (User wins) to +40 (AI wins)
  const [tugOfWarActive, setTugOfWarActive] = useState(false);
  const [tugOfWarWinner, setTugOfWarWinner] = useState<string | null>(null);
  const [tugDifficulty, setTugDifficulty] = useState<number>(3); // 1-5 level

  // Memory Game States (Xotira O'yini)
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryWin, setMemoryWin] = useState(false);

  // ---------- TUG OF WAR GAMEPLAY ----------
  useEffect(() => {
    let aiInterval: NodeJS.Timeout;
    if (tugOfWarActive && !tugOfWarWinner) {
      aiInterval = setInterval(() => {
        setRopePosition((prev) => {
          const aiPull = Math.floor(Math.random() * tugDifficulty) + 1.5;
          const nextPos = prev + aiPull;
          if (nextPos >= 35) {
            setTugOfWarWinner('Temurbek Adhamov AI');
            setTugOfWarActive(false);
            return 35;
          }
          return nextPos;
        });
      }, 250);
    }
    return () => clearInterval(aiInterval);
  }, [tugOfWarActive, tugDifficulty, tugOfWarWinner]);

  const handleUserPull = () => {
    if (!tugOfWarActive || tugOfWarWinner) return;
    setRopePosition((prev) => {
      const nextPos = prev - 4; // User pull factor
      if (nextPos <= -35) {
        setTugOfWarWinner('Olim (Siz)');
        onAwardCoins(25000); // Give 25,000 UZS Coins!
        setTugOfWarActive(false);
        return -35;
      }
      return nextPos;
    });
  };

  const startTugOfWar = () => {
    setRopePosition(0);
    setTugOfWarWinner(null);
    setTugOfWarActive(true);
  };

  // ---------- MEMORY GAMEPLAY ----------
  const initMemoryGame = () => {
    const list: MemoryCard[] = [];
    const paired = [...TECH_PAIR_NAMES, ...TECH_PAIR_NAMES];
    const pairedIcons = [...CARD_ICONS, ...CARD_ICONS];
    
    // Shuffle
    const indicesSorted = Array.from({ length: 12 }, (_, i) => i).sort(() => Math.random() - 0.5);

    for (let i = 0; i < 12; i++) {
      const originalIndex = indicesSorted[i];
      list.push({
        id: i,
        name: paired[originalIndex % 6],
        icon: pairedIcons[originalIndex % 6],
        isFlipped: false,
        isMatched: false,
      });
    }

    setMemoryCards(list);
    setSelectedIndices([]);
    setMemoryMoves(0);
    setMemoryWin(false);
  };

  useEffect(() => {
    if (activeTab === 'xotira') {
      initMemoryGame();
    }
  }, [activeTab]);

  const handleCardClick = (idx: number) => {
    if (memoryWin || memoryCards[idx].isFlipped || memoryCards[idx].isMatched || selectedIndices.length >= 2) return;

    const updated = [...memoryCards];
    updated[idx].isFlipped = true;
    setMemoryCards(updated);

    const newSelected = [...selectedIndices, idx];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves(m => m + 1);
      const [first, second] = newSelected;

      if (updated[first].name === updated[second].name) {
        // MATCHED
        setTimeout(() => {
          const matchedList = updated.map((card, i) => {
            if (i === first || i === second) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          setMemoryCards(matchedList);
          setSelectedIndices([]);

          // Check Win Condition
          if (matchedList.every(c => c.isMatched)) {
            setMemoryWin(true);
            onAwardCoins(18000); // Give 18,000 UZS!
          }
        }, 600);
      } else {
        // NOT MATCHED - FLIP BACK
        setTimeout(() => {
          const flippedBack = updated.map((card, i) => {
            if (i === first || i === second) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setMemoryCards(flippedBack);
          setSelectedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl" id="games-panel">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-zinc-900 mb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-emerald-400" /> Najot IT-Games
          </h2>
          <p className="text-zinc-500 text-xs">
            Darslardan charchaganda daho bo'lish uchun o'ynang va virtual kitoblarni sotib olishga tanga to'plang!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('arqon')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
              activeTab === 'arqon'
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🪢 Arqon Tortish
          </button>
          <button
            onClick={() => setActiveTab('xotira')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
              activeTab === 'xotira'
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🧠 Xotira O'yini
          </button>
        </div>
      </div>

      {activeTab === 'arqon' ? (
        // ARQON TORTISH GAME
        <div className="space-y-6">
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 text-center relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-2">Najot Arqon Tortish Bahsi!</h3>
            <p className="text-zinc-400 text-xs max-w-md mx-auto mb-6">
              Asoschilarimiz va komputer kuchlariga qarshi tezkorlik bahsi. <strong>TEZ-TEZ BOSING</strong> tugmasini ketma-ket bosib arqonni o'z tarafingizga torting!
            </p>

            {/* Battle settings */}
            {!tugOfWarActive && !tugOfWarWinner && (
              <div className="flex justify-center items-center gap-4 mb-6">
                <label className="text-xs text-zinc-400 font-bold uppercase">Raqib kuch darajasi:</label>
                <select
                  value={tugDifficulty}
                  onChange={(e) => setTugDifficulty(Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-800 text-xs text-white p-1.5 px-3 rounded-lg focus:outline-none"
                >
                  <option value={1.5}>Oson (Talaba)</option>
                  <option value={3}>O'rta (Mentor)</option>
                  <option value={5}>Qiyin (Asoschi Temurbek Adhamov AI)</option>
                </select>
              </div>
            )}

            {/* Rope Interface */}
            <div className="my-8 py-10 relative bg-zinc-950/80 border border-zinc-900 rounded-2xl flex flex-col items-center overflow-hidden">
              {/* Vertical center indicator */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-dashed bg-rose-500/30 -translate-x-1/2" />
              
              {/* The Rope */}
              <div className="w-[85%] h-2.5 bg-amber-800/80 rounded-full flex items-center relative">
                {/* Red knot/center flag attached to rope */}
                <motion.div
                  animate={{ x: `${ropePosition * 3}px` }}
                  transition={{ type: 'spring', stiffness: 120 }}
                  className="absolute left-[50%] -translate-x-1/2 w-6 h-6 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center font-bold text-[10px] text-white shadow-[0_0_12px_red]"
                >
                  🚩
                </motion.div>
              </div>

              {/* Opponents tag */}
              <div className="w-full flex justify-between px-6 mt-6">
                <div className="text-left">
                  <span className="text-2xl">👦</span>
                  <p className="text-xs font-bold text-emerald-400">Siz (Student)</p>
                  <p className="text-[10px] text-zinc-600">Chapga pullang</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl">⚡</span>
                  <p className="text-xs font-bold text-red-400">Temurbek Adhamov AI</p>
                  <p className="text-[10px] text-zinc-600">O'ngga pullamoqda</p>
                </div>
              </div>
            </div>

            {/* Pull interaction Button */}
            <div className="flex flex-col items-center justify-center gap-4">
              {tugOfWarActive ? (
                <button
                  onClick={handleUserPull}
                  className="px-8 py-6 cursor-pointer bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-95 font-black text-xl rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse"
                >
                  ⚡ TEZ-TEZ BOSING! ⚡
                </button>
              ) : (
                <button
                  onClick={startTugOfWar}
                  className="px-8 py-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:text-white text-zinc-300 font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  {tugOfWarWinner ? "Qaytadan o'ynash" : "Bahsni boshlash 🪢"}
                </button>
              )}
            </div>

            {/* Winner Toast */}
            {tugOfWarWinner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-xl border text-sm flex items-center justify-center gap-3 ${
                  tugOfWarWinner.includes('Siz')
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    : 'bg-red-950/60 border-red-500/40 text-red-400'
                }`}
              >
                <Award className="w-6 h-6" />
                <div>
                  <h4 className="font-extrabold">{tugOfWarWinner} G'olib bo'ldi!</h4>
                  {tugOfWarWinner.includes('Siz') ? (
                    <p className="text-xs text-zinc-300">Ajoyib g'alaba! Balansingizga <strong>25,000 UZS</strong> virtual koinlar o'tkazildi!</p>
                  ) : (
                    <p className="text-xs text-zinc-300">Asoschimizning kuchi juda kuchli ekan, qayta urinib ko'ring.</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        // XOTIRA O'YINI (MEMORY MATCH)
        <div className="space-y-6">
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 text-center">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Urinishlar: <span className="text-white font-mono">{memoryMoves} marta</span>
              </span>
              <button
                onClick={initMemoryGame}
                className="p-1 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Yangilash
              </button>
            </div>

            {/* Grid of 12 cards */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md mx-auto my-4">
              {memoryCards.map((card, idx) => {
                const isFlippedOrMatched = card.isFlipped || card.isMatched;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    className={`h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border outline-none ${
                      card.isMatched
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                        : card.isFlipped
                        ? 'bg-zinc-900 border-zinc-700 text-white'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {isFlippedOrMatched ? (
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">{card.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-zinc-400">
                          {card.name}
                        </span>
                      </div>
                    ) : (
                      <div className="text-emerald-500 flex items-center justify-center p-3 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                        <Layers className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {memoryWin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 mt-6 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-400"
              >
                <h4 className="text-sm font-bold flex items-center justify-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-emerald-400" /> Mukammal! Xotira o'yini muvaffaqiyatli yakunlandi!
                </h4>
                <p className="text-xs text-zinc-300 mt-1">
                  Miyangizni mashq qildirdingiz! Balansingizga <strong>18,000 UZS</strong> tilla koin qo'shildi!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
