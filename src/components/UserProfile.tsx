import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Coins, CreditCard, ChevronRight, Check, Award, ShieldAlert } from 'lucide-react';
import { UserProfile as ProfileType, Book } from '../types';

interface UserProfileProps {
  profile: ProfileType;
  books: Book[];
  onUpdateProfile: (updated: ProfileType) => void;
  onTopUpBalance: (amount: number) => void;
}

const AVATARS = ['👨‍💻', '👩‍💻', '🚀', '🧠', '💡', '🎓', '👑', '🌟'];

export default function UserProfile({ profile, books, onUpdateProfile, onTopUpBalance }: UserProfileProps) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [isSaved, setIsSaved] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100000);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      fullName: fullName.trim(),
      username: username.trim().toLowerCase(),
      avatar: selectedAvatar
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const purchasedBooks = books.filter(b => profile.purchasedBookIds.includes(b.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto my-6 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl" id="profile-container">
      <div className="border-b border-zinc-900 pb-5">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          {profile.avatar} Profil Sozlamalari & Balans
        </h2>
        <p className="text-zinc-500 text-xs">
          O'zingizning profil ma'lumotlaringizni tahrirlashingiz, virtual balansingizni oshirishingiz va xarid qilingan kitoblarni kuzatishingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Live Stat Cards & Balance Top Up */}
        <div className="md:col-span-5 space-y-6">
          {/* Virtual Wallet */}
          <div className="p-6 bg-gradient-to-tr from-emerald-950/40 to-zinc-950 border border-emerald-500/30 rounded-2xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 p-2 rounded-xl">
              <Coins className="w-5 h-5" />
            </div>
            
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Virtual Hisobingiz
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {profile.coinsBalance.toLocaleString('uz-UZ')} UZS
            </div>
            <p className="text-[10px] text-emerald-400/80 mt-1 font-medium">
              * O'qilgan kitoblar, o'yinlarda qozonilgan g'alabalar orqali ham oshadi!
            </p>

            <div className="mt-6 pt-5 border-t border-zinc-900">
              <h4 className="text-xs font-bold text-zinc-300 uppercase mb-3">Balansni Oson Oshirish</h4>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => onTopUpBalance(50000)}
                  className="py-2 px-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-xs text-white rounded-xl font-bold cursor-pointer transition-all"
                >
                  +50,000 UZS
                </button>
                <button
                  type="button"
                  onClick={() => onTopUpBalance(100000)}
                  className="py-2 px-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-xs text-white rounded-xl font-bold cursor-pointer transition-all"
                >
                  +100,000 UZS
                </button>
                <button
                  type="button"
                  onClick={() => onTopUpBalance(150000)}
                  className="py-2 px-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-xs text-white rounded-xl font-bold cursor-pointer transition-all"
                >
                  +150,000 UZS
                </button>
                <button
                  type="button"
                  onClick={() => onTopUpBalance(250000)}
                  className="py-2 px-3 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-xs text-white rounded-xl font-bold cursor-pointer transition-all"
                >
                  +250,000 UZS
                </button>
              </div>

              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-[10px] text-zinc-500 flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                <span>Simulyatsiya rejimi: To'lov haqqoniy emas, virtual tahrirlang.</span>
              </div>
            </div>
          </div>

          {/* Purchased count badge */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Kutubxonangiz</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Faollashtirilgan audio/elektron kitoblar</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-lg border border-zinc-700">
              {purchasedBooks.length}
            </div>
          </div>
        </div>

        {/* Right Side: Profile update form */}
        <div className="md:col-span-7 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-white mb-4">Shaxsiy Axborotni Tahrirlash</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">To'liq ismingiz</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full py-2 px-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Foydalanuvchi taxallusi (username)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-zinc-500 text-xs">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 pl-7 pr-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Avatarni almashtirish</label>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`py-2 text-xl rounded-xl border transition-all cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-emerald-950/60 border-emerald-500'
                        : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {isSaved && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-400 rounded-xl flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4" /> Ma'lumotlar muvaffaqiyatli saqlandi!
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl cursor-pointer transition-all"
            >
              O'zgarishlarni Saqlash
            </button>
          </form>

          {/* Book Library section inside profile */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-3">Xarid qilingan kitoblaringiz ro'yxati:</h4>
            {purchasedBooks.length === 0 ? (
              <p className="text-xs text-zinc-600 italic">Sizda hali sotib olingan kitoblar mavjud emas.</p>
            ) : (
              <div className="space-y-2">
                {purchasedBooks.map((b) => (
                  <div key={b.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">{b.title}</h5>
                      <span className="text-[10px] text-zinc-500">{b.author}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 rounded-full border border-emerald-500/20">
                      FAOL (Mavjud)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
