import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Sliders, TrendingUp, Cpu, Wifi, WifiOff, FileText, Check, Database } from 'lucide-react';
import { Book, AppSettings } from '../types';

interface AdminPanelProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onAddBook: (book: Book) => void;
  books: Book[];
}

export default function AdminPanel({ settings, onUpdateSettings, onAddBook, books }: AdminPanelProps) {
  // Add Book Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(55000); // Default must be > 50,000 UZS
  const [bookType, setBookType] = useState<'elektron' | 'audio'>('elektron');
  const [grade, setGrade] = useState<string>('it');
  const [pagesOrDuration, setPagesOrDuration] = useState('120 sahifa');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorString, setErrorString] = useState('');

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !description.trim()) {
      setErrorString("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }
    if (price < 50000) {
      setErrorString("Kitob bahosi 50,000 UZS dan kam bo'la olmaydi.");
      return;
    }

    const colorGradients = [
      'from-emerald-600 to-teal-900',
      'from-purple-600 to-indigo-950',
      'from-amber-500 to-orange-850',
      'from-blue-600 to-indigo-900',
      'from-red-600 to-rose-950',
      'from-cyan-600 to-sky-950'
    ];

    const chosenGradient = colorGradients[Math.floor(Math.random() * colorGradients.length)];

    const newBook: Book = {
      id: 'book-' + Date.now(),
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      info: "Ushbu yangi darslik Najot Ta'lim administratorlar guruhi tomonidan qo'shildi. O'quv maqsadlarida foydalanish tavsiya tutiladi.",
      price: Number(price),
      type: bookType,
      grade: grade === 'it' || grade === 'all' ? grade : Number(grade),
      rating: 5.0,
      pagesOrDuration: pagesOrDuration.trim(),
      coverColor: chosenGradient,
      textColor: 'text-emerald-400',
      content: [
        "1-Sahifa. Yangi qo'shilgan bilim qomusi. Ushbu darslik sizga yangi ufq ochishda yaqindan ko'maklashadi.",
        "2-Sahifa. Najot Ta'lim orqali siz kelajak zamonaviy kasb-hunar sirlarini chuqur amaliy misollar bilan o'rganasiz."
      ],
      audioTracks: bookType === 'audio' ? [
        { title: 'Kirish qismi', duration: '15:20' },
        { title: 'Amaliy tushunchalar', duration: '20:10' }
      ] : undefined
    };

    onAddBook(newBook);
    
    // reset
    setTitle('');
    setAuthor('');
    setDescription('');
    setPrice(55000);
    setPagesOrDuration(bookType === 'audio' ? '2 soat' : '120 sahifa');
    setIsSuccess(true);
    setErrorString('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleOfflineToggle = () => {
    onUpdateSettings({
      ...settings,
      isOffline: !settings.isOffline
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl" id="admin-panel">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-zinc-900 mb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-emerald-400" /> Boshqaruv & Admin Paneli
          </h2>
          <p className="text-zinc-500 text-xs text-left">
            Administrator va sayt yaratuvchilari uchun maxsus qulayliklar. To'ylovlar, kitob qo'shish va oflayn ishlashni nazorat qiling.
          </p>
        </div>

        {/* Offline Toggle simulation */}
        <button
          onClick={handleOfflineToggle}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all border ${
            settings.isOffline
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-500'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}
        >
          {settings.isOffline ? (
            <>
              <WifiOff className="w-4 h-4 text-amber-400" /> Oflayn Rejim (Internet yo'q)
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" /> Onlayn Rejim (Tezkor)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left column: Financial Treasury for founders */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Asoschilar Banki 👑
            </h3>
            <span className="text-[10px] text-zinc-500 block">Muhammadali Oripov Ulushi:</span>
            <div className="text-2xl font-black text-white mt-1">
              {settings.platformEarnings.toLocaleString('uz-UZ')} UZS
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">
              * Saytdagi o'quvchilar tomonidan har safar premium kitoblar sotib olinganida pullar to'g'ridan-to'g'ri uning platforma g'aznasiga kelib tushadi!
            </p>

            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Jami kitoblar:</span>
                <span className="text-white font-mono font-bold">{books.length} ta</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Virtual ulanish:</span>
                <span className="text-emerald-400 font-bold">Xavfsiz / SSL</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/20 border border-zinc-800 rounded-2xl flex items-start gap-3">
            <Cpu className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-white mb-1">Oflayn Ma'lumotlar Boshqaruvi</h4>
              <p className="text-zinc-500">Ushbu dastur internet uzilganda ham barcha o'yin natijalari va sotib olish jurnallarini muvaffaqiyatli xotirada saqlab qoladi.</p>
            </div>
          </div>
        </div>

        {/* Right column: Append New Books effortlessly */}
        <div className="md:col-span-8 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
            <PlusCircle className="w-4.5 h-4.5 text-emerald-400" /> Kitob Qo'shish Formasi
          </h3>

          <form onSubmit={handleCreateBook} className="space-y-4">
            {errorString && (
              <p className="text-xs text-red-400 font-semibold bg-red-950/20 p-2.5 rounded-lg border border-red-500/20">
                ⚠️ {errorString}
              </p>
            )}

            {isSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-400 rounded-xl flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4" /> Yangi kitob muvaffaqiyatli kutubxonaga qo'shildi!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Kitob Nomi *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: Jamoaviy Etika"
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Muallif *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Masalan: Sayyid Qamar"
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Kitob Turi *</label>
                <select
                  value={bookType}
                  onChange={(e) => {
                    const val = e.target.value as 'elektron' | 'audio';
                    setBookType(val);
                    setPagesOrDuration(val === 'audio' ? '1 soat 40 daqiqa' : '110 sahifa');
                  }}
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="elektron">Elektron darslik</option>
                  <option value="audio">Audio hikoya (eshitish)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Sahifa soni / Davomiyligi</label>
                <input
                  type="text"
                  value={pagesOrDuration}
                  onChange={(e) => setPagesOrDuration(e.target.value)}
                  placeholder="Masalan: 140 sahifa yoki 2 soat"
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white placeholder-zinc-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Narxi (UZS, &gt; 50,000 UZS) *</label>
                <input
                  type="number"
                  min="50000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Mutaxassislik/Sinf *</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="it">Najot Ta'lim (IT / Biznes)</option>
                  <option value="all">Barchasi uchun umumiy</option>
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((s) => (
                    <option key={s} value={s}>{s}-sinf darsligi</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">Qisqacha tavsif *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kitobning asosiy mazmuni va nimani o'rgatishi haqida..."
                rows={3}
                className="w-full py-2 px-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl cursor-pointer transition-all"
            >
              Yangi Kitobni Qo'shish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
