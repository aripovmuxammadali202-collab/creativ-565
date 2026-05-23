import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Headphones, Play, Pause, ChevronRight, ChevronLeft, Award, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { Book } from '../types';

interface BookViewerProps {
  book: Book;
  onRewardCoins: (amount: number) => void;
  onUpdateProgress: (bookId: string, progress: number) => void;
  onClose: () => void;
}

export default function BookViewer({ book, onRewardCoins, onUpdateProgress, onClose }: BookViewerProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [readPages, setReadPages] = useState<number[]>([]);
  const [rewardClaimed, setRewardClaimed] = useState<string[]>([]);
  const [durationProgress, setDurationProgress] = useState(25); // Simulated listening progress %

  const handleNextPage = () => {
    const nextChapter = activeChapter + 1;
    // Notify progress
    const computedProgress = Math.min(100, Math.round((nextChapter / book.content.length) * 100));
    onUpdateProgress(book.id, computedProgress);

    if (activeChapter < book.content.length - 1) {
      setActiveChapter(nextChapter);
    } else {
      // Award coins on completing the book!
      const rewardKey = `${book.id}-read-complete`;
      if (!rewardClaimed.includes(rewardKey)) {
        onRewardCoins(10000); // Give 10,000 UZS bonus!
        setRewardClaimed([...rewardClaimed, rewardKey]);
        onUpdateProgress(book.id, 100);
      }
    }
  };

  const handlePrevPage = () => {
    if (activeChapter > 0) {
      const prevChapter = activeChapter - 1;
      setActiveChapter(prevChapter);
      const computedProgress = Math.min(100, Math.round((prevChapter / book.content.length) * 100));
      onUpdateProgress(book.id, computedProgress);
    }
  };

  const handleTrackSelect = (idx: number) => {
    setActiveTrack(idx);
    setIsPlaying(true);
    setDurationProgress(10);
    
    // Notify partial progress
    const totalTracks = book.audioTracks?.length || 1;
    const computedProgress = Math.min(100, Math.round(((idx + 0.5) / totalTracks) * 100));
    onUpdateProgress(book.id, computedProgress);

    // Simulate real-time progress interval
    const timer = setInterval(() => {
      setDurationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsPlaying(false);
          const rewardKey = `${book.id}-track-${idx}`;
          if (!rewardClaimed.includes(rewardKey)) {
            onRewardCoins(12000); // 12,000 UZS audio track award!
            setRewardClaimed((claimed) => [...claimed, rewardKey]);
            onUpdateProgress(book.id, Math.min(100, Math.round(((idx + 1) / totalTracks) * 100)));
          }
          return 100;
        }
        return prev + 15;
      });
    }, 1200);
  };

  return (
    <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-2xl max-w-4xl mx-auto my-6 overflow-hidden relative">
      {/* Decorative gradient */}
      <div className={`absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br ${book.coverColor} opacity-20 rounded-full blur-3xl`} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-zinc-800 mb-6">
        <div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase tracking-widest">
            {book.type === 'audio' ? '🎧 Audio Kitob' : '📚 Elektron Kitob'}
          </span>
          <h2 className="text-2xl font-bold text-white mt-1.5">{book.title}</h2>
          <p className="text-zinc-400 text-sm">{book.author} barcha bo'limlari</p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-xl cursor-pointer transition-colors"
        >
          Orqaga qaytish
        </button>
      </div>

      {book.type === 'elektron' ? (
        // E-BOOK INTERACTIVE READER
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 md:p-8 min-h-[250px] relative">
            <div className="absolute top-4 right-4 text-xs font-mono text-zinc-500">
              Qism: {activeChapter + 1} / {book.content.length}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 pt-4"
              >
                <p className="text-zinc-200 text-base md:text-lg leading-relaxed font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-emerald-400">
                  {book.content[activeChapter]}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center gap-2 text-xs text-amber-400 font-medium bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Yutuq: Har bir qismni va kitobni oxirigacha mutolaa qilsangiz virtual balansingizga pullar qo'shiladi!</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50">
            <button
              onClick={handlePrevPage}
              disabled={activeChapter === 0}
              className="px-4 py-2 cursor-pointer bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Oldingisi
            </button>

            <span className="text-xs font-mono text-zinc-400 font-bold">
              Kutubxona O'quvchisi
            </span>

            <button
              onClick={handleNextPage}
              className="px-4 py-2 cursor-pointer bg-emerald-500 text-zinc-950 hover:bg-emerald-400 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              {activeChapter === book.content.length - 1 ? (
                <>Kitobni Tugatish <Award className="w-4 h-4" /></>
              ) : (
                <>Keyingi Sahifa <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {rewardClaimed.includes(`${book.id}-read-complete`) && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-center gap-3"
            >
              <span className="text-3xl">🎉</span>
              <div>
                <h4 className="text-sm font-bold text-emerald-400">Kitob To'liq O'qildi!</h4>
                <p className="text-xs text-zinc-300">Muhammadali Oripov sizni tabriklaydi! Darslikni mukammal o'rganib tugatganingiz uchun sizga <span className="font-bold text-white">10,000 UZS</span> maxsus bonus virtual tangasi taqdim etildi!</p>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        // AUDIO BOOK PLAYER INTERACTION
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Playlists */}
            <div className="md:col-span-1 space-y-2 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Treklar ro'yxati</h3>
              {book.audioTracks?.map((track, i) => (
                <button
                  key={i}
                  onClick={() => handleTrackSelect(i)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between border cursor-pointer transition-all ${
                    activeTrack === i
                      ? 'bg-purple-950/40 border-purple-500 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span className="truncate pr-2">
                    {i + 1}. {track.title}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 shrink-0">{track.duration}</span>
                </button>
              ))}
            </div>

            {/* Simulated Player Controls */}
            <div className="md:col-span-2 bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" /> HOZIR ESHITILMOQDA
                </span>
                <h4 className="text-lg font-bold text-white mt-1.5">
                  {book.audioTracks?.[activeTrack]?.title || 'Kirish Qismi'}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">{book.author}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 my-4">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300"
                    style={{ width: `${durationProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>{Math.floor((durationProgress / 100) * 8)}:12</span>
                  <span>{book.audioTracks?.[activeTrack]?.duration || '00:00'}</span>
                </div>
              </div>

              {/* Media buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  disabled={activeTrack === 0}
                  onClick={() => handleTrackSelect(activeTrack - 1)}
                  className="p-2 cursor-pointer text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3.5 cursor-pointer bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold rounded-full transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  {isPlaying ? <Pause className="w-6 h-6 text-zinc-950" /> : <Play className="w-6 h-6 text-zinc-950" />}
                </button>

                <button
                  disabled={!book.audioTracks || activeTrack === book.audioTracks.length - 1}
                  onClick={() => handleTrackSelect(activeTrack + 1)}
                  className="p-2 cursor-pointer text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
            <p className="text-xs text-zinc-300">
              <span className="font-bold text-white">Audiobonus qoidasi:</span> Ushbu darslik treki eshitilib tugatilganda sizga <span className="text-purple-400 font-bold">12,000 UZS</span> tanga avtomatik tarzda jo'natiladi. Bu Najot Ta'lim ta'lim darsliklarini chuqur qabul qilishni rag'batlantiradi!
            </p>
          </div>

          {rewardClaimed.some(k => k.startsWith(`${book.id}-track-`)) && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-center gap-3"
            >
              <span className="text-3xl">🎉</span>
              <div>
                <h4 className="text-sm font-bold text-emerald-400">Audio eshitish bonusi taqdim etildi!</h4>
                <p className="text-xs text-zinc-300">Taqdim etilgan audio kitobni faol tinglaganingiz uchun <span className="font-bold text-white">12,000 UZS</span> koiningiz ko'paydi!</p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
