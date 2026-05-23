import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, User, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const AVATARS = ['👨‍💻', '👩‍💻', '🚀', '🧠', '💡', '🎓', '👑', '🌟'];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [started, setStarted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Iltimos, toʻliq ismingizni kiriting.');
      return;
    }
    if (!username.trim()) {
      setError('Iltimos, foydalanuvchi nomini kiriting.');
      return;
    }

    const newProfile: UserProfile = {
      id: 'user_' + Date.now(),
      fullName: fullName.trim(),
      username: username.trim().toLowerCase(),
      avatar: selectedAvatar,
      role: 'student',
      coinsBalance: 150000, // Gift 150k UZS start!
      purchasedBookIds: ['it-frontend'], // Give one starter book free!
      readingProgress: {},
      hasOnboarded: true
    };

    onComplete(newProfile);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl p-8 bg-zinc-950/80 border border-emerald-500/30 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
          id="welcome-card"
        >
          {/* Neon Glow details */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-6 flex justify-center">
            <span className="p-4 bg-emerald-950/50 rounded-full text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Sparkles className="w-12 h-12" />
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Najot Ta'lim <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 shadow-emerald-400/10 text-glow">Kutubxonasi</span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg mx-auto">
            Najot Ta'lim o'quvchilari va ustozlari uchun maxsus interfaol audio va elektron kitoblar olami. 1-11 sinf maktab fanlari hamda IT yo'nalishi bo'yicha zamonaviy kitoblar.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-md mx-auto">
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Elektron darsliklar</h4>
                <p className="text-xs text-zinc-500">1-11 Sinflar uchun</p>
              </div>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🎧</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Audio kitoblar</h4>
                <p className="text-xs text-zinc-500">Istagan joyda tinglang</p>
              </div>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🪙</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Bonus Tizimi</h4>
                <p className="text-xs text-zinc-500">O'qigan sari pul toping</p>
              </div>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <h4 className="text-sm font-semibold text-white">Mini o'yinlar</h4>
                <p className="text-xs text-zinc-500">Miya mashqlariga tanga</p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg rounded-full cursor-pointer flex items-center gap-3 mx-auto transition-colors shadow-[0_4px_25px_rgba(16,185,129,0.4)]"
            id="btn-boshlash"
          >
            Boshlash <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 bg-zinc-950 border border-emerald-500/30 rounded-3xl shadow-2xl relative"
        id="registration-card"
      >
        <div className="absolute top-4 right-4 bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs rounded-full flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5" /> +150,000 UZS Bonus!
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <User className="w-6 h-6 text-emerald-400" /> Profil yaratish
        </h2>
        <p className="text-zinc-400 text-xs mb-6">
          Kutubxonadan foydalanish uchun hisob oching. Boshlang'ich bonus pullar tekin taqdim etiladi!
        </p>

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-400 bg-red-950/30 border border-red-500/20 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              To'liq ism-sharifingiz (Asoschiga hisobotingiz uchun)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(''); }}
              placeholder="Masalan: Muhammadali Oripov"
              className="w-full py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Foydalanuvchi taxallusi (username)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-zinc-500 text-sm">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="muhammadali"
                className="w-full py-2.5 pl-8 pr-4 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Avatar tanlang
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`py-2 text-2xl rounded-xl border transition-all cursor-pointer ${
                    selectedAvatar === av
                      ? 'bg-emerald-950/60 border-emerald-500 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-xl text-xs text-zinc-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Shaxsiy xavfsizlik kafolati
            </div>
            <p>Ushbu sayt Najot Ta'lim loyihasi hisoblanadi. Malumotlaringiz maxfiy saqlanadi va oflayn tizimda ham ishlaydi.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl cursor-pointer transition-all shadow-[0_3px_15px_rgba(16,185,129,0.3)]"
          >
            Profil yaratish va Tizimga kirish
          </button>
        </form>
      </motion.div>
    </div>
  );
}
