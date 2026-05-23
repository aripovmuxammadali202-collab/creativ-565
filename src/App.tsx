import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Headphones, Coins, MessageSquare, Gamepad2, 
  Sliders, Star, Lock, Unlock, Sparkles, WifiOff, Wifi, Award, Send, Volume2, UserCheck,
  ShieldAlert, AlertTriangle, CheckCircle, Users
} from 'lucide-react';

import Onboarding from './components/Onboarding';
import BookViewer from './components/BookViewer';
import UserProfile from './components/UserProfile';
import Games from './components/Games';
import ChatRoom from './components/ChatRoom';
import AdminPanel from './components/AdminPanel';

import { Book, UserProfile as ProfileType, Review, AppSettings } from './types';
import { INITIAL_BOOKS, INITIAL_REVIEWS } from './data/books';

export default function App() {
  // --- STATE SYSTEM ---
  const [profile, setProfile] = useState<ProfileType | null>(() => {
    const saved = localStorage.getItem('najot_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('najot_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('najot_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('najot_app_settings');
    return saved ? JSON.parse(saved) : { isOffline: false, platformEarnings: 240000, simulationPulse: true };
  });

  const [activeTab, setActiveTab] = useState<'kutubxona' | 'o-yinlar' | 'chat' | 'profil' | 'admin'>('kutubxona');
  
  // Filtration and Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'elektron' | 'audio'>('all');
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'it' | number>('all');

  // Interactive details & readers State
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<Book | null>(null);
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);

  // Quick rating feedback form
  const [commentText, setCommentText] = useState('');
  const [ratingStars, setRatingStars] = useState(5);

  // Live simulator toast
  const [liveToast, setLiveToast] = useState<string | null>(null);

  // --- LIVE ONLINE USERS SIMULATION COUNTER ---
  const [onlineCount, setOnlineCount] = useState(342);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // shift between -4 and +4
        const nextVal = prev + delta;
        return Math.max(290, Math.min(410, nextVal));
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // --- SAVE STATES ON UPDATE ---
  useEffect(() => {
    if (profile) {
      localStorage.setItem('najot_user_profile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('najot_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('najot_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('najot_app_settings', JSON.stringify(settings));
  }, [settings]);

  // --- AUTOMATIC 100K TOP-UP & 10K BONUS ENFORCER ---
  useEffect(() => {
    if (profile && profile.coinsBalance < 100000) {
      setProfile(prev => {
        if (!prev) return null;
        if (prev.coinsBalance < 100000) {
          return {
            ...prev,
            coinsBalance: prev.coinsBalance + 100000 + 10000 // Give 100k + 10k bonus UZS!
          };
        }
        return prev;
      });

      setLiveToast("💰 Hisobingiz 100,000 UZSdan kam qolgani uchun avtomatik tarzda sizga +100,000 UZS hamda maxsus +10,000 UZS BONUS taqdim etildi! 🚀");
      setTimeout(() => setLiveToast(null), 8000);
    }
  }, [profile?.coinsBalance]);

  // --- REAL-TIME LIVE NOTIFICATION PULSE SIMULATOR ---
  useEffect(() => {
    if (!settings.simulationPulse) return;
    const interval = setInterval(() => {
      const studentNames = ['Shaxboz', 'Nigora', 'Asliddin_QA', 'Malika_Designer', 'Abduraxmon_IT', 'Bobur_SMM', 'Jasurbek'];
      const topics = [
        "xotira o'yinida 18,000 tanga yutib oldi!",
        "11-sinf darsligini sotib oldi.",
        "Temurbek Adhamov audio kitobini tinglashni boshladi.",
        "arqon tortish o'yinida g'olib bo'lib 25,000 koin qo'lga kiritdi!",
        "yangi darslik sharhi qoldirdi.",
        "kitobxonlik audit nazoratidan muvaffaqiyatli o'tdi!"
      ];
      const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];

      setLiveToast(`Talaba ${randomName} ${randomTopic}`);
      setTimeout(() => setLiveToast(null), 4000);
    }, 14000); // Trigger notification every 14 seconds to mimic internet actions

    return () => clearInterval(interval);
  }, [settings.simulationPulse]);

  // --- HANDLERS ---
  const handleOnboardingComplete = (newProfile: ProfileType) => {
    setProfile(newProfile);
    setActiveTab('kutubxona');
    setLiveToast(`Xush kelibsiz, ${newProfile.fullName}! Sizga 150,000 UZS boshlang'ich koin berildi.`);
    setTimeout(() => setLiveToast(null), 5000);
  };

  const handleRewardCoins = (amount: number) => {
    if (!profile) return;
    setProfile(prev => prev ? {
      ...prev,
      coinsBalance: prev.coinsBalance + amount
    }: null);
    
    setLiveToast(`Bonus! Hisobingizga +${amount.toLocaleString('uz-UZ')} UZS virtual tangalar qo'shildi.`);
    setTimeout(() => setLiveToast(null), 3000);
  };

  const handleTopUp = (amount: number) => {
    if (!profile) return;
    setProfile(prev => prev ? {
      ...prev,
      coinsBalance: prev.coinsBalance + amount
    }: null);
    setLiveToast(`Balansingiz muvaffaqiyatli +${amount.toLocaleString('uz-UZ')} UZS virtual valyutaga ko'paytirildi.`);
    setTimeout(() => setLiveToast(null), 3000);
  };

  // Track reading progress from BookViewer inside profile stats
  const handleUpdateProgress = (bookId: string, progress: number) => {
    if (!profile) return;
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        readingProgress: {
          ...prev.readingProgress,
          [bookId]: progress
        }
      };
    });
  };

  const handleBuyBook = (book: Book) => {
    if (!profile) return;

    if (profile.purchasedBookIds.includes(book.id)) {
      // Already unlocked, open directly
      setActiveReadingBook(book);
      setSelectedBookForDetail(null);
      return;
    }

    if (profile.coinsBalance < book.price) {
      alert(`Kechirasiz, balansingiz yetarli emas.\nKitob narxi: ${book.price.toLocaleString('uz-UZ')} UZS.\nSizda: ${profile.coinsBalance.toLocaleString('uz-UZ')} UZS bor.\nIltimos, o'yin o'ynang, darslik o'qing yoki Profil bo'limida balansingizni to'ldiring!`);
      return;
    }

    // Process sale!
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coinsBalance: prev.coinsBalance - book.price,
        purchasedBookIds: [...prev.purchasedBookIds, book.id]
      };
    });

    // Money goes straight to Muhammadali!
    setSettings(prev => ({
      ...prev,
      platformEarnings: prev.platformEarnings + book.price
    }));

    setLiveToast(`Siz "${book.title}" darsligini muvaffaqiyatli sotib oldingiz! To'lov to'g'ridan-to'g'ri Muhammadali Oripov platforma hamyoniga o'tkazildi.`);
    setTimeout(() => setLiveToast(null), 4500);
  };

  // --- MUHAMMADALI ORIPOV AUDIT: KITOBXONLIK INTIZOM JARIMASI ---
  // If user builds a library of purchased books, opens them to read but leaves them unread (< 5%), they are penalized 50,050 UZS.
  // Fines are sent straight to Muhammadali Oripov!
  const handleRunDisciplineAudit = () => {
    if (!profile) return;

    // Find purchased books where the student actually started reading (progress is defined) but did not read up to 5% yet
    const unreadBooks = books.filter(b => 
      profile.purchasedBookIds.includes(b.id) && 
      profile.readingProgress[b.id] !== undefined && 
      profile.readingProgress[b.id] < 5
    );

    if (unreadBooks.length === 0) {
      setLiveToast("🎉 Ajoyib Intizom! Muhammadali Oripov tasdiqlaydi: o'qiyotgan barcha darsliklaringizni mukammal o'rganmoqdasiz! Sizga +5,000 UZS daho bonus!");
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          coinsBalance: prev.coinsBalance + 5000
        };
      });
      setTimeout(() => setLiveToast(null), 5000);
      return;
    }

    const fineAmountPerBook = 50000;
    const totalFine = unreadBooks.length * fineAmountPerBook;

    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coinsBalance: Math.max(0, prev.coinsBalance - totalFine)
      };
    });

    // Penalties go to Muhammadali Oripov platforms earnings!
    setSettings(prev => ({
      ...prev,
      platformEarnings: prev.platformEarnings + totalFine
    }));

    setLiveToast(`⛔️ Intizom Jarimasi! Siz boshlagan ammo o'qimay tashlab qo'ygan ${unreadBooks.length} ta kitobingiz uchun jami -${totalFine.toLocaleString('uz-UZ')} UZS jarimaga tortildingiz! Ushbu jarima to'g'ri Muhammadali Oripov g'aznasiga o'tkazildi.`);
    setTimeout(() => setLiveToast(null), 9000);
  };

  // Submit dynamic reviews inside details screen
  const handleAddReview = (e: React.FormEvent, bookId: string) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      userName: profile?.fullName || 'Anonim Talaba',
      userAvatar: profile?.avatar || '👦',
      rating: ratingStars,
      text: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newRev, ...reviews]);
    setCommentText('');
    setLiveToast("Fikr-sharhingiz muvaffaqiyatli yuklandi!");
    setTimeout(() => setLiveToast(null), 3000);
  };

  // Admin additions
  const handleAdminAddBook = (newBook: Book) => {
    setBooks([newBook, ...books]);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  // Filtration logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || book.type === selectedType;
    
    let matchesGrade = true;
    if (selectedGrade !== 'all') {
      matchesGrade = book.grade === selectedGrade;
    }

    return matchesSearch && matchesType && matchesGrade;
  });

  // If user has not onboarded/created an account, render onboarding directly!
  if (!profile) {
    return (
      <div className="bg-black text-white min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
        <Onboarding onComplete={handleOnboardingComplete} />
        {/* Absolute Footer for Onboarding screen */}
        <footer className="py-6 border-t border-zinc-900 text-center text-xs text-zinc-600 bg-zinc-950 mt-12">
          <p>Oripov Muhammadali - Sayt asoschisi | Najot Ta'lim daho maslahatchisi - Temurbek Adhamov</p>
        </footer>
      </div>
    );
  }

  const gradesList = [
    { id: 'all', label: 'Barcha Kitoblar', icon: '🌍', color: 'from-zinc-900 to-zinc-950', border: 'border-zinc-800', text: 'text-zinc-400', focus: 'Platformadagi barcha maktab darsliklari hamda IT mutaxassislik kitoblari ochiq arxivi.' },
    { id: 'it', label: 'IT Kurslari', icon: '💻', color: 'from-emerald-950/80 to-teal-950/90', border: 'border-emerald-500/20', text: 'text-emerald-400', focus: 'Najot Ta\'lim mentorlari tomonidan tayyorlangan Backend, Frontend va SMM darsliklari.' },
    { id: 1, label: '1-Sinf Sahifasi', icon: '👦', color: 'from-blue-950 to-indigo-950', border: 'border-blue-500/20', text: 'text-blue-400', focus: 'Boshlang\'ich talaffuz, savodxonlik, harf tanish va quvnoq Alifbo saboqlari darsligi.' },
    { id: 2, label: '2-Sinf Sahifasi', icon: '👧', color: 'from-teal-950 to-cyan-950', border: 'border-teal-500/20', text: 'text-teal-400', focus: 'Oila qadri, ona tabiatga g\'amxo\'rlik va sodda badiiy hikoyalar.' },
    { id: 3, label: '3-Sinf Sahifasi', icon: '✏️', color: 'from-indigo-950 to-blue-950', border: 'border-indigo-500/20', text: 'text-indigo-400', focus: 'Husnixat san\'ati, ona tili grammatika asoslari va chiroyli gap tuzish.' },
    { id: 4, label: '4-Sinf Sahifasi', icon: '🧮', color: 'from-amber-950 to-rose-950', border: 'border-amber-500/20', text: 'text-amber-400', focus: 'Ko\'paytirish jadvallarini jadal hisoblash, boshlang\'ich mantiqiy misollar.' },
    { id: 5, label: '5-Sinf Sahifasi', icon: '📐', color: 'from-red-950 to-rose-950', border: 'border-red-500/20', text: 'text-red-400', focus: 'Geometriya muqaddimasi, natural sonlar va oddiy kasrlar ustida amallar.' },
    { id: 6, label: '6-Sinf Sahifasi', icon: '🏺', color: 'from-amber-955 to-yellow-950', border: 'border-yellow-550/20', text: 'text-amber-300', focus: 'Qadimgi dunyo tarixi va buyuk allomalarimiz Al-Xorazmiy merosi.' },
    { id: 7, label: '7-Sinf Sahifasi', icon: '🧪', color: 'from-violet-950 to-purple-950', border: 'border-violet-500/20', text: 'text-violet-400', focus: 'Fizika fani qonuniyatlari, mexanik harakatlar va Paskal bosimi darslari.' },
    { id: 8, label: '8-Sinf Sahifasi', icon: '🧬', color: 'from-pink-955 to-purple-950', border: 'border-pink-500/20', text: 'text-pink-400', focus: 'Kimyo fani: Mendeleyev davriy jadvali va ilk molekulyar reaksiyalar.' },
    { id: 9, label: '9-Sinf Sahifasi', icon: '🌌', color: 'from-cyan-950 to-sky-950', border: 'border-cyan-500/20', text: 'text-cyan-400', focus: 'Koinot dinamikasi, optika, elektromagnit to\'lqinlar va energiyalar.' },
    { id: 10, label: '10-Sinf Sahifasi', icon: '🧊', color: 'from-lime-950 to-green-950', border: 'border-lime-500/20', text: 'text-lime-400', focus: 'Stereometriya sirlari: 3D fazoviy shakllar va ularning hajmini yechish.' },
    { id: 11, label: '11-Sinf Sahifasi', icon: '🎓', color: 'from-fuchsia-950 to-pink-950', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400', focus: 'Python dasturlash asosi, murakkab algoritmlash va kelajak axborot texnologiyalari.' }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      
      {/* HEADER SECTION WITH NAVIGATION & METRICS */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-emerald-500/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-wrap gap-4">
          
          {/* Brand Logo, Offline badge & Live People counter */}
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-500 text-zinc-950 rounded-2xl font-black text-lg shadow-[0_0_12px_rgba(16,185,129,0.3)] select-none">
              Najot
            </span>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Najot Ta'lim Kutubxonasi
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[10px] text-zinc-500">Kitobxon Daho Portal</p>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {onlineCount} kishi saytda faol!
                </span>
              </div>
            </div>

            {settings.isOffline ? (
              <span className="ml-1 px-2 py-0.5 text-[9px] font-bold bg-amber-950 text-amber-500 rounded-full border border-amber-500/10 flex items-center gap-1">
                <WifiOff className="w-3 h-3" /> OFLAYN
              </span>
            ) : (
              <span className="ml-1 px-2 py-0.5 text-[9px] font-bold bg-emerald-950 text-emerald-400 rounded-full border border-emerald-500/10 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" /> ONLAYN
              </span>
            )}
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded-2xl border border-zinc-850">
            <button
              onClick={() => { setActiveTab('kutubxona'); setActiveReadingBook(null); }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'kutubxona'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Kitoblar
            </button>
            <button
              onClick={() => { setActiveTab('o-yinlar'); setActiveReadingBook(null); }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'o-yinlar'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" /> O'yinlar
            </button>
            <button
              onClick={() => { setActiveTab('chat'); setActiveReadingBook(null); }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'chat'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <button
              onClick={() => { setActiveTab('profil'); setActiveReadingBook(null); }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'profil'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Profil
            </button>
            <button
              onClick={() => { setActiveTab('admin'); setActiveReadingBook(null); }}
              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Admin
            </button>
          </nav>

          {/* virtual Balance Display & Founders treasury flow */}
          <div className="flex items-center gap-3">
            {/* Muhammadali Oripov platforms virtual ledger */}
            <div className="hidden lg:flex flex-col items-end px-3 py-1 bg-zinc-900 border border-zinc-850 rounded-xl">
              <span className="text-[8px] font-bold text-amber-500 flex items-center gap-1">
                👑 M. Oripov G'aznasi
              </span>
              <span className="text-[10px] font-extrabold text-white">
                {settings.platformEarnings.toLocaleString('uz-UZ')} UZS
              </span>
            </div>

            {/* Profile Balance display */}
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-2xl">
              <span className="text-base select-none">{profile.avatar}</span>
              <div className="text-right">
                <span className="text-[9px] font-semibold text-zinc-500 uppercase block tracking-wider leading-none">Pulingiz:</span>
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> {profile.coinsBalance.toLocaleString('uz-UZ')} UZS
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* DYNAMIC REAL-TIME EVENT HUD ALERT */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 z-50 p-3 bg-zinc-900/95 border border-emerald-500/20 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm backdrop-blur"
          >
            <span className="p-1.5 bg-emerald-950 rounded-lg text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-zinc-200">{liveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE FRAME CONTENT WRAPPER */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">

        {/* OFFLINE CORNER WARNING CONTAINER */}
        {settings.isOffline && (
          <div className="mb-4 p-3 bg-amber-950/20 border border-amber-500/20 rounded-2xl text-xs text-amber-500 flex items-center gap-2 font-medium">
            <WifiOff className="w-4 h-4" />
            <span>Oflayn rejim faol! Barcha ma'lumotlar, kitoblar va sozlamalar sizga internet tarmog'isiz ham bemalol xizmat qiladi.</span>
          </div>
        )}

        {/* ACTIVE E-BOOK / AUDIO READER DISPLAY */}
        {activeReadingBook ? (
          <BookViewer
            book={activeReadingBook}
            onRewardCoins={handleRewardCoins}
            onUpdateProgress={handleUpdateProgress}
            onClose={() => setActiveReadingBook(null)}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              
              {/* ------------ MODULE 1: KUTUBXONA MAIN DASHBOARD ------------ */}
              {activeTab === 'kutubxona' && (
                <div className="space-y-6">
                  {/* Hero Intro Banner */}
                  <div className="p-6 bg-gradient-to-r from-emerald-950/20 to-zinc-950 border border-zinc-900 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                    <h2 className="text-2xl md:text-3xl font-black text-white">Najot Ta'lim Bilim Maskani</h2>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-2xl">
                      Xush kelibsiz! Har bir maktab sinfi uchun maxsus yaratilgan darslik sahifalari, video va audio hikoyalar, qiziqarli dars mutolaa sinfxonalari.
                    </p>
                  </div>

                  {/* SUB-PAGES SELECTOR (STYLISH SCROLL BAR - HAR BIR SINF UCHUN ALOHIDA SAHIFA) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-400" /> Sinf Xonalari Darslik Sahifalari
                      </h3>
                      <span className="text-[10px] text-zinc-500">O'zingizga tushadigan sinf eshigini bosing</span>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-zinc-850 scrollbar-track-transparent">
                      {gradesList.map((g) => {
                        const isActive = selectedGrade === g.id;
                        return (
                          <button
                            key={g.id}
                            onClick={() => {
                              setSelectedGrade(g.id as any);
                              setSearchQuery('');
                            }}
                            className={`px-4 py-3 rounded-2xl shrink-0 cursor-pointer border flex items-center gap-2.5 transition-all text-xs font-bold ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-600/90 to-teal-800 text-zinc-950 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-[1.02]'
                                : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-850 text-zinc-300 hover:text-white'
                            }`}
                          >
                            <span className="text-sm select-none">{g.icon}</span>
                            <span>{g.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTIVE GRADE ROOM DETAIL DASHBOARD (SINFNING ALOHIDA IMERSIV SAHIFASI) */}
                  {selectedGrade !== 'all' && (() => {
                    const activeGradeObj = gradesList.find(g => g.id === selectedGrade);
                    const classBooks = books.filter(b => b.grade === selectedGrade);
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-3xl bg-gradient-to-b ${activeGradeObj?.color} border ${activeGradeObj?.border} space-y-6 relative overflow-hidden`}
                      >
                        {/* Glowing Background Light */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Top grade badges */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-full bg-black/60 text-white/90 tracking-widest border border-white/10">
                              🏫 FAOL O'QUV SINF SAHIFASI
                            </span>
                            <h3 className="text-2xl font-black text-white mt-2 flex items-center gap-2">
                              <span>{activeGradeObj?.icon}</span>
                              <span>{activeGradeObj?.label}</span>
                            </h3>
                            <p className="text-zinc-300 text-xs mt-1 max-w-2xl leading-relaxed">
                              {activeGradeObj?.focus}
                            </p>
                          </div>

                          {/* Classroom Stats */}
                          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10 text-xs">
                            <div className="text-center px-2">
                              <span className="text-zinc-400 block text-[9px] uppercase">O'quvchilar:</span>
                              <span className="text-white font-mono font-bold">28 nafar</span>
                            </div>
                            <div className="h-6 w-px bg-white/10" />
                            <div className="text-center px-2">
                              <span className="text-zinc-400 block text-[9px] uppercase">Darsliklar:</span>
                              <span className="text-emerald-400 font-mono font-bold">{classBooks.length} ta</span>
                            </div>
                            <div className="h-6 w-px bg-white/10" />
                            <div className="text-center px-2">
                              <span className="text-zinc-400 block text-[9px] uppercase">Sinf Onlayn:</span>
                              <span className="text-purple-400 font-mono font-bold animate-pulse">
                                {Math.floor(onlineCount / 12) + 3} kishi
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* DISCIPLINARY PORTAL (MUHAMMADALI AUDIT INTIZOMI) PANEL */}
                        <div className="p-4 bg-black/70 border border-amber-500/25 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                          <div className="md:col-span-8 space-y-1">
                            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                              <ShieldAlert className="w-4 h-4 text-amber-400" /> MUHAMMADALI ORIPOV: INTIZOM AUDITI
                            </h4>
                            <p className="text-[11px] text-zinc-300 leading-relaxed">
                              Kitobni xarid qilib, mutolaani boshlaganingizdan keyin o'qimasdan tark etsangiz (progressingiz &lt; 5% bo'lsa), <span className="text-red-400 font-bold">har bir boshlangan kitob uchun -50,000 UZS jarima</span> kesiladi. Bu jamg'arma to'g'ridan-to'g'ri <span className="text-amber-500 font-bold">Muhammadali Oripov virtual g'aznasi</span>ga kelib tushadi. Mutlaqo ochilmagan (yangi) kitoblar uchun jarima olinmaydi!
                            </p>
                          </div>

                          <div className="md:col-span-4 flex justify-end">
                            <button
                              type="button"
                              onClick={handleRunDisciplineAudit}
                              className="w-full md:w-auto py-2.5 px-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 text-xs font-black rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center gap-1.5"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" /> Kitoblarni Tekshirish va Audit
                            </button>
                          </div>
                        </div>

                        {/* Classroom Mates Progress list (Increases immersion drastically) */}
                        <div className="bg-black/35 p-4 rounded-2xl border border-white/5 space-y-2.5">
                          <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Hozir darsdagi faol sinfdoshlaringiz va progressi:</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div className="p-2.5 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">👩‍🎓 Madina U.</span>
                                <span className="text-[9px] text-zinc-400">Husnixat</span>
                              </div>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold">94%</span>
                            </div>
                            <div className="p-2.5 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">👨‍🎓 Shaxboz K.</span>
                                <span className="text-[9px] text-zinc-400">Algoritmlar</span>
                              </div>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold">80%</span>
                            </div>
                            <div className="p-2.5 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">👩‍🎓 Diyora S.</span>
                                <span className="text-[9px] text-zinc-400">Fizika-Ilm</span>
                              </div>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold">45%</span>
                            </div>
                            <div className="p-2.5 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">Siz (Daho)</span>
                                <span className="text-[9px] text-zinc-400">Meyor</span>
                              </div>
                              <span className="text-[10px] text-amber-400 font-mono font-bold">Tahlilda</span>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })()}

                  {/* Search and Filters Hub */}
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    {/* Search Field */}
                    <div className="md:col-span-6 relative">
                      <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ushbu sahifada darslik nomi yoki muallifni qidirish..."
                        className="w-full py-2 pl-10 pr-4 bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-emerald-500 text-xs text-white placeholder-zinc-650 rounded-xl"
                      />
                    </div>

                    {/* Book Type (Audio/Text) Switcher */}
                    <div className="md:col-span-3 flex gap-1.5 bg-zinc-900 p-1 rounded-xl">
                      {['all', 'elektron', 'audio'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedType(t as any)}
                          className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg cursor-pointer text-center ${
                            selectedType === t
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'text-zinc-500 hover:text-white'
                          }`}
                        >
                          {t === 'all' ? 'barchasi' : t === 'elektron' ? '📚 darslik' : '🎧 audio'}
                        </button>
                      ))}
                    </div>

                    {/* Quick platform earnings stats inside catalog */}
                    <div className="md:col-span-3 flex items-center gap-2 justify-end px-1">
                      <div className="text-right">
                        <span className="text-[9px] block text-zinc-500 leading-none">M.Oripov G'aznasi:</span>
                        <span className="text-xs font-black text-amber-500">{settings.platformEarnings.toLocaleString('uz-UZ')} UZS</span>
                      </div>
                      <span className="text-base select-none">👑</span>
                    </div>

                  </div>

                  {/* Books Render Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => {
                      const isBought = profile.purchasedBookIds.includes(book.id);
                      // Calculate progress percent
                      const progressVal = profile.readingProgress[book.id] || 0;
                      return (
                        <div
                          key={book.id}
                          className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between group hover:border-emerald-500/30 transition-all duration-300"
                        >
                          {/* Aesthetic Cover Artwork with glowing details */}
                          <div className={`p-6 bg-gradient-to-br ${book.coverColor} h-40 flex flex-col justify-between relative`}>
                            <div className="absolute top-4 right-4 bg-zinc-950/80 text-[10px] font-bold text-white p-1.5 px-2.5 rounded-full border border-white/10 uppercase tracking-widest">
                              {book.type === 'audio' ? '🎧 Audio' : '📚 PDF'}
                            </div>

                            <div className="text-[10px] font-bold tracking-widest uppercase text-white/70">
                              {book.grade === 'it' ? "Najot Mutaxassislik" : `${book.grade}-sinf darsligi`}
                            </div>

                            <div>
                              <h3 className="text-lg font-black text-white leading-tight line-clamp-2 drop-shadow-md">
                                {book.title}
                              </h3>
                              <p className="text-xs text-white/80 mt-1 italic">{book.author}</p>
                            </div>
                          </div>

                          {/* Body details */}
                          <div className="p-5 flex-grow space-y-3">
                            <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                              {book.description}
                            </p>

                            <div className="flex justify-between text-[11px] text-zinc-500 font-mono pt-2 border-t border-zinc-900">
                              <span>Hajmi: {book.pagesOrDuration}</span>
                              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {book.rating}</span>
                            </div>

                            {/* Show active progress bar for purchased books */}
                            {isBought && (
                              <div className="pt-2">
                                <div className="flex justify-between items-center text-[9px] font-bold uppercase mb-1">
                                  <span className="text-zinc-500">Mutolaa holati:</span>
                                  <span className={
                                    progressVal >= 100 
                                      ? 'text-emerald-400' 
                                      : progressVal === undefined 
                                        ? 'text-cyan-400 font-bold' 
                                        : progressVal >= 5 
                                          ? 'text-indigo-400 font-bold' 
                                          : 'text-rose-500 animate-pulse font-extrabold'
                                  }>
                                    {progressVal >= 100 
                                      ? 'TUGALLANDI ✅' 
                                      : progressVal === undefined 
                                        ? 'YANGI XARID (MUTOLAA KUTILMOQDA) 🆕' 
                                        : progressVal >= 5 
                                          ? `${progressVal}% O'QILDI 📖` 
                                          : 'BOSHLANGAN (JARIMALI) ⚠️'}
                                  </span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      progressVal >= 100 
                                        ? 'bg-emerald-500' 
                                        : progressVal === undefined 
                                          ? 'bg-zinc-800' 
                                          : progressVal >= 5 
                                            ? 'bg-indigo-500' 
                                            : 'bg-rose-500'
                                    }`}
                                    style={{ width: `${progressVal === undefined ? 0 : Math.max(3, progressVal)}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Purchase or Read Buttons */}
                          <div className="p-5 pt-0">
                            {isBought ? (
                              <button
                                onClick={() => {
                                  setActiveReadingBook(book);
                                  // Initialize starting progress on first open so it registers as started reading
                                  if (profile.readingProgress[book.id] === undefined) {
                                    handleUpdateProgress(book.id, 1);
                                  }
                                }}
                                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                              >
                                <Unlock className="w-4 h-4 text-zinc-950" /> Mutolaani boshlash
                              </button>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedBookForDetail(book)}
                                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl cursor-pointer transition-colors border border-zinc-850"
                                >
                                  Ma'lumot
                                </button>
                                <button
                                  onClick={() => handleBuyBook(book)}
                                  className="flex-1 py-2.5 bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                                >
                                  <Coins className="w-4 h-4" /> {book.price.toLocaleString('uz-UZ')} UZS
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })}

                    {filteredBooks.length === 0 && (
                      <div className="col-span-full py-12 text-center text-zinc-500 text-xs italic">
                        Ushbu sinf sahifasida darsliklar topilmadi.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ------------ MODULE 2: INTERACTIVE GAMES ------------ */}
              {activeTab === 'o-yinlar' && (
                <Games onAwardCoins={handleRewardCoins} userCoins={profile.coinsBalance} />
              )}

              {/* ------------ MODULE 3: CHAT ROOM ------------ */}
              {activeTab === 'chat' && (
                <ChatRoom profile={profile} />
              )}

              {/* ------------ MODULE 4: PROFILE MANAGEMENT ------------ */}
              {activeTab === 'profil' && (
                <UserProfile
                  profile={profile}
                  books={books}
                  onUpdateProfile={setProfile}
                  onTopUpBalance={handleTopUp}
                />
              )}

              {/* ------------ MODULE 5: ADMIN SETTINGS & INCOME ------------ */}
              {activeTab === 'admin' && (
                <AdminPanel
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                  onAddBook={handleAdminAddBook}
                  books={books}
                />
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* --- DETAILED BOOK MODAL & COMMENT SYSTEM --- */}
      {selectedBookForDetail && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-950 rounded-3xl border border-zinc-850 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {/* Header / Intro */}
            <div className={`p-6 bg-gradient-to-br ${selectedBookForDetail.coverColor} rounded-2xl relative`}>
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                {selectedBookForDetail.title}
              </h3>
              <p className="text-zinc-200 text-xs mt-1 italic">Muallif: {selectedBookForDetail.author}</p>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850">
                <span className="text-zinc-500 block">Klip turi:</span>
                <span className="text-white font-bold">{selectedBookForDetail.type === 'audio' ? '🎧 Audio Darslik' : '📚 PDF darslik'}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850">
                <span className="text-zinc-500 block">Sinflanishi:</span>
                <span className="text-white font-bold">
                  {selectedBookForDetail.grade === 'it' ? "Najot Professional" : `${selectedBookForDetail.grade}-sinf darsligi`}
                </span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850">
                <span className="text-zinc-500 block">O'lchov / Davomiyligi:</span>
                <span className="text-white font-bold">{selectedBookForDetail.pagesOrDuration}</span>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850">
                <span className="text-zinc-500 block">Virtual narxi:</span>
                <span className="text-emerald-400 font-extrabold">{selectedBookForDetail.price.toLocaleString('uz-UZ')} UZS</span>
              </div>
            </div>

            {/* In-depth details */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Batafsil ma'lumot:</h4>
              <p className="text-zinc-300 text-xs leading-relaxed">
                {selectedBookForDetail.info}
              </p>
            </div>

            {/* BUY NOW TRIGGER */}
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedBookForDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Yopish
              </button>
              
              <button
                onClick={() => handleBuyBook(selectedBookForDetail)}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-black rounded-xl cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              >
                Kopin sotib olish ({selectedBookForDetail.price.toLocaleString('uz-UZ')} UZS)
              </button>
            </div>

            {/* COMMENT / SHARHLAR BO'LIMI */}
            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">O'quvchilar Fikr-sharhlari</h4>
              
              {/* Form to post a review */}
              <form onSubmit={(e) => handleAddReview(e, selectedBookForDetail.id)} className="space-y-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-850">
                <div>
                  <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Baho bering:</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRatingStars(s)}
                        className="cursor-pointer text-xs"
                      >
                        <Star className={`w-4.5 h-4.5 ${s <= ratingStars ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">O'zingizning sharhingiz:</label>
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Ushbu darslik yoki audio-hikoya haqida oʻz mulohazangizni yozing..."
                    className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-zinc-700"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="py-1 px-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Yuborish <Send className="w-3 h-3 inline-block ml-1" />
                  </button>
                </div>
              </form>

              {/* Render Reviews list */}
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-zinc-900/60 border border-zinc-850 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{rev.userAvatar}</span>
                        <span className="text-xs font-bold text-white">{rev.userName}</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-600">{rev.date}</span>
                    </div>

                    <div className="flex gap-0.5 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-800'}`}
                        />
                      ))}
                    </div>

                    <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* --- MAIN MANDATORY BOTTOM FOOTER --- */}
      <footer className="py-6 border-t border-zinc-900 text-center text-xs text-zinc-500 bg-zinc-950/80 mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-zinc-400">
            © 2026 Najot Ta'lim Book. Barcha huquqlar himoyalangan.
          </p>
          
          <div className="bg-zinc-900/40 p-2 px-4 rounded-xl border border-zinc-850 text-xs">
            <span className="font-black text-emerald-400">Oripov Muhammadali</span> - Sayt asoschisi 
            <span className="mx-2.5 text-zinc-700">|</span> 
            Najot Ta'lim asoschisi - <span className="font-semibold text-zinc-300">Temurbek Adhamov</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
